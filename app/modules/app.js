(function () {
  angular
    .module('jgefroh-website',
    [
        'ui.router',
        'jgefroh-website.blog',
        'jgefroh-website.contact',
        'jgefroh-website.home',
        'jgefroh-website.navigation',
        'jgefroh-website.projects'
    ])
    .constant('baseImagePath', '/images/')
    .config(['$urlRouterProvider', '$locationProvider', function($urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/');
    }])
    .controller('ApplicationController', [ApplicationController]);

    function ApplicationController () {
    }
})();
