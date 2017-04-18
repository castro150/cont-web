(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:CreateCustomerCtrl
	 * @description # CreateCustomerCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('CreateCustomerCtrl', ['$filter', '$location', '$anchorScroll', 'type', 'CustomerService', CreateCustomerCtrl]);

	function CreateCustomerCtrl($filter, $location, $anchorScroll, type, CustomerService) {

		var ctrl = this;

		ctrl.dangerAlert = dangerAlert;
		ctrl.warningAlert = warningAlert;
		ctrl.successAlert = successAlert;
		ctrl.closeAlert = closeAlert;

		ctrl.updateType = updateType;
		ctrl.updateContacts = updateContacts;
		ctrl.updatePartners = updatePartners;
		ctrl.createCustomer = createCustomer;

		// ******************************
		// Init method
		// ******************************
		init();

		function init() {
			ctrl.alerts = [];
			clearModel();

			ctrl.typeComboOptions = [{
					name: $filter('translate')('customer.type.pf.pl'),
					value: 'customer.type.pf.pl'
				},
				{
					name: $filter('translate')('customer.type.pf.ed'),
					value: 'customer.type.pf.ed'
				}
			];
			ctrl.accessoryObligations = {};
			ctrl.accessoryObligations.pl = ['IRPF', 'RAIS', 'DIRF', 'Livro Caixa'];
			ctrl.accessoryObligations.sn = ['DES', 'SINTEGRA', 'DESTDA', 'DEFIS', 'DIRF', 'DAPISN', 'VAFSN', 'DASN', 'RAIS'];
			ctrl.accessoryObligations.lp = ['DAPI', 'SINTEGRA', 'VAF/DAMEF', 'DES', 'DIRF', 'DIPJ', 'DCTF', 'Sped Contribuições', 'Sped Fiscal', 'RAIS', 'ECF', 'ECD', 'DIMOB', 'DIMED'];
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
		function updateType() {
			clearModel();
			ctrl.model.createProgress = 50;
		}

		function updateContacts() {
			ctrl.model.contacts = Array.from(Array(parseInt(ctrl.model.contactQuantity)).keys());
		}

		function updatePartners() {
			ctrl.model.partners = Array.from(Array(parseInt(ctrl.model.partnerQuantity)).keys());
		}

		function createCustomer() {
			var customer = ctrl.model.customer;
			customer.status = 'active';
			customer.type = type ? type : ctrl.selected.type;
			customer.startServiceDate = ctrl.model.startServiceDate.toISOString();
			if (type) {
				customer.startActivityDate = ctrl.model.startActivityDate.toISOString();
			}
			populateAccessoryObligations(customer);

			CustomerService.create(customer).then(function() {
				$location.path('/cadastro/sucesso');
			}, function(response) {
				if (response.status === 400) {
					dangerAlert($filter('translate')(response.data.name));
				} else {
					dangerAlert($filter('translate')('errors.unexpected'));
				}
				$location.hash('alerts');
				$anchorScroll();
			});
		}

		// ******************************
		// Private methods
		// ******************************
		function clearModel() {
			ctrl.model = {};
			ctrl.model.customer = {};
			ctrl.model.customer.contacts = [];
			ctrl.model.customer.partners = [];
			ctrl.model.accessoryObligations = [];
			ctrl.model.startServiceDate = new Date();
			ctrl.model.startActivityDate = new Date();
			ctrl.model.createProgress = 0;
			ctrl.model.contacts = [];
			ctrl.model.partners = [];
			ctrl.model.page = 1;
		}

		function populateAccessoryObligations(customer) {
			customer.accessoryObligations = ctrl.model.accessoryObligations.filter(function(ao) {
				return ao.name && ao.name !== 'unchecked';
			});
			customer.accessoryObligations.forEach(function(ao) {
				var now = new Date();
				ao.activationDate = now.toISOString();
			});
		}

	}
})();
