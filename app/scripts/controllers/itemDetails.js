'use strict';

angular.module('practicalAssignmentApp')
    .controller('itemDetailsController',['$scope', 'userService', function($scope, userService, $location ){

        $scope.project = '';
        var pKey = userService.getPkey();


        /***
         * Gets Specific Project 
         * var project ends with the info from call
         * 
         * TODO : Need to debug this 
         *      part... Currently they are no task in any project of JZ 
         */
        userService.getProject(pKey)
            .then(function(response){
                console.log(response);
                $scope.project =response;
            }, function(error){
                console.log('On Error');
            }); // EOF

    }]);
    
