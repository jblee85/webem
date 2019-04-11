angular.module('iceApp').controller('resetPw_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','$interval','AUTH_EVENTS','apiService','DEFINED','Session','$cacheFactory','$timeout', '$stateParams',
	function($scope, $state, $window, $location, $rootScope,$interval,AUTH_EVENTS,apiService,DEFINED,Session,$cacheFactory,$timeout, $stateParams) {

	$scope.showPwChangeResult = false ;
	let pwModel = $stateParams.pwModel;
	$scope.userModel = $stateParams.userModel;
	//비밀번호 재설정 페이지에서 새 비밀번호
	$scope.resetPassword = (event) => {
		event.preventDefault();
		if($scope.validChecks.isPwMatch == true) {
			pwModel.newpassword = $scope.password;
//			test_resetPw(pwModel);
			put_resetPw(pwModel);
		}

	};

	test_resetPw = (pwModel) => {
		$scope.userModel.udt = new Date();
		$scope.showPwChangeResult = true;
		console.log($scope.userModel);
	}

	put_resetPw = (pwModel) => {
		apiService.put_resetPw(pwModel)
		.then(
				function(result) {
					console.log($scope.userModel);
					$scope.showPwChangeResult = true;
				},
				function(errResponse){
				}
		);
	}

	$scope.validChecks = {
		isPwMatch: null, //pw match : true
	};
	$scope.setIsPasswordMatch = () => {
		let pw = $scope.password;
		let pw2 = $scope.password2;
		$scope.validChecks.isPwMatch = null;
		if(pw != undefined && pw2 != undefined){
			pw == pw2 ? $scope.validChecks.isPwMatch = true : $scope.validChecks.isPwMatch = false;
		}
	}
}]);