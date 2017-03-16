'use strict';
/**
 * 
 */

angular.module('practicalAssignmentApp')
    .controller('userController',['$scope', 'userService','$location', function($scope, userService, $location ){
        $scope.username ='';
        $scope.password = '';
        $scope.flashMessage = '';        

        var authentication  = function() {

         userService.postLogin($scope.username, $scope.password)
                    .then (function(response){
                        $scope.name= response.data.token;
                        userService.setToken(response.data.token);
                        $location.path('/project');
                        console.log(response);
                    }, function(error) {
                        $scope.flashMessage = 'Error Trying to Login in Please try again! ';
                        console.log('on Error userController' + error);
                    });
         };

        
        $scope.validate = function() {
            authentication();
        };
}]);