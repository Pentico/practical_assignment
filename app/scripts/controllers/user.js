'use strict';
/**
 * 
 */

angular.module('practicalAssignmentApp')
    .controller('userController',['$scope', 'userService', function($scope, userService){
        $scope.username ='';
        $scope.password = '';
        $scope.flashMessage = '';

        var authentication  = function() {
            
         userService.postLogin('jacob.zuma','tangent')
                    .then (function(response){
                        $scope.name= response.data.token;
                        userService.setToken(response.data.token);

                        console.log(response);
                    }, function(error) {
                        $scope.flashMessage = "Error Trying to Login in Please try again! "
                        console.log('on Error userController' + error);
                    });
         };

         authentication();
        
        
}]);