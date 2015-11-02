/**
 * Defines and configures all modules.
 */
angular
    .module('com.jgefroh.website.2015',
    [
        'ngResource',
        'ui.bootstrap',
        'ui.router',
        'com.jgefroh.website.2015.splash',
        'com.jgefroh.website.2015.projects',
        'com.jgefroh.website.2015.resume',
        'com.jgefroh.website.2015.navigation',
        'com.jgefroh.website.2015.news',
        'com.jgefroh.website.2015.blog'
    ]);
angular
    .module('com.jgefroh.website.2015')
    .constant('applicationName', 'Joseph Gefroh')
    .constant('versionNumber', 'v0.0.1')
    .constant('baseImagePath', 'resources/images/');

(function () {
    function AppController ($window, $rootScope, $state, $scope, baseImagePath) {
        $rootScope.baseImagePath = baseImagePath;

        $scope.getPageTitle = function() {
            if (!$state.current.data) {
                return null;
            }
            var pageSection = $state.current.data.pageSection ? ' - ' + $state.current.data.pageSection : '';
            return $state.current.data.pageTitle + pageSection;
        };

        $rootScope.$on('$stateChangeSuccess', function() {
          $window.scrollTo(0,0);
        });
    }

    angular
        .module('com.jgefroh.website.2015')
        .controller('AppController', ['$window', '$rootScope', '$state', '$scope', 'baseImagePath', AppController]);
})();
