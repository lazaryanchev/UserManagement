'use strict';

angular
  .module('userManagementApp', [
    'ngMessages',
    'ngRoute',
    'ngResource',
    'ui.grid',
    'ui.grid.pagination',
    'ui.grid.selection',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).constant('config', {
    apiUrl: 'http://localhost:8080'
  });
