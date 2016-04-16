(function () {
  var analyticsProvider = '{!analytics_provider!}';

  angular
    .module('jgefroh-website',
    [
        'angularytics',
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
    .config(['AngularyticsProvider', function(AngularyticsProvider) {
       AngularyticsProvider.setEventHandlers(['GoogleUniversal']);
     }]).run(['Angularytics', function(Angularytics) {
       Angularytics.init();
     }])
    .controller('ApplicationController', ['$rootScope', '$state', '$anchorScroll', 'Angularytics', ApplicationController]);

    function ApplicationController($rootScope, $state, $anchorScroll, Angularytics) {
      var vm = this;

      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $anchorScroll(0, 0);
        analytics(toState, toParams, fromState, fromParams);
      });

      vm.getPageTitle = function() {
        if (!$state.current.data) {
            return 'Joseph Gefroh';
        }
        var section = $state.current.data.section ? ' - ' + $state.current.data.section : '';
        return 'Joseph Gefroh | ' + $state.current.data.title + section;
      };

      function analytics(toState, toParams, fromState, fromParams) {

        Angularytics.trackEvent('page', toState.name, angular.toJson(toParams.toString));
      }
    }
})();
