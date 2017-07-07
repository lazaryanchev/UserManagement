describe('Controller: NewEditUser', function () {

  // load the controller's module
  beforeEach(module('userManagementApp'));

  var newEditUserCtrl,
    userMock,
    $filter,
    uibDateParser,
    $controller,
    $uibModalInstance;

    beforeEach(inject(function (_$controller_, $rootScope, _$filter_, _uibDateParser_){

      $controller = _$controller_;
      scope = $rootScope.$new();
      $filter = _$filter_;
      uibDateParser = _uibDateParser_;
      $uibModalInstance = {};

      userMock = null;
    }));

    it('should have user obj with empty fields when initialized with null user', function(){

      newEditUserCtrl = $controller('NewEditUser', {
        $scope: scope,
        $filter: $filter,
        user: userMock,
        uibDateParser: uibDateParser,
        $uibModalInstance: $uibModalInstance
      });

      expect(newEditUserCtrl.user).toBeDefined();
      expect(newEditUserCtrl.user.id).toBeUndefined();
      expect(newEditUserCtrl.user.dateOfBirth).toBeNull();
      expect(newEditUserCtrl.user.firstName).toEqual('');
      expect(newEditUserCtrl.user.lastName).toEqual('');
      expect(newEditUserCtrl.user.email).toEqual('');
    });

    it('should have user obj with empty fields when initialized with null user', function(){

      newEditUserCtrl = $controller('NewEditUser', {
        $scope: scope,
        $filter: $filter,
        user: userMock,
        uibDateParser: uibDateParser,
        $uibModalInstance: $uibModalInstance
      });

      expect(newEditUserCtrl.dateOfBirth).toBeNull();
    });

    it('should have equal user obj with the one passed to the controller', function(){

      userMock = {
        id: 1,
        firstName:'test',
        lastName: 'test2',
        email:'test email',
        dateOfBirth:'2017-10-10'
      };

      newEditUserCtrl = $controller('NewEditUser', {
        $scope: scope,
        $filter: $filter,
        user: userMock,
        uibDateParser: uibDateParser,
        $uibModalInstance: $uibModalInstance
      });

      expect(newEditUserCtrl.user).toEqual(userMock);
    });
});
