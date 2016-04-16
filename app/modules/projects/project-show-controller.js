(function () {
    angular
        .module('jgefroh-website.projects')
        .controller('ProjectShowController', ['$state', 'ProjectsService', 'baseImagePath', Controller]);
    function Controller ($state, ProjectsService, baseImagePath) {
      var vm = this;
      initialize();
      function initialize() {
        vm.baseImagePath = baseImagePath;
        ProjectsService.get($state.params.id).then(function(project) {
          vm.project = project;
          if ($state.current.data) {
            $state.current.data.title = vm.project.name;
          }
        });
      }

      vm.isString = function(object) {
          return angular.isString(object);
      };
    }
})();
