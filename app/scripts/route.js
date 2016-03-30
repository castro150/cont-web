(function() {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name simpleDocfyWebApp
	 * @description # simpleDocfyWebApp
	 * 
	 * Main module of the application.
	 */
	angular.module('simpleDocfyWebApp').config(
			[ '$routeProvider', function($routeProvider) {
				$routeProvider.when('/', {
					templateUrl : 'views/main.html',
					controller : 'MainCtrl',
					controllerAs : 'ctrl'
				}).when('/about', {
					templateUrl : 'views/about.html',
					controller : 'AboutCtrl',
					controllerAs : 'ctrl'
				}).when('/calendario', {
					templateUrl : 'views/calendario.html',
					controller : 'CalendarioCtrl',
					controllerAs : 'ctrl'
				}).otherwise({
					redirectTo : '/'
				});
			} ]);
})();
