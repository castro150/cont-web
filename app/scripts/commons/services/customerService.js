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

		function findById(id) {
			return $http.get(customerUrl + '/' + id);
		}

		function update(id, customer) {
			return $http.put(customerUrl + '/' + id, customer);
		}

		return {
			create: create,
			findAllActive: findAllActive,
			findById: findById,
			update: update
		};
	}
})();
