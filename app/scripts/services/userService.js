    'use strict';

/**
 * Defines the service that perfroms user authentication
 */
angular.module('practicalAssignmentApp')
.service('userService',['$http', function($http) {

    var urlBase_login = 'http://userservice.staging.tangentmicroservices.com/api-token-auth/';
    var urlBaseProject = 'http://projectservice.staging.tangentmicroservices.com/api/v1/projects/';

    var Token = '';
    var username = '';
    var password = '';
    var response ='';

    return {
        
        /**
         * params :
         *    username, password credentials of user
         * returns token
         */ 
        postLogin : function(username, password) {

           response =  $http.post(urlBase_login);
        
        },

        /**
         * Return Token 
         */ 
        getToken : function(){
            return Token;
        },

        /**
         * Verify that user has token 
         */ 
        validateToken : function() {
            if(Token != ''){
                return true;
            }else {
                return false;
            }
        },

        /**
         * return a list of all the users projects
         */
        getProjects : function(){
            return $http.get(urlBaseProject);
        },

        /**
         * Adds a new Project 
         */
        putProject : function(project) {
            response = $http.put(urlBaseProject + '/' + project + '/');
        },
        

        /**
         * deletes a project from server 
         * param : pk of the project
         */
        deleteProject : function(key) {

            response = $http.delete(urlBaseProject + '/' + key + '/')
        },

        /**
         * Get a Specific project using pk
         * param : pk of the project
         */ 
        getProject : function(key) {

            response = $http.get(urlBaseProject + '/' + key + '/')
        },

        /**
         * Get a Specific task using pk
         * param : pk of the project
         */ 
        getTask : function(key) {

        },

        /**
         * deletes a Specific task using pk
         * param : pk of the project
         */ 
        deleteTask : function(key) {

        },

        /**
         * Adds a task to project
         * param : task of the project
         */
        putTask : function(task) {

        }
    };
}]);