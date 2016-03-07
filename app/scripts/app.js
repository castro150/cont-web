(function() {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name contWebApp
	 * @description # contWebApp
	 * 
	 * Main module of the application.
	 */
	angular.module(
			'contWebApp',
			[ 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize',
					'pascalprecht.translate', 'tmh.dynamicLocale', 'mwl.calendar' ]).config(
			[ '$routeProvider', function($routeProvider) {
				$routeProvider.when('/', {
					templateUrl : 'views/main.html',
					controller : 'MainCtrl',
					controllerAs : 'ctrl'
				}).when('/about', {
					templateUrl : 'views/about.html',
					controller : 'AboutCtrl',
					controllerAs : 'ctrl'
				}).when('/calendario', {
					templateUrl : 'views/calendario.html',
					controller : 'CalendarioCtrl',
					controllerAs : 'ctrl'
				}).otherwise({
					redirectTo : '/'
				});
			} ]).constant('LOCALES', {
			    'locales': {
			        'pt_BR': 'Portugu\u00EAs',
			        'en_US': 'English'
			    },
			    'preferredLocale': 'pt_BR'
			}).config(function ($translateProvider) {
			    $translateProvider.useMissingTranslationHandlerLog();
			}).config(function ($translateProvider) {
			    $translateProvider.useStaticFilesLoader({
			        prefix: 'resources/locale-',
			        suffix: '.json'
			    });
			    $translateProvider.useSanitizeValueStrategy();
			    $translateProvider.preferredLanguage('pt_BR');
			    $translateProvider.useLocalStorage();
			}).config(function (tmhDynamicLocaleProvider) {
			    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
			}).config(function(calendarConfig) {
				calendarConfig.dateFormatter = 'moment'; //use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
				calendarConfig.allDateFormats.moment.date.hour = 'HH:mm'; //this will configure times on the day view to display in 24 hour format rather than the default of 12 hour
				calendarConfig.i18nStrings.weekNumber = 'Semana {week}'; //This will set the week number hover label on the month view
				calendarConfig.displayAllMonthEvents = true; //This will display all events on a month view even if they're not in the current month. Default false.
				calendarConfig.displayEventEndTimes = true; //This will display event end times on the month and year views. Default false.
				calendarConfig.showTimesOnWeekView = true; //Make the week view more like the day view, with the caveat that event end times are ignored.
			}).config(function(moment) {
				moment.locale('pt', {
				    months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
				    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul._Ago_Set_Out_Nov_Dez'.split('_'),
				    weekdays : 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_'),
				    weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sab'.split('_'),
				});
			});
})();
