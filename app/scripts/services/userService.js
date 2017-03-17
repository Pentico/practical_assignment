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
        this.postProject = function(project) {

            if(project.end_date == null){
                delete project.end_date;
            }else{

               var temp = project.end_date;
                project.end_date = temp.getFullYear() + '-' + (temp.getMonth()+1) + '-' + temp.getDate();
            }

             return $http({
                method: 'POST',
                url: urlBaseProject,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : 'Token '+ Token
            },
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: project
            })
        }; // EOF
        

        /**
         * deletes a project from server 
         * param : pk of the project
         */
        this.deleteProject = function(key) {

            return $http.delete(
                 urlBaseProject + key + '/',
                 {headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Token '+ Token
                }}
                 );
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


        /***
         * Update a Project 
         */
        this.editProject = function(project) {

                return $http.patch(
                urlBaseProject,
                task,
                 {headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Token '+ Token
                }
            }
            );
        }; // EOF

        /**
         * Get a Specific task using pk
         * param : pk of the project
         */ 
        this.getTask = function(key) {

            return    $http.get(
                 urlBaseTask + key + '/',
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

            return $http.delete(
                urlBaseTask + key + '/',
                 {headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Token '+ Token
                }}
            );
            response = key; // dummy 
        }; // EOF

        /**
         * Adds a task to project
         * param : task of the project
         */
        this.putTask = function(task) {
           return $http.put(
                urlBaseTask,
                task,
                 {headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Token '+ Token
                }
            }
            );
        }; // EOF

        /**
         * Update Task information
         * param json string with all fields that require updating
         */
        this.editTask = function(task){

            return $http.patch(
                urlBaseTask,
                task,
                 {headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Token '+ Token
                }
            }
            );
        }; // EOF

}]);