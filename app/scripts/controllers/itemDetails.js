'use strict';

angular.module('practicalAssignmentApp')
    .controller('itemDetailsController',['$scope', 'userService', function($scope, userService, $location ){

        $scope.index ='';
        $scope.title;
        $scope.estimated_hours;
        $scope.due_date;
        $scope.tasks= [];


        /***
         * Gets all user tasks 
         * var project ends with the info from call
         * 
         * TODO : Need to debug this 
         *      part... Currently they are no task in any project of JZ 
         */
        userService.getTask()
            .then(function(response){
                 $scope.tasks =response.data;
               
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

            $scope.title = $scope.tasks[$index].title;
            $scope.due_date =new Date($scope.tasks[$index].due_date);
            $scope.estimated_hours = parseInt($scope.tasks[$index].estimated_hour);
        }


        /***
         * Adding a new Task
         */ 
        $scope.addTask = function(){

            console.log($scope.estimated_hours);
            console.log($scope.due_date);
            userService.addTask({
                due_date : $scope.due_date,
                estimated_hours : $scope.estimated_hours,
                title   : $scope.title,
                project : userService.getPkey()
            }).then(function(response) {
                console.log(response);
            }, function(error){
                console.log("Error Adding Task");
            });
        }

         // EOF

          /**
         * Clearing the variable so the initial 
         * values are not displayed when you want to add a new project.
         */
        $scope.cleanVar = function() {

            $scope.title = null;
            $scope.estimated_hours = null;
            $scope.due_date = null;

        }; // EOF

        /**
         * Edit a Task
         */ 
        $scope.editTask = function() {
            userService.editTask({
                title           : $scope.title,
                estimated_hours : $scope.estimated_hours,
                due_date        : $scope.due_date,
                project : userService.getPkey()
            },$scope.tasks[$scope.index].id).then(function(response){
                console.log(response);
            }, function(error){
                console.log("Error in editTask");
            })
        }
    }]);
    
