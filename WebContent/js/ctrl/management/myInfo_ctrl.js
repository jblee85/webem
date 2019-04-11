'use strict';
angular.module('iceApp').controller('myInfo_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','apiService','DEFINED','MODEL','Session','$cacheFactory','$timeout',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,apiService,DEFINED,MODEL,Session,$cacheFactory,$timeout) {


	// 사용자 정보 조회 API
	 var getBizdUser = function() {
	  	apiService.get_Bizd_id_User($rootScope.currentUser.userid)
	  	.then(
	  			function(d) {
	  				angular.copy(d.namecard, $rootScope.currentUser.namecard);
	  				$scope.userModel = d;
	  				switch($scope.userModel.auth.authlv) {
	  				case 0:
	  					$scope.authName = "guest"
	  					break;
	  				case 1:
	  					$scope.authName = "회원"
	  					break;
	  				case 2:
	  					$scope.authName = "관리자"
	  					break;
	  				case 3:
	  					$scope.authName = "최고관리자"
	  					break;
	  				}
	  				if($scope.userModel.namecard.sphone.length > 0){
	  					$scope.phone = $scope.userModel.namecard.sphone.split("-");
	  				}
	  			},
	  			function(errResponse){
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
	 getBizdUser();
 // 사용자 정보 수정 API
	 $scope.confirm = function() {
		 $scope.userModel.rdt = convertDateStringsToDates($scope.userModel.rdt);
		 delete $scope.userModel.required;
		 delete $scope.userModel.requirement;
		 delete $scope.userModel.namecard.required;
		 delete $scope.userModel.auth.admin;
		 delete $scope.userModel.auth.sitejunior;
		 delete $scope.userModel.auth.sitemajor;
		 delete $scope.userModel.auth.user;
		 if($scope.phone.length == 3){
			 for(var i in $scope.phone){
				 if($scope.phone[i] == ""){
					 alert("연락처를 빠짐없이 입력해 주세요.");
					 return;
				 }
			 }
			 $scope.userModel.namecard.sphone = $scope.phone[0]+"-"+$scope.phone[1]+"-"+$scope.phone[2];
		 }


		 console.log($scope.userModel);
	  	apiService.put_userModel($scope.userModel)
	  	.then(
	  			function(d) {
	  				alert("저장 하였습니다.");
	  				getBizdUser();
	  			},
	  			function(errResponse){
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

	 $scope.userModel = MODEL.USER;

	$scope.phone_list = ["010", "011", "016", "017", "019"];
	$scope.phone = ["","",""];


	$scope.cancel = function() {
		$scope.userModel = null;
		$state.go('dashboard');
	}

	//비밀번호 변경
	$scope.modiPassword = function(){
		var tempobj = {};
		tempobj.userid = $scope.userModel.userid;
		tempobj.apiService = apiService;
		$rootScope.ModalOpen(tempobj, './jsp/modal/modify_password.jsp','myInfo_modifyPassword_ctrl');
		$rootScope.modalInstance.result.then(function (val) {
			getBizdUser();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
	}
	//휴대폰 변경
	$scope.modiPhone = function(){
		var tempobj = {};
		tempobj.userid = $scope.userModel.userid;
		tempobj.username = $scope.userModel.namecard.name;
		tempobj.phone = $scope.userModel.namecard.sphone;
		tempobj.apiService = apiService;
		$rootScope.ModalOpen(tempobj, './jsp/modal/modify_phone.jsp','myInfo_modifyPhone_ctrl');
		$rootScope.modalInstance.result.then(function (val) {
			$scope.userModel.namecard.sphone = val;
			$scope.phone = val.split("-");
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
	}


}]);
app.controller('myInfo_modifyPassword_ctrl', function($scope, $uibModalInstance, params) {
	$scope.returnVal =[];
	$scope.UserPasswordChangeReqb={userid:params.userid,password:"",newpassword:"",newpassword1:""};

    $scope.ok = function() {
    	if($scope.UserPasswordChangeReqb.newpassword == $scope.UserPasswordChangeReqb.newpassword1){
    		params.apiService.get_check_password($scope.UserPasswordChangeReqb.userid,$scope.UserPasswordChangeReqb.password)
        	.then(
        		function(d) {
        			if(d){
        				delete $scope.UserPasswordChangeReqb.newpassword1;
        				params.apiService.put_password($scope.UserPasswordChangeReqb)
            	    	.then(
            	    		function(d) {
            	    			alert("비밀번호가 변경 되었습니다.");
            	    			$uibModalInstance.close();
            	    		},
            	    		function(errResponse){
            	    			if(errResponse.data.errcode == 12){
            	    				alert("비밀번호가 비어있거나 기존 비밀번호와 일치하지 않습니다.");
            	    			}else if(errResponse.data.errcode == 11){
            	    				alert("기존 비밀번호와 일치합니다.");
            	    			}
            	    			console.log("errResponse get_schedule status : "+errResponse.status);
            	    		}
            	    	);
        			}else{
        				alert("기존 비밀번호와 일치하지 않습니다.");
        			}

        		},
        		function(errResponse){
        			alert("비밀번호가 일치하지 않습니다.");
        			console.log("errResponse get_schedule status : "+errResponse.status);
        		}
        	);
    	}else{
    		alert("새로운 비밀번호가 일치하지 않습니다.");
    	}
    };

    $scope.cancel = function() {
    	$uibModalInstance.dismiss('cancel');
    };
});
app.controller('myInfo_modifyPhone_ctrl', function($scope, $uibModalInstance, params) {
	$scope.returnVal =[];
	$scope.UserSmsAuthReqb={userid:params.userid,phone:params.phone,username:params.username};
	$scope.phone_list = ["010", "011", "016", "017", "019"];
	if($scope.UserSmsAuthReqb.phone != null){
		$scope.phone = $scope.UserSmsAuthReqb.phone.split("-");
	}else{
		$scope.UserSmsAuthReqb.phone = "";
	}

	$scope.isSave = false;
	$scope.smsCode="";
	//인증번호 요청
	$scope.requestSMS = function(){
		$scope.UserSmsAuthReqb.phone = $scope.phone[0]+"-"+$scope.phone[1]+"-"+$scope.phone[2];
		params.apiService.post_sendSMS_reauth($scope.UserSmsAuthReqb)
    	.then(
    		function(d) {
    			$scope.isSave = false;
    			alert("인증번호가 전송 되었습니다.");
    		},
    		function(errResponse){
    			console.log("errResponse get_schedule status : "+errResponse.status);
    		}
    	);
	}
	//인증번호 확인
	$scope.confirmSMS = function(){
		$scope.UserSmsAuthReqb.phone = $scope.phone[0]+"-"+$scope.phone[1]+"-"+$scope.phone[2];
		var param = {
				"userid":$scope.UserSmsAuthReqb.userid,
				"smscode":$scope.smsCode,
				"phone":$scope.UserSmsAuthReqb.phone
			};
		params.apiService.get_confirm(param)
    	.then(
    		function(d) {
    			alert("인증번호가 일치 합니다.");
    			$scope.isSave = true;
    		},
    		function(errResponse){
    			alert("인증번호가 일치하지 않습니다.");
    			console.log("errResponse get_schedule status : "+errResponse.status);
    		}
    	);
	}
	$scope.$watch('phone',function(newVal, oldVal){
		if(!angular.equals($scope.phone, newVal) && $scope.phone.length != 0 && newVal != undefined){
			$scope.isSave = true;
		}else{
			$scope.isSave = false;
		}
	},true);
    $scope.ok = function() {
    	$scope.UserSmsAuthReqb.phone = $scope.phone[0]+"-"+$scope.phone[1]+"-"+$scope.phone[2];
    	$uibModalInstance.close($scope.UserSmsAuthReqb.phone);
    };

    $scope.cancel = function() {
    	$uibModalInstance.dismiss('cancel');
    };
});
