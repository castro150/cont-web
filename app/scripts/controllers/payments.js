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

		ctrl.querySearch = querySearch;
		ctrl.createCompany = createCompany;
		ctrl.loadPayments = loadPayments;
		ctrl.formatDate = formatDate;
		ctrl.isPaid = isPaid;
		ctrl.isOverdue = isOverdue;
		ctrl.isNearbyDueDate = isNearbyDueDate;
		ctrl.isPending = isPending;
		ctrl.isAnalyzing = isAnalyzing;
		ctrl.isNotApproved = isNotApproved;
		ctrl.getTitleByPaymentStatus = getTitleByPaymentStatus;
		ctrl.downloadPayments = downloadPayments;

		ctrl.viewDetail = viewDetail;
		ctrl.closeDetail = closeDetail;
		ctrl.editPayment = editPayment;
		ctrl.isRequiredFieldsFilled = isRequiredFieldsFilled;
		ctrl.cancelChanges = cancelChanges;
		ctrl.saveChanges = saveChanges;

		// ******************************
		// Init method
		// ******************************
		init();
		function init() {
			// TODO carregar a partir do usuário logado.
			ctrl.companies = loadCompanies();

			ctrl.model = {};
			ctrl.model.payments = [];
			ctrl.model.selectedPayment = {};

			ctrl.detailModal = {};
		}

		// ******************************
		// Public methods
		// ******************************
		function querySearch(text) {
			return text ? ctrl.companies.filter(function(company) {
				return company.value.indexOf(angular.lowercase(text)) === 0;
			}) : ctrl.companies;
		}

		function createCompany(name) {
			// TODO implementar quando caso de uso estiver pronto.
			$log.warn('Função não implementada. Nome: ' + name);
		}

		function loadPayments(company) {
			ctrl.model.payments = [];
			if(company) {
				// TODO implementar serviço para retornar pagamentos.
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
					dueDate: moment(new Date(2016, 6, 25)),
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
			if (isPaid(payment)) {
				return 'Pagamento Efetuado';
			}
			if (isOverdue(payment)) {
				return 'Vencido';
			}
			if (isNearbyDueDate(payment)) {
				return 'Vencimento Próximo';
			}
			if (isPending(payment)) {
				return 'Pagamento Pendente';
			}
			if (isAnalyzing(payment)) {
				return 'Analisando Pagamento';
			}
			if (isNotApproved(payment)) {
				return 'Pagamento Não Aprovado';
			}
		}

		function downloadPayments(payment) {
			// TODO implementar download do sistema de arquivos.
			$log.info('Bainxando guia: ' + payment.name);
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

		function isNotEmpity(text) {
			return text !== undefined && text !== '';
		}

		// ----------------------------
		// Modal functions
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

	}
})();
