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

	  cartService.onItemsAdded(function(soldItems){
	    ctrl.soldItems = soldItems;
	    ctrl.orderTotal = 0;
	    angular.forEach(soldItems, function (val, key){
	    	ctrl.orderTotal += val.total;
	    })
	    console.log(soldItems);
	  });
	};
})();