(function (){
	'use strict';
	var angular = require('angular');

	require('./templates');
	require('ngstorage');


	var app = angular.module('buyItNow', ['buyItNow.templates', "ngStorage"]);

	require('./app.provider');


	// common
	require('./components/common/header/header.component.js');
	require('./components/addProduct/addProducts.component.js');
	require('./components/shoppingCart/shoppingCart.component.js');
	require('./components/purchases/purchases.component.js');
})();