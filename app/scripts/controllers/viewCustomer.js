(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:ViewCustomerCtrl
	 * @description # ViewCustomerCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('ViewCustomerCtrl', ['$stateParams', '$filter', '$location', '$anchorScroll', 'CustomerService', ViewCustomerCtrl]);

	function ViewCustomerCtrl($stateParams, $filter, $location, $anchorScroll, CustomerService) {

		var ctrl = this;

		var PF_PL_KEY = 'customer.type.pf.pl';
		var PJ_SN_KEY = 'customer.type.pj.sn';
		var PJ_LP_KEY = 'customer.type.pj.lp';

		ctrl.dangerAlert = dangerAlert;
		ctrl.warningAlert = warningAlert;
		ctrl.successAlert = successAlert;
		ctrl.closeAlert = closeAlert;

		ctrl.edit = edit;
		ctrl.isSn = isSn;
		ctrl.isLp = isLp;
		ctrl.updateContacts = updateContacts;
		ctrl.updatePartners = updatePartners;
		ctrl.removeContactByIndex = removeContactByIndex;
		ctrl.removePartnerByIndex = removePartnerByIndex;
		ctrl.updateCustomer = updateCustomer;
		ctrl.cancel = cancel;

		// ******************************
		// Init method
		// ******************************
		init();

		function init() {
			ctrl.alerts = [];
			ctrl.customer = {};
			ctrl.model = {};
			ctrl.model.customer = {};
			ctrl.model.isEditMode = false;
			ctrl.model.contacts = [];
			ctrl.model.partners = [];
			ctrl.model.accessoryObligations = [];

			initializeScreenOptions();
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
		function edit() {
			ctrl.model.isEditMode = true;
			$location.hash('alerts');
			$anchorScroll();
		}

		function isSn() {
			return ctrl.model.customer.type === PJ_SN_KEY;
		}

		function isLp() {
			return ctrl.model.customer.type === PJ_LP_KEY;
		}

		function updateContacts() {
			ctrl.model.contacts = Array.from(Array(parseInt(ctrl.model.contactQuantity)).keys());
		}

		function updatePartners() {
			ctrl.model.partners = Array.from(Array(parseInt(ctrl.model.partnerQuantity)).keys());
		}

		function removeContactByIndex(index) {
			ctrl.model.customer.contacts.splice(index, 1);
			ctrl.model.contactQuantity--;
			updateContacts();
		}

		function removePartnerByIndex(index) {
			ctrl.model.customer.partners.splice(index, 1);
			ctrl.model.partnerQuantity--;
			updatePartners();
		}

		function updateCustomer() {
			ctrl.model.customer.startServiceDate = ctrl.model.startServiceDate.toISOString();
			if (customerIsPj()) {
				ctrl.model.customer.startActivityDate = ctrl.model.startActivityDate.toISOString();
			}
			populateAccessoryObligations(ctrl.model.customer);

			CustomerService.update(ctrl.model.customer._id, ctrl.model.customer).then(function() {
				ctrl.model.isEditMode = false;
				successAlert($filter('translate')('customer.view.update.success'));
				$location.hash('alerts');
				$anchorScroll();
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

		function cancel() {
			init();
		}

		// ******************************
		// Private methods
		// ******************************
		function initializeScreenOptions() {
			ctrl.typeComboOptions = [];
			ctrl.statusComboOptions = [{
				name: $filter('translate')('customer.view.status.active'),
				value: 'active'
			}, {
				name: $filter('translate')('customer.view.status.inactive'),
				value: 'inactive'
			}, {
				name: $filter('translate')('customer.view.status.paralyzed'),
				value: 'paralyzed'
			}, {
				name: $filter('translate')('customer.view.status.closing'),
				value: 'closing'
			}];
			ctrl.accessoryObligations = {};
			ctrl.accessoryObligations[PF_PL_KEY] = ['IRPF', 'RAIS', 'DIRF', 'Livro Caixa'];
			ctrl.accessoryObligations[PJ_SN_KEY] = ['DES', 'SINTEGRA', 'DESTDA', 'DEFIS', 'DIRF', 'DAPISN', 'VAFSN', 'DASN', 'RAIS'];
			ctrl.accessoryObligations[PJ_LP_KEY] = ['DAPI', 'SINTEGRA', 'VAF/DAMEF', 'DES', 'DIRF', 'DIPJ', 'DCTF', 'Sped Contribuições', 'Sped Fiscal', 'RAIS', 'ECF', 'ECD', 'DIMOB', 'DIMED'];
		}

		function findCustomer() {
			CustomerService.findById($stateParams.id).then(function(response) {
				ctrl.customer = response.data;
				ctrl.model.customer = ctrl.customer;
				updateModel();
				populateTypeCombo();
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

		function updateModel() {
			ctrl.model.startServiceDate = new Date(ctrl.model.customer.startServiceDate);
			if (customerIsPj()) {
				ctrl.model.startActivityDate = new Date(ctrl.model.customer.startActivityDate);
			}
			ctrl.model.contactQuantity = ctrl.model.customer.contacts.length;
			ctrl.model.partnerQuantity = ctrl.model.customer.partners.length;
			updateContacts();
			updatePartners();
			updateAccessoryObligations();
		}

		function populateTypeCombo() {
			if (customerIsPj()) {
				ctrl.typeComboOptions = [{
						name: $filter('translate')('customer.type.pj.lp'),
						value: 'customer.type.pj.lp'
					},
					{
						name: $filter('translate')('customer.type.pj.sn'),
						value: 'customer.type.pj.sn'
					}
				];
			} else {
				ctrl.typeComboOptions = [{
						name: $filter('translate')('customer.type.pf.pl'),
						value: 'customer.type.pf.pl'
					},
					{
						name: $filter('translate')('customer.type.pf.ed'),
						value: 'customer.type.pf.ed'
					}
				];
			}
		}

		function customerIsPj() {
			return isSn() || isLp();
		}

		function updateAccessoryObligations() {
			ctrl.model.customer.accessoryObligations.forEach(function(ao) {
				var index = ctrl.accessoryObligations[ctrl.model.customer.type].indexOf(ao.name);
				ctrl.model.accessoryObligations[index] = {
					name: ao.name
				};
			});
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
