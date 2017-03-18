'use strict';

angular.module('practicalAssignmentApp')
    .controller('itemDetailsController',['$scope', 'userService', function($scope, userService, $location ){

        $scope.tasks = '';
        $scope.index ='';
        $scope.title;
        $scope.estimated_hours;
        $scope.due_date;
        $scope.project= [];


        /***
         * Gets all user tasks 
         * var project ends with the info from call
         * 
         * TODO : Need to debug this 
         *      part... Currently they are no task in any project of JZ 
         */
        userService.getTask()
            .then(function(response){
                console.log("in GetTAsks");
                console.log(response);
                 $scope.project =response.data;
                console.log($scope.project[0].title);
               
            }, function(error){
                console.log('On Error');
            }); // EOF

        
        $scope.deleteTask = function() {
            console.log($scope.index);
            userService.deleteTask($scope.tasks[$scope.index].id)
                    .then(function(response){
                        console.log(response);
                    }, function(error) {

                        console.log("Error on Deleting task");
                    });
        }; // EOF

        /**
         * 
         * 
         */
        $scope.clickedOnItem = function($index) {

            $scope.index = $index;
        }

        $scope.addTask = function(){
            
        }

    }]);
    
