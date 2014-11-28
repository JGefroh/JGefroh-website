(function () {
    function SplashController ($scope, ProjectService, NavigationService) {
        ProjectService.getFeaturedProject().then(function(project) {
            $scope.project = project;
        });

        $scope.showProject = function(project) {
            NavigationService.goTo('/projects/' + project.name);
        };
    }

    angular
        .module('com.jgefroh.website.2015.splash', [])
        .controller('SplashController', ['$scope', 'ProjectService', 'NavigationService', SplashController]);
})();
