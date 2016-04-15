(function() {
  'use strict';
  angular
    .module('jgefroh-website.contact', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('contact', {
        url: '/contact',
        templateUrl: 'contact.html'
    });
  }
})();
