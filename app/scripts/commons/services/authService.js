(function() {
	'use strict';

	angular.module('simpleDocfyWebApp').factory('AuthService',
			[ 'ENV', '$http', '$window', AuthService ]);

	function AuthService(ENV, $http, $window) {
    var sdServer = ENV.sdServer;

    function saveToken(token) {
      $window.localStorage['application-token'] = token;
    }

    function getToken() {
      return $window.localStorage['application-token'];
    }

    function isLoggedIn() {
      var token = getToken();

      if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    }

    function currentUser() {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    }

    function register(user) {
      return $http.post('/register', user).success(function(data) {
        saveToken(data.token);
      });
    }

    function logIn(user) {
      return $http.post('/login', user).success(function(data) {
        saveToken(data.token);
      });
    }

    function logOut() {
      $window.localStorage.removeItem('application-token');
    }

		return {
			saveToken: saveToken,
      getToken: getToken,
      isLoggedIn: isLoggedIn,
      currentUser: currentUser,
      register: register,
      logIn: logIn,
      logOut: logOut
		};
	}
})();
