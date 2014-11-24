(function () {
    function ResumeController ($scope, ResumeService) {
        $scope.resume = [];
        initialize();
        function initialize() {
            ResumeService.getResume().then(function(resume) {
                $scope.resume = resume;
            });
        }
    }

    angular
        .module('com.jgefroh.website.2015.resume')
        .controller('ResumeController', ['$scope', 'ResumeService', ResumeController]);
})();
