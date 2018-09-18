(function (angular){
	'use strict';

	var angular = require('angular');

	angular.module('buyItNow')
		.component('addProductForm', {
			templateUrl: 'js/components/addProduct/addProduct.html',
			controller: ['$scope', '$rootScope', 'cartService', addProductController],
		});

	function addProductController($scope, $rootScope, cartService){
		var ctrl = this;

		ctrl.$onInit = function (){
			ctrl.products = cartService.getProducts();
		};

		// using the factory service
		ctrl.saveProduct = function (){
			$scope.addToCart = cartService.addItemToCart(ctrl.selected, ctrl.quantity);
		};
	  //subscribe items added callback
	  cartService.onItemsAdded(function(items){
	  	$scope.cartItems = items;
	  });
	};
})(window.angular);