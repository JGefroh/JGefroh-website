(function () {
    function ProjectGalleryController ($scope, ProjectService) {
        $scope.projects = [];
        $scope.currentFilter = ProjectService.getCurrentFilter();
        initialize();
        function initialize() {
            ProjectService.getProjects().then(function(projects) {
                $scope.projects = projects;
            });
        }

        $scope.setTag = ProjectService.setCurrentFilter;

        /**
         * Checks to see if the tag is one of the ones in the filter.
         * @param element
         * @returns {boolean}
         */
        $scope.tagFilter = function(element) {
            if ($scope.currentFilter.tag === null) {
                return true;
            }

            var shouldShow = false;
            angular.forEach(element.tags, function(tag, index) {
                if (!shouldShow && $scope.currentFilter.tag === tag) {
                    shouldShow = true;
                }
            });
            return shouldShow;
        }
    }

    angular
        .module('com.jgefroh.website.2015.projects')
        .controller('ProjectGalleryController', ['$scope', 'ProjectService', ProjectGalleryController]);
})();
