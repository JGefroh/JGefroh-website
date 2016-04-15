(function () {
    angular
        .module('jgefroh-website.blog')
        .controller('BlogController', ['$state', 'BlogService', Controller]);
    function Controller ($state, BlogService) {
      var vm = this;
      initialize();
      function initialize() {
        BlogService.query().then(function(posts) {
          vm.posts = posts;
        });

      }
    }
})();
