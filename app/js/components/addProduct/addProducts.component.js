(function (){
	'use strict';

	var angular = require('angular');

	angular.module('buyItNow')
		.component('addProductForm', {
			templateUrl: 'js/components/addProduct/addProduct.html',
			controller: addProductController,
		});

	function addProductController($rootScope){
		var ctrl = this;

		ctrl.$onInit = function (){
			ctrl.products = [
				{ name: 'TV', price: 500},
				{ name: 'Microwave', price: 150},
				{ name: 'ChromeCast', price: 70},
			];
		};


		ctrl.saveProduct = function (){
			// launching the custom event
			$rootScope.$broadcast('registerProduct', ctrl.selected);
		};
	};
})();