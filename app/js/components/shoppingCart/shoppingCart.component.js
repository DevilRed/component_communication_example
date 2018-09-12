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
		ctrl.$onInit = function (){
			ctrl.selectedProduct = {};
			ctrl.soldProducts = [];
		};

	  cartService.onItemsAdded(function(item, quantity){
	    ctrl.selectedProduct = item;
	    ctrl.selectedProduct.quantity = quantity;
	    ctrl.selectedProduct.total = item.price * quantity;

	    var isSoldProduct = checkIfSoldProduct(ctrl.soldProducts, ctrl.selectedProduct);
	    console.log(isSoldProduct);
	    if(ctrl.soldProducts.length == 0 || !isSoldProduct) {
	    	ctrl.soldProducts.push(ctrl.selectedProduct);
	    } else {
	    	ctrl.soldProducts.forEach(function (el){
	    		if(el.name === ctrl.selectedProduct.name) {
	    			ctrl.selectedProduct.quantity = quantity;
	    		}
	    	});
	    }
	  });
	};

	function checkIfSoldProduct(items, sold){
		var result = false;
		if( items.length != 0) {
		items.forEach(function (el){
			if( el.name === sold.name ) {
				result = true;
			}
		});
		}
		return result;
	};
})();