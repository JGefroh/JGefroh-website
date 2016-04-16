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
        controllerAs: 'vm',
        data: {
          title: 'Projects'
        }
    }).state('project', {
        url: '/projects/{id: int}',
        templateUrl: 'project-show.html',
        controller: 'ProjectShowController',
        controllerAs: 'vm',
        data: {
          title: 'Project'
        }
    });
  }
})();
