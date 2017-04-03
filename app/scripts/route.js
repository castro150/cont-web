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
			[ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
				$urlRouterProvider.otherwise('login');

				$stateProvider.state('main', {
					url: '/',
					templateUrl: 'views/main.html',
					controller: 'MainCtrl',
					controllerAs: 'ctrl',
					onEnter: ['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
						$rootScope.isLoginState = false;
						if (!AuthService.isLoggedIn()) {
		          $location.path('/login');
		        }
		      }]/*,
					data: {
			      authorizedRoles: ['teste1', 'teste2']
			    }*/
				}).state('login', {
					url: '/login',
					templateUrl: 'views/login.html',
					controller: 'LoginCtrl',
					controllerAs: 'ctrl',
					onEnter: ['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService) {
						$rootScope.isLoginState = true;
						if (AuthService.isLoggedIn()) {
		          $state.go('main');
		        }
		      }]
				}).state('about', {
					url: '/about',
					templateUrl: 'views/about.html',
					controller: 'AboutCtrl',
					controllerAs: 'ctrl',
					onEnter: ['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
						$rootScope.isLoginState = false;
						if (!AuthService.isLoggedIn()) {
		          $location.path('/login');
		        }
		      }]
				}).state('calendario', {
					url: '/calendario',
					templateUrl: 'views/calendario.html',
					controller: 'CalendarioCtrl',
					controllerAs: 'ctrl',
					onEnter: ['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
						$rootScope.isLoginState = false;
						if (!AuthService.isLoggedIn()) {
		          $location.path('/login');
		        }
		      }]
				}).state('guias', {
					url: '/guias',
					templateUrl: 'views/payments.html',
					controller: 'PaymentsCtrl',
					controllerAs: 'ctrl',
					onEnter: ['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
						$rootScope.isLoginState = false;
						if (!AuthService.isLoggedIn()) {
		          $location.path('/login');
		        }
		      }]
				});
			}]);
})();
