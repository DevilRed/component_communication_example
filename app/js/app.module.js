(function (){
	'use strict';
	var angular = require('angular');

	require('./templates');


	var app = angular.module('buyItNow', ['buyItNow.templates']);




	// common
	require('./components/common/header/header.component.js');
	require('./components/addProduct/addProducts.component.js');
})();