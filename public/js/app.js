'use strict';
(function() {
	angular.module('myApp', ['ngRoute'])
	.config(['$routeProvider',config])
	function config($routeProvider){
		$routeProvider
		.when('/login', {
			templateUrl: '../partials/login.html'
		})
		.when('/home',{
			templateUrl: '../partials/sample.html'
		})
		.otherwise('/login');
	}
})();