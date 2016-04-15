(function () {
    angular
        .module('jgefroh-website.blog')
        .controller('PostController', ['$state', 'BlogService', Controller]);
    function Controller ($state, BlogService) {
      var vm = this;
      initialize();
      function initialize() {
        vm.showingSection = $state.params.section;
        BlogService.getPost($state.params.id).then(function(post) {
          vm.post = post;

          if ($state.params.section) {
            vm.sectionUrl = '/posts/' + vm.post.url + '/' + $state.params.section;
          }
        });
      }

      vm.showSection = function(section) {
        $state.go('post', {id: vm.post.id, section: section});
      };

      vm.isShowingSection = function(section) {
        return $state.params.section === section;
      };
    }
})();
