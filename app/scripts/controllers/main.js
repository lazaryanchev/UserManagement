'use strict';

angular.module('userManagementApp')
  .controller('MainCtrl', function ($scope, $uibModal, User, uiGridConstants) {
    var vm = this;

    vm.selectedUser = null;

    vm.alerts = [];

    var paginationAndSortOptions = {
      pageSize: 10,
      page: 0,
      sort: null,
      sortColumn: null,
      getSortString: function(){
        if(this.sort && this.sortColumn){
          return this.sortColumn+','+(this.sort===uiGridConstants.DESC?'desc':'asc');
        }else {
          return '';
        }
      }
    };

    vm.gridOptions={
      paginationPageSizes: [10, 20, 50, 100],
      paginationPageSize: 10,
      useExternalPagination: true,
      useExternalSorting: true,
      enableRowSelection: true,
      enableSelectAll: false,
      multiSelect: false,
      enableRowHeaderSelection: false,
      columnDefs: [
       {name: 'firstName' },
       {name: 'lastName' },
       {name: 'email' },
       {name: 'dateOfBirth' }
      ],
      onRegisterApi: function(gridApi) {
        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
          paginationAndSortOptions.page = newPage - 1;
          paginationAndSortOptions.pageSize = pageSize;
          loadGridPage();
        });
        gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
          if (sortColumns.length == 0) {
            paginationAndSortOptions.sort = null;
            paginationAndSortOptions.sortColumn = null;
          } else {
            paginationAndSortOptions.sortColumn = sortColumns[0].colDef.name;
            paginationAndSortOptions.sort = sortColumns[0].sort.direction;
          }
          loadGridPage();
        });
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
          if(row.isSelected){
            vm.selectedUser = row.entity;
          }else{
            vm.selectedUser = null;
          }
        });
      }
    };

    var loadGridPage = function(){
      User.query({page: paginationAndSortOptions.page,
                              size: paginationAndSortOptions.pageSize,
                              sort: paginationAndSortOptions.getSortString()
                            }, function(users) {
        vm.gridOptions.totalItems = users.totalElements;
        vm.gridOptions.data = users.content;
      }, function(error){
        console.log(JSON.stringify(error));
      });
    }

    vm.createEditUser = function(user){

      var modalInstance = $uibModal.open({
            templateUrl: 'views/newEditUser.html',
            controller: 'NewEditUser',
            controllerAs: 'vm',
            resolve: {
              user: function () {
                return user;
              }
            }

          });

      modalInstance.result.then(function (user) {
        if(!user.id){

          User.save(user, function() {
            loadGridPage();
            vm.alerts.push({type: 'success', msg: 'User created successfully'});
          }, function(error){
            console.log(JSON.stringify(error));
          });
        }else{
          User.update(user, function(){
            loadGridPage();
            vm.alerts.push({type: 'success', msg: 'User edited successfully'});
          }, function(error){
            console.log(JSON.stringify(error));
          });
        }
      }, function () { });
    }

    vm.deleteUser = function(user){

      User.delete({id: user.id}, function(){
        loadGridPage();
        vm.alerts.push({type: 'success', msg: 'User deleted successfully'});
      }, function(error){
        console.log(JSON.stringify(error));
      });
    }

    vm.closeAlert = function(index) {
      if(index < vm.alerts.length && index >= 0){
        vm.alerts.splice(index, 1);
      }
    };

    loadGridPage();

  });
