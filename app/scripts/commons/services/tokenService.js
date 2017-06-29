(function() {
	'use strict';

	angular.module('simpleDocfyWebApp').factory('TokenService', ['$window', TokenService]);

	function TokenService($window) {

		function saveToken(token) {
			$window.localStorage['application-token'] = token;
		}

		function getToken() {
			return $window.localStorage['application-token'];
		}

		function isValidToken() {
			var token = getToken();

			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		}

		function isExpiringToken() {
			var token = getToken();

			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				var reference = new Date(payload.exp * 1000);
				reference.setMinutes(reference.getMinutes() - 10);

				return payload.exp > Date.now() / 1000 && Date.now() > reference.getTime();
			} else {
				return false;
			}
		}

		function currentUser() {
			if (isValidToken()) {
				var token = getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.username;
			}
		}

		function removeToken() {
			$window.localStorage.removeItem('application-token');
		}

		return {
			saveToken: saveToken,
			getToken: getToken,
			isValidToken: isValidToken,
			isExpiringToken: isExpiringToken,
			currentUser: currentUser,
			removeToken: removeToken
		};
	}
})();
