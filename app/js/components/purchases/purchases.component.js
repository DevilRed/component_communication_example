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

		function purchasesController(cartService){
			var $ctrl = this;
			$ctrl.orders = [];

			$ctrl.$onInit = function (){
				$ctrl.purchasedItems = cartService.getSoldProducts();
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

					$ctrl.orders.push(currentOrder);
				}
			};
		};
})();