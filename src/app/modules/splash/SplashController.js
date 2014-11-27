(function () {
    function SplashController ($scope, $interval, NewsService) {
/*
        var updateNewsEntry = function() {
            NewsService.getRandomNewsEntry().then(function(entry) {
                $scope.newsEntry = entry;
            });
        };
        updateNewsEntry();
        var newsTimer = $interval(updateNewsEntry, 7500);
        $scope.$on('$destroy', function() {
            $interval.cancel(newsTimer);
        });*/
    }

    angular
        .module('com.jgefroh.website.2015.splash', [])
        .controller('SplashController', ['$scope', '$interval', 'NewsService', SplashController]);
})();
