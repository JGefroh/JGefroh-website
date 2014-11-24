(function () {
    function ProjectGalleryController ($scope, ProjectService) {
        $scope.projects = [];
        initialize();
        function initialize() {
            ProjectService.getProjects().then(function(projects) {
                $scope.projects = projects;
            });
        }
    }

    angular
        .module('com.jgefroh.website.2015.projects')
        .controller('ProjectGalleryController', ['$scope', 'ProjectService', ProjectGalleryController]);
})();
