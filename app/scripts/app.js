(function() {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name simpleDocfyWebApp
	 * @description # simpleDocfyWebApp
	 * 
	 * Main module of the application.
	 */
	angular.module(
			'simpleDocfyWebApp',
			[ 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize',
					'pascalprecht.translate', 'tmh.dynamicLocale', 'mwl.calendar' ]).constant('LOCALES', {
			    'locales': {
			        'pt_BR': 'Portugu\u00EAs',
			        'en_US': 'English'
			    },
			    'preferredLocale': 'pt_BR'
			});
})();
