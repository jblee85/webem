'use strict';
angular.module('iceApp').controller('initSetting_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','apiService','DEFINED','Session','$cacheFactory','$timeout', 'MODEL',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,apiService,DEFINED,Session,$cacheFactory,$timeout, MODEL) {

	//페이지 새로고침, 페이지닫기시 작성중 상태면 한번 더 확인한다.
	$window.onbeforeunload = function(e) {
	 var dialogText = 'Dialog text here';
	 e.returnValue = dialogText;
	 return dialogText;
	};
	$scope.skipButton = false;
	$window.setTimeout(function(){
		$scope.skipButton = true;
	}, 5000);
	$scope.viewName = "initSetting";
	$scope.panel = 0; // 현재 페이지
	$scope.maxDevpanel = 0; // 조회한 페이지

	$scope.devpanel = 0;
	$scope.errpanel = 0;

	const PANEL = {
		INTRO : 0,
		SITEKEY : 1,
		SITE_REG : 2,
		USER_REG : 3,
		DEV_REG : 4
	}

	const DEV_REG = {
		NONE : 0,
		CONFIG_CONFIRM : 1,
		DATA_CONFIRM : 2,
		DEV_CONTROL : 3,
		COMPLETE : 4
	}
	const PLUGIN = {
		DESTIN_PCS : 31
	}

	const PCSCMD = {
		CHARGE : 12,
		DISCHARGE : 13,
		STANDBY : 14
	}

	const PCSSTATUS = {
		STANDBY : 1,
		CHARGE : 2,
		DISCHARGE : 3,
		findStatus_comm : (comm) => PCSCMD.CHARGE == comm ? PCSSTATUS.CHARGE : PCSCMD.DISCHARGE == comm ? PCSSTATUS.DISCHARGE : PCSSTATUS.STANDBY
	}
//	const showLeafs = async () => {
	const showLeafs = function(){
		$scope.spinStart()
		const res = apiService.gets_DeviceLeafs($scope.deviceId)
		.then(
			(res)=>{
				let leaf = res.filter((leaf)=>leaf.devtype == DEFINED.devtype.pcs)[0]
				leaf.devs.forEach(leafData=>{
					leafData.alarms = []
					leafData.warnings = []
					leafData.faults = []
				})
				$scope.leaf = leaf
				$scope.immutableleaf = JSON.parse(JSON.stringify(leaf))
				$scope.rowDelete(1)
				// console.log(leaf)
				$scope.spinStop()
				return res
			},
			(err)=>{
				console.log(err)
				$scope.spinStop()
			}
		)
		return res
	 }
	/*
	 * panel level
	 *  panel 0 : 환영합니다.
	 *  panel 1 : 관리자 인증키 입력
	 *  panel 2 : 사이트 등록
	 *  panel 3 : 사용자 등록
	 *  panel 4 : 장치 등록
	 *   - devpanel 1 :  설정 확인
	 *   - devpanel 2 :  데이터 확인
	 *   - devpanel 3 :  장치 제어
	 *   - devpanel 4 :  완료
	 */

	// ************** 페이지 관련 코드 시작 **************

	$scope.nextPanel = function() { // 다음 페이지 이동
	 if($scope.panel < PANEL.DEV_REG) {
	   $scope.panel = $scope.panel + 1;

	   //테스트코드
//	   $scope.adminKey = 't6uVFENN1P+64tizlg5je5+YJDfV13PVzXFJY2OUW/I='
	   $scope.adminKey = '';
	 }

	if($scope.panel == PANEL.USER_REG){

	}

	 if($scope.panel == PANEL.SITE_REG){
		 //사이트 모델 가져오는 API 호출
		 apiService.get_Site()
		 	.then(
				 (res)=>{
					$scope.site = res
					 res.refdevs.forEach((ref)=>{
						if(ref.bizid == DEFINED.bizid){
							$scope.deviceId = ref.devrid
							return
						 }
					 })
					// $scope.deviceId =
				 },
				 (err)=>{
					console.log(err)
				 }
			 )
	 }

	 if( $scope.panel == PANEL.DEV_REG ) {
		 //총 6개의 API 필요
		 //장비 PCS 들고오는 API 추가
		 //장비 수정 API 그대신 장치 ID 는 수정 불가 IP 주소, 포트만
		 //데이터 확인에서는 PLUGIN 재기동 API 사용
		 //수동 PCS 제어 API
		//전부 끝이 나면
		// 1. SiteModel 수정
		// 2. 사용자 등록
		console.log('장비등록 화면 devpanel : '+$scope.devpanel)
		if($scope.leaf == undefined)
			showLeafs()


		$scope.focus("deviceName");

		if ( $scope.devpanel == DEV_REG.NONE ) {
		  $scope.devpanel = DEV_REG.CONFIG_CONFIRM;
		  if ($scope.maxDevpanel == DEV_REG.NONE) {
			  $scope.maxDevpanel = $scope.maxDevpanel + 1;
		  }
		  console.log("devp : " +$scope.devpanel);
		  console.log("maxd : " +$scope.maxDevpanel);

		  if($scope.devpanel == DEV_REG.CONFIG_CONFIRM){
				$scope.leaf.devs.forEach(leafData=>{
					apiService.get_ping(leafData.ipaddr, leafData.port)
						.then(
							res=>{
								leafData.deviceNetwork = res.result
							},
							err=>{

							}
						)

				})
			}
		}
		else if ( ($scope.devpanel > DEV_REG.NONE) && ($scope.devpanel < DEV_REG.COMPLETE) ) {
			let commandExecute = () => {
				let exe = false
				$scope.leaf.devs.forEach(leafData=>{
					if(leafData.isSuccess){
						exe = true
					}
					return exe
				})
				return exe
			}
			if ($scope.devpanel == DEV_REG.DEV_CONTROL && commandExecute() == false) { // 장치제어 건너 뛰기
				var no = confirm("장치 제어 화면을 건너뛰시겠습니까?");
				if(no==false) {
					return
				}
				else{

				}
			}
			else if ($scope.devpaenl == DEV_REG.DATA_CONFIRM){
				console.log('데이터 확인 창')
				//TODO (에뮬레이터)pcs 재가동 딜레이가 길어서 잠시 막아둠
				// apiService.put_pluginReflash(PLUGIN.PCS)
				// 	.then(
				// 		res=>{

				// 		},
				// 		err=>{

				// 		}
				// 	)

			}

		  $scope.devpanel = $scope.devpanel + 1;
		  console.log("devp : "+$scope.devpanel);

		  if ( ($scope.devpanel -1) == $scope.maxDevpanel ) {
			  $scope.maxDevpanel = $scope.maxDevpanel + 1;
		  }

		   if( $scope.maxDevpanel > 4) {
		 	   $scope.maxDevpanel = 4;
		   }
		   console.log("maxdevp : "+$scope.maxDevpanel);
	    }
		else if($scope.devpanel == DEV_REG.COMPLETE){
			//사이트 등록
			//유저 등록
			$rootScope.spinStart();
			let site = $scope.site
			site.sname = $scope.siteName
			let adr = $scope.addrs.split(" ")
			site.addr1 = ""
			for(var i = 0; i < adr.length; i++){
				if(i == 0 || i == 1)
					adr[i] = adr[i] + "|"
				else
					adr[i] = adr[i] + " "
				site.addr1 = site.addr1 + adr[i]
			}
			site.addr2 = $scope.detailAddrs
			site.bcode = $scope.payType.bcode
			site.data.kepcockw = $scope.ePower
			site.rdday = $scope.meteringDay.day
			delete site.cdt
			delete site.mdt
			delete site.id
			site.refdevs.forEach(ref=>delete ref.cdt)
			console.log(site)

			let user = MODEL.USER
			user.bizid = DEFINED.bizid
			user.userid = $scope.userid
			user.password = $scope.userPw
			user.namecard.name = $scope.username
			user.namecard.sphone = $scope.phone1 + '-' + $scope.phone2 + '-' + $scope.phone3
			user.namecard.pos = $scope.userPosition
			user.namecard.email = user.userid

			console.log(user)
			let putsite = false
			let postuser = false
			apiService.put_Site(JSON.stringify(site))
				.then(
					(res)=>{
						console.log('site 수정 완료')
						putsite = true
						apiService.post_userModel(JSON.stringify(user))
							.then(
								(res)=>{
									console.log('사용자 추가 완료')
									postuser = true
									Session.destroy()
									$rootScope.goURL('login')
								},
								(err)=>{
									console.log('사용자 추가 실패')
									alert('사이트 등록 실패하였습니다.')
								}
							)
					},
					(err)=>{
						console.log('site 수정 실패')
						alert('사용자 등록 실패하였습니다.')
					}
				)


			// 로그인 페이지로 이동한다.
			// 사용자 등록, 사이트 등록에 실패하면 못 가게 해야함....
			// if(putsite && postuser){
			// 	// $state.go('login')
			// 	$rootScope.goURL('login')
			// }
			// else if(putsite == false && postuser == false){
			// 	alert('사용자 등록, 사이트 등록이 실패하였습니다.')
			// }else if(putsite == false){
			// 	alert('사이트 등록 실패하였습니다.')
			// }else{
			// 	alert('사용자 등록 실패하였습니다.')
			// }
			$rootScope.spinStop()
			return
		}
		changeClass($scope.maxDevpanel, $scope.devpanel);

	 }
	}

	$scope.sendUserid = function() {
		const userid = $scope.userid
		if(userid==""){
			alert('아이디를 입력해주세요.')
			return
		}
		apiService.get_BizidAuth(userid)
			.then(
				res=>{
					if(res == true){
						alert('다른 아이디를 입력해주세요')
					}else{
						alert('사용 가능한 아이디입니다. ')
					}
				},
				err=>{

				}
			)
	}

	$scope.backPanel = function() { // 이전 페이지 이동

		// if( $scope.devpanel == DEV_REG.DATA_CONFIRM )  {

		// 	$scope.devpanel = DEV_REG.CONFIG_CONFIRM;
		// 	// $scope.panel = $scope.panel - 1;

		// 	console.log("devp : " +$scope.devpanel);

		//  } else
	if( ($scope.panel == PANEL.DEV_REG) && ($scope.devpanel > DEV_REG.CONFIG_CONFIRM) ) {

	   $scope.devpanel = $scope.devpanel - 1;
	   console.log("devp : "+$scope.devpanel);
	   $scope.focus("deviceName");
	   changeClass($scope.maxDevpanel, $scope.devpanel);
	 } else if( $scope.panel > 0  ) {
		 $scope.panel = $scope.panel - 1;
		 $scope.devpanel = 0
		 console.log("devp : "+$scope.devpanel);
	 }
	}

 // ************** 페이지 관련 코드 끝 **************

 $scope.keyValid = true
 // ************** panel = 1 관리자 인증키 입력 **************
	$scope.loginSite = function() {
		//var sitekey =
		// if( (sitekey != undefined && sitekey != ''))
		// 	$timeout.cancel(stop);
		console.log('사이트 로그인 호출한다. sitekey : '+$scope.adminKey)
		apiService.post_SiteLogin($scope.adminKey)
		.then(
			function(res) {
				// console.log(res)
				var temp = {siteids:[], authkey:null};
				temp.siteids.push(res.sid)
				temp.authkey = res.authkey
				Session.create(temp)
				//Session.user.siteids.push(res.sid)
				alert('인증이 확인되었습니다.')
				$scope.keyValid = false
			},function(error) {
				alert('인증이 실패했습니다.')
				// console.log(error)
				$scope.keyValid = true
			}
		)
	}

    // ************** panel = 2 사이트 등록 코드 시작 **************

    $scope.adminKey =""; // 관리자 인증키

    $scope.panel_validation = function(panel) { // 인증키 유효성 검사 메소드

      if(panel == 1) {
    	  if( ($scope.adminKey==null) || ($scope.adminKey == "") ) {
    		  return true;
    	  }
       	  return false;
       }

      if(panel == 2) {
    	  if( ($scope.devId==null) || ($scope.adminKey == "") ) {
    		  return true;
    	  }
       	  return false;
      }
      return true;

    }

    // 다음 우편번호 검색 API
    $scope.consumer={};
    $scope.getPostCode = function(){
        openPostcode(function(){
            $scope.$apply(function(){
        	    $scope.consumer.zipcode1 = postVal.zonecode.slice(0,3);
                $scope.consumer.zipcode2 = postVal.zonecode.slice(3,5);
                $scope.addrs = postVal.address;
            });
        });
    }

    // 사이트 등록

    $scope.deviceId ="";
    $scope.siteName ="";
    $scope.addrs ="";
    $scope.detailAddrs = "";
    $scope.ePower=0;

    $scope.payTypes = MODEL.BCODE
    // $scope.payTypes = [
    // 	{ id : '산업용(을) 고압A 선택(Ⅰ)'},
    // 	{ id : '산업용(을) 고압A 선택(Ⅱ)'},
    // 	{ id : '산업용(을) 고압A 선택(Ⅲ)'}
    // 	];

//    $scope.payType = $scope.payTypes[1];
    $scope.payType = null;

	const range = (s, e) => {
		let list = []
		for(var i = s; i < e; i ++){
			list.push({day : i})
		}
		return list
	}
	var days = range(1, 31)
    $scope.meteringDays = days
    $scope.meteringDay = $scope.meteringDays[0];


    $scope.siteRegist = function() {

    }

   // ************** panel = 2 사이트 등록 코드 끝 **************


   // ************** panel = 3 사이트 등록 코드 시작 **************

   // 사용자 등록

    $scope.userid = "";
    $scope.userPw = "";
    $scope.checkPw = "";
    $scope.username = "";
    $scope.userPosition = "";

    $scope.phone_list = ["010", "011", "016", "017", "019"];

    $scope.phone1 = $scope.phone_list[0];
    $scope.phone2 = "";
    $scope.phone3 = "";
    $scope.phone = "";


    $scope.smsModelReq = {
    	userid : "",
    	phone :  "",
    	username : ""
    }

	$scope.isSent = false;

	//관리자 인증키

    // 인증번호 요청
    $scope.sendSMS = function(isResend) {
    	alert("인증코드가 전송되었습니다.");
    	// 폼데이터 smsModel 객체에 저장
    	$scope.smsModelReq.userid = $scope.userid;
    	$scope.smsModelReq.phone = $scope.phone1 + $scope.phone2 + $scope.phone3;
    	$scope.smsModelReq.username = $scope.username;

    	if( ($scope.phone1 != undefined && $scope.phone1 != '') && ($scope.phone2 != undefined && $scope.phone2 != '')  && ($scope.phone3 != undefined && $scope.phone3 != ''))
			$timeout.cancel(stop);

		if(isResend == true){ // 재전송
		//	delete smsModelReq.smscode; // 기존 인증코드 삭제
		}

    	$scope.focus("smscode");
    	// API 통신
    	apiService.post_sendSMS($scope.smsModelReq)
    	.then(
    			function(d) {
    				$scope.isSent = true;
    				$scope.smscode= d.smscode;
					countdown(isResend);
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

	//인증시간 계산
    $scope.min = "";
    $scope.sec = "";
	$scope.expdt = 3 * 60;
//	$scope.expdt = 10; //테스트 시간
	var stop;
	function countdown(isResend){
		if(isResend == true){
			$scope.expdt = 3 * 60;
//			$scope.expdt = 10; //재전송 시 테스트 시간
			$scope.expired = false;
		}
		stop = $timeout(function(){
			$scope.expdt--;
			$scope.sentMsg = "";
			$scope.min = parseInt($scope.expdt/60)+"분";
			$scope.sec = parseInt($scope.expdt%60)+"초 남았습니다.";
			console.log($scope.min + $scope.sec);
			if($scope.expdt == 0){
				$timeout.cancel(stop);
				$scope.expired = true;
			} else {
				countdown();
			}
		}, 1000);
	};


	//$scope.smsValid = false;
    // 인증번호 확인
    $scope.confirmSMS = function() {
    	alert("인증번호를 확인합니다.");
    	// smsModel 설정
    	$scope.smsModelReq.smscode = $scope.smscode;

    	// api 통신
    	apiService.get_confirm($scope.smsModelReq)
    	.then(
    			function(d) {
    				$scope.confilm = true;
    				$scope.smsValid = true;
    				$timeout.cancel(stop);
    			},
    			function(errResponse){
    				if(errResponse.data != null){
    					if(JSON.parse(errResponse.data).errcode == '15'){
    						//alert("에러 발생");
    						$scope.errpanel = 1;
    					}else if(JSON.parse(errResponse.data).errcode == '13'){
    						//alert("에러 발생");
    					}
    				$scope.confilm = false;
    				}else{
    					alert("서버와 연결되어 있지 않습니다.");
    				}
    			}
    	);
    }
  // ************** panel = 3 사이트 등록 코드 끝 **************



  // ************** panel = 4 사이트 등록 코드 시작 **************

    // 장치등록 클래스 속성 변경

    $scope.classBtnTrace= "btn btn-trace btn-circle btn-default";
    $scope.classBtnPrimary = "btn btn-circle btn-default btn-primary";
    $scope.classBtnDefault = "btn btn-default btn-circle";

    $scope.classBtn1 = $scope.classBtnPrimary;
    $scope.classBtn2 = $scope.classBtnDefault;
    $scope.classBtn3 = $scope.classBtnDefault;
    $scope.classBtn4 = $scope.classBtnDefault;

	var changeClass = function(maxDevpanel, devpanel) {
    	if (maxDevpanel == 1) {
    		$scope.classBtn1 = $scope.classBtnPrimary;
    		$scope.classBtn2 = $scope.classBtnDefault;
    		$scope.classBtn3 = $scope.classBtnDefault;
    		$scope.classBtn4 = $scope.classBtnDefault;
    	} else if (maxDevpanel == 2) {
    		if(devpanel == 1) {
    			$scope.classBtn1 = $scope.classBtnPrimary;
    			$scope.classBtn2 = $scope.classBtnTrace;
    		} else if (devpanel == 2) {
    			$scope.classBtn1 = $scope.classBtnTrace;
    			$scope.classBtn2 = $scope.classBtnPrimary;
    		}
    		$scope.classBtn3 = $scope.classBtnDefault;
    		$scope.classBtn4 = $scope.classBtnDefault;
    	} else if (maxDevpanel == 3) {
    		if(devpanel == 1) {
    			$scope.classBtn1 = $scope.classBtnPrimary;
    			$scope.classBtn2 = $scope.classBtnTrace;
    			$scope.classBtn3 = $scope.classBtnTrace;
    		} else if (devpanel == 2) {
    			$scope.classBtn1 = $scope.classBtnTrace;
    			$scope.classBtn2 = $scope.classBtnPrimary;
    			$scope.classBtn3 = $scope.classBtnTrace;
    		}  else if (devpanel == 3) {
    			$scope.classBtn1 = $scope.classBtnTrace;
    			$scope.classBtn2 = $scope.classBtnTrace;
    			$scope.classBtn3 = $scope.classBtnPrimary;
    		}
    		$scope.classBtn4 = $scope.classBtnDefault;
    	} else if (maxDevpanel == 4) {
    		if(devpanel == 1) {
    			$scope.classBtn1 = $scope.classBtnPrimary;
    			$scope.classBtn2 = $scope.classBtnTrace;
    			$scope.classBtn3 = $scope.classBtnTrace;
    			$scope.classBtn4 = $scope.classBtnTrace;
    		} else if (devpanel == 2) {
    			$scope.classBtn1 = $scope.classBtnTrace;
    			$scope.classBtn2 = $scope.classBtnPrimary;
    			$scope.classBtn3 = $scope.classBtnTrace;
    			$scope.classBtn4 = $scope.classBtnTrace;
    		}  else if (devpanel == 3) {
    			$scope.classBtn1 = $scope.classBtnTrace;
    			$scope.classBtn2 = $scope.classBtnTrace;
    			$scope.classBtn3 = $scope.classBtnPrimary;
    			$scope.classBtn4 = $scope.classBtnTrace;
    		} else if (devpanel == 4) {
    			$scope.classBtn1 = $scope.classBtnTrace;
    			$scope.classBtn2 = $scope.classBtnTrace;
    			$scope.classBtn3 = $scope.classBtnTrace;
    			$scope.classBtn4 = $scope.classBtnPrimary;
    		}
    	}
    }
    $scope.selectPanel = function(devpanel) {
    	$scope.devpanel = devpanel;
    	$scope.focus("deviceName");

    	changeClass($scope.maxDevpanel, $scope.devpanel);

    	if(devpanel==1) {
    		$scope.classBtn1 = $scope.classBtnPrimary;
    	}
    }


    // ****** devpanel = 1 장치 등록 - 설정확인  ******

    // device model
    $scope.devicesRep = [

    ];

    $scope.devicesReq = [
    	{
    		deviceName : "",
    		deviceIp : "",
    		devicePort : "",
    		addDate : "",
    		deviceNetwork : "",
    		warningCnt : 0,
        	dangerCnt : 0
    	},
    ];


    $scope.selectedRow = null;

    $scope.clickedIndex = function(i) {
    	$scope.selectedRow = i;
    	$scope.num = -1;
    	$scope.deviceValidate($scope.num);
    }

    $scope.cancelIndex = function(i) {
    	$scope.selectedRow = -1;
    }

    // 장치 등록 - 행 추가
   $scope.rowAdd = function() {

	   $scope.devicesReq.push({
	    	  dName : $scope.dName,
	    	  dIp : $scope.dName,
	    	  dPort : $scope.dIp,
	    	  addDate : $scope.addDate,
	    	  dNetwort : $scope.dNetwork
	    	});

	   $scope.dName = "";
	   $scope.dIp = "";
	   $scope.dPort = "";
	   $scope.addDate = "";
	   $scope.dNetwork = "";

	   $scope.focus("deviceName");
   }

   // 장치 등록 - 행 삭제
   $scope.rowDelete = function(i) {
	   console.log("index : " + i);
	   $scope.devicesReq.splice(i, 1);

	   // add api
   }

   $scope.deviceDelete = function(i) {
	   var d = confirm("삭제 하시겠습니까?");
	   console.log("index : " + i);

	   if ( d == true) {
	     if($scope.devicesRep.length > 1) {
		     $scope.devicesRep.splice(i, 1);
	     } else if ($scope.devicesRep.length == 1) {
		     alert("최소 1개의 장치는 등록 되어야합니다.")
	     }
	   }

	   // add api
   }

   $scope.deviceCancel = function(i) {
	   var d = confirm("취소 하시겠습니까?");

	   if ( d == true ){
		 if($scope.devicesReq.length == 1 && $scope.devicesRep.length < 1) {
			 alert("최소 1개의 장치는 등록 되어야합니다.")
		 } else if ($scope.devicesReq.length >= 1) {
			 $scope.devicesReq.splice(i, 1);
		 }
	   }
   }

    // 장치 추가
   $scope.deviceAdd = function(i, dName, dIp, dPort) {

	   $scope.devicesRep.push({
		   deviceName : dName,
		   deviceIp : dIp,
   	       devicePort : dPort,
   	       addDate : "2018-07-13 10:25",
   	       deviceNetwork : "icon",
   	       warningCnt : 0,
    	   dangerCnt : 0
	   });

	   // add api

	   // 등록한 행 제거
	   $scope.rowDelete(i);
   }

   // 장치 수정
   $scope.deviceModify = function(i, dName, dIp, dPort) {

	   $scope.devicesRep.splice(i,1, {
		   deviceName : dName,
		   deviceIp : dIp,
   	       devicePort : dPort,
   	       addDate : "2018-07-13 10:25",
   	       deviceNetwork : "icon"
	   } );
	   $scope.cancelIndex(i);
   }

   //장치 수정 -v
   $scope.setDeviceLeafModel = (index) => {
	   //console.log('장치 변경 : '+devlid+', '+ipaddr+', '+port)
	   //apiService.
	let leaf = $scope.leaf
	delete leaf.rdt
	delete leaf.id
	leaf.devs.forEach(leafData=>{
		delete leafData.warnings
		delete leafData.alarms
		delete leafData.faults
		delete leafData.dischargepkw
		delete leafData.chargepkw
		delete leafData.msg
		delete leafData.deviceNetwork
	})

	$scope.updateleaf = false
	if(leaf.devs.length !== $scope.immutableleaf.devs.length){
		$scope.updateleaf = true
	}else{
		leaf.devs.forEach(leafData => {
			$scope.immutableleaf.devs.forEach(imleafData => {
				if(leafData.ipaddr != imleafData.ipaddr || leafData.port != imleafData.port){
					$scope.updateleaf = true
					return;
				}
			})
		});
	}

	console.log('DeviceLeafModel 이 ipaddr 이 변경되었습니다. ', $scope.updateleaf)
	apiService.puts_DeviceLeafs(leaf)
		.then(
			(res) =>{
				console.log('leafModels 변경 완료')
				showLeafs()
			},
			(err) =>{

			}
		)
	$scope.cancelIndex(index);
   }

   // 장치 등록 유효성 검사
   //leaf.devs -> DB 에서 가져온 데이터
   //deviceRep -> 컴포넌트에서 입력된 데이터
   $scope.deviceValidate = function () {
	  if($scope.devpanel == 1) {
		  if($scope.leaf.devs.length == 0 || $scope.devicesRep.length > 0) {
			  return true;
		  } else if ($scope.leaf.devs.length > 0) {
			  return false;
		 }
	  } else if ($scope.devpanel == 3) {
		//   comfirm("장치 제어를 건너 뛰시겠습니까?");
	  }
   }

   // ****** devpanel = 1 장치 등록 - 설정확인 끝  ******

   // ****** devpanel = 2 장치 등록 - 데이터설정 시작  ******

   $scope.openClose = function(event, devlid) {
	   var e = event.target.text;
	   	if (e == "열기"){
		//    alert('열기 '+ devlid)
			event.target.text = "닫기";
	   	}else{
			event.target.text = "열기";
		}
		$(event.currentTarget.parentElement.parentElement.nextElementSibling).slideToggle('slow');
		event.preventDefault();
	//    else if (e == "닫기") {
	// 	    event.target.text = "열기";
	//    }
   }

   	const pcsSuccessMsg = '※ 발생한 위험이나 결함이 없습니다.'
	const pcsFailMsg = "장치 운전제어 오류입니다. 다시 시도해주세요."
   $scope.isDeviceMsg = () => {
	   let fault = false
	   let exist = false
	   $scope.leaf.devs.forEach(leafData=>{
		    if(leafData.faults != undefined && leafData.warnings != undefined){
				exist = true
			}
			if (leafData.faults.length != 0 || leafData.warnings.length != 0){
				fault = true
			}
	   })

	   if($scope.leaf && exist){
		   $scope.deviceMsg = fault ? pcsFailMsg : pcsSuccessMsg
	   }else{
		   $scope.deviceMsg = '전달받은 데이터가 없습니다.'
		   fault = true
	   }
	    return fault
	}

   $scope.deviceMsgClass = "";

   $scope.deviceReset = function() {
	   //PCS CMD FAULT RESET 을 실행한다.


		// apiService.put_pluginReflash(PLUGIN.DESTIN_PCS)
		// 	.then(
		// 		res=>{
		// 			if(res.result == true){
		// 				$scope.loadingStart()
		// 				$scope.restart = true
		// 			}
		// 		},
		// 		err=>{

		// 		}
		// 	)
	//    $scope.deviceMsg = "※ 발생한 위험이나 결함이 없습니다.";
	//    $scope.deviceMsgClass = "primaryFont";
   }
  // ****** devpanel = 2 장치 등록 - 데이터설정 끝  ******

  // ****** devpanel = 3 장치 등록 - 장치제어 시작  ******


  /* $scope.controlMsg = "";
   $scope.chargeClass = "btn btn-default btn-xs";
   $scope.rechargeClass = "showOut btn btn-danger btn-xs";
*/
/*   $scope.chargeStart = function(start) {
	 if (start == 1) { // 테스트
		 $scope.controlMsg = "장치 운전제어 오류입니다. 다시 시도해주세요.";
		 $scope.controlMsgClass = "";
		 $scope.chargeClass = "showOut btn btn-default btn-xs";
		 $scope.rechargeClass = "btn btn-danger btn-xs"
	 } else if (start == 2) { // 재시도
		 $scope.controlMsg = "※ 발생한 위험이나 결함이 없습니다.";
		 $scope.controlMsgClass = "primaryFont";
		// $scope.chargeClass = "btn btn-default btn-xs";
		// $scope.rechargeClass = "showOut btn btn-danger btn-xs"
	 }
   }

   $scope.dischargeStart = function(start, event) {
	   if (start == 1) { // 테스트
		   $scope.controlMsg = "장치 운전제어 오류입니다. 다시 시도해주세요.";
		   $scope.controlMsgClass = "";
		   $scope.chargeClass = "showOut btn btn-default btn-xs";
		   $scope.rechargeClass = "btn btn-danger btn-xs"
	   } else if (start == 2) { // 재시도
		   $scope.controlMsg = "※ 발생한 위험이나 결함이 없습니다.";
		   $scope.controlMsgClass = "primaryFont";
		   //$scope.chargeClass = "btn btn-default btn-xs";
		   //$scope.rechargeClass = "showOut btn btn-danger btn-xs"
	   }
   }
*/

   $scope.successMsg = "";
   $scope.failMsg = "";
   $scope.testMode=null;
   $scope.isSuccess = false;
   $scope.toggleTest = function(index, devlid, pcscmd) {
	   var d = confirm("직접 제어하는 것이므로 위험할 수 있습니다. 진행하시겠습니까?");
	   if (d == true) {
		   $scope.leaf.devs.forEach(leafData=>{
				if(leafData.devlid == devlid){
					$scope.commModel = {'devlid' : devlid, 'pcscmd' : pcscmd, 'value':pcscmd == 12 ? leafData.chargepkw : leafData.dischargepkw}
					commandPCS($scope.leaf.devrid, devlid, pcscmd, pcscmd == 12 ? leafData.chargepkw : leafData.dischargepkw)
					leafData.msg = ''
				}
		   })
		   //딜레이 5초를 준다.

		//    if($scope.capped.)
			// if($scope.capped.)
	   }
   }

	function commandPCS (devrid, devlid, pcscmd, pkw){
		apiService.put_ESSChargingStatus(devrid, devlid, {
			cmd : pcscmd,
			value : pkw,
			sid : ''
		})
			.then(
				(res)=>{
					$scope.loadingStart()
					$scope.comm = true
					$scope.starttime = new Date()
				},
				(err)=>{
				}
			)
	}

	$rootScope.$on('websocket',function(event, data){
		//  $scope.connectedIdx++;
		  $scope.capped = data;
		  $scope.soc = data.bms.bsc.soc*100;

		  const leaf = $scope.leaf
		let isFault = false
		  if(leaf){
			leaf.devs.forEach(leafData=>{
				if(data.devlid == leafData.devlid){
					leafData.alarms = data.pcs.alarms ? data.pcs.alarms : []
					leafData.faults = data.pcs.faults ? data.pcs.faults : []
					leafData.warnings = data.pcs.warnings ? data.pcs.warnings : []
					if(leafData.faults.length != 0)
						isFault = true
				}
			})
		  }

		$scope.leaf = leaf
		$scope.existFault = isFault

		//재기동 로딩화면 stop
		if($scope.restart == true && data){
			$scope.loadingStop()
			$scope.restart = false
		}

		//pcs command api 로딩화면 stop
		if($scope.comm == true && data){
			let end = new Date()
			const status = PCSSTATUS.findStatus_comm($scope.commModel.pcscmd)
			const value = $scope.commModel.value
			const devlid = $scope.commModel.devlid
			if((end - $scope.starttime) > 5000){
				$scope.leaf.devs.forEach(leafData => {
					if(leafData.devlid == devlid){
						leafData.msg = '※ 발생한 위험이나 결함이 없습니다.'
						leafData.isSuccess = true
						$scope.loadingStop()
					}
				})
			}else{
				if(data.pcs.st == status && data.pcs.inppkw == value){
					$scope.leaf.devs.forEach(leafData => {
						if(leafData.devlid == devlid){
							leafData.msg = '※ 발생한 위험이나 결함이 없습니다.'
							leafData.isSuccess = true
							$scope.loadingStop()
						}
					})
				}
			}
			/*setTimeout(()=>{
				const status = PCSSTATUS.findStatus_comm($scope.commModel.pcscmd)
				const value = $scope.commModel.value
				if(data.pcs.st == status && data.pcs.inppkw == value){
					$scope.loadingStop()
					$scope.comm = false
				}

				if($scope.comm == true){
					alert('모드 변경 실패')
					$scope.leaf.devs.forEach(leafData => {
						leafData.msg = '장치 운전제어 오류입니다. 다시 시도해주세요.'
						leafData.isSuccess = false
					})
				}else{
					$scope.leaf.devs.forEach(leafData => {
						leafData.msg = '※ 발생한 위험이나 결함이 없습니다.'
						leafData.isSuccess = true
					})
				}
				$scope.loadingStop()
				$scope.comm = false
			},5000)*/
		}
		console.log(data)
		});


  // ****** devpanel = 3 장치 등록 - 장치제어 끝  ******

  // ************** panel = 4 사이트 등록 코드 끝 **************

}]);