    'use strict';

/**
 * Defines the service that perfroms user authentication
 */
angular.module('practicalAssignmentApp')
.service('userService',['$http', function($http) {

    var urlBaselogin = 'http://userservice.staging.tangentmicroservices.com/api-token-auth/';
    var urlBaseProject = 'http://projectservice.staging.tangentmicroservices.com/api/v1/projects/';

    var Token = '';
    var response ='hi';
    var HTTP='';
        
        /**
         * params :
         *    username, password credentials of user
         * returns token
         */ 
        this.postLogin = function(username, password) {
            var req = {
                method  : 'POST',
                url     : urlBaselogin,
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: {
                    username    : username,
                    password    : password
                }
            };

           return $http(req);


        
        };

        /**
         * Return Token 
         */ 
        this.getToken = function(){
            return Token;
        };

        this.setToken = function(value) {
            Token = value;
        };

        /**
         * Verify that user has token 
         */ 
        this.validateToken = function() {
            if(Token !== ''){
                return true;
            }else {
                return false;
            }
        };

        /**
         * return a list of all the users projects
         */
        this.getProjects = function(){
            console.log(Token);
             return $http.get(
                 urlBaseProject,
                 {headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Token '+ Token
                }}
                 );
        };

        /**
         * Adds a new Project 
         */
        this.putProject = function(project) {
            response = $http.put(urlBaseProject + '/' + project + '/');
        };
        

        /**
         * deletes a project from server 
         * param : pk of the project
         */
        this.deleteProject = function(key) {

            response = $http.delete(urlBaseProject + '/' + key + '/');
        };

        /**
         * Get a Specific project using pk
         * param : pk of the project
         */ 
        this.getProject = function(key) {

            response = $http.get(urlBaseProject + '/' + key + '/');
        };

        /**
         * Get a Specific task using pk
         * param : pk of the project
         */ 
        this.getTask = function(key) {
            response = key; // dummy 
        };

        /**
         * deletes a Specific task using pk
         * param : pk of the project
         */ 
        this.deleteTask = function(key) {
            response = key; // dummy 
        };

        /**
         * Adds a task to project
         * param : task of the project
         */
        this.putTask = function(task) {
            response = task; // dummy 
        };
}]);