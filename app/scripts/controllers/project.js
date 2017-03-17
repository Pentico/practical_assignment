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

        $scope.viewDetails = function($index) {

            userService.setPkey($scope.projects[$index].pk);
            $location.path('/itemDetails');
        };

        /**
         * Add New Project
         */
      $scope.addProject = function(){

            userService.postProject(
                {
                    title       : $scope.title,
                    description : $scope.description,
                    start_date  : $scope.start_date,
                    end_date    : $scope.end_date,
                    is_billable : $scope.is_billable,
                    is_active   : $scope.is_active

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

            userService.deleteProject($index).then(function(response){
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
        $scope.clickedOnItem = function() {
            
            $scope.projects[$index];
            $scope.index = $index
            $scope.title = $scope.projects[$index].title;
            $scope.description = $scope.projects[$index].description;
            $scope.start_date = $scope.projects[$index].start_date;
            $scope.end_date = $scope.projects[$index].end_date;
            $scope.is_billable = $scope.projects[$index].is_billable;
            $scope.is_active = $scope.projects[$index].is_active;

        }; // EOF


        /***
         * Edit a Project
         */
        $scope.editProject = function() {
            userService.editProject().then(function(response){
                console.log(response);
            }, function(error){
                console.log("Error Editing  Project");
            });
        }; // EOF

}]);