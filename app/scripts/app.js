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
			[ 'ngCookies', 'ngResource', 'ui.router', 'ngSanitize', 'ngMaterial', 'ui.bootstrap',
					'pascalprecht.translate', 'tmh.dynamicLocale', 'mwl.calendar', 'ui.mask' ])
					.constant(
						'LOCALES', {
					    'locales': {
					        'pt_BR': 'Portugu\u00EAs',
					        'en_US': 'English'
					    },
					    'preferredLocale': 'pt_BR'
						}
					)
					.run(['$rootScope', '$log', function($rootScope, $log) {
						$rootScope.$on('$stateChangeStart', function(event, next) {
							// TODO se não estiver logado e não for estado de login:
							// TODO chamar o serviço de segurança, que vai acionar o evento.
							$log.info('Changeing state. ' + event + next);
						});
						// TODO tratar os eventos acionados pelo serviço de segurança.
					}]);
})();
