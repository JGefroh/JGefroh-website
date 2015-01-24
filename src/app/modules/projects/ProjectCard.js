(function() {
    function ProjectThumbnail() {
        function ProjectThumbnailController($scope, NavigationService, baseImagePath) {
            $scope.baseImagePath = baseImagePath;
            $scope.showProject = function(project) {
                NavigationService.goTo('/projects/' + project.name);
            }
        }

        return {
            restrict: "A",
            scope: {
                project: "="
            },
            templateUrl: "ProjectCard.html",
            controller: ['$scope', 'NavigationService', 'baseImagePath', ProjectThumbnailController]
        };
    }
    angular
        .module("com.jgefroh.website.2015.projects")
        .directive("projectCard", ProjectThumbnail);
})();