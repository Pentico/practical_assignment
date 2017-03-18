'use strict';

angular.module('practicalAssignmentApp')
    .controller('itemDetailsController',['$scope', 'userService', function($scope, userService, $location ){

        $scope.index ='';
        $scope.title;
        $scope.estimated_hours;
        $scope.due_date;
        $scope.message;
        $scope.message_info;
        $scope.tasks= [];



        var getTask = function(){
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
                        $scope.message = 'Success';
                        $scope.message_info = 'Item loaded Successfully!';
                    }, function(error){
                        $scope.message = 'Error';
                        $scope.message_info = 'Problem occured while trying to load Task!';
                    }); 
        } // EOF
        
        getTask();


        $scope.deleteTask = function() {
            console.log($scope.index);
            userService.deleteTask($scope.tasks[$scope.index].id)
                    .then(function(response){
                        console.log(response);
                        $scope.message = 'Success';
                        $scope.message_info = 'Item Deleted Successfully!';
                        getTask();
                    }, function(error) {
                        $scope.message = 'Error';
                        $scope.message_info = 'Problem occured while trying to Deleting Task!';
                        console.log("Error on Deleting task");
                    });
        }; // EOF

        /**
         * 
         * 
         */
        $scope.clickedOnItem = function($index) {


            $scope.index = $index;
            $scope.selectedRow = $index;
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
                 $scope.message = 'Success';
                 $scope.message_info = 'Added Task Successfully!';
                 getTask();
            }, function(error){
                 $scope.message = 'Error';
                 $scope.message_info = 'Problem occured while trying to Add Task!';
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
                project         : userService.getPkey()
            },$scope.tasks[$scope.index].id).then(function(response){
                getTask();
                 $scope.message = 'Success';
                 $scope.message_info = 'Editing Task Successfully!';
            }, function(error){
                 $scope.message = 'Error';
                 $scope.message_info = 'Problem occured while trying to Editing Task!';
                console.log("Error in editTask");
            })
        }
    }]);
    
