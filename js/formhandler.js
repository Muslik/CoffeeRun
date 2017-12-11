(function(window) {
	'use strict';
	var App = window.App || {};
	function FormHandler(selector) {
		if (!selector) {
			throw new Error('No selector provided');
		}
		this.$formElement = $(selector);
		if (this.$formElement.length === 0) {
			throw new Error('Couldn\'t find element with selector: ' + selector);
		}
	}
	FormHandler.prototype.addSubmitHandler = function(fn) {
		this.$formElement.on('submit', function(event) {
			event.preventDefault();
			var data = {};
			$(this).serializeArray().forEach(function(item) {
				data[item.name] = item.value;
				console.log(item.name + ' is ' + item.value);
			})
			if (App.achievement != 'true') {
				if (data['size'] == 'MegaGrande' && data['strength'] == 100 && data['flavor'] != '') {
						$('#myModal').modal('show');
						$('.btn-ability-yes').click(function(event) {
							event.preventDefault();
							App.achievement = 'true';
							$('.special-ability-group').removeClass('hidden')
						});
						$('.btn-ability-no').click(function(event) {
							event.preventDefault();
							App.achievement = 'true';
						});
					}
			}
			fn(data);
			this.reset();
			strength();
			this.elements[0].focus();
		});
	}
	FormHandler.prototype.addInputHandler = function(fn) {
		this.$formElement.on('input', '[name=emailAddress]', function(event) {
			var emailAddress = event.target.value;
			var message = '';
			if (fn(emailAddress)) {
				event.target.setCustomValidity('');
			}
			else {
				message = emailAddress + ' is not an authorized email address!'
				event.target.setCustomValidity(message);
			}
		});
	}
	FormHandler.prototype.addInputHandlerCoffee = function(fn) {
		this.$formElement.on('input', '[name=coffee]', function(event) {
			var coffee = event.target.value;
			var message = '';
			if (fn(coffee)) {
				event.target.setCustomValidity('');
			}
			else {
				message = coffee + ' is not in our menu!'
				event.target.setCustomValidity(message);
			}
		});
	}
	FormHandler.prototype.addInputHandlerStrength = function (fn) {
		this.$formElement.on('change', '[name=strength]', function(event) {
			var strength = event.target.value;
			var message = '';
			if (fn(strength)) {
				event.target.setCustomValidity('');
			}
			else {
				message = strength + ' is too strong!'
				event.target.setCustomValidity(message);
			}
		});
	}
	App.FormHandler = FormHandler;
	window.App = App;
})(window);