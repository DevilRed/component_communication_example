(function (){
	'use strict';

	var angular = require('angular');
	angular.module('buyItNow')
		.component('purchasesList', {
			templateUrl: 'js/components/purchases/purchases.html',
			controller: purchasesController,
			bindings: {
				purchasesList: '<'
			}
		})
	;

		function purchasesController(cartService, $localStorage){
			var $ctrl = this;
			$ctrl.orders = [];

			$ctrl.$onInit = function (){
				$ctrl.purchasedItems = cartService.getSoldProducts();
				if(typeof $localStorage.purchasedOrders == "undefined") {
					$localStorage.purchasedOrders = [];
				}
				$ctrl.orders = $localStorage.purchasedOrders;
			};

			$ctrl.doOrder = function (){
				if($ctrl.purchasedItems.length != 0){
					var currentOrder = {};
					currentOrder.submitDate = new Date();
					var totalPurchase = 0;
					$ctrl.purchasedItems.forEach(function (item){
						totalPurchase += item.total;
					});
					currentOrder.total = totalPurchase;
					currentOrder.orderItems = $ctrl.purchasedItems;

					$localStorage.purchasedOrders.push(currentOrder);
					cartService.deleteCart();
				}
			};
		};
})();