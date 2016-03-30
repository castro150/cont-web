(function() {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name simpleDocfyWebApp
	 * @description # simpleDocfyWebApp
	 * 
	 * Main module of the application.
	 */
	angular.module('simpleDocfyWebApp').config(function ($translateProvider) {
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
