(function (){
	'use strict';

	var angular = require('angular');

	angular.module('buyItNow')
		.component('shoppingCart', {
			templateUrl: 'js/components/shoppingCart/shoppingCart.html',
			controller: shoppingCartController
		});

	function shoppingCartController($scope, cartService){
		var ctrl = this;
		ctrl.products = [
			{ name: 'TV', price: 500},
			{ name: 'Microwave', price: 150},
			{ name: 'ChromeCast', price: 70},
		];
		ctrl.selectedProduct = [];

	  cartService.onItemsAdded(function(item, quantity){
	    ctrl.selectedProduct = item;
	    ctrl.selectedProduct.quantity = quantity;
	    ctrl.selectedProduct.total = item.price * quantity;
	    console.log(ctrl.selectedProduct);
	  });
	};
})();