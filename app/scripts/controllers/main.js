(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name contWebApp.controller:MainCtrl
	 * @description # MainCtrl Controller of the contWebApp
	 */
	// FIXME $scope é apenas um exemplo de injeção. Remover depois.
	angular.module('contWebApp').controller('MainCtrl', [ '$scope', MainCtrl ]);

	function MainCtrl($scope) {
		this.awesomeThings = [ 'HTML5 Boilerplate', 'AngularJS', 'Karma' ];

		$scope.teste = 'variavel de controller';
	}
})();
