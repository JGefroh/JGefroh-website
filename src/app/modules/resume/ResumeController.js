(function () {
    function ResumeController ($scope, ResumeService) {
        $scope.resume = [];
        $scope.currentFilter = ResumeService.getCurrentFilter();
        initialize();
        function initialize() {
            ResumeService.getResume().then(function(resume) {
                $scope.resume = resume;
            });
        }

        $scope.setCategory = ResumeService.setCurrentFilter;

        $scope.categoryFilter = function(element) {
            if (!$scope.currentFilter.category) {
                return true;
            }
            return element.category === $scope.currentFilter.category;
        }

    }

    angular
        .module('com.jgefroh.website.2015.resume')
        .controller('ResumeController', ['$scope', 'ResumeService', ResumeController]);
})();
