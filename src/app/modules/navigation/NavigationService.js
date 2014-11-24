(function() {
    function NavigationService($location, $stateParams) {
        this.goTo = function(route) {
            $location.path(route);
        };

        this.isActive = function(route) {
            return $location.path() === route || $location.path().indexOf(route) === 0;
        };

        this.getParameter = function(parameterName) {
            return $stateParams[parameterName];
        }
    }
    angular
        .module('com.jgefroh.website.2015.navigation')
        .service('NavigationService', ['$location', '$stateParams', NavigationService]);
})();