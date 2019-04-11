'use strict';
angular.module('iceApp').controller('userApproval_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','apiService','DEFINED','Session','$cacheFactory','$timeout','$q','DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,apiService,DEFINED,Session,$cacheFactory,$timeout,$q,DTOptionsBuilder, DTColumnDefBuilder) {

	$scope.dtColumns = [
        DTColumnDefBuilder.newColumnDef(0).notSortable()
     ];
	$scope.dtOptions = DTOptionsBuilder.newOptions()
	.withLanguage(dtOption)
	.withOption('searching', true) //검색 기능
	.withOption('paging', true)
	.withOption('lengthChange', false) //검색 출력수
		.withOption('info', false)
	.withOption('order',[[5,'desc']])
	$("#userListserachbox").keyup(function() {
		$('#userListTable').dataTable().fnFilter(this.value);
    });
	$scope.selectAllUsers = false;
	$scope.getUsers = function(){
		apiService.get_Users()
		.then(
			function(d){
				$scope.userList = [];
				$scope.userList = d;
				for(var i in $scope.userList){
					switch($scope.userList[i].auth.authlv) {
					case 0:
						$scope.userList[i].auth.authlv = "고객"
						break;
					case 1:
						$scope.userList[i].auth.authlv = "회원"
						break;
					case 2:
						$scope.userList[i].auth.authlv = "관리자"
						break;
					case 3:
						$scope.userList[i].auth.authlv = "최고관리자"
						break;
				}
				}
			},
			function(errResponse){
				console.log("errResponse gets_timeline status : "+errResponse.status);
			}
		);
	}
	$scope.getUsers();
	$scope.checkAllUsers = function (val) {
        if (val) {
            $scope.selectAllUsers = true;
        } else {
            $scope.selectAllUsers = false;
        }
        angular.forEach($scope.userList, function (item) {
            item.selected = $scope.selectAllUsers;
        });
    };
    //사용자 등록
    $scope.addUser = function(){
    	var id="";
    	$window.sessionStorage["adduserid"] = id;
		$state.go('userAddModify',{id:id});
    }
 	//사용자 수정
    $scope.modifyUser = function(id){
    	$window.sessionStorage["adduserid"] = id;
		$state.go('userAddModify',{id:id});
    }
    $scope.delUser = function(){
    	var delList = [];
    	var index=0;
    	var index1=0;
    	for(var i in $scope.userList){
    		if($scope.userList[i].selected){
    			index++;
    			apiService.del_userModel($scope.userList[i].userid)
    		  	.then(
    		  			function(d) {
    		  				index1++;
    		  				if(index == index1){
    		  					$scope.getUsers();
    		  				}

    		  			},
    		  			function(errResponse){
    		  				console.log(errResponse);
    		  			}
    		  	);
    		}
    	}
    }
    $scope.userEnable = function(userid,enable){
    	enable = enable ? false : true ;
		apiService.put_userEnable(userid,enable)
	  	.then(
	  			function(d) {
	  				$scope.getUsers();
	  			},
	  			function(errResponse){
	  				console.log(errResponse);
	  			}
	  	);
    }
}]);

angular.module('iceApp').controller('userAddModify_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','apiService','Session',"DEFINED",
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,apiService,Session,DEFINED) {
	var userid = $window.sessionStorage["adduserid"];
	$scope.isAdd = true;

	// 사용자 정보 조회 API
	 var getBizdUser = function() {
	  	apiService.get_Bizd_id_User(userid)
	  	.then(
	  			function(d) {
	  				$scope.userModel = d;
	  				$scope.phone = $scope.userModel.namecard.sphone.split("-");
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
	 if(userid != ""){
			$scope.isAdd = false;
			 getBizdUser();
	}
	$scope.userModel = {
			bizid : DEFINED.bizid,
			userid : "",
			newpassword : "",
			namecard : {
				name : "",
				pos : "",
				depart : "",
				sphone : "",
				email :  "",
			},
			auth : {
				authlv : 1,
				siteids : [Session.user.siteids[0].toString()
				]
			},
			data : {
				sendalram : false,
				sendsmsuser : false,
				sendsmsdevice : false
			}

	}
	$scope.phone_list = ["010", "011", "016", "017", "019"];
	$scope.auth_list = [{lv:0,name:"고객"},{lv:1,name:"회원"},{lv:2,name:"관리자"},{lv:3,name:"최고관리자"},];
	$scope.phone = $scope.userModel.namecard.sphone.split("-");

	switch($scope.userModel.auth.authlv) {
		case 0:
			$scope.authName = "고객"
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
	//중복체크
	$scope.dupChk = function(event){
		var userid = event.target.value;
		apiService.get_BizidAuth(userid)
		.then(
			function(isUser){ //true면 이미 존재, false면 사용가능
				$scope.dupValid = !isUser;
			},function(errResponse){
				$scope.error = true;
			}
		);
	}
	$scope.confirm = function(){
		if($scope.phone.length == 3){
			 for(var i in $scope.phone){
				 if($scope.phone[i] == ""){
					 alert("연락처를 빠짐없이 입력해 주세요.");
					 return;
				 }
			 }
			 $scope.userModel.namecard.sphone = $scope.phone[0]+"-"+$scope.phone[1]+"-"+$scope.phone[2];
		 }
		if($scope.isAdd){
			console.log("add");
			apiService.post_userModel($scope.userModel)
		  	.then(
		  			function(d) {
		  				$state.go('userApproval');
		  			},
		  			function(errResponse){
		  				if(errResponse.data != null){
		  					if(JSON.parse(errResponse.data).errcode == '15'){
		  					//alert("에러 발생");
		  					}else if(JSON.parse(errResponse.data).errcode == '13'){
		  					//alert("에러 발생");
		  					}
		  				}else{
		  					alert("서버와 연결되어 있지 않습니다.");
		  				}
		  			}
		  	);
		}else{
			console.log("modi");
			$scope.userModel.rdt = convertDateStringsToDates($scope.userModel.rdt);
			 delete $scope.userModel.required;
			 delete $scope.userModel.requirement;
			 delete $scope.userModel.namecard.required;
			 delete $scope.userModel.auth.admin;
			 delete $scope.userModel.auth.sitejunior;
			 delete $scope.userModel.auth.sitemajor;
			 delete $scope.userModel.auth.user;
			 console.log($scope.userModel);
			apiService.put_userModel($scope.userModel)
		  	.then(
		  			function(d) {
		  				$state.go('userApproval');
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

	}
    $scope.cancel = function(){
		$state.go('userApproval');
    }
}]);