(function() {
    angular
        .module('jgefroh-website.blog')
        .service('BlogService', ['$http', '$q', Service]);
    function Service($http, $q) {
      var service = this;
      var posts = [];
      service.query = function() {
        var deferred = $q.defer();
        if (posts.length > 0) {
          return $q.when(posts);
        }
        return $http.get('posts.json?' + Math.floor((Math.random()*5000)+1)).then(function(response) {
          return response.data;
        });
      };

      service.getPost = function(id) {
        return service.query().then(function(blogPosts) {
          var match = null;
          angular.forEach(blogPosts, function(post) {
            if (post.id === id) {
              match = post;
            }
          });
          return $q.when(match);
        });
      };
    }
})();
