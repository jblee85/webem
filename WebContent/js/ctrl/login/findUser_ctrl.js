angular.module('iceApp').controller('findUser_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','apiService','DEFINED','Session','$cacheFactory','$timeout',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,apiService,DEFINED,Session,$cacheFactory,$timeout) {

	const bizid = "em18";
	$scope.phoneCode = ['010','011','012','017'];
	$scope.phone1 = $scope.phoneCode[0];
	$scope.validChecksInit = {
		authCodeStatus: 0,
		isReqSMSSucceed: null,//if authcode message is received: true
		isSMSTimeExpired: null,//if SMSTimer is expired : true
		isAuthCodeValid: null //if SMSConfirm is successful : true
	};

	$scope.radioType = 'byPhone'; //byPhone:휴대전화 인증, byEmail:이메일로 인증
	$scope.showFindIdResult = false;

	let stop;
	$scope.init = () => {
		$timeout.cancel(stop);
		$scope.validChecks = angular.copy($scope.validChecksInit);
	}

	let smsModel = {
			userid:"guest",
			phone:"",
			username:"guest"
	};
	//Request Authcode
	//codeStatus(0:전송한적x, 1:첫전송, 2:재전송)
	$scope.requestAuthCode = (event, codeStatus, searchType) => {
		event.preventDefault();
		smsModel.phone = $scope.phone1 + "-" + $scope.phone2 + "-" + $scope.phone3;
		if(codeStatus == 2){
			delete smsModel.smscode;
		}
		if($scope.radioType == 'byEmail' || searchType == 'id'){
			if($scope.username == undefined || $scope.username == ""){
				alert("이름을 입력해 주세요.");
				return;
			}
		}
		if(searchType == 'pw'){
			if($scope.userid == undefined || $scope.userid == ""){
				alert("아이디를 입력해 주세요.");
				return;
			}
		}
		if($scope.radioType == 'byPhone'){
			if($scope.username == undefined || $scope.username == ""){
				alert("이름을 입력해 주세요.");
				return;
			}
			if( ($scope.phone2 == undefined || $scope.phone2 == "") || ($scope.phone3 == undefined || $scope.phone3 == "") ){
				alert("전화번호를 입력해 주세요.");
				return;
			}
			post_sendSMS(smsModel, codeStatus);
//			test_sendSMS(smsModel, codeStatus);
		} else {
			let username = $scope.username;
			let email = $scope.userid;
			get_sendEcode(username, email, codeStatus);
//			test_sendEcode(username, email, codeStatus);
		}
	}

	test_sendSMS = (smsModel, codeStatus) => {
		$scope.validChecks.authCodeStatus = codeStatus;
		$scope.validChecks.isReqSMSSucceed = true;
		$scope.authCode = "12345";
		countdown(codeStatus);
	}
	//Request RestAPI
	post_sendSMS = (smsModel, codeStatus) => {
		apiService.post_sendSMS(smsModel)
		.then(
				function(result){
					$scope.validChecks.authCodeStatus = codeStatus;//0:전송한적x, 1:첫전송, 2:재전송
					console.log(result);
					$scope.authCode = result.smscode;
					$scope.validChecks.isReqSMSSucceed = true;
					countdown(codeStatus);
				},function(errResponse){

				}
		)
	}

	test_sendEcode = (username, email, codeStatus) => {
		$scope.validChecks.authCodeStatus = codeStatus;
		$scope.validChecks.isReqSMSSucceed = true;
		$scope.authCode = "12345";
		countdown(codeStatus);
	}

	get_sendEcode = (username, email, codeStatus) => {
		apiService.get_sendEcode(username, email)
		.then(
				(result) => {
					console.log(result);
					$scope.validChecks.authCodeStatus = codeStatus;
					$scope.authCode = result.smscode;
					$scope.validChecks.isReqSMSSucceed = true;
					countdown(codeStatus);
				}, (errResponse) => {
					console.log(errResponse);
				}
		)
	}

	//format expMsg time
	formatSMSTimer = (expdt) => {
		$scope.min = "0"+parseInt($scope.expdt/60);
		$scope.sec = parseInt($scope.expdt%60);
		if($scope.sec < 10){
			$scope.sec = "0"+$scope.sec;
		}
		return $scope.min+":"+$scope.sec;
	}

	//인증시간 계산
	$scope.expdt = 5 * 60;
	$scope.expMsg = formatSMSTimer($scope.expdt);
//	$scope.expdt = 10; //테스트 시간

	countdown = (codeStatus) => { //0:전송한적x, 1:첫전송, 2:재전송
		if(codeStatus == 2){
			$timeout.cancel(stop);
			$scope.expdt = 5 * 60;
			$scope.validChecks.isReqSMSSucceed = true;
			$scope.validChecks.isSMSTimeExpired = false;
//			$scope.expdt = 10; //재전송 시 테스트 시간
		}
		stop = $timeout( () => {
			$scope.expdt--;
			$scope.expMsg = formatSMSTimer($scope.expdt);
			if($scope.expdt == 0){
				$timeout.cancel(stop);
				$scope.validChecks.isReqSMSSucceed = null;
				$scope.validChecks.isSMSTimeExpired = true;
			} else {
				countdown();
			}
		}, 1000);
	};

	//SMS 인증
	$scope.confirmAuthCode = (event) => {
		event.preventDefault();
		if($scope.authCode != undefined && $scope.authCode != ''){
			smsModel.smscode = $scope.authCode;
//			test_confirmSMS(smsModel);
			get_confirmSMS(smsModel); //SMS 인증 요청
		}
	}
	test_confirmSMS = (smsModel) => {
		$scope.validChecks.isAuthCodeValid = true;
		$timeout.cancel(stop);
	}
	get_confirmSMS = (smsModel) => { // type종류 -> sms:번호인증, email:이메일인증
		apiService.get_confirm(smsModel)
		.then(
				function(result){
					$timeout.cancel(stop);
					$scope.validChecks.isAuthCodeValid = true;
				},function(errResponse){
					if(JSON.parse(errResponse.data).errcode == 12){
						$scope.validChecks.isSMSTimeExpired = null;
						$scope.validChecks.isAuthCodeValid = false;
						$timeout.cancel(stop);
						return;
					}
				}
			)
	}
	$scope.findBtnDisable = (searchType) => { //searchType: 아이디찾기(id), 비밀번호찾기(pw)
		if($scope.radioType == 'byEmail'){
			if($scope.username == undefined || $scope.username == ''){return true;}
		}
		if(searchType == 'pw'){
			if($scope.userid == undefined || $scope.userid == ''){return true;}
		}
		if($scope.validChecks.isAuthCodeValid != true){return true;}
	}
	$scope.findUserInfo = (event, searchType) => {
		event.preventDefault();
		let phone;
		if($scope.radioType == 'byPhone'){
			phone = $scope.phone1 + "-" + $scope.phone2 + "-" + $scope.phone3;
		}
		let username = $scope.username;
		let userid = $scope.userid;
//		test_searchUser(phone, username, userid, searchType);
		get_searchUser(phone, username, userid, searchType);
	}

	test_searchUser = (phone,username,userid, searchType) => {
		let pwModel = {
			userid:"",
			newpassword:""
		};
		let userModel = {};
		userModel.userid = userid;
		userModel.username = username;
		pwModel.userid = userid;
		$state.go('resetPw', {
			userModel: userModel,
			pwModel: pwModel
		});
	}

	get_searchUser = (phone,username,userid, searchType) => {
		apiService.get_searchUser(phone,username, userid)
		.then(
				function(result) {
					console.log(result);
					let userModel = result;
					if(searchType == 'id'){
						get_findId(phone, username, userModel);
					} else {
						var pwModel = {"userid":"", "newpassword":""};
						$scope.pwModel.userid = result.userid;
						$state.go('resetPw', {
							pwModel: $scope.pwModel
						});
					}
				},
				function(errResponse){
					if(JSON.parse(errResponse.data).errcode == 15){
						$timeout.cancel(stop);
						alert("일치하는 정보를 찾을 수 없습니다. 정보를 맞게 입력해주세요.");
						return;
					}
				}
		);
	}
	get_findId = (phone, username, userModel) => {
		apiService.get_findId(phone, username, userModel)
		.then(
				function(result) {
					console.log(result);
					$scope.regdt = userModel.rdt;
					$scope.foundId = result;
					$scope.showFindIdResult = true;
				},
				function(errResponse){
					if(JSON.parse(errResponse.data).errcode == 15){
						$timeout.cancel(stop);
						alert("일치하는 아이디를 찾을 수 없습니다. 정보를 맞게 입력해주세요.");
						return;
					}
				}
		);
	}

	//---------------------------------------------- changePw ----------------------------------------------
	$scope.changeRadioType = (radioType) => {
		$scope.radioType = radioType;
	}
	$scope.resetInputs = () => {
		$scope.username = '';
		$scope.userid = '';
		$scope.authCode = '';
		$scope.phone2 = '';
		$scope.phone3 = '';

		$scope.validChecks = angular.copy($scope.validChecksInit);
		$timeout.cancel(stop);
		$scope.expdt = 5 * 60;
		formatSMSTimer($scope.expdt);
	}
}]);