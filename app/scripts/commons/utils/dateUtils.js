(function() {
	'use strict';

	angular.module('contWebApp').factory('DateUtils', [ DateUtils ]);

	function DateUtils() {

		function diasDoMes(mes, ano) {
			var diasSemana = [ 'sab', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ];
			var data = new Date(ano, mes - 1, 1);
			var result = [];
			while (data.getMonth() == mes - 1) {
				result.push({
					dia : data.getDate(),
					diaSemana : diasSemana[data.getDay()]
				});
				data.setDate(data.getDate() + 1);
			}
			return result;
		}

		return {
			diasDoMes : diasDoMes
		};
	}
})();
