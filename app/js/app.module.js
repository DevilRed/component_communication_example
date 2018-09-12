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
	  var callbacks=[];
	  var addItemToCart=function(selectedItem, quantity){
	  	// this is where the magic happens
	    var someData = 'this is another someData';

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