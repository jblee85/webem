'use strict';
angular.module('iceApp').controller('userInfo_ctrl',[ '$scope','$state','$rootScope', '$window','apiService','DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $state, $rootScope,$window,apiService, DTOptionsBuilder, DTColumnDefBuilder) {

	// 직책
	$scope.positions = ["수석연구원", "책임연구원" , "선임연구원", "연구원", "인턴"];

	//$scope.myPostion = $scope.positions[2];


	$scope.userInfo = {
			"id" : "xotnekzz",
			"pw1" : "1234",
			"pw2" : "1234",
			"name" : "김태수",
			"position" : "인턴",
			"phone1" : "010",
			"phone2" : "1234",
			"phone3" : "1234",
			"code" : ""
	};

	$scope.userInfos = [ ];

	$scope.flag = false;

	// 비밀번호 확인
	$scope.userConfilm = function() {
	  if($scope.flag == true) {
		if ($scope.userInfo.pw1 == null || $scope.userInfo.pw1 == ""){
			$scope.userInfo.message = "비밀번호를 입력해주세요";
		} else if ($scope.userInfo.pw2 == null || $scope.userInfo.pw2 == "") {
			$scope.userInfo.message = "비밀번호를 입력해주세요";
		} else if ($scope.userInfo.pw1 != $scope.userInfo.pw2) {
			$scope.userInfo.message = "비밀번호가 일치하지 않습니다.";
		} else if ($scope.userInfo.pw1 == $scope.userInfo.pw2) {
			$scope.getUserInfos();
		}
	  }
	  return;
	}

	$scope.code = function() {
		$scope.message = "인증코드가 발송되었습니다.";
		$scope.userInfo.code = 1111;
	}

	$scope.codeConfilm = function() {
		if($scope.userInfo.code == 1111) {
		 $scope.code_message = "인증이 완료되었습니다.";
		 $scope.flag = true;
		} else {
		 $scope.code_message = "인증 코드를 확인해주세요.";
		}
	}

	// ng-hide
	$scope.visible = false;

	// ng-show
	$scope.getUserInfo = function() {
		$scope.visible = $scope.visible = true;
	}

	$scope.exitUserInfo = function() {
		$scope.visible = $scope.visible = false;
	}

	$scope.getUserInfos = function() {
		var newUser = {
			"id" : $scope.userInfo.id,
			"pw1" : $scope.userInfo.pw1,
			"pw2" : $scope.userInfo.pw2,
			"name" : $scope.userInfo.name,
			"position" : $scope.userInfo.position,
			"phone1" : $scope.userInfo.phone1,
			"phone2" : $scope.userInfo.phone2,
			"phone3" : $scope.userInfo.phone3,
			"code" : ""
		};
		$scope.userInfos.push(newUser);
	}

	$scope.count = 0;

	$scope.fontChange = function() {
		$scope.font = "sky";
	}

	$scope.fontUnChange = function() {
		$scope.font = "";
	}

}]);