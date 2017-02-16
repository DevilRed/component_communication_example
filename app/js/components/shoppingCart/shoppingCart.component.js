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

	  //subscribe items added callback
		$scope.totalItems = 0;

	  cartService.onItemsAdded(function(items, another){
	    $scope.totalItems = items;
	    console.log('reacting to the event using a service ' + $scope.totalItems);
	    console.log(another);
	  });
	};
})();