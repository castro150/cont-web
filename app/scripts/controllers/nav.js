(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:NavCtrl
	 * @description # NavCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('NavCtrl', ['AuthService', '$state', NavCtrl]);

	function NavCtrl(AuthService, $state) {

		var ctrl = this;

		ctrl.isLoggedIn = isLoggedIn;
		ctrl.logout = logout;

		function isLoggedIn() {
			return AuthService.isLoggedIn();
		}

		function logout() {
			AuthService.logOut();
			$state.go('login');
		}
	}
})();
