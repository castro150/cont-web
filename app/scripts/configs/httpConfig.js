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
	}]).service('tokenInterceptor', ['TokenService', function(TokenService) {
		var tokenInjector = {
			request: function(config) {
				config.headers.Authorization = 'Bearer ' + TokenService.getToken();
				return config;
			}
		};
		return tokenInjector;
	}]);
})();
