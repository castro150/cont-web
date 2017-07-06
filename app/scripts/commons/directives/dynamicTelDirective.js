(function() {
	'use strict';

	angular
		.module('simpleDocfyWebApp')
		.directive(
			'dynamicTel',
			function() {
				function updateModel(model, newVelue) {
					model.$setViewValue(newVelue);
					model.$render();
				}

				return {
					require: 'ngModel',
					restrict: 'A',
					link: function(scope, elem, attrs, ngModel) {
						var cleanVelue;

						scope.$watch(attrs.ngModel, function(value) {
							if (value) {
								var numbers = value.match(/[0-9]+/g);
								cleanVelue = numbers ? numbers.join('') : '';
								if (cleanVelue.length === 8) {
									cleanVelue = cleanVelue.substr(0, 4) + '-' + cleanVelue.substr(4, 4);
								} else if (cleanVelue.length === 9) {
									cleanVelue = cleanVelue.substr(0, 1) + ' ' + cleanVelue.substr(1, 4) + '-' + cleanVelue.substr(5, 4);
								} else if (cleanVelue.length === 10) {
									cleanVelue = '(' + cleanVelue.substr(0, 2) + ') ' + cleanVelue.substr(2, 4) + '-' + cleanVelue.substr(6, 4);
								} else if (cleanVelue.length >= 11) {
									cleanVelue = '(' + cleanVelue.substr(0, 2) + ') ' + cleanVelue.substr(2, 1) + ' ' + cleanVelue.substr(3, 4) +
										'-' + cleanVelue.substr(7, 4);
								}
								updateModel(ngModel, cleanVelue);
							} else {
								cleanVelue = value;
							}
						});

						elem.bind('blur', function() {
							if (cleanVelue) {
								var numbers = cleanVelue.match(/[0-9]+/g);
								numbers = numbers ? numbers.join('') : '';
								if (numbers.length < 8 || numbers.length > 11) {
									updateModel(ngModel, '');
								}
							}
						});
					}
				};
			});

})();
