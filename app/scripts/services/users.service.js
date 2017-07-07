'use strict';

angular.module('userManagementApp').
  factory('User', function($resource, config) {

      return $resource(config.apiUrl + '/users/:id',{},{
        query:{
          isArray: false
        },
        update:{
          method: 'put'
        }
      });
    }
  );
