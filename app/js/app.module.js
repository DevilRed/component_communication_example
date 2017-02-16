(function (){
	'use strict';
	var angular = require('angular');

	require('./templates');


	var app = angular.module('buyItNow', ['buyItNow.templates']);

	// doing a service for component communication, source: http://www.aurorasolutions.io/blog/angularjs-cross-component-communication/
	/*
		There could be many ways in which components can communicate between they:
			- Communicating with inherited scopes
			- Communicating with events
			- Communicating with services
	 */
	app.factory("cartService",function(){
	  var callbacks = [];
	  var soldItems = [];
	  var addItemToCart=function(item, quantity){
	    var idx = soldItems.indexOf(item);
	    if(idx >= 0){
	    	soldItems[idx].quantity = quantity;
	    	soldItems[idx].total = doTotal(quantity, item.price);
	    } else{
	    	item.quantity = quantity;
	    	item.total = doTotal(quantity, item.price);
	    	soldItems.push(item);
	    }

		  var i=0;
		  for(i=0; i<callbacks.length;i++){
		  	callbacks[i](soldItems);
		  }
		}

		var doTotal = function (q, p){
			return q * p;
		};


	  //register listener, this will be used by another components
	  var onItemsAdded=function(callback){
	    callbacks.push(callback);
	  }
	  return{
	    onItemsAdded:onItemsAdded,
	    addItemToCart:addItemToCart
	  }
	});


	// common
	require('./components/common/header/header.component.js');
	require('./components/addProduct/addProducts.component.js');
	require('./components/shoppingCart/shoppingCart.component.js');
})();