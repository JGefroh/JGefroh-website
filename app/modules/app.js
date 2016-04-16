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
    .controller('ApplicationController', ['$state', ApplicationController]);

    function ApplicationController($state) {
      var vm = this;

      vm.getPageTitle = function() {
        if (!$state.current.data) {
            return 'Joseph Gefroh';
        }
        var section = $state.current.data.section ? ' - ' + $state.current.data.section : '';
        return 'Joseph Gefroh | ' + $state.current.data.title + section;
      };
    }
})();
