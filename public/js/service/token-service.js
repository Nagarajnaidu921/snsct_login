'use strict';
(function(){
	angular.module('myApp')
	.factory('TokenService', ['$window', '$http', TokenService]);
	function TokenService($window, $http) {
		var localStorage = $window.localStorage;
		var key = 'token';
		function saveToken(token){
			if(token) {
				localStorage.setItem('token', token);
			}
		}
		function getToken(){
			return localStorage.getItem(key);
		}
		function removeToken(){
			localStorage.removeItem(key);
		}
		function verifyToken(){
			var token = {}
			token.data = getToken();
			return $http.post('/user/authenticate', token)
			.then(function(res){
				console.log(res.data);
				return res.data;
			});
		}
		return {
			saveToken: saveToken,
			getToken:  getToken,
			removeToken: removeToken,
			verifyToken: verifyToken
		}
	}
})();