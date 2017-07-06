(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:LoginCtrl
	 * @description # LoginCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('LoginCtrl', ['$filter', '$location', 'usSpinnerService', 'AuthService', LoginCtrl]);

	function LoginCtrl($filter, $location, usSpinnerService, AuthService) {

		var ctrl = this;

		ctrl.dangerAlert = dangerAlert;
		ctrl.warningAlert = warningAlert;
		ctrl.successAlert = successAlert;
		ctrl.closeAlert = closeAlert;

		ctrl.logIn = logIn;
		ctrl.clearFields = clearFields;
		ctrl.isRequiredFieldsFilled = isRequiredFieldsFilled;

		// ******************************
		// Init method
		// ******************************
		init();

		function init() {
			ctrl.alerts = [];

			ctrl.model = {};
			ctrl.model.user = {};
			ctrl.model.isLoginDisabled = false;
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
		function logIn() {
			usSpinnerService.spin('loading');
			ctrl.model.isLoginDisabled = true;
			AuthService.logIn(ctrl.model.user).then(function() {
				usSpinnerService.stop('loading');
				ctrl.model.isLoginDisabled = false;
				$location.path('/');
			}, function(response) {
				usSpinnerService.stop('loading');
				ctrl.model.isLoginDisabled = false;
				if (response.status === 401) {
					dangerAlert($filter('translate')('errors.login.invalid.user'));
				} else {
					dangerAlert($filter('translate')('errors.unexpected'));
				}
			});
		}

		function clearFields() {
			ctrl.model.user.username = '';
			ctrl.model.user.password = '';
		}

		function isRequiredFieldsFilled() {
			return isNotEmpity(ctrl.model.user.username) && isNotEmpity(ctrl.model.user.password);
		}

		// ******************************
		// Private methods
		// ******************************
		function isNotEmpity(text) {
			return text !== undefined && text !== '';
		}

	}
})();
