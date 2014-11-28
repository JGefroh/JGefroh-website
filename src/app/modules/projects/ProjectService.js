(function () {
    function ProjectService($http, $q) {
        var self = this;
        var projects = [];
        var _currentFilter = {tag: null};

        this.getProjects = function() {
            var deferred = $q.defer();
            if (projects.length === 0) {
                $http.get('data/projects.json')
                    .then(function(response) {
                        projects = response.data;
                        deferred.resolve(projects);
                    });
            }
            else {
                deferred.resolve(projects);
            }
            return deferred.promise;
        };

        this.getProjectWithName = function(name) {
            var deferred = $q.defer();
            this.getProjects().then(function(projects) {
                var match = null;
                angular.forEach(projects, function(project, index) {
                    if (!match && project.name === name) {
                        match = project;
                    }
                });
                deferred.resolve(match);
            });
            return deferred.promise;
        };

        this.getFeaturedProject = function() {
            var deferred = $q.defer();
            this.getProjects().then(function(projects) {
                var match = null;
                angular.forEach(projects, function(project, index) {
                    if (!match && project.isFeatured) {
                        match = project;
                    }
                });
                if (!match) {
                    match = self.getRandomProject();
                }
                deferred.resolve(match);
            });
            return deferred.promise;
        };

        this.getRandomProject = function() {
            var randomIndex = Math.floor((Math.random() * projects.length));
            return projects[randomIndex];
        };

        this.setCurrentFilter = function(tag) {
            _currentFilter.tag = tag;
        };

        this.getCurrentFilter = function() {
            return _currentFilter;
        };
    }

    angular
        .module('com.jgefroh.website.2015.projects')
        .service('ProjectService', ['$http', '$q', ProjectService]);
})();
