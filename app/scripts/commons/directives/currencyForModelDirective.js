(function() {
	'use strict';

	angular
		.module('simpleDocfyWebApp')
		.directive(
			'currencyForModel',
			function() {
				function updateModel(model, newVelue) {
					model.$setViewValue(newVelue);
					model.$render();
				}

				return {
					require: 'ngModel',
					restrict: 'A',
					link: function(scope, elem, attrs, ngModel) {
						var patterns = ['R$ 0,0$1', 'R$ 0,$1', 'R$ $1,$2'];
						var regex = [/^(\d{1,})$/g, /^(\d{1,})$/g, /^(\d{1,})(\d{2})$/g];

						scope.$watch(attrs.ngModel, function(value) {
							if (value) {
								var match = (value.match(/[0-9]+/g)) ? value.match(/[0-9]+/g).join('') : null;
								var numbers = parseInt(match).toString();
								if (numbers) {
									var index = (numbers.length < 3) ? numbers.length - 1 : 2;
									var formatted = numbers.replace(regex[index], patterns[index]);
									updateModel(ngModel, formatted);
								}
							}
						});
					}
				};
			});

})();
