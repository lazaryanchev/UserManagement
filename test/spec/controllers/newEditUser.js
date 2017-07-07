'use strict';

describe('Controller: NewEditUser', function () {

  beforeEach(module('userManagementApp'));

  var NewEditUser,
    dummyUser,
    $uibModalInstance;

  beforeEach(inject(function ($controller, _$uibModalInstance_){

    $uibModalInstance = _$uibModalInstance_;


    dummyUser = null;
    NewEditUserCtrl = $controller('MainCtrl', {
      User: dummyUser,
      $uibModalInstance: $uibModalInstance
    });


  });
});
