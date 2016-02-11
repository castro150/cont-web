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

		var DIAS_SEMANA = [ 'sab', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ];
		
		this.awesomeThings = [ 'HTML5 Boilerplate', 'AngularJS', 'Karma' ];

		var ctrl = this;
		ctrl.teste = 'variavel de controller';

		ctrl.teste2 = diasDoMes(2, 2016);
		
		ctrl.teste3 = DateUtils.somarDias(new Date(), 15);
		ctrl.teste4 = DateUtils.subtrairDias(new Date(), 15);

		function diasDoMes(mes, ano) {
			var dia = 1;
			var data = new Date(ano, mes - 1, dia);
			var result = [];

			while (data.getMonth() === mes - 1) {
				result.push(criarDateCompleto(data));
				data.setDate(++dia);
			}

			return result;
		}
		
		function criarDateCompleto(date) {
			return {
				dia : date.getDate(),
				diaSemana : DIAS_SEMANA[date.getDay()],
				objetoData : new Date(date.getTime())
			};
		}

	}
})();
