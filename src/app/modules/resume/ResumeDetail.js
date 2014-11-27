(function() {
    function ResumeDetail() {
        function ResumeDetailController($scope, baseImagePath) {
            $scope.baseImagePath = baseImagePath;
        }
        return {
            restrict: "A",
            scope: {
                detail: "="
            },
            templateUrl: "ResumeDetail.html",
            controller: ['$scope', 'baseImagePath', ResumeDetailController]
        };
    }
    angular
        .module("com.jgefroh.website.2015.resume")
        .directive("resumeDetail", ResumeDetail);
})();