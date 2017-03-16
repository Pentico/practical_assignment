'use strict';
/**
 * 
 */

angular.module('practicalAssignmentApp')
    .controller('userController',function(userService, $scope){
         $scope.name = userService.postLogin('jacob.zuma','tangent');
        
});