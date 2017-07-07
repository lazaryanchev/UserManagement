'use strict';

angular.module('userManagementApp')
  .controller('NewEditUser', function ($scope, $uibModalInstance, $filter, uibDateParser, user) {
    var vm = this;

    vm.user = user ? user : {
      firstName: '',
      lastName:'',
      email:'',
      dateOfBirth:null
    };

    vm.dateOfBirth = vm.user.dateOfBirth ? new Date(vm.user.dateOfBirth) : null;

    vm.ok = function () {
      vm.user.dateOfBirth = $filter('date')(vm.dateOfBirth, 'yyyy-MM-dd');
      $uibModalInstance.close(vm.user);
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    vm.isDatePickerOpened = false;
  });
