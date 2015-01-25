(function () {
    function BlogController ($scope, NavigationService, BlogService) {
        initialize();
        function initialize() {
            $scope.selectedPost = {};
            BlogService.getPosts().then(function(posts) {
                $scope.posts = posts;
                if (getUrlParameter()) {
                    $scope.getPostWithUrl(getUrlParameter());
                }
            });
        }

        $scope.showPost = function(post) {
            NavigationService.goTo('/blog/posts/' + post.url);
        };

        $scope.getPostUrl = function() {
            if (getUrlParameter()) {
                return 'modules/blog/posts/' + getUrlParameter();
            }
            else {
                return null;
            }

        };

        $scope.getPostWithUrl = function(url) {
            BlogService.getPostWithUrl(url).then(function(post) {
                $scope.selectedPost = angular.copy(post);
            })
        };
        $scope.isSelected = function(post) {
            return getUrlParameter() === post.url;
        };

        function getUrlParameter() {
            return NavigationService.getParameter('url');
        }
    }

    angular
        .module('com.jgefroh.website.2015.blog', [])
        .controller('BlogController', ['$scope', 'NavigationService', 'BlogService', BlogController]);
})();
