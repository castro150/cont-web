(function() {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name contWebApp
	 * @description # contWebApp
	 * 
	 * Main module of the application.
	 */
	angular.module('contWebApp').config(function(moment) {
				moment.locale('pt', {
				    months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
				    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul._Ago_Set_Out_Nov_Dez'.split('_'),
				    weekdays : 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_'),
				    weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sab'.split('_'),
				});
			});
})();
