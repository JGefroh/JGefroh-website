(function() {
    function ProjectDetailsController($scope, $state, NavigationService, ProjectService) {
        initialize();
        function initialize() {
            var projectName = NavigationService.getParameter('name');
            $state.current.data.pageSection = projectName;
            ProjectService.getProjectWithName(projectName).then(function(project) {
                $scope.project = project;
            });
        }

        $scope.isString = function(object) {
            return angular.isString(object);
        }
    }
    angular
        .module("com.jgefroh.website.2015.projects")
        .controller("ProjectDetailsController", ['$scope', '$state', 'NavigationService', 'ProjectService', ProjectDetailsController]);
})();