'use strict';

angular.module('userManagementApp').
  factory('User', function($resource) {

      return $resource('http://localhost:8080/users/:id',{},{
        query:{
          isArray: false
        },
        update:{
          method: 'put'
        }
      });
    }
  );
