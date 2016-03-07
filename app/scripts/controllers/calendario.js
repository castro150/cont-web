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
		
		var PRIMEIR_DIA_SEMANA = 0;
		var ULTIMO_DIA_SEMANA = 6;
		var QUANTIADE_DIAS_SEMANA = 7;

		this.awesomeThings = [ 'HTML5 Boilerplate', 'AngularJS', 'Karma' ];

		var ctrl = this;
				
		init();

		function init() {
			ctrl.model = {};
			
			var hoje = new Date();
			var mesAtual = hoje.getMonth() + 1;
			var anoAtual = hoje.getYear() + 1900;
			ctrl.model.mes = mesAtual;
			ctrl.model.ano = anoAtual;
			
			ctrl.model.viewCalendario = 'month';
			ctrl.model.dataViewCalendario = /*DateUtils.subtrairDias(new Date(), 8);*/new Date();
			ctrl.model.eventos = [
                   {
	        	    title: 'My event title', // The title of the event
	        	    type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
	        	    startsAt: DateUtils.somarDias(new Date(), 1), // A javascript date object for when the event starts
	        	    endsAt: DateUtils.somarDias(new Date(), 2), // Optional - a javascript date object for when the event ends
	        	    editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
	        	    deletable: false, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
	        	    draggable: true, //Allow an event to be dragged and dropped
	        	    resizable: true, //Allow an event to be resizable
	        	    incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
	        	    recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
	        	    cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
	        	  }
	        	];
			
			preencherCalendario();
		}
		
		function preencherCalendario() {
			var diasDoCalendario = diasDoMes(ctrl.model.mes, ctrl.model.ano);
			
			completarDiasMesAnterior(diasDoCalendario);
			completarDiasMesSeguinte(diasDoCalendario);
			
			ctrl.model.calendario = separarSemanas(diasDoCalendario);
		}
		
		function completarDiasMesAnterior(calendario) {
			while(calendario[0].diaSemana !== PRIMEIR_DIA_SEMANA) {
				var novoDia = DateUtils.subtrairDias(calendario[0].objetoData, 1);
				calendario.splice(0, 0, criarDateCompleto(novoDia));
			}
		}
		
		function completarDiasMesSeguinte(calendario) {
			while(calendario[calendario.length - 1].diaSemana !== ULTIMO_DIA_SEMANA) {
				var novoDia = DateUtils.somarDias(calendario[calendario.length - 1].objetoData, 1);
				calendario.push(criarDateCompleto(novoDia));
			}
		}
		
		function separarSemanas(calendario) {
			var calendarioSeparado = {};
			calendarioSeparado.semanas = [];
			
			for (var i = 0; i < calendario.length; i = i + QUANTIADE_DIAS_SEMANA) {
				calendarioSeparado.semanas.push(calendario.slice(i, i + QUANTIADE_DIAS_SEMANA));
			}
			
			return calendarioSeparado;
		}
		
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
				diaSemana : date.getDay(),
				objetoData : new Date(date.getTime())
			};
		}

	}
})();
