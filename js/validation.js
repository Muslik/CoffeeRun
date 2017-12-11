(function(window) {
	'use strict';
	var App = window.App || {};

	var Validation = {
		isCompanyEmail: function (email) {
			return /.+@gmail\.com$/.test(email);
		},
		isValidableCoffee: function(coffee) {
			return /decaf/.test(coffee);
		},
		isValidableStrength: function(strength) {
			if (strength > 20) {
				return false;
			}
			else {
				return true;
			}
		}
	};

	App.Validation = Validation;
	window.App = App;

})(window);