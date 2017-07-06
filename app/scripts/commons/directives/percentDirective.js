(function() {
	'use strict';

	angular
		.module('simpleDocfyWebApp')
		.directive(
			'percent',
			function() {
				function updateModel(model, newVelue) {
					model.$setViewValue(newVelue);
					model.$render();
				}

				return {
					require: 'ngModel',
					restrict: 'A',
					link: function(scope, elem, attrs, ngModel) {

						scope.$watch(attrs.ngModel, function(value) {
							if (value) {
								if (!value.match(/%/g)) {
									value = value.slice(0, -1);
								}
								var match = (value.match(/[0-9]+/g)) ? value.match(/[0-9]+/g).join('') : null;
								if (match) {
									var numbers = parseInt(match);
									var formatted = (parseFloat(numbers) / 100).toFixed(2) + "%";
									if (parseFloat(formatted) > 100) {
										updateModel(ngModel, '100.00%');
									} else {
										updateModel(ngModel, formatted);
									}
								} else {
									updateModel(ngModel, '0.00%');
								}
							} else {
								updateModel(ngModel, '0.00%');
							}
						});
					}
				};
			});

})();
