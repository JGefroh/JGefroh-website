(function () {
    function SplashController ($scope, ProjectService, BlogService, NavigationService) {
        ProjectService.getFeaturedProject().then(function(project) {
            $scope.project = project;
        });

        BlogService.getLatestBlogPost().then(function(post) {
            $scope.post = post;
        });

        $scope.showProject = function(project) {
            NavigationService.goTo('/projects/' + project.name);
        };

        $scope.showPost = function(post) {
            NavigationService.goTo('/blog/posts/' + post.url);
        };
    }

    angular
        .module('com.jgefroh.website.2015.splash', [])
        .controller('SplashController', ['$scope', 'ProjectService', 'BlogService', 'NavigationService', SplashController]);
})();
