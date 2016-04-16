(function () {
    angular
        .module('jgefroh-website.projects')
        .controller('ProjectsController', ['$state', 'ProjectsService', Controller]);
    function Controller ($state, ProjectsService) {
      var vm = this;
      initialize();
      function initialize() {
        ProjectsService.query().then(function(projects) {
          vm.projects = projects;
        });

      }
    }
})();
