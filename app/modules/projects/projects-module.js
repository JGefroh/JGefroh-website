(function() {
  'use strict';
  angular
    .module('jgefroh-website.projects', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider
      .state('projects', {
        url: '/projects',
        templateUrl: 'projects.html',
        controller: 'ProjectsController',
        controllerAs: 'vm'
    });
  }
})();
