(function (){
	'use strict';

	var angular = require('angular');

	angular.module('buyItNow')
		.component('shoppingCart', {
			templateUrl: 'js/components/shoppingCart/shoppingCart.html',
			controller: shoppingCartController
		});

	function shoppingCartController($scope){
		var ctrl = this;

		// registering to custom event
		$scope.$on('registerProduct', function (event, data){
			console.log('calling to another controller');
			console.log(event);
			console.log(data);
		});
	};
})();