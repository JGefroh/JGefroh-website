(function() {
    function Routes($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                redirectTo: 'splash',
                data: {
                    pageTitle: 'Home'
                }
            })
            .state('splash', {
                url: '/splash',
                templateUrl: 'modules/splash/SplashView.html',
                controller: 'SplashController',
                data: {
                    pageTitle: 'Home'
                }
            })
            .state('resume', {
                url: '/resume',
                templateUrl: 'modules/resume/ResumeView.html',
                controller: 'ResumeController',
                data: {
                    pageTitle: 'Resume'
                }
            })
            .state('projects', {
                url: '/projects',
                templateUrl: 'modules/projects/ProjectGalleryView.html',
                controller: 'ProjectGalleryController',
                data: {
                    pageTitle: 'Projects'
                }
            })
            .state('project_details', {
                url: '/projects/:name',
                templateUrl: 'modules/projects/ProjectDetailsView.html',
                controller: 'ProjectDetailsController',
                data: {
                   pageTitle: 'Projects'
                }
            })
            .state('blog', {
                url: '/blog',
                templateUrl: 'modules/blog/BlogView.html',
                controller: 'BlogController',
                data: {
                    pageTitle: 'Blog'
                }
            })
            .state('blog_post', {
                url: '/blog/posts/:url',
                templateUrl: 'modules/blog/BlogView.html',
                controller: 'BlogController',
                data: {
                    pageTitle: 'Blog'
                }
            })
            .state('blog_post_section', {
                url: '/blog/posts/:url/:section',
                templateUrl: 'modules/blog/BlogView.html',
                controller: 'BlogController',
                data: {
                    pageTitle: 'Blog'
                }
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'modules/contact/ContactView.html',
                data: {
                    pageTitle: 'Contact'
                }
            });

        $urlRouterProvider.otherwise('/splash');
    }
    angular
        .module('com.jgefroh.website.2015')
        .config(['$stateProvider', '$urlRouterProvider', Routes]);
})();