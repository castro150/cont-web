(function() {
	'use strict';

	angular.module('simpleDocfyWebApp').factory('CustomerService', ['ENV', '$http', CustomerService]);

	function CustomerService(ENV, $http) {
		var customerUrl = ENV.customerService + '/customer';

		function create(customer) {
			return $http.post(customerUrl, customer);
		}

		function findAllActive() {
			return $http.get(customerUrl + '/active');
		}

		return {
			create: create,
			findAllActive: findAllActive
		};
	}
})();
