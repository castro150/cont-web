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
			[ '$stateProvider', function($stateProvider) {
				$stateProvider.state('main', {
					url: '/',
					templateUrl: 'views/main.html',
					controller: 'MainCtrl',
					controllerAs: 'ctrl'/*,
					data: {
			      authorizedRoles: ['teste1', 'teste2']
			    }*/
				}).state('about', {
					url: '/about',
					templateUrl: 'views/about.html',
					controller: 'AboutCtrl',
					controllerAs: 'ctrl'
				}).state('calendario', {
					url: '/calendario',
					templateUrl: 'views/calendario.html',
					controller: 'CalendarioCtrl',
					controllerAs: 'ctrl'
				}).state('guias', {
					url: '/guias',
					templateUrl: 'views/payments.html',
					controller: 'PaymentsCtrl',
					controllerAs: 'ctrl'
				});
			}]);
})();
