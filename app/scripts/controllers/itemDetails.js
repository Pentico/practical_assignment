'use strict';

angular.module('practicalAssignmentApp')
    .controller('itemDetailsController',['$scope', 'userService', function($scope, userService, $location ){

        var project = '';
        var pKey = userService.getPkey();


        /***
         * Gets Specific Project 
         * var project ends with the info from call
         */
        userService.getProject(pKey)
            .then(function(response){
                project =response;
            }, function(error){
                console.log('On Error');
            }); // EOF

    }]);
    
