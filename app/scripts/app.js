'use strict';

/**
 * @ngdoc overview
 * @name practicalAssignmentApp
 * @description
 * # practicalAssignmentApp
 *
 * Main module of the application.
 */
angular
  .module('practicalAssignmentApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/user.html',
        controller: 'userController',
        controllerAs: 'user'
      })
      .when('/project', {
        templateUrl: 'views/project.html',
        controller: 'projectController',
        controllerAs: 'project'
      })
      .otherwise({
        redirectTo: '/'
      });

       $locationProvider.hashPrefix('');
  });
