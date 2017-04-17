(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:ViewCustomerCtrl
	 * @description # ViewCustomerCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('ViewCustomerCtrl', ['$stateParams', '$filter', 'CustomerService', ViewCustomerCtrl]);

	function ViewCustomerCtrl($stateParams, $filter, CustomerService) {

		var ctrl = this;

		var PJ_SN_KEY = 'customer.type.pj.sn';
		var PJ_LP_KEY = 'customer.type.pj.lp';

		ctrl.dangerAlert = dangerAlert;
		ctrl.warningAlert = warningAlert;
		ctrl.successAlert = successAlert;
		ctrl.closeAlert = closeAlert;

		// ******************************
		// Init method
		// ******************************
		init();

		function init() {
			ctrl.alerts = [];
			ctrl.customer = {};
			ctrl.model = {};
			ctrl.model.isEditMode = false;

			findCustomer();
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
		function findCustomer() {
			CustomerService.findById($stateParams.id).then(function(response) {
				ctrl.customer = response.data;
				ctrl.model.customer = ctrl.customer;
				updateModel();
			}, function(response) {
				if (response.status === -1) {
					dangerAlert($filter('translate')('errors.unavailable.service'));
				} else {
					dangerAlert($filter('translate')('errors.unexpected'));
				}
			});
		}

		function updateModel() {
			ctrl.model.startServiceDate = new Date(ctrl.model.customer.startServiceDate);
			if (customerIsPj()) {
				ctrl.model.startActivityDate = new Date(ctrl.model.customer.startActivityDate);
			}
		}

		function customerIsPj() {
			return ctrl.model.customer.type === PJ_SN_KEY || ctrl.model.customer.type === PJ_LP_KEY;
		}

	}
})();
