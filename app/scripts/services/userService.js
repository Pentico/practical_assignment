    'use strict';

/**
 * Defines the service that perfroms user authentication
 */
angular.module('practicalAssignmentApp')
.service('userService',['$http', function($http) {

    var urlBaselogin = 'http://userservice.staging.tangentmicroservices.com/api-token-auth/';
    var urlBaseProject = 'http://projectservice.staging.tangentmicroservices.com/api/v1/projects/';

    var Token = '';
    var response ='';
    var HTTP='';

    return {
        
        /**
         * params :
         *    username, password credentials of user
         * returns token
         */ 
        postLogin : function(username, password) {

            var req = {
                method  : 'post',
                url     : urlBaselogin,
                headers: {
                    'Content-Type': 'application/json'
                },

                data: {
                    username    : username,
                    password    : password
                }
            };

           response =  $http.post(req);

           if(response.token) {
                HTTP = $http;
                HTTP.defaults.headers.common.Authorization = 'token ' + response.token;
           }else {
               throw new Error('Token was not returned');
           }
        
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
            if(Token !== ''){
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

            response = $http.delete(urlBaseProject + '/' + key + '/');
        },

        /**
         * Get a Specific project using pk
         * param : pk of the project
         */ 
        getProject : function(key) {

            response = $http.get(urlBaseProject + '/' + key + '/');
        },

        /**
         * Get a Specific task using pk
         * param : pk of the project
         */ 
        getTask : function(key) {
            response = key; // dummy 
        },

        /**
         * deletes a Specific task using pk
         * param : pk of the project
         */ 
        deleteTask : function(key) {
            response = key; // dummy 
        },

        /**
         * Adds a task to project
         * param : task of the project
         */
        putTask : function(task) {
            response = task; // dummy 
        }
    };
}]);