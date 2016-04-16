(function() {
    angular
        .module('jgefroh-website.projects')
        .service('ProjectsService', ['$http', '$q', Service]);
    function Service($http, $q) {
      var service = this;
      var posts = [];
      service.query = function() {
        var deferred = $q.defer();
        if (posts.length > 0) {
          return $q.when(posts);
        }
        return $http.get('projects.json?' + Math.floor((Math.random()*5000)+1)).then(function(response) {
          return response.data;
        });
      };

      service.get = function(id) {
        return service.query().then(function(projects) {
          var match = null;
          angular.forEach(projects, function(project) {
            if (project.id === id) {
              match = project;
            }
          });
          return $q.when(match);
        });
      };
    }
})();
