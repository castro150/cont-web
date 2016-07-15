(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:PaymentsCtrl
	 * @description # CalendarioCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('PaymentsCtrl',
			[ '$log', PaymentsCtrl ]);

	function PaymentsCtrl($log) {

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

		// ******************************
		// Init method
		// ******************************
		init();
		function init() {
			// TODO carregar a partir do usuário logado.
			ctrl.companies = loadCompanies();

			ctrl.model = {};
			ctrl.model.payments = [];
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
					status: PENDING
				}, {
					name: 'Guia de DCTF',
					dueDate: moment(new Date(2016, 6, 14)),
					status: ANALYZING
				}, {
					name: 'Guia de DASN',
					dueDate: moment(new Date(2016, 6, 13)),
					status: NOT_APPROVED
				}, {
					name: 'Guia de Serviço',
					dueDate: moment(new Date(2016, 6, 18)),
					status: PENDING
				}, {
					name: 'Honorário',
					dueDate: moment(new Date(2016, 4, 27)),
					status: PENDING
				}, {
					name: 'Imposto de Renda',
					dueDate: moment(new Date(2016, 4, 24)),
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

	}
})();
