'use strict';
(function(){
	angular.module('myApp')
	.controller('loginCtrl', ['$scope', '$timeout', '$window', '$location', 'User', 'TokenService', loginCtrl]);
	function loginCtrl($scope, $timeout, $window, $location, User, TokenService) {
		$scope.token = $window.localStorage.getItem('token');
		if(!$scope.token){
		$location.path('/login');
	}
	else
		if($scope.token){
			TokenService.VerifyToken()
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
			 		// console.log(res.data.token);
			 		TokenService.SaveToken(res.data.token);
			 		// console.log($location.path());
			 		// console.log($window.localStorage.getItem('token'));
			 	}
			 });

		}
		$scope.signout =function(){
			$scope.token = $window.localStorage.removeItem('token');
			$location.path('/login');
			console.log($scope.token);
		}
	}
})();