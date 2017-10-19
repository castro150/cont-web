(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:CreateCustomerCtrl
	 * @description # CreateCustomerCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('CreateCustomerCtrl', ['$filter', '$location', '$anchorScroll', 'type', 'usSpinnerService', 'CustomerService', CreateCustomerCtrl]);

	function CreateCustomerCtrl($filter, $location, $anchorScroll, type, usSpinnerService, CustomerService) {

		var ctrl = this;

		ctrl.dangerAlert = dangerAlert;
		ctrl.warningAlert = warningAlert;
		ctrl.successAlert = successAlert;
		ctrl.closeAlert = closeAlert;

		ctrl.updateType = updateType;
		ctrl.checkFreeSR = checkFreeSR;
		ctrl.addTel = addTel;
		ctrl.removeTel = removeTel;
		ctrl.addCnae2 = addCnae2;
		ctrl.removeCnae2 = removeCnae2;
		ctrl.addContact = addContact;
		ctrl.removeContact = removeContact;
		ctrl.addPartner = addPartner;
		ctrl.removePartner = removePartner;
		ctrl.addSyndic = addSyndic;
		ctrl.removeSyndic = removeSyndic;
		ctrl.addCity = addCity;
		ctrl.removeCity = removeCity;
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
			ctrl.accessoryObligations.lp = ['DAPI', 'SINTEGRA', 'VAF/DAMEF', 'DES', 'DIRF', 'DIPJ', 'DCTF', 'DEFIS', 'Sped Contribuições', 'Sped Fiscal', 'RAIS', 'ECF', 'ECD', 'DIMOB', 'DIMED'];
			ctrl.accessoryObligations.cond = ['DES', 'RAIS'];
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

		function checkFreeSR() {
			ctrl.model.customer.stateRegist = '';
		}

		function addTel() {
			ctrl.model.customer.tels.push('');
		}

		function removeTel() {
			var length = ctrl.model.customer.tels.length;
			ctrl.model.customer.tels.splice(length - 1, 1);
		}

		function addCnae2() {
			ctrl.model.customer.cnae2.push('');
		}

		function removeCnae2(index) {
			ctrl.model.customer.cnae2.splice(index, 1);
		}

		function addContact() {
			ctrl.model.customer.contacts.push({});
		}

		function removeContact(index) {
			ctrl.model.customer.contacts.splice(index, 1);
		}

		function addPartner() {
			ctrl.model.customer.partners.push({});
		}

		function removePartner(index) {
			ctrl.model.customer.partners.splice(index, 1);
		}

		function addSyndic() {
			ctrl.model.customer.syndics.push({});
		}

		function removeSyndic(index) {
			ctrl.model.customer.syndics.splice(index, 1);
		}

		function addCity() {
			if (ctrl.model.customer.citiesRegist.indexOf(ctrl.model.newCityRegist) < 0) {
				ctrl.model.customer.citiesRegist.push(ctrl.model.newCityRegist);
			}
			ctrl.model.newCityRegist = '';
		}

		function removeCity(city) {
			var index = ctrl.model.customer.citiesRegist.indexOf(city);
			ctrl.model.customer.citiesRegist.splice(index, 1);
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

			$location.hash('alerts');
			usSpinnerService.spin('loading');
			ctrl.model.isCreateDisabled = true;
			CustomerService.create(customer).then(function() {
				usSpinnerService.stop('loading');
				ctrl.model.isCreateDisabled = false;
				$location.path('/cadastro/sucesso');
			}, function(response) {
				usSpinnerService.stop('loading');
				ctrl.model.isCreateDisabled = false;
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
			ctrl.model.customer.contacts = [{}];
			ctrl.model.customer.partners = [{}];
			ctrl.model.customer.syndics = [{}];
			ctrl.model.customer.tels = [''];
			ctrl.model.customer.cnae2 = [''];
			ctrl.model.customer.citiesRegist = [];
			ctrl.model.newCityRegist = '';
			ctrl.model.customer.withOtherMunRegist = false;
			ctrl.model.accessoryObligations = [];
			ctrl.model.startServiceDate = new Date();
			ctrl.model.startActivityDate = new Date();
			ctrl.model.isCreateDisabled = false;
			ctrl.model.createProgress = 0;
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
