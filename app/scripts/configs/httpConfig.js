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
		$httpProvider.interceptors.push('tokenInterceptor');
	}]).run(['$rootScope', 'AuthService', function($rootScope, AuthService) {
		$rootScope.$on('expiringToken', function() {
			AuthService.renewAccess();
		});
	}]).service('tokenInterceptor', ['$rootScope', 'ENV', 'TokenService', function($rootScope, ENV, TokenService) {
		var tokenInjector = {
			request: function(config) {
				if (TokenService.isExpiringToken() && config.url !== ENV.sdServer + '/token') {
					$rootScope.$emit('expiringToken');
				}
				config.headers.Authorization = 'Bearer ' + TokenService.getToken();
				return config;
			}
			// TODO redirect de token expirado
		};
		return tokenInjector;
	}]);
})();
