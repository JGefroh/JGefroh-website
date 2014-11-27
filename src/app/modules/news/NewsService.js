(function () {
    function NewsService($http, $q) {
        var news = [];

        this.getNews = function() {
            var deferred = $q.defer();
            if (news.length === 0) {
                $http.get('data/news.json')
                    .then(function(response) {
                        news = response.data;
                        deferred.resolve(news);
                    });
            }
            else {
                deferred.resolve(news);
            }
            return deferred.promise;
        };

        this.getRandomNewsEntry = function() {
            var deferred = $q.defer();
            this.getNews().then(function(news) {
                var randomIndex = Math.floor(Math.random() * news.length);
                deferred.resolve(news[randomIndex]);
            });
            return deferred.promise;
        }
    }

    angular
        .module('com.jgefroh.website.2015.news', [])
        .service('NewsService', ['$http', '$q', NewsService]);
})();
