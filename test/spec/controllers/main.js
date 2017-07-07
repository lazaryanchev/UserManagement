'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('userManagementApp'));

  var MainCtrl,
    scope,
    userMock,
    $uibModal,
    uiGridConstants;

    var usersData = {
      totalElements: '2',
      content: [
      {
      "id": 1,
      "firstName": "Birgit",
      "lastName": "Prete",
      "email": "birgit.prete@mail.com",
      "dateOfBirth": "1987-12-30"
      },
      {
      "id": 2,
      "firstName": "Valorie",
      "lastName": "Griffie",
      "email": "valorie.griffie@gmail.com",
      "dateOfBirth": "1987-12-30"
      }
    ]};

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$uibModal_, _uiGridConstants_) {
    scope = $rootScope.$new();
    uiGridConstants = _uiGridConstants_;
    $uibModal = _$uibModal_;

    userMock = { query: function(param, success, error){
      return success(usersData);
    }};

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $uibModal: $uibModal,
      User: userMock,
      uiGridConstants: uiGridConstants
    });
  }));

  it('should have gridOptions variable defined', function(){
    expect(MainCtrl.gridOptions).toBeDefined();
  });

  it('should have selectedUser set to null', function(){
    expect(MainCtrl.selectedUser).toBeNull();
  });

  it('should have empty alerts collection', function(){
    expect(MainCtrl.alerts.length).toBe(0);
  });

  it('should initialize users collection', function () {

    expect(MainCtrl.gridOptions.data.length).toBe(usersData.content.length);
    expect(MainCtrl.gridOptions.data).toEqual(usersData.content);
    expect(MainCtrl.gridOptions.totalItems).toBe(usersData.totalElements);
  });

  describe('MainCtrl.deleteUser', function(){

    beforeEach(function() {
      userMock.delete = function(params, success, error){ return success(); };
      spyOn(userMock, 'delete').and.callThrough();
      spyOn(userMock, 'query');
    });

    it('should add alert when user is successfully deleted', function(){

      expect(MainCtrl.alerts.length).toBe(0);
      MainCtrl.deleteUser({id: 1});
      expect(MainCtrl.alerts.length).toBe(1);
    });

    it('should call users query when user is deleted', function(){

      MainCtrl.deleteUser({id: 1});
      expect(userMock.query).toHaveBeenCalled();
    });

    it('should call users delete when user is deleted', function(){

      MainCtrl.deleteUser({id: 1});
      expect(userMock.query).toHaveBeenCalled();
    });
  });

  describe('Pagination and selection changed tests', function(){

    var gridApiMock;

    beforeEach(function() {
      spyOn(userMock, 'query');

      gridApiMock = {
        pagination: {
          on:{ paginationChanged: function(o, f){ } }
        },
        core:{
          on:{ sortChanged: function(o, f) { } }
        },
        selection:
        {
          on:{ rowSelectionChanged: function(o, f) { } }
        }
      };
    });

    it('should call users query on sort changed', function(){

      gridApiMock.core.on = {
        sortChanged: function(o, f){
          f({}, [{ colDef: { name: 'test' }, sort: { direction: uiGridConstants.DESC }  }]);
        }
      };
      MainCtrl.gridOptions.onRegisterApi(gridApiMock);
      expect(userMock.query).toHaveBeenCalled();
    });

    it('should call users query on page changed', function(){

      gridApiMock.pagination.on = { paginationChanged: function(o, f){ f(1, 5); } };
      MainCtrl.gridOptions.onRegisterApi(gridApiMock);
      expect(userMock.query).toHaveBeenCalled();
    });

    it('should set selectedUser on grid selection changed', function(){

      expect(MainCtrl.selectedUser).toBeNull();

      gridApiMock.selection.on = {
        rowSelectionChanged: function(o, f){
          f({ isSelected: true, entity: usersData.content[0] });
        }
      };
      MainCtrl.gridOptions.onRegisterApi(gridApiMock);
      expect(MainCtrl.selectedUser).toEqual(usersData.content[0]);
    });

    it('should set selectedUser on grid selection changed', function(){

      MainCtrl.selectedUser = {};

      gridApiMock.selection.on = {
        rowSelectionChanged: function(o, f){
          f({ isSelected: false });
        }
      };
      MainCtrl.gridOptions.onRegisterApi(gridApiMock);
      expect(MainCtrl.selectedUser).toBeNull();
    });

  });

  describe('Create and edit users tests', function(){
    var dummyUser;

    beforeEach(function() {

      userMock.save = function(obj, success, error) { return success(); };
      userMock.update = function(obj, success, error) { return success(); };

      dummyUser = {};
      var modalInstanceMock = {
        result: { then: function(f){ f(dummyUser); } }
      };

      spyOn(userMock, 'query');
      spyOn(userMock, 'save').and.callThrough();
      spyOn(userMock, 'update').and.callThrough();
      spyOn($uibModal, 'open').and.returnValue(modalInstanceMock);
    });

    it('should call users save on user created', function(){

      MainCtrl.createEditUser();
      expect(userMock.save).toHaveBeenCalled();
    });

    it('should call users query on user created', function(){

      MainCtrl.createEditUser();
      expect(userMock.query).toHaveBeenCalled();
    });

    it('should call users update on user edited', function(){
      dummyUser.id=1;
      MainCtrl.createEditUser(dummyUser);
      expect(userMock.update).toHaveBeenCalled();
    });

    it('should call users query on user edited', function(){
      dummyUser.id=1;
      MainCtrl.createEditUser(dummyUser);
      expect(userMock.query).toHaveBeenCalled();
    });

    it('should add alert when user is successfully created', function(){

      expect(MainCtrl.alerts.length).toBe(0);
      MainCtrl.createEditUser();
      expect(MainCtrl.alerts.length).toBe(1);
    });

    it('should add alert when user is successfully edited', function(){

      expect(MainCtrl.alerts.length).toBe(0);
      MainCtrl.createEditUser(dummyUser);
      expect(MainCtrl.alerts.length).toBe(1);
    });
  });
});
