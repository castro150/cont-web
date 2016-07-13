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

		ctrl.querySearch = querySearch;
		ctrl.createCompany = createCompany;
		ctrl.loadPayments = loadPayments;
		ctrl.formatDate = formatDate;
		ctrl.isPaid = isPaid;

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
				// TODO lembrar que o mês é um a menos.
				ctrl.model.payments = [{
					name: 'Honorário',
					dueDate: moment(new Date(2016, 7, 12)),
					paid: false,
					pending: false,
					paymentAccepted: false
				}, {
					name: 'Guia de DCTF',
					dueDate: moment(new Date(2016, 6, 12)),
					paid: false,
					pending: false,
					paymentAccepted: false
				}, {
					name: 'Guia de DASN',
					dueDate: moment(new Date(2016, 6, 15)),
					paid: false,
					pending: false,
					paymentAccepted: false
				}, {
					name: 'Guia de Serviço',
					dueDate: moment(new Date(2016, 6, 15)),
					paid: true,
					pending: false,
					paymentAccepted: false
				}, {
					name: 'Honorário',
					dueDate: moment(new Date(2016, 4, 24)),
					paid: true,
					pending: false,
					paymentAccepted: true
				}];
			}
		}

		function formatDate(momentDate) {
			return momentDate.format('DD/MM/YYYY');
		}

		function isPaid(payment) {
			return payment.paid && payment.paymentAccepted;
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
