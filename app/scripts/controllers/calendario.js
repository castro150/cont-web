(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name contWebApp.controller:AboutCtrl
	 * @description # AboutCtrl Controller of the contWebApp
	 */
	// FIXME $scope é apenas um exemplo de injeção. Remover depois.
	angular.module('contWebApp').controller('CalendarioCtrl',
			[ CalendarioCtrl ]);

	function CalendarioCtrl() {
		this.awesomeThings = [ 'HTML5 Boilerplate', 'AngularJS', 'Karma' ];

		var ctrl = this;
		ctrl.teste = 'variavel de controller';

	}
})();
