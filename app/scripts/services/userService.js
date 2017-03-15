    'use strict';

/**
 * Defines the service that perfroms user authentication
 */
angular.module('practicalAssignmentApp')
.service('userService',['$http', function($http) {

    var urlBase_user = '';
    var Token = '';
    var username = '';
    var password = '';

    return {

        getToken : function(){
            return Token;
        },

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

        },

        /**
         * Adds a new Project 
         */
        putProject : function(project) {

        },
        

        /**
         * deletes a project from server 
         * param : pk of the project
         */
        deleteProject : function(key) {

        },

        /**
         * Get a Specific project using pk
         * param : pk of the project
         */ 
        getProject : function(key) {

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