;
//Цветное значение Range
$(document).ready(function() {
	var range = $('.strengthLevel');
	var number = $('.strengthLevelNumber');
	strength();
	range.change(function(event) {
		strength();
	});
});

//Основной модуль
(function(window){
	'use strict';
	var FORM_SELECTOR = '[data-coffee-order="form"]';
	var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
	var App = window.App;
	var Truck = App.Truck;
	var DataStore = App.DataStore;
	var FormHandler = App.FormHandler;
	var Validation = App.Validation;
	var CheckList = App.CheckList;
	var myTruck = new Truck('ncc-1701', new DataStore());
	var checkList = new CheckList(CHECKLIST_SELECTOR);
	checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
	var formHandler = new FormHandler(FORM_SELECTOR);
	formHandler.addSubmitHandler(function (data) {
		myTruck.createOrder.call(myTruck, data);
		checkList.addRow.call(checkList, data);
	});
	formHandler.addInputHandler(Validation.isCompanyEmail);
	formHandler.addInputHandlerCoffee(Validation.isValidableCoffee);
	formHandler.addInputHandlerStrength(Validation.isValidableStrength);
	window.myTruck = myTruck;
})(window);