(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:UnauthorizedCtrl
	 * @description # UnauthorizedCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('UnauthorizedCtrl', ['$filter', '$timeout', '$location', 'TokenService', 'AuthService', UnauthorizedCtrl]);

	function UnauthorizedCtrl($filter, $timeout, $location, TokenService, AuthService) {

		var ctrl = this;

		// ******************************
		// Init method
		// ******************************
		init();

		function init() {
			if (TokenService.getToken()) {
				ctrl.message = $filter('translate')('errors.unauthorized.expired');
				AuthService.logOut();
			} else {
				ctrl.message = $filter('translate')('errors.unauthorized.others');
			}
			$timeout(function() {
				$location.path('/login');
			}, 3000);
		}
	}
})();
