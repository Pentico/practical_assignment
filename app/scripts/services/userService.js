

/**
 * Defines the service that perfroms user authentication
 */
angular.module('practicalAssignmentApp')
.service('userService',[function() {
    'use strict';

    var name = 'alfred';

    return {

        test : function( ){
            return name;
        }
    };
}]);