'use strict';

angular.module('practicalAssignmentApp')
    .controller('projectController',['$scope', 'userService','$location', function($scope, userService, $location){


         $scope.projects = [];
         $scope.title;
         $scope.description;
         $scope.end_title;
         $scope.start_date;
         $scope.end_date;
         $scope.is_billable= true;
         $scope.is_active = true;
         $scope.disable_editProject = true;
         $scope.disable_delProject = true;
         $scope.disable_ViewProject = true;
         $scope.index;

        /**
         * Getting all the users projects
         */
        var getProjects = function (){
    
        userService.getProjects()
                .then(function(response) {
                    $scope.projects = response.data;
                }, function(error){
                    console.log('Error Trying to retrieve the information');
                });    

        };

        // TODO remove this
        getProjects();  // init

        $scope.viewDetails = function() {

            userService.setPkey($scope.projects[$scope.index].pk);
            $location.path('/itemDetails');
        };

        /**
         * Add New Project
         */
      $scope.addProject = function(){
          console.log($scope.start_date.getDay());
          console.log(new Date($scope.start_date).get);
            userService.postProject(
                {
                    title       : $scope.title,
                    description : $scope.description,
                    start_date  : $scope.start_date.getFullYear() + '-' + ($scope.start_date.getMonth()+1) + '-' + $scope.start_date.getDate(),
                    end_date    :  $scope.end_date,
                    is_billable :  $scope.is_billable ,
                    is_active   :  $scope.is_active 

                }
            ).then(function(response){
                console.log(response);
            }, function(error){
                console.log("Error Adding new Project");
            });
        }; // EOF


        /**
         * Deleted a Project using the pkey,
         *  the user must have cliked on the project first
         */
        $scope.deleteProject = function() {

            userService.deleteProject($scope.projects[$scope.index].pk).then(function(response){
                console.log("In delete");
                console.log(response);
            }, function(error){
                console.log("Error deleting  Project");
            });
        }; // EOF

        /**
         * Most update the project variable 
         * if the user decided to click editproject or deleteProject
         * 
         */
        $scope.clickedOnItem = function($index) {

            $scope.disable_ViewProject = false;
            $scope.disable_delProject = false;

            $scope.projects[$index];
            $scope.index = $index
            $scope.title = $scope.projects[$index].title;
            $scope.description = $scope.projects[$index].description;
            $scope.start_date = new Date($scope.projects[$index].start_date);  
            $scope.end_date = new Date($scope.projects[$index].end_date);
            $scope.is_billable = $scope.projects[$index].is_billable;
            $scope.is_active = $scope.projects[$index].is_active;

        }; // EOF


        /**
         * Clearing the variable so the initial 
         * values are not displayed when you want to add a new project.
         */
        $scope.cleanVar = function() {

            $scope.index = null;
            $scope.title = null;
            $scope.description = null;
            $scope.start_date = null;
            $scope.end_date = '';
            $scope.is_active = true;
            $scope.is_billable = true;

        }; // EOF


        /***
         * Edit a Project 
         */
        $scope.editProject = function() {
            console.log($scope.start_date);
            userService.editProject(
                {
                    title       : $scope.title,
                    description : $scope.description,
                    start_date  : $scope.start_date.getFullYear() + '-' + ($scope.start_date.getMonth()+1) + '-' + $scope.start_date.getDate(),
                    end_date    :  $scope.end_date,
                    is_billable :  $scope.is_billable ,
                    is_active   :  $scope.is_active 

                },$scope.projects[$scope.index].pk
            ).then(function(response){
                console.log(response);
            }, function(error){
                console.log("Error Editing  Project");
            });
        }; // EOF





}]);