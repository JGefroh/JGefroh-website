(function() {
  angular
    .module('jgefroh-website.projects')
    .directive('projectListing', Directive);
  function Directive() {
    function Controller(baseImagePath) {
      var vm = this;
      vm.baseImagePath = baseImagePath;
    }

    return {
      restrict: 'A',
      templateUrl: 'project-listing.html',
      controller: ['baseImagePath', Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        project: '='
      }
    };
  }
})();
