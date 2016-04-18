(function() {
  angular
    .module('jgefroh-website.home')
    .directive('skill', Directive);
  function Directive() {
    function Controller() {
      var vm = this;
      vm.getSubtitle = function(value) {
        if (value >= 80) {
          return 'Proficient';
        }
        else if (value >= 60) {
          return 'Experienced';
        }
        else if (value >= 40) {
          return 'Comfortable';
        }
        else if (value >= 20) {
          return 'Learning';
        }
        else {
          return 'No.';
        }
      };
    }

    return {
      restrict: 'A',
      transclude: true,
      templateUrl: 'skill.html',
      controller: [Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        skill: '@',
        value: '@'
      }
    };
  }
})();
