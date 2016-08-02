(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:PaymentsCtrl
	 * @description # PaymentsCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('PaymentsCtrl',
			[ '$log', '$scope', '$uibModal', PaymentsCtrl ]);

	function PaymentsCtrl($log, $scope, $uibModal) {

		var ctrl = this;

		var PAID = "PAID";
		var PENDING = "PENDING";
		var ANALYZING = "ANALYZING";
		var NOT_APPROVED = "NOT_APPROVED";

		ctrl.dangerAlert = dangerAlert;
		ctrl.warningAlert = warningAlert;
		ctrl.successAlert = successAlert;

		ctrl.querySearch = querySearch;
		ctrl.createCompany = createCompany;
		ctrl.changeComany = changeComany;
		ctrl.formatDate = formatDate;
		ctrl.isPaid = isPaid;
		ctrl.isOverdue = isOverdue;
		ctrl.isNearbyDueDate = isNearbyDueDate;
		ctrl.isPending = isPending;
		ctrl.isAnalyzing = isAnalyzing;
		ctrl.isNotApproved = isNotApproved;
		ctrl.getTitleByPaymentStatus = getTitleByPaymentStatus;
		ctrl.downloadPayments = downloadPayments;
		ctrl.filterPayments = filterPayments;
		ctrl.updateSelectedStatus = updateSelectedStatus;

		ctrl.viewDetail = viewDetail;
		ctrl.closeDetail = closeDetail;
		ctrl.editPayment = editPayment;
		ctrl.isRequiredFieldsFilled = isRequiredFieldsFilled;
		ctrl.cancelChanges = cancelChanges;
		ctrl.saveChanges = saveChanges;

		ctrl.registerPayment = registerPayment;
		ctrl.isRegistryRequiredFieldsFilled = isRegistryRequiredFieldsFilled;
		ctrl.cancelRegistry = cancelRegistry;
		ctrl.saveRegistry = saveRegistry;

		// ******************************
		// Init method
		// ******************************
		init();
		function init() {
			ctrl.alerts = [];

			// TODO carregar a partir do usuário logado.
			ctrl.companies = loadCompanies();
			ctrl.status = loadStatus();

			ctrl.model = {};
			ctrl.model.payments = [];
			ctrl.model.selectedPayment = {};
			initializeFilters();

			ctrl.detailModal = {};
			filterPayments();
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

		// ******************************
		// Public methods
		// ******************************
		function querySearch(text) {
			return text ? ctrl.companies.filter(function(company) {
				return company.value.indexOf(angular.lowercase(text)) === 0;
			}) : ctrl.companies;
		}

		function updateSelectedStatus(status) {
			ctrl.model.selectedStatus = ctrl.status.filter(function(completeStatus) {
				return completeStatus.display === status;
			})[0];
		}

		function createCompany(name) {
			// TODO implementar quando caso de uso estiver pronto.
			$log.warn('Função não implementada. Nome: ' + name);
		}

		function changeComany() {
			filterPayments();
		}

		function formatDate(momentDate) {
			return momentDate.format('DD/MM/YYYY');
		}

		function isPaid(payment) {
			return payment.status === PAID;
		}

		function isOverdue(payment) {
			return payment.status === PENDING && moment().diff(payment.dueDate, 'days') > 0;
		}

		function isNearbyDueDate(payment) {
			return payment.status === PENDING &&
					moment().diff(payment.dueDate, 'days') <= 0 &&
					moment().diff(payment.dueDate, 'days') > -7;
		}

		function isPending(payment) {
			return payment.status === PENDING && moment().diff(payment.dueDate, 'days') <= -7;
		}

		function isAnalyzing(payment) {
			return payment.status === ANALYZING;
		}

		function isNotApproved(payment) {
			return payment.status === NOT_APPROVED;
		}

		function getTitleByPaymentStatus(payment) {
			var title = '';
			ctrl.status.forEach(function(status) {
				if (status.identificationFunction(payment)) {
					title = status.display;
				}
			});

			return title;
		}

		function downloadPayments(payment) {
			// TODO implementar download do sistema de arquivos.
			$log.info('Bainxando guia: ' + payment.name);
		}

		function filterPayments() {
			loadPayments(ctrl.model.selectedCompany, ctrl.model.initialDate, ctrl.model.finalDate);
			ctrl.model.payments = filterByStatus(ctrl.model.payments, ctrl.model.selectedStatus);
		}

		// ******************************
		// Private methods
		// ******************************
		function loadCompanies() {
			// TODO fazer o serviço para retornar as empresas.
			var companies = ['Empresa1', 'Empresa2', 'Empresa3'];
			return companies.map(function(company) {
				return {
					value: company.toLowerCase(),
					display: company
				};
			});
		}

		function loadStatus() {
			return [{
				id: 0,
				display: 'Todos',
				identificationFunction: function none() {
					return false;
				}
			}, {
				id: 1,
				display: 'Pagamento Efetuado',
				identificationFunction: isPaid
			}, {
				id: 2,
				display: 'Vencido',
				identificationFunction: isOverdue
			}, {
				id: 3,
				display: 'Vencimento Próximo',
				identificationFunction: isNearbyDueDate
			}, {
				id: 4,
				display: 'Pagamento Pendente',
				identificationFunction: isPending
			}, {
				id: 5,
				display: 'Analisando Pagamento',
				identificationFunction: isAnalyzing
			}, {
				id: 6,
				display: 'Pagamento Não Aprovado',
				identificationFunction: isNotApproved
			}];
		}

		function initializeFilters() {
			ctrl.model.selectedCompany = '';
			ctrl.model.selectedStatus = ctrl.status[0];
			ctrl.model.selectedStatusName = ctrl.status[0].display;
			ctrl.model.initialDate = '';
			ctrl.model.finalDate = '';
		}

		function loadPayments(company, initialDate, finalDate) {
			ctrl.model.payments = [];
			// TODO implementar serviço para retornar pagamentos.
			// TODO filtrar no back pela empresa e data, permitindo não mandá-las.
			$log.info('Filtrando de ' + initialDate + ' até ' + finalDate);
			ctrl.model.payments = [{
				name: 'Honorário',
				dueDate: moment(new Date(2016, 7, 30)),
				details: 'Pagamento do honorário de mês de referência.',
				status: PENDING
			}, {
				name: 'Guia de DCTF',
				dueDate: moment(new Date(2016, 6, 14)),
				details: 'Pagamento da DCTF.',
				status: ANALYZING
			}, {
				name: 'Guia de DASN',
				dueDate: moment(new Date(2016, 6, 13)),
				details: 'Pagamento da DASN.',
				status: NOT_APPROVED
			}, {
				name: 'Guia de Serviço',
				dueDate: moment().add(2, 'days'),
				details: 'Pagamento de guia de prestação de serviço.',
				status: PENDING
			}, {
				name: 'Honorário',
				dueDate: moment(new Date(2016, 4, 27)),
				details: 'Pagamento do honorário de mês de referência.',
				status: PENDING
			}, {
				name: 'Imposto de Renda',
				dueDate: moment(new Date(2016, 4, 24)),
				details: 'Pagamento do imposto de renda.',
				status: PAID
			}];
		}

		function isNotEmpity(text) {
			return text !== undefined && text !== '';
		}

		function filterByStatus(payments, status) {
			var result = payments;
			if (status.id !== 0) {
				result = filterByCriteria(payments, status.identificationFunction);
			} else {
				result = filterByUserCriteria(payments);
			}
			return result;
		}

		function filterByCriteria(payments, criteria) {
			return payments.filter(criteria);
		}

		function filterByUserCriteria(payments) {
			// TODO condicional pelo tipo de usuário logado.
			var result = filterByOfficeCriteria(payments);
			return result;
		}

		function filterByOfficeCriteria(payments) {
			var analyzingPayments = filterByCriteria(payments, isAnalyzing);
			var paidPayments = filterByCriteria(payments, isPaid);
			var otherPayments = payments.filter(function(payment) {
				return !isPaid(payment) && !isAnalyzing(payment);
			});

			return analyzingPayments.concat(paidPayments).concat(otherPayments);
		}

		// ----------------------------
		// Detail modal functions
		// ----------------------------
		function viewDetail(payment) {
			ctrl.model.selectedPayment = payment;
			ctrl.detailModal.isEditMode = false;
			ctrl.detailModal = $uibModal.open({
				templateUrl: 'views/paymentDetail.html',
				size: 'md',
				scope: $scope
			});
		}

		function closeDetail() {
			ctrl.detailModal.close();
		}

		function editPayment(payment) {
			ctrl.detailModal.isEditMode = true;

			ctrl.model.editedName = payment.name;
			ctrl.model.editedDueDate = ctrl.formatDate(payment.dueDate);
			ctrl.model.editedDetails = payment.details;
		}

		function isRequiredFieldsFilled() {
			return isNotEmpity(ctrl.model.editedName) &&
					isNotEmpity(ctrl.model.editedDueDate) &&
					isNotEmpity(ctrl.model.editedDetails);
		}

		function cancelChanges() {
			ctrl.detailModal.isEditMode = false;
		}

		function saveChanges(payment) {
			ctrl.detailModal.isEditMode = false;

			payment.name = ctrl.model.editedName;
			payment.dueDate = moment(ctrl.model.editedDueDate, 'DD-MM-YYYY');
			payment.details = ctrl.model.editedDetails;

			// TODO salvar no servidor
			$log.info('Salvando edições: ' + payment);
		}

		// ----------------------------
		// Registry modal functions
		// ----------------------------
		function registerPayment() {
			initializeRegistryForm();
			ctrl.registryModal = $uibModal.open({
				templateUrl: 'views/paymentRegistry.html',
				size: 'md',
				scope: $scope
			});
		}

		function initializeRegistryForm() {
			ctrl.model.registryName = '';
			ctrl.model.registryDueDate = '';
			ctrl.model.registryDetails = '';
		}

		function isRegistryRequiredFieldsFilled() {
			return isNotEmpity(ctrl.model.registryName) &&
					isNotEmpity(ctrl.model.registryDueDate) &&
					isNotEmpity(ctrl.model.registryDetails);
		}

		function cancelRegistry() {
			initializeRegistryForm();
			ctrl.registryModal.close();
		}

		function saveRegistry() {
			var payment = {};
			payment.name = ctrl.model.registryName;
			payment.dueDate = moment(ctrl.model.registryDueDate, 'DD-MM-YYYY');
			payment.details = ctrl.model.registryDetails;

			// TODO salvar no servidor
			$log.info('Salvando nova guia: ' + payment);
			ctrl.registryModal.close();
			filterPayments();
		}

	}
})();
