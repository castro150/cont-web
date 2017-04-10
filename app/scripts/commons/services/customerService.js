(function() {
	'use strict';

	angular.module('simpleDocfyWebApp').factory('CustomerService', ['ENV', '$http', CustomerService]);

	function CustomerService(ENV, $http) {
		var customerUrl = ENV.customerService + '/customer';

		function create(customer) {
			return $http.post(customerUrl, customer);
		}

		return {
      create: create
		};
	}
})();
