'use strict';
(function(){
	angular.module('myApp')
	.controller('loginCtrl', ['$scope', '$timeout', 'User', loginCtrl]);
	function loginCtrl($scope, $timeout, User) {
		$scope.login = function() {
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
			 	}
			 });

		}
	}
})();