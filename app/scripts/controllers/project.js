'use strict';

angular.module('practicalAssignmentApp')
    .controller('projectController',['$scope', 'userService','$location', function($scope, userService, $location){

         $scope.projects = [
            {title: "hire", description : "lasdfg" , start_date : 456, end_date : 65465}
        ]
        var getProjects = function (){
       


        userService.getProjects()
                .then(function(response) {
                    $scope.projects = response.data;
                }, function(error){
                    console.log('Error Trying to retrieve the information');
                });    
        }

        getProjects();
}]);