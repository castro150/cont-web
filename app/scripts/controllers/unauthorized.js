(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:UnauthorizedCtrl
	 * @description # UnauthorizedCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('UnauthorizedCtrl', ['$filter', 'TokenService', UnauthorizedCtrl]);

	function UnauthorizedCtrl($filter, TokenService) {

		var ctrl = this;

    init();
    function init() {
      if (TokenService.getToken()) {
        ctrl.message = $filter('translate')('errors.unauthorized.expired');
        // TODO deslogar e redirecionar em 3 segundos
      } else {
        ctrl.message = $filter('translate')('errors.unauthorized.others');
        // TODO redirecionar em 3 segundos
      }
    }
	}
})();
