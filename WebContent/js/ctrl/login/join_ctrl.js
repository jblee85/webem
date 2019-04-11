angular.module('iceApp').controller('join_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','apiService','DEFINED','MODEL','Session','$cacheFactory','$timeout','$sce',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,apiService,DEFINED,MODEL,Session,$cacheFactory,$timeout, $sce) {

	const bizid = "em18";
	$scope.phoneCode = ['010','011','012','017'];
	$scope.phone1 = $scope.phoneCode[0];
	$scope.userModel = MODEL.USER;
	console.log($scope.userModel);
	$scope.validChecks = {
		isDuplicate: null, //duplicate: true, usable: false
		isPwMatch: null, //pw match : true
		authCodeStatus: 0,
		isReqSMSSucceed: null,//if authcode message is received: true
		isSMSTimeExpired: null,//if SMSTimer is expired : true
		isAuthCodeValid: null //if SMSConfirm is successful : true
	};

	//make Duplicate validation check to null
	$scope.setIsDuplicateToNull = () => {
		$scope.validChecks.isDuplicate = null;
	}
	//check if userid is duplicate
	$scope.dupChk = (event) => {
		event.preventDefault();
		let userid = $scope.userid;
		apiService.get_BizidAuth(userid)
		.then(
			function(isUser){ //true면 이미 존재, false면 사용가능
				$scope.userModel.userid = userid;
				$scope.validChecks.isDuplicate = isUser;
			},function(errResponse){
				console.log(errResponse);
			}
		);
	}
	//inputPassword and inputPassword2 is matched
	$scope.setIsPasswordMatch = () => {
		let pw = $scope.password;
		let pw2 = $scope.password2;
		$scope.validChecks.isPwMatch = null;
		if(pw != undefined && pw2 != undefined){
			if(pw == pw2){
				$scope.validChecks.isPwMatch = true;
				$scope.userModel.password = pw;
			} else {
				$scope.validChecks.isPwMatch = false;
			}
		}
	}
	let smsModel = {
			userid:"",
			phone:"",
			username:""
	};
	//Request Authcode
	//codeStatus(0:전송한적x, 1:첫전송, 2:재전송)
	$scope.requestAuthCode = (event, codeStatus) => {
		event.preventDefault();
		smsModel.userid = "guest";
		smsModel.phone = $scope.phone1 + "-" + $scope.phone2 + "-" + $scope.phone3;
		smsModel.username = $scope.name;
		if(codeStatus == 2){
			delete smsModel.smscode;
		}
		if($scope.validChecks.isDuplicate != false){
			alert("아이디 중복확인을 해주세요.");
			return;
		}
		if( ($scope.phone2 == undefined || $scope.phone2 == "") || ($scope.phone3 == undefined || $scope.phone3 == "") ){
			alert("전화번호를 입력해 주세요.");
			return;
		}
		if($scope.name == undefined || $scope.name == ''){
			alert("이름을 입력해 주세요.");
			return;
		}
		$scope.userModel.namecard.name = smsModel.username;
		$scope.userModel.namecard.pos = $scope.pos;
		$scope.userModel.namecard.sphone = smsModel.phone;
		post_sendSMS(smsModel, codeStatus);
//		test_sendSMS(smsModel, codeStatus);
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
	let stop;
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
		$scope.validChecks.isAuthCodeValid = false;
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
	$scope.signUp = (event) => {
		event.preventDefault();
		$scope.userModel.enable = false;
		$scope.userModel.auth.siteids.push($scope.userSiteid);
		console.log($scope.userModel);
		apiService.post_userModel($scope.userModel)
		.then(
			function(result){
				alert("회원가입이 완료되었습니다.");
				$state.go('login');
			},function(errResponse){

			}
		)
	}
	$scope.signUpBtnDisable = () => {
		if($scope.validChecks.isDuplicate != false){return true;}
		if($scope.validChecks.isPwMatch != true){return true;}
		if($scope.name == undefined || $scope.name == ''){return true;}
		if($scope.pos == undefined || $scope.pos == ''){return true;}
		if($scope.validChecks.isAuthCodeValid != true){return true;}
	}
	$scope.getSite = () => {
		$rootScope.loadingStart();
		apiService.gets_Site()
	  	.then(
	  			function(d) {
	  				try{
	  					$scope.siteList = d;
	  					if($scope.siteList.length > 0){
	  						$scope.site = $scope.siteList[0].sid;
	  					}
	  					$rootScope.loadingStop();
	  				}catch(e){
	  					$rootScope.loadingStop();
	  				}

	  			},
	  			function(errResponse){
	  				$rootScope.loadingStop();
	  				if(errResponse.data != null){
	  					if(JSON.parse(errResponse.data).errcode == '15'){
	  						//alert("에러 발생");
	  					}else if(JSON.parse(errResponse.data).errcode == '13'){
	  					//	alert("에러 발생");
	  					}
	  				}else{
	  					alert("서버와 연결되어 있지 않습니다.");
	  				}
	  			}
	  	);
	}

	$scope.getSite();
}]);