(function() {
	'use strict';

	angular
		.module('simpleDocfyWebApp')
		.directive(
			'autocorrectNumber',
			function() {
				function updateModel(model, newVelue) {
					model.$setViewValue(newVelue);
					model.$render();
				}

				return {
					require: 'ngModel',
					restrict: 'A',
					link: function(scope, elem, attrs, ngModel) {
						var charNumber = parseInt(attrs.charNumber);
						var includeLetters = attrs.includeLetters;
						scope.$watch(attrs.ngModel, function(value) {
							if (value) {
								var split = value.match(/[a-zA-Z]+|[0-9]+/g);
								var newNumber = (new Array(charNumber + 1).join('0') + split[0]).substr(-charNumber);
								var complete = (split[1] && typeof includeLetters !== 'undefined') ? newNumber + split[1] : newNumber;
								updateModel(ngModel, complete);
							}
						});
					}
				};
			});

})();
