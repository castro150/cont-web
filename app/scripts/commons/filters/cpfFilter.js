(function() {
	'use strict';

	angular.module('simpleDocfyWebApp').filter('cpf', [cpfFilter]);

	function cpfFilter() {
		return function(input) {
			var cpf = input + '';

			if (cpf.length <= 11) {
				cpf = cpf.replace(/\D/g, '');
				cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
				cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
				cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
			}

			return cpf;
		};
	}
})();
