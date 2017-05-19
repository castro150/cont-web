(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:ViewCustomersCtrl
	 * @description # ViewCustomersCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('ViewCustomersCtrl', ['$filter', '$scope', '$location', '$anchorScroll', 'CustomerService', ViewCustomersCtrl]);

	function ViewCustomersCtrl($filter, $scope, $location, $anchorScroll, CustomerService) {

		var ctrl = this;

		var PF_PL_KEY = 'customer.type.pf.pl';
		var PF_ED_KEY = 'customer.type.pf.ed';
		var PJ_SN_KEY = 'customer.type.pj.sn';
		var PJ_LP_KEY = 'customer.type.pj.lp';
		var COND_KEY = 'customer.type.cond';

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
			ctrl.customers = [];

			ctrl.model = {};
			ctrl.model.translatedTypes = [];
			ctrl.model.translatedTypes[PF_PL_KEY] = $filter('translate')('customer.type.pf.pl');
			ctrl.model.translatedTypes[PF_ED_KEY] = $filter('translate')('customer.type.pf.ed');
			ctrl.model.translatedTypes[PJ_SN_KEY] = $filter('translate')('customer.type.pj.sn');
			ctrl.model.translatedTypes[PJ_LP_KEY] = $filter('translate')('customer.type.pj.lp');
			ctrl.model.translatedTypes[COND_KEY] = $filter('translate')('customer.type.cond');

			findAllActiveCustomers();
			watchingToFilterCustomers();
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
				ctrl.customers = response.data;
				ctrl.customers.forEach(function(customer) {
					customer.cpfCnpj = customer.cpf ? $filter('cpf')(customer.cpf) : $filter('cnpj')(customer.cnpj);
					customer.translatedType = ctrl.model.translatedTypes[customer.type];
				});
				ctrl.model.customers = ctrl.customers;
			}, function(response) {
				if (response.status === -1) {
					dangerAlert($filter('translate')('errors.unavailable.service'));
				} else {
					dangerAlert($filter('translate')('errors.unexpected'));
				}
				$location.hash('alerts');
				$anchorScroll();
			});
		}

		function watchingToFilterCustomers() {
			$scope.$watch('ctrl.model.searchCustomer', function(value) {
				if (value) {
					ctrl.model.customers = $filter('filter')(ctrl.customers, function(customer) {
						return customer.name.toLowerCase().match(value.toLowerCase()) || customer.number.toString().match(value);
					});
				} else {
					ctrl.model.customers = ctrl.customers;
				}
			});
		}

	}
})();
