(function () {
    function ResumeService($http, $q) {
        var resume = [];
        var _currentFilter = {category: null};

        this.getResume = function() {
            var deferred = $q.defer();
            if (resume.length === 0) {
                $http.get('data/resume.json')
                    .then(function(response) {
                        resume = response.data;
                        deferred.resolve(resume);
                    });
            }
            else {
                deferred.resolve(resume);
            }
            return deferred.promise;
        };

        this.setCurrentFilter = function(category) {
            _currentFilter.category = category;
        };

        this.getCurrentFilter = function() {
            return _currentFilter;
        };
    }

    angular
        .module('com.jgefroh.website.2015.resume')
        .service('ResumeService', ['$http', '$q', ResumeService]);
})();
