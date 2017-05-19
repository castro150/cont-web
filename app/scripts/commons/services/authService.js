(function() {
	'use strict';

	angular.module('simpleDocfyWebApp').factory('AuthService', ['ENV', '$http', 'TokenService', AuthService]);

	function AuthService(ENV, $http, TokenService) {
		var sdServer = ENV.sdServer;

		function isLoggedIn() {
			return TokenService.isValidToken();
		}

		function register(user) {
			return $http.post(sdServer + '/register', user).success(function(data) {
				TokenService.saveToken(data.token);
			});
		}

		function logIn(user) {
			return $http.post(sdServer + '/login', user).success(function(data) {
				TokenService.saveToken(data.token);
			});
		}

		function renewAccess() {
			return $http.post(sdServer + '/token', {
				token: TokenService.getToken()
			}).success(function(data) {
				TokenService.saveToken(data.token);
			});
		}

		function logOut() {
			TokenService.removeToken();
		}

		return {
			isLoggedIn: isLoggedIn,
			register: register,
			logIn: logIn,
			renewAccess: renewAccess,
			logOut: logOut
		};
	}
})();
