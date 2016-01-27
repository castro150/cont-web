(function() {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name contWebApp
	 * @description # contWebApp
	 * 
	 * Main module of the application.
	 */
	angular.module('contWebApp',
			[ 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize' ]).config(
			[ '$routeProvider', function($routeProvider) {
				$routeProvider.when('/', {
					templateUrl : 'views/main.html',
					controller : 'MainCtrl',
					controllerAs : 'main'
				}).when('/about', {
					templateUrl : 'views/about.html',
					controller : 'AboutCtrl',
					controllerAs : 'about'
				}).when('/calendario', {
					templateUrl : 'views/calendario.html',
					controller : 'CalendarioCtrl',
					controllerAs : 'calendario'
				}).otherwise({
					redirectTo : '/'
				});
			} ]);
})();
