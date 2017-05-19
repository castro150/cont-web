(function() {
	'use strict';

	angular.module('simpleDocfyWebApp').filter('cnpj', [cnpjFilter]);

	function cnpjFilter() {
		return function(input) {
			var cnpj = input + '';

			if (cnpj.length <= 14) {
				cnpj = cnpj.replace(/\D/g, '');
				cnpj = cnpj.replace(/(\d{2})(\d)/, "$1.$2");
				cnpj = cnpj.replace(/(\d{3})(\d)/, "$1.$2");
				cnpj = cnpj.replace(/(\d{3})(\d)/, "$1/$2");
				cnpj = cnpj.replace(/(\d{4})(\d{2})$/, "$1-$2");
			}

			return cnpj;
		};
	}
})();
