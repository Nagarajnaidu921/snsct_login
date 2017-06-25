'use strict';
(function(){
	angular.module('myApp')
	.controller('loginCtrl', ['$scope', '$timeout', '$location', 'User', 'TokenService', loginCtrl]);
	function loginCtrl($scope, $timeout, $location, User, TokenService) {
		var token = TokenService.getToken();
		if(!token){
			$location.path('/login');
		}
		else
			if(token){
				console.log($location.path());
				TokenService.verifyToken()
				.then(function(res){
					if(res.isSuccess){
						$location.path('/home');
					}
				})

			}
			$scope.login = function() {
				$scope.regNumPattern = /[1-9][1-9](au|ae|ag|bm|ce|cp|cs|ee|ei|ec|it|mc|me|ma)[0-9][0-9][0-9]/gm;
				var data = {reg:  $scope.user.regNum, pwd: $scope.user.password}; 
				console.log(data);
				User.authenticate(data)
				.then(function(res){
					if(res.isSuccess == false){
						$scope.statusMsg = res.message;
						$timeout(function(){$scope.statusMsg ="";}, 6000);
					}else
					if(res.isSuccess){
						$scope.user = {};
						$location.path('/home');
						TokenService.saveToken(res.token);
					}
				});
			}
			$scope.signout =function(){
				$scope.token = TokenService.removeToken();
				$location.path('/login');
			}
		}
	})();