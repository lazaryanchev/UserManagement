'use strict';

describe('User', function() {
  var $httpBackend;
  var User;
  var usersData = [
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
  ];

  beforeEach(module('userManagementApp'));

  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  beforeEach(inject(function(_$httpBackend_, _User_, config) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET(config.apiUrl+ '/users').respond({content: usersData});

    User = _User_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the users data from `http://localhost:8080/users/`', function() {
    var users = User.query();

    //expect(users).toEqual([]);

    $httpBackend.flush();
    expect(users.content).toEqual(usersData);
  });
});
