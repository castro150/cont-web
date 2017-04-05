(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:NavCtrl
	 * @description # NavCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('NavCtrl', ['AuthService', '$location', NavCtrl]);

	function NavCtrl(AuthService, $location) {

		var ctrl = this;

		ctrl.isLoggedIn = isLoggedIn;
		ctrl.logout = logout;
		ctrl.goHome = goHome;

		function isLoggedIn() {
			return AuthService.isLoggedIn();
		}

		function logout() {
			AuthService.logOut();
			$location.path('/login');
		}

		function goHome() {
			$location.path('/');
		}
	}
})();
