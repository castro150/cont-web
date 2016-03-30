(function() {
	'use strict';

	angular.module('simpleDocfyWebApp').factory('DateUtils', [ DateUtils ]);

	function DateUtils() {

		function somarDias(date, numDias) {
			var novaData = new Date(date.getTime());
			novaData.setDate(novaData.getDate() + numDias);

			return novaData;
		}

		function subtrairDias(date, numDias) {
			var novaData = new Date(date.getTime());
			novaData.setDate(novaData.getDate() - numDias);

			return novaData;
		}

		return {
			somarDias : somarDias,
			subtrairDias : subtrairDias
		};
	}
})();
