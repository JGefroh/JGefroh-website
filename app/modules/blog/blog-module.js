(function() {
  'use strict';
  angular
    .module('jgefroh-website.blog', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider
      .state('blog', {
        url: '/blog',
        templateUrl: 'blog.html',
        controller: 'BlogController',
        controllerAs: 'vm'
    }).state('post', {
        url: '/blog/{id: int}?section',
        templateUrl: 'post.html',
        controller: 'PostController',
        controllerAs: 'vm'
    });
  }
})();
