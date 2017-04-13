(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:ViewCustomersCtrl
	 * @description # ViewCustomersCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('ViewCustomersCtrl', ['CustomerService', ViewCustomersCtrl]);

	function ViewCustomersCtrl(CustomerService) {

		var ctrl = this;

		ctrl.dangerAlert = dangerAlert;
		ctrl.warningAlert = warningAlert;
		ctrl.successAlert = successAlert;
		ctrl.closeAlert = closeAlert;

		// ******************************
		// Init method
		// ******************************
		init();

		function init() {
			ctrl.model = {};

			findAllActiveCustomers();
		}

		// ******************************
		// Alert methods
		// ******************************
		function dangerAlert(message) {
			ctrl.alerts.push({
				type: 'danger',
				message: message
			});
		}

		function warningAlert(message) {
			ctrl.alerts.push({
				type: 'warning',
				message: message
			});
		}

		function successAlert(message) {
			ctrl.alerts.push({
				type: 'success',
				message: message
			});
		}

		function closeAlert(alert) {
			ctrl.alerts.splice(ctrl.alerts.indexOf(alert), 1);
		}

		// ******************************
		// Public methods
		// ******************************


		// ******************************
		// Private methods
		// ******************************
		function findAllActiveCustomers() {
			CustomerService.findAllActive().then(function(response) {
				ctrl.model.customers = response.data;
			}, function() {

			});
		}

	}
})();
