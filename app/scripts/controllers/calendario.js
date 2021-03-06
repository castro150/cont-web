(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name simpleDocfyWebApp.controller:CalendarioCtrl
	 * @description # CalendarioCtrl Controller of the simpleDocfyWebApp
	 */
	angular.module('simpleDocfyWebApp').controller('CalendarioCtrl', ['DateUtils', 'CalendarioService', CalendarioCtrl]);

	function CalendarioCtrl(DateUtils, CalendarioService) {

		var ctrl = this;

		ctrl.mudarViewMes = mudarViewMes;
		ctrl.mudarViewAno = mudarViewAno;

		init();

		function init() {
			ctrl.model = {};

			ctrl.model.viewCalendario = 'month';
			ctrl.model.dataViewCalendario = new Date();
			ctrl.model.eventos = [];
			buscarEventos();
		}

		function buscarEventos() {
			ctrl.model.eventos = CalendarioService.buscarEventos();
		}

		function mudarViewMes() {
			ctrl.model.viewCalendario = 'month';
		}

		function mudarViewAno() {
			ctrl.model.viewCalendario = 'year';
		}
	}
})();
