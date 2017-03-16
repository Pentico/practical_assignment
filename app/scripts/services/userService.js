    'use strict';

/**
 * Defines the service that perfroms user authentication
 */
angular.module('practicalAssignmentApp')
.service('userService',['$http', function($http) {

    var urlBaselogin = 'http://userservice.staging.tangentmicroservices.com/api-token-auth/';
    var urlBaseProject = 'http://projectservice.staging.tangentmicroservices.com/api/v1/projects/';
    var urlBaseTask = 'http://projectservice.staging.tangentmicroservices.com/api/v1/task/';

    /**
     * This var are used in sharing information between controllers
     */
    var Token = '';
    var Pkey = '';
        
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
        }; // EOF

        this.setToken = function(value) {
            Token = value;
        };// EOF

        this.setPkey = function(value){
            Pkey = value;
        };

        this.getPkey = function() {
            return Pkey;
        };// EOF

        /**
         * Verify that user has token 
         */ 
        this.validateToken = function() {
            if(Token !== ''){
                return true;
            }else {
                return false;
            }
        }; // EOF

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
        }; // EOF

        /**
         * Adds a new Project 
         */
        this.putProject = function(project) {
            response = $http.put(urlBaseProject + '/' + project + '/');
        }; // EOF
        

        /**
         * deletes a project from server 
         * param : pk of the project
         */
        this.deleteProject = function(key) {

            response = $http.delete(urlBaseProject + '/' + key + '/');
        }; // EOF

        /**
         * Get a Specific project using pk
         * param : pk of the project
         */ 
        this.getProject = function(key) {

         return    $http.get(
                 urlBaseProject + key + '/',
                 {headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Token '+ Token
                }}
                 );
        }; // EOF

        /**
         * Get a Specific task using pk
         * param : pk of the project
         */ 
        this.getTask = function(key) {

            return    $http.get(
                 urlBaseProject + key + '/',
                 {headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Token '+ Token
                }}
                 );
        }; // EOF

        /**
         * deletes a Specific task using pk
         * param : pk of the project
         */ 
        this.deleteTask = function(key) {
            response = key; // dummy 
        }; // EOF

        /**
         * Adds a task to project
         * param : task of the project
         */
        this.putTask = function(task) {
            response = task; // dummy 
        }; // EOF
}]);