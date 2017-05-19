(function() {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name simpleDocfyWebApp
	 * @description # simpleDocfyWebApp
	 *
	 * Main module of the application.
	 */
	angular.module('simpleDocfyWebApp').config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push('httpInterceptor');
	}]).run(['$rootScope', 'AuthService', function($rootScope, AuthService) {
		$rootScope.$on('expiringToken', function() {
			AuthService.renewAccess();
		});
	}]).service('httpInterceptor', ['$rootScope', '$location', '$q', 'ENV', 'TokenService', function($rootScope, $location, $q, ENV, TokenService) {
		var httpInjector = {
			request: function(config) {
				if (TokenService.isExpiringToken() && config.url !== ENV.sdServer + '/token') {
					$rootScope.$emit('expiringToken');
				}
				config.headers.Authorization = 'Bearer ' + TokenService.getToken();
				return config;
			},
			responseError: function(rejection) {
				if (rejection.status === 401 && rejection.config.url !== ENV.sdServer + '/login') {
					$q.defer().resolve('Unauthorized');
					$location.path('/unauthorized');
				}
				return $q.reject(rejection);
			}
		};
		return httpInjector;
	}]);
})();
