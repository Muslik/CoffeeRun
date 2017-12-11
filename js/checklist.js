(function(window) {
	'use strict';
	var App = window.App || {};
	var $ = window.jQuery;
	function CheckList(selector) {
		'use strict';
		if (!selector) {
			throw Error('No selector provided');
		}
		this.$element = $(selector);
		if (this.$element.length === 0) {
			throw Error('Couldn\'t find element with selector: ' + selector);
		}
	}
	CheckList.prototype.addRow = function(coffeeOrder) {
		//Удаляем все имеющиеся строки, соответствующие данному адресу     
		// электронной почты
		this.removeRow(coffeeOrder.emailAddress);
		//Создаем новый экземпляр строки на основе информации о заказе кофе
		var rowElement = new Row(coffeeOrder);
		//Добавляем свойство $element нового экземпляра строки в перечень
		this.$element.append(rowElement.$element);
	}
	CheckList.prototype.removeRow = function(email) {
		this.$element
			.find('[value="' + email + '"]')
			.closest('[data-coffee-order="checkbox"]')
			.remove();
	}
	CheckList.prototype.changeCondition = function(email) {
		this.$element
			.find('[value="' + email + '"]')
			.prop({
				'disabled': 'true',
				'checked': 'true'
			})
			.closest('[data-coffee-order="checkbox"]')
			.css({
				background: 'rgba(0,0,0,.8)',
				color: '#fff'
			});
	}
	CheckList.prototype.addClickHandler = function(fn) {
		var DELAY = 300;
		var clicks = 0;
		var timer = null;
		var data = {};
			$(this).serializeArray().forEach(function(item) {
				data[item.name] = item.value;
				console.log(item.name + ' is ' + item.value);
			})
		this.$element.on('click', 'input', function(event) {
			event.preventDefault();
			var email = event.target.value;
			clicks++;
			if(clicks === 1) {

	            timer = setTimeout(function() {
					this.changeCondition(email);
					setTimeout(function() {
						this.removeRow(email);
						fn(email);
					}.bind(this), 3000);
	                clicks = 0; //after action performed, reset counter

	            }.bind(this), DELAY);
            } else {
				clearTimeout(timer);    //prevent single-click action
				var order = myTruck.getOrder(email);
				var range = $('.strengthLevel');
				$('#coffee').val(order.coffee);
				$('#mail').val(order.emailAddress);
				$("#flavorShot").val(order.flavor).prop({
					'selected': 'true'
				});
				$("#specialAbility").val(order.specialAbility).prop({
					'selected': 'true'
				});
				$('input[name=size]:checked').prop({
					'checked': 'false'
				});
				$('input[name=size]').val(order.size).prop({
					'checked': 'true'
				});
				$('#strengthLevel').val(order.strength);
				strength();
				clicks = 0;             //after action performed, reset counter
       		}

		}.bind(this));
		this.$element.on('dblclick' , function(event) {
			event.preventDefault();
		});
	};
	function Row (coffeeOrder) {
		function createDiv(HtmlClass) {
			if (HtmlClass == 'None') {
				var div = $('<div></div>', {
					'data-coffee-order': 'checkbox',
					'class': 'checkbox '
				});
				return div;
			}
			else {
				var div = $('<div></div>', {
					'data-coffee-order': 'checkbox',
					'class': 'checkbox ' + 'checkbox_'+HtmlClass
				});
				return div;
			}
		}
		switch (coffeeOrder.flavor) {
			case 'caramel':
				var $div = createDiv('orange');
				break;
			case 'almond':
				var $div = createDiv('blue');
				break;
			case 'mocha':
				var $div = createDiv('yellow');
				break;
			default:
				var $div = createDiv('None');
				break;
		}
		var $label = $('<label></label>');

		var $checkbox = $('<input></input>', {
			type: 'checkbox',
			class: 'input-checkbox',
			value: coffeeOrder.emailAddress
		});

		var description = ' [' + coffeeOrder.strength + 'x]' + ' ';
		if (coffeeOrder.flavor) {
			description += coffeeOrder.flavor + ' ';
		}
		if (coffeeOrder.specialAbility) {
			description += coffeeOrder.specialAbility + ' ';
		}
		description += coffeeOrder.coffee + ' ';
		description += ' (' + coffeeOrder.emailAddress + ')';
		description += coffeeOrder.size + ' ';

		$label.append($checkbox);
		$label.append(description);
		$div.append($label);
		this.$element = $div;
	}
	App.CheckList = CheckList;
	window.App = App;
})(window);