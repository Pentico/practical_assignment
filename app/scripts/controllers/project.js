'use strict';

angular.module('practicalAssignmentApp')
    .controller('projectController',['$scope', 'userService','$location', function($scope, userService, $location){

         $scope.projects = [];

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
         * 
         */
      $scope.addProject = function(){
            userService.postProject(
                {
                    title   : 'working',
                    description : 'The One ',
                    start_date : '1991-08-13'
                }
            ).then(function(response){
                console.log(response);
            }, function(error){
                console.log("Error Adding new Project");
            });
        }; // EOF

        $scope.deleteProject = function() {

        }; // EOF

        $scope.editProject = function() {

        }; // EOF

}]);