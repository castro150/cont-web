(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:MainCtrl
	 * @description # MainCtrl Controller of the simpleDocfyWebApp
	 */
	// FIXME $scope é apenas um exemplo de injeção. Remover depois.
	angular.module('simpleDocfyWebApp').controller('MainCtrl', [ '$scope', MainCtrl ]);

	function MainCtrl($scope) {
		this.awesomeThings = [ 'HTML5 Boilerplate', 'AngularJS', 'Karma' ];

		$scope.teste = 'variavel de controller';
	}
})();
