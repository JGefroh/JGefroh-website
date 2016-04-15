(function() {
  'use strict';
  angular
    .module('jgefroh-website.home', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'home.html'
    });
  }
})();
