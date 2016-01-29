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
					'pascalprecht.translate', 'tmh.dynamicLocale' ]).config(
			[ '$routeProvider', function($routeProvider) {
				$routeProvider.when('/', {
					templateUrl : 'views/main.html',
					controller : 'MainCtrl',
					controllerAs : 'main'
				}).when('/about', {
					templateUrl : 'views/about.html',
					controller : 'AboutCtrl',
					controllerAs : 'about'
				}).when('/calendario', {
					templateUrl : 'views/calendario.html',
					controller : 'CalendarioCtrl',
					controllerAs : 'calendario'
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
			});
})();
