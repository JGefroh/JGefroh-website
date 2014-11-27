(function() {
    function Routes($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                redirectTo: 'splash'
            })
            .state('splash', {
                url: '/splash',
                templateUrl: 'modules/splash/SplashView.html',
                controller: 'SplashController'
            })
            .state('resume', {
                url: '/resume',
                templateUrl: 'modules/resume/ResumeView.html',
                controller: 'ResumeController'
            })
            .state('projects', {
                url: '/projects',
                templateUrl: 'modules/projects/ProjectGalleryView.html',
                controller: 'ProjectGalleryController'
            })
            .state('project_details', {
                url: '/projects/:name',
                templateUrl: 'modules/projects/ProjectDetailsView.html',
                controller: 'ProjectDetailsController'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'modules/contact/ContactView.html'
            });

        $urlRouterProvider.otherwise('/splash');
    }
    angular
        .module('com.jgefroh.website.2015')
        .config(['$stateProvider', '$urlRouterProvider', Routes]);
})();