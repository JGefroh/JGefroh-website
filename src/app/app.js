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
        'com.jgefroh.website.2015.news'
    ]);
angular
    .module('com.jgefroh.website.2015')
    .constant('applicationName', 'Joseph Gefroh')
    .constant('versionNumber', 'v0.0.1')
    .constant('baseImagePath', 'resources/images/');

(function () {
    function AppController ($rootScope, baseImagePath) {
        $rootScope.baseImagePath = baseImagePath;
    }

    angular
        .module('com.jgefroh.website.2015')
        .controller('AppController', ['$rootScope', 'baseImagePath', AppController]);
})();