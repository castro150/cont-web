(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:ViewCustomersCtrl
	 * @description # ViewCustomersCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('ViewCustomersCtrl', ['$filter', 'CustomerService', ViewCustomersCtrl]);

	function ViewCustomersCtrl($filter, CustomerService) {

		var ctrl = this;

		var PF_PL_KEY = 'customer.type.pf.pl';
		var PF_ED_KEY = 'customer.type.pf.ed';
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
			ctrl.model = {};
			ctrl.model.translatedTypes = [];
			ctrl.model.translatedTypes[PF_PL_KEY] = $filter('translate')('customer.type.pf.pl');
			ctrl.model.translatedTypes[PF_ED_KEY] = $filter('translate')('customer.type.pf.ed');
			ctrl.model.translatedTypes[PJ_SN_KEY] = $filter('translate')('customer.type.pj.sn');
			ctrl.model.translatedTypes[PJ_LP_KEY] = $filter('translate')('customer.type.pj.lp');

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
