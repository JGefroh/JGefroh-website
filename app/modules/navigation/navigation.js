(function() {
  angular
    .module('jgefroh-website.navigation')
    .directive('navigation', Directive);
  function Directive() {
    function Controller() {
      var vm = this;
    }

    return {
      restrict: 'A',
      templateUrl: 'navigation.html',
      controller: [Controller],
      controllerAs: 'vm',
      bindToController: true
    };
  }
})();
