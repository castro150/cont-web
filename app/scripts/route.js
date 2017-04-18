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
		['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
				}]
				/*,
									data: {
							      authorizedRoles: ['teste1', 'teste2']
							    }*/
			}).state('login', {
				url: '/login',
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'ctrl',
				onEnter: ['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
					$rootScope.isLoginState = true;
					if (AuthService.isLoggedIn()) {
						$location.path('/');
					}
				}]
			}).state('unauthorized', {
				url: '/unauthorized',
				templateUrl: 'views/unauthorized.html',
				controller: 'UnauthorizedCtrl',
				controllerAs: 'ctrl',
				onEnter: ['$rootScope', function($rootScope) {
					$rootScope.isLoginState = true;
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
			}).state('cadastro-pf', {
				url: '/cadastro/pf',
				templateUrl: 'views/customer/create/createPf.html',
				controller: 'CreateCustomerCtrl',
				controllerAs: 'ctrl',
				onEnter: ['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
					$rootScope.isLoginState = false;
					if (!AuthService.isLoggedIn()) {
						$location.path('/login');
					}
				}],
				resolve: {
					type: function() {
						return null;
					}
				}
			}).state('cadastro-sn', {
				url: '/cadastro/sn',
				templateUrl: 'views/customer/create/createSn.html',
				controller: 'CreateCustomerCtrl',
				controllerAs: 'ctrl',
				onEnter: ['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
					$rootScope.isLoginState = false;
					if (!AuthService.isLoggedIn()) {
						$location.path('/login');
					}
				}],
				resolve: {
					type: function() {
						return 'customer.type.pj.sn';
					}
				}
			}).state('cadastro-lp', {
				url: '/cadastro/lp',
				templateUrl: 'views/customer/create/createLp.html',
				controller: 'CreateCustomerCtrl',
				controllerAs: 'ctrl',
				onEnter: ['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
					$rootScope.isLoginState = false;
					if (!AuthService.isLoggedIn()) {
						$location.path('/login');
					}
				}],
				resolve: {
					type: function() {
						return 'customer.type.pj.lp';
					}
				}
			}).state('cadastro-sucesso', {
				url: '/cadastro/sucesso',
				templateUrl: 'views/customer/create/success.html',
				onEnter: ['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
					$rootScope.isLoginState = false;
					if (!AuthService.isLoggedIn()) {
						$location.path('/login');
					}
				}]
			}).state('customers', {
				url: '/clientes',
				templateUrl: 'views/customer/view/viewCustomers.html',
				controller: 'ViewCustomersCtrl',
				controllerAs: 'ctrl',
				onEnter: ['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
					$rootScope.isLoginState = false;
					if (!AuthService.isLoggedIn()) {
						$location.path('/login');
					}
				}]
			}).state('customer', {
				url: '/clientes/:id',
				templateUrl: 'views/customer/view/viewCustomer.html',
				controller: 'ViewCustomerCtrl',
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
