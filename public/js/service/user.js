'use strict';
function genObjForNotFy(Data) {
			var ObjForNotFy = {
				message: Data.msg,
				isSuccess: Data.isSuccess
			}
			if (Data.isSuccess) {
				ObjForNotFy.colorClass = 'success';
				ObjForNotFy.data = Data.data;
				return ObjForNotFy;
			}
			else {
				ObjForNotFy.colorClass = 'error';
				return ObjForNotFy;
			}
		}
(function(){
	angular.module('myApp')
	.factory('User', ['$http', '$window', User]);
	function User($http, $window) {
		function authenticate(data){
			if(data.reg && data.pwd){
				console.log(data);
				return $http.post('/user/login', data)
				.then(function(res){
					console.log(res.data);
					if(res.data.isSuccess){
						return  genObjForNotFy(res.data);
					}else
					if(!res.data.isSuccess){
						return  genObjForNotFy(res.data);
					}
				});
			}
		}
		return {
			authenticate: authenticate
		}
	}
})();