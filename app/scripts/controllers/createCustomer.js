(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:CreateCustomerCtrl
	 * @description # CreateCustomerCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('CreateCustomerCtrl', ['$filter', 'type', CreateCustomerCtrl]);

	function CreateCustomerCtrl($filter, type) {

		var ctrl = this;

		ctrl.dangerAlert = dangerAlert;
		ctrl.warningAlert = warningAlert;
		ctrl.successAlert = successAlert;
		ctrl.closeAlert = closeAlert;

		ctrl.createCustomer = createCustomer;

		// ******************************
		// Init method
		// ******************************
		init();

		function init() {
			ctrl.model = {};
			ctrl.model.customer = {};
			ctrl.model.customer.contacts = [];
			ctrl.model.createProgress = 0;
			ctrl.model.page = 1;

			ctrl.typeComboOptions = [
				$filter('translate')('create.customer.pf.type.pl'),
				$filter('translate')('create.customer.pf.type.ed')
			];
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
		function createCustomer() {
			var customer = ctrl.model.customer;
			customer.status = 'active';
			customer.type = type ? type : ctrl.model.type;

			console.log(customer);
		}

		// ******************************
		// Private methods
		// ******************************

	}
})();
