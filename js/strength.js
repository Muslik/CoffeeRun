function strength() {
	var range = $('.strengthLevel');
	var number = $('.strengthLevelNumber');
	function checkColor() {
		if (range.val() <= 30) {
			number.val($('.strengthLevel').val()).css({
				color: 'green'
			});
			range.removeClass('orange');
			range.removeClass('red');
			range.addClass('green');
			return 'green';
		}
		else if (30 < range.val() && range.val() < 70) {
			number.val($('.strengthLevel').val()).css({
				color: 'orange'
			});;
			range.removeClass('green');
			range.removeClass('red');
			range.addClass('orange');
			return 'orange';
		}
		else {
			number.val($('.strengthLevel').val()).css({
				color: 'red'
			});;
			range.removeClass('green');
			range.removeClass('orange');
			range.addClass('red');
			return 'red';
		}
	}
	function changeText() {
		var text = checkColor();
		if (text == 'red') {
			value = 'Strong';
			return value;
		}
		else if (text == 'orange') {
			value = 'Medium';
			return value;
		}
		else {
			value = 'Light';
			return value;
		}
	}
	checkColor();
	var textColor = changeText();
	number.val(textColor + " " + range.val());
};