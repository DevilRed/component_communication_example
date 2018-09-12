(function (){
	'use strict';

	var angular = require('angular');

	angular.module('buyItNow')
		.component('shoppingCart', {
			templateUrl: 'js/components/shoppingCart/shoppingCart.html',
			controller: shoppingCartController
		});

	function shoppingCartController($scope, cartService, $localStorage){
		var ctrl = this;
		ctrl.products = cartService.getProducts();
		ctrl.$onInit = function (){
			ctrl.selectedProduct = {};
			ctrl.soldProducts = $localStorage.soldProducts || [];
		};

	  cartService.onItemsAdded(function(item, quantity){
	    ctrl.selectedProduct = item;
	    ctrl.selectedProduct.quantity = quantity;
	    ctrl.selectedProduct.total = item.price * quantity;

	    var isSoldProduct = checkIfSoldProduct($localStorage.soldProducts, ctrl.selectedProduct);
	    console.log(isSoldProduct);
	    if($localStorage.soldProducts.length == 0 || !isSoldProduct) {
	    	$localStorage.soldProducts.push(ctrl.selectedProduct);
	    } else {
	    	$localStorage.soldProducts.forEach(function (el){
	    		if(el.name === ctrl.selectedProduct.name) {
	    			el.quantity = quantity;
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