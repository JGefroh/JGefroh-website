(function() {
    function ProjectDetailsController($scope, NavigationService, ProjectService) {
        initialize();
        function initialize() {
            var projectName = NavigationService.getParameter('name');
            ProjectService.getProjectWithName(projectName).then(function(project) {
                $scope.project = project;
            });
        }
    }
    angular
        .module("com.jgefroh.website.2015.projects")
        .controller("ProjectDetailsController", ['$scope', 'NavigationService', 'ProjectService', ProjectDetailsController]);
})();