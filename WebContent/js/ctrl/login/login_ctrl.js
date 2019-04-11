'use strict';
angular.module('iceApp').controller('login_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','$interval','AUTH_EVENTS','apiService','DEFINED','Session','$cacheFactory','$timeout', '$stateParams',
	function($scope, $state, $window, $location, $rootScope,$interval,AUTH_EVENTS,apiService,DEFINED,Session,$cacheFactory,$timeout, $stateParams) {

	/////////////////////////////////////////////////////////
	//        ※ 변수명과 함수명이 동일하면 에러 발생       //
	//                   ※함수명뒤에 Fnc 첨자                   //
	//          ※model명뒤에 json or model 첨자          //
    /////////////////////////////////////////////////////////
	$interval.cancel($rootScope.intervalSchedule);
	console.log("login_ctrl");
	$window.onbeforeunload = null;
	$('#right-sidebar').removeClass('control-sidebar-open');
	//cache 설정
	/*<input ng-model="newCacheKey" placeholder="Key">
	<input ng-model="newCacheValue" placeholder="Value">
	<button ng-click="cachePut(newCacheKey, newCacheValue)">Cache</button>*/
//	$scope.disconnection();
	const confirm = () => {
        console.log('초기 api 실행')
            apiService.get_isUserModelEmpty()
                .then(
                    (res)=>{
                        console.log('결과 : '+res)
                        if(res){
                            $rootScope.goURL('initSetting')
                        }
                    },
                    (err)=>{
                        console.log(err)
                        if(err.status == -1){
            				$rootScope.$broadcast(AUTH_EVENTS.disconnected,err);
            			}
                        // $state.go('login')
                    }
                )
    }
	 confirm()
	 function getProperties (type){
         console.log('초기 api 실행')
             apiService.get_properties(type)
                 .then(
                     (res)=>{
                     	$rootScope.currentProperties = res;
         				$window.sessionStorage["properties"] = JSON.stringify($rootScope.currentProperties);
                     },
                     (err)=>{
                         console.log(err)
                     }
                 )
     }
	 getProperties(2);
//    $scope.init = function() {
//    	$rootScope.spinStart();
//        setTimeout(()=>{
//            confirm()
//            $rootScope.spinStop();
//        }, 300)
//    }
	$scope.cache = $cacheFactory.get('cacheId')||$cacheFactory('cacheId');
	$scope.cachePut = function(key, value) {
		if (angular.isUndefined($scope.cache.get(key))) {
			$scope.keys.push(key);
		}
		$scope.cache.put(key, angular.isUndefined(value) ? null : value);
	};

	var DEF =DEFINED;
	var self = this;
	var loginModel=	{
			userid: "",
			password: "",
			pid: DEF.pid,
			tokens : []
		};
	self.loginModel = loginModel;
	self.loginModel.userid="";
	self.loginModel.password="";
	var validation={
			duplicateCheck : null,
			passwordCheck : null,
			smsCertification : null
	};

	var validationTemp={
			repassword : null,
			confirm : null
	};
	self.validation=validation;
	self.validationTemp=validationTemp;

	//아이디 저장 여부 확인
	var userid = getCookie('saveid');
	if(userid != ""){
		$("#saveid").attr("checked", true);
		$("#inputEmail").val(userid);
		self.loginModel.userid=userid;
	} else {
		self.loginModel.userid="";
	}

	//아이디 저장 Change Event
	$("#saveid").change(function(){
		if($("#saveid").is(":checked")){
			var userid = $("#inputEmail").val();
			setCookie('saveid', userid, 9999);
		} else {
			deleteCookie('saveid');
		}
	});

	$("#inputEmail").keyup(function(){
		if($("#saveid").is(":checked")){// ID 저장하기를 체크한 상태라면,
			var userid = $("#inputEmail").val();
			setCookie('saveid', userid, 9999);
        }
	})
//	$rootScope.device = {meter:null,pv:null,pcs:null};
	$scope.loginFnc = function(){
		console.log(self.loginModel);
		//TODO data validation check
		$rootScope.spinStart();
		apiService.post_Login(self.loginModel)
		.then(
			function(d) {
				console.log("로그인 : post_Login");
				Session.create(d);
				$rootScope.currentUser=d;
				$window.sessionStorage["userInfo"] = JSON.stringify($rootScope.currentUser);
				setCookie('userInfo',$rootScope.currentUser);
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				$rootScope.$broadcast("interval");
				apiService.get_Site()
				.then(
					function(d) {
						console.log("로그인 : get_Site");
						$scope.devrids=[];
						$window.sessionStorage["siteInfo"] = JSON.stringify(d);
						setCookie('siteInfo',d);
						for(var i in d.refdevs){
							if(d.refdevs[i].bizid == DEFINED.bizid){
								$scope.devrids.push(d.refdevs[i].devrid);
								$rootScope.currentRid=d.refdevs[i].devrid;
								$window.sessionStorage["rootInfo"] = JSON.stringify($rootScope.currentRid);
								setCookie('rootInfo',JSON.stringify($rootScope.currentRid));
								$rootScope.currentSite=d;
								$window.sessionStorage["siteInfo"] = JSON.stringify($rootScope.currentSite);
								setCookie('siteInfo',JSON.stringify($rootScope.currentSite));
							}
						}
						apiService.gets_DeviceLeafs($scope.devrids)
						.then(
							function(d) {
								console.log("로그인 : gets_DeviceLeafs");
								try{
									$window.sessionStorage["leafInfo"] = JSON.stringify(d);
									$rootScope.currentLeaf = d;
									setCookie('leafInfo',d);
									for(var i in d){
										switch(d[i].devtype){
										case 3 : //meter
											$rootScope.configInfo.meter = d[i].devs;
											break;
										case 5 : //pv
											$rootScope.configInfo.pv = d[i].devs;
											break;
										case 11 : //pcs
											$rootScope.configInfo.pcs = d[i].devs;
											break;
										}
									}
									$rootScope.configInfo.svgname = "ems";
									if($rootScope.configInfo.pv != null){
										if($rootScope.configInfo.pv.length != 0){
											if($rootScope.configInfo.pcs.length == 0){
												$rootScope.configInfo.svgname = "pv";
											}else{
												$rootScope.configInfo.svgname = "ems_pv";
											}
										}
									}
									for(var i in $rootScope.configInfo.meter){
										if($rootScope.configInfo.meter[i].devsubtype == 301){
											$rootScope.configInfo.svgname = "coolingtower";
										}
									}
									$window.sessionStorage["configInfo"] = JSON.stringify($rootScope.configInfo);
								}catch(error){
									console.log(error.message);
								}
							},
							function(errResponse){
								$rootScope.spinStop();
								console.log("errResponse get_schedule status : "+errResponse.status);
							}
						);
					},
					function(errResponse){
						$rootScope.spinStop();
						console.log("errResponse get_schedule status : "+errResponse.status);
					}
				);
				apiService.get_Version()
				.then(
						function(d) {
							console.log(d);
							$rootScope.version=d;
							$window.sessionStorage["version"] = JSON.stringify($rootScope.version);
							setCookie('version',JSON.stringify($rootScope.version));
							apiService.get_SystemCommitsResb()
							.then(
									function(d) {
										console.log(d);
										$rootScope.versionHistory=d;
										$window.sessionStorage["versionHistory"] = JSON.stringify($rootScope.versionHistory);
										setCookie('versionHistory',JSON.stringify($rootScope.versionHistory));
									},
									function(errResponse){
										console.log("errResponse get_schedule status : "+errResponse.status);
									}
							);
						},
						function(errResponse){
							console.log("errResponse get_schedule status : "+errResponse.status);
						}
				);
//				apiService.get_config(8)
//				.then(
//						function(d) {
//							console.log(d);
//							$rootScope.configInfo = d.data;
//							$window.sessionStorage["configInfo"] = JSON.stringify($rootScope.configInfo);
//						},
//						function(errResponse){
//							console.log("errResponse get_schedule status : "+errResponse.status);
//						}
//				);
				//site 설정 정보 가져오기.
//				$rootScope.configInfo = DEFINED.configInfo;
//				$window.sessionStorage["configInfo"] = JSON.stringify($rootScope.configInfo);

				$timeout(function(){
					console.log("로그인 : go Dashboard");
					$state.go('dashboard');
					$rootScope.$broadcast('websocketConnect','');
					$rootScope.spinStop();
				},1000);

			},
			function(errResponse){
				$rootScope.spinStop();
				if(errResponse.data != null){
					if(JSON.parse(errResponse.data).errcode == '15'){
		        		alert("해당 아이디가 없습니다.");
		        	}else if(JSON.parse(errResponse.data).errcode == '13'){
		        		alert("패스워드를 다시 확인해 주세요.");
		        	}else if(JSON.parse(errResponse.data).errcode == '12'){
		        		alert("관리자에게 승인 요청해 주세요.");
		        	}
				}else{
					alert("서버와 연결되어 있지 않습니다.");
				}
			}
		);
	}

	//enter key 이벤트 처리
	$scope.enterEventFnc = function($event){
		var keyCode = $event.keyCode;
		if(keyCode == '13' || keyCode == undefined){ //엔터키 , 로그인 버튼
			$scope.loginFnc();
		}
	}

	///////////////////////////////////////////[ cookie ]/////////////////////////////////////////////////////
	// cookie setting
	function setCookie(cookieName, value, exdays){
	    var exdate = new Date();
	    exdate.setDate(exdate.getDate() + exdays);
	    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
	    document.cookie = cookieName + "=" + cookieValue;
	}

	// cookie getting
	function getCookie(cookieName){
		cookieName = cookieName + '=';
	    var cookieData = document.cookie;
	    var start = cookieData.indexOf(cookieName);
	    var cookieValue = '';
	    if(start != -1){
	        start += cookieName.length;
	        var end = cookieData.indexOf(';', start);
	        if(end == -1)end = cookieData.length;
	        cookieValue = cookieData.substring(start, end);
	    }
	    return unescape(cookieValue);
	}

	function deleteCookie(cookieName){
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() -1);
		document.cookie = cookieName + "= "+"; expires="+ expireDate.toGMTString();
	}
}]);