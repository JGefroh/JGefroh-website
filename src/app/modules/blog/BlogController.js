(function () {
    function BlogController ($scope, $state, NavigationService, BlogService) {
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

        $scope.showSection = function(sectionName) {
            NavigationService.goTo('/blog/posts/' + getUrlParameter() + '/' + sectionName);
        };

        $scope.getPostUrl = function() {
            if (getUrlParameter() && getSectionParameter()) {
                return 'modules/blog/posts/' + getUrlParameter() + '/' + getSectionParameter();
            }
            else if (getUrlParameter()) {
                return 'modules/blog/posts/' + getUrlParameter();
            }
            return null;

        };

        $scope.getPostWithUrl = function(url) {
            BlogService.getPostWithUrl(url).then(function(post) {
                $scope.selectedPost = angular.copy(post);
                $state.current.data.pageSection = $scope.selectedPost.name;
            })
        };
        $scope.isSelected = function(post) {
            return getUrlParameter() === post.url;
        };

        function getUrlParameter() {
            return NavigationService.getParameter('url');
        }

        function getSectionParameter() {
            return NavigationService.getParameter('section');
        }
    }

    angular
        .module('com.jgefroh.website.2015.blog', [])
        .controller('BlogController', ['$scope', '$state', 'NavigationService', 'BlogService', BlogController]);
})();
