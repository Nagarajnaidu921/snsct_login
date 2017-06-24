'use strict';
(function(){
	angular.module('myApp')
	.factory('TokenService', ['$window', '$http', TokenService]);
	function TokenService($window, $http) {
		function SaveToken(token){
			if(token) {
				$window.localStorage.setItem('token', token);
			}
		}

		function VerifyToken(){
			var token = {};
			token.data = $window.localStorage.getItem('token');
			return $http.post('/user/authenticate', token)
			.then(function(res){
				console.log(res.data);
				return res.data;
			});
		}
		return {
			SaveToken: SaveToken,
			VerifyToken: VerifyToken
		}
	}
})();