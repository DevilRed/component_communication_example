(function (){
	'use strict';

	var angular = require('angular');

	angular.module('buyItNow')
		.component('addProductForm', {
			templateUrl: 'js/components/addProduct/addProduct.html',
			controller: addProductController,
		});

	function addProductController($scope, $rootScope, cartService){
		var ctrl = this;

		ctrl.$onInit = function (){
			ctrl.products = [
				{ name: 'TV', price: 500},
				{ name: 'Microwave', price: 150},
				{ name: 'ChromeCast', price: 70},
			];
		};

		// using the factory service
		ctrl.saveProduct = function (){
			$scope.addToCart = cartService.addItemToCart();
		};
	  //subscribe items added callback
	  cartService.onItemsAdded(function(items){
	  	$scope.cartItems = items;
	  });
	};
})();