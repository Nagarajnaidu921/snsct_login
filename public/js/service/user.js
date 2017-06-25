'use strict';
(function(){
	angular.module('myApp')
	.factory('User', ['$http', User]);
	function User($http) {
		function authenticate(data){
			if(data.reg && data.pwd){
				// console.log(data);
				return $http.post('/user/login', data)
				.then(function(res){
					var data = res.data;
					console.log(data);
					if(data.isSuccess){
						return  data;
					}else
					if(!data.isSuccess){
						return  data;
					}
				});
			}
		}
		return {
			authenticate: authenticate
		}
	}
})();