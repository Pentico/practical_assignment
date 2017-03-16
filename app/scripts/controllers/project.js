'use strict';

angular.module('practicalAssignmentApp')
    .controller('projectController',['$scope', 'userService','$location', function($scope, userService, $location){

         $scope.projects = [
            {title: "hire", description : "lasdfg" , start_date : 456, end_date : 65465}
        ]

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
        }

        getProjects();  // init

        $scope.viewDetails = function($index) {
            userService.setPkey($scope.projects[$index].pk);
            $location.path('/itemDetails');
        }

}]);