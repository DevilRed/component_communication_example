(function (){
	'use strict';

	var angular = require('angular');

	angular.module('buyItNow')
		.component('addProductForm', {
			templateUrl: 'js/components/addProduct/addProduct.html',
			controller: addProductController
		});

	function addProductController(){
		var ctrl = this;
		ctrl.products = [
			{ name: 'TV', price: 500},
			{ name: 'Microwave', price: 150},
			{ name: 'ChromeCast', price: 70},
		];
	};
})();