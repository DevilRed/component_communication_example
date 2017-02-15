'use strict';
var angular = require('angular');
// require('angular-loader');
// require('angular-mocks');
require('angular-route');

// requiring templates.js and injecting as a module's dependency
require('./templates');


	var app = angular.module('buyItNow', ['ngRoute', 'buyItNow.templates']);




	// common
	require('./components/common/header/header.component.js');
	/*require('./components/common/navigation/navigation.component.js');

	// app
	require('./components/workers/workersList/workersList.component.js');
	require('./components/anohterComponent/another.component.js');
	require('./components/workers/workerView/workerView.component.js');
	require('./components/cities/cities.component.js');
	require('./components/cities/city.component.js');*/