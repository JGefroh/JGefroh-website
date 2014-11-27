(function() {
    function NavigationController($scope, NavigationService, applicationName) {
        $scope.applicationName = applicationName;
        $scope.goTo = NavigationService.goTo;
        $scope.isActive = NavigationService.isActive;
    }
    angular
        .module('com.jgefroh.website.2015.navigation')
        .controller('NavigationController', ['$scope', 'NavigationService', 'applicationName', NavigationController]);
})();