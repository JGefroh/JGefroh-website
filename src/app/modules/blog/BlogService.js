(function() {
    function BlogService($http, $q) {
        var posts = [];

        this.getPosts = function() {
            var deferred = $q.defer();
            if (posts.length === 0) {
                $http.get('modules/blog/posts.json?' + Math.floor((Math.random()*5000)+1)).then(function(response) {
                        posts = response.data;
                        deferred.resolve(posts);
                    });
            }
            else {
                deferred.resolve(posts);
            }
            return deferred.promise;
        };


        this.getPostWithUrl = function(url) {
            var deferred = $q.defer();
            var match = null;
            angular.forEach(posts, function(post, index){
                if (post.url === url) {
                    match = post;
                }
            });
            deferred.resolve(match);
            return deferred.promise;
        }
    }
    angular
        .module('com.jgefroh.website.2015.blog')
        .service('BlogService', ['$http', '$q', BlogService]);
})();