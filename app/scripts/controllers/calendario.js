(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name contWebApp.controller:CalendarioCtrl
	 * @description # CalendarioCtrl Controller of the contWebApp
	 */
	angular.module('contWebApp').controller('CalendarioCtrl',
			[ 'DateUtils', CalendarioCtrl ]);

	function CalendarioCtrl(DateUtils) {
		this.awesomeThings = [ 'HTML5 Boilerplate', 'AngularJS', 'Karma' ];

		var ctrl = this;
		ctrl.teste = 'variavel de controller';

		ctrl.teste2 = DateUtils.diasDoMes(2, 2016);

	}
})();
