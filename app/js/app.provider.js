(function (){
	'use strict';

	var angular = require('angular');

	angular.module('buyItNow')
		.config(function ($provide){
			$provide.factory("cartService", function (){
				  var callbacks=[];
				  var addItemToCart=function(selectedItem, quantity){
					  // notify if there are any listeners
					  // the components can register functions that will be executed
					  var i=0;
					  for(i=0; i<callbacks.length;i++)
					  	callbacks[i](selectedItem, quantity);// here we are exposing the shared data between components, so it becomes available in any component
					}


				  //register listener, this will be used by another components
				  var onItemsAdded=function(callback){
				    callbacks.push(callback);
				  }

				  var getProducts = function (){
				  	return [
					  	{ name: 'TV', price: 500},
					  	{ name: 'Microwave', price: 150},
					  	{ name: 'ChromeCast', price: 70},
				  	];
				  };
				  return{
				    onItemsAdded:onItemsAdded,
				    addItemToCart:addItemToCart,
				    getProducts: getProducts
				  }
			});
		});
})();