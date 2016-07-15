(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:PaymentDetailCtrl
	 * @description # PaymentDetailCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('PaymentDetailCtrl',
			[ '$uibModalInstance', 'payment', PaymentDetailCtrl ]);

	function PaymentDetailCtrl($uibModalInstance, payment) {

		var ctrl = this;

    ctrl.teste = teste;

		// ******************************
		// Init method
		// ******************************
		init();
		function init() {
			ctrl.model = {};
			ctrl.model.payment = payment;
		}

		// ******************************
		// Public methods
		// ******************************
		function teste(name) {
			var a = ctrl.model.payment;
			console.log('teste');
		}

		// ******************************
		// Private methods
		// ******************************


	}
})();
