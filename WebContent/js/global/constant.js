//
// Here is how to define your module


	//////////////////////////////////////////////////////////////////////////////
	//                          웹 정의된 데이터 초기 세팅 기능                          //
	//                         USER_ROLES : 사용자 권한 정보                        //
	//                         AUTH_EVENTS :  권한 이벤트                            //
	//                         USER_EVENTS : 사용자 이벤트                          //
	//////////////////////////////////////////////////////////////////////////////
var app = angular.module('iceApp',[
	'ui.router',
	'ui.bootstrap',
	'iceApp.apiService',
	'iceApp.translation',
	'datatables',
	'datatables.buttons',
	'angularTreeview'
])
.constant('DEFINED',{
	devMode : false,
	webSocket_ssl : true,
//	server_root_url : 'http://192.168.1.249:80/ice/v1/',
//	webSocket_host : "192.168.1.249",
	server_root_url : 'https://ems.wooam.com/ice/v1/',
	webSocket_host : "ems.wooam.com",
//	server_root_url : 'http://192.168.1.130:8080/ice/v1/',
//	webSocket_host : "192.168.1.130",
//	server_root_url : 'http://192.168.10.10:8080/ice/v1/',
//	webSocket_host : "192.168.10.10",
//	webSocket_host : "192.168.1.234",
//	webSocket_host : "192.168.1.130",
//	server_root_url : 'http://localhost:8080/ice/v1/',
//	webSocket_host : "localhost",
//	webSocket_port : 10100, //http
	webSocket_port : 10110, //https
//	webSocket_port : 443,
//	webSocket_port : 27000,
	webSocket_id : "",
	bizid : "em18",
	pid : "pessems",
	rootpath :"em18s",
	schedule : 11,
	scheduleDetail : 12,
	timelineList : {tcodes:[201,202,203,204,205,206,207,208,209,210,211,212,213,214,215]},
	devtype : { pcs : 11 }
/*
ESS_MENUAL_BATT_CHARGE(201),		//관리자 제어로 ESS 배터리 충전
ESS_MENUAL_BATT_DISCHARGE(202),		//관리자 제어로 ESS 배터리 방전
ESS_SCHEDULE_MENUAL_MODE_SET(203),	//관리자 제어로 ESS 메뉴얼 스케쥴 모드 변경
ESS_SCHEDULE_AUTO_MODE_SET(204),	//관리자 제어로 ESS 자동 스케쥴 모드 변경
ESS_SCHEDULE_ADD(205),				//관리자 제어로 ESS 월 스케쥴 추가 (%s)
ESS_SCHEDULE_MODIFY(206),			//관리자 제어로 ESS 월 스케쥴 변경
ESS_SCHEDULE_DELETE(207),			//관리자 제어로 ESS 월 스케쥴 삭제
ESS_SCHEDULE_DAY_ADD(208),			//관리자 제어로 ESS 타임 스케쥴 추가
ESS_SCHEDULE_DAY_MODIFY(209),		//관리자 제어로 ESS 타임 스케쥴 변경
ESS_SCHEDULE_DAY_DELETE(210),		//관리자 제어로 ESS 타임 스케쥴 삭제

ESS_CHARGE_START(211),				//ESS 배터리 충전 시작
ESS_CHARGE_STOP(212),				//ESS 배터리 충전 종료
ESS_DISCHARGE_START(213),			//ESS 배터리 방전 시작
ESS_DISCHARGE_STOP(214),			//ESS 배터리 방전 종료
ESS_STANDBY(215),					//ESS 배터리 방전 종료
*/
})
.constant('USER_ROLES',{
	all : '*',
	ADMIN : 3,
	SITEMAJOR : 2,
	SITEJUNIOR : 1,
	USER : 0
})
.constant('AUTH_EVENTS',{
	loginSuccess : 'auth-login-success',
	loginFailed : 'auth-login-failed',
	logoutSuccess : 'auth-logout-success',
	sessionTimeout : 'auth-session-timeout',
	notAuthenticated : 'auth-not-authenticated',
	notAuthorized : 'auth-not-authorized',
	disconnected : 'server disconnected'
})
.constant('USER_EVENTS', {
	userid : '',
	loginFailed : 'auth-login-failed',
	logoutSuccess : 'auth-logout-success',
	sessionTimeout : 'auth-session-timeout',
	notAuthenticated : 'auth-not-authenticated',
	notAuthorized : 'auth-not-authorized'
})
.constant('Capped', {

})
.constant('MODEL', {
	USER:{
		"userid":"",
		"password":"",
		"bizid":"em18",
		"namecard":{
			"name":"",
			"pos":"",
			"depart":"",
			"phone":"",
			"sphone":"",
			"email":""
		},
		"auth":{
			"authlv":1,
			"siteids":[]
		},
		"enable":true,
		"data" : {
			"sendalram" : false,
			"sendsmsuser" : false,
			"sendsmsdevice" : false
		}
	},
	SITE:{
		"data":{
			"manager":{
				"name":"",
				"pos":"",
				"depart":"",
				"phone":"",
				"sphone":"",
				"email":"",
				"fax":""
			},
			"kepcockw":0
		},
		"bizid" : "",
		"sid":"",
		"sname":"",
		"bcode":0,
		"rdday":0,
		"localtype":"",
		"addr1":"",
		"addr2":"",
		"enable":true,
		"refdevs":[{
			"bizid":"",
			"sid":"",
			"devrid":""
		}],
		"zipcode1":"",
		"zipcode2":""
	},
	DEVSUBTYPE:[
		{value:"MAIN",name:"계량기", devsubtype : 0,},
		{value:"METER_5M_COOLING_TOWER",name:"냉각탑", devsubtype : 301,}
	],
	DEVICE:{
		DEVICE_ROOT:{
		    "devrid" : "",
		    "devrname" : "",
		    "rdday" : 1,
		    "depth" : 0,
		    "addInfo" : "",
		    "hqname" : "",
		    "rdt" : "",
		    "crc32" : 0,
		    "enabled" : true,
		    "grps" : [{
		    	"grpid" : "",
		    	"grpname" : "",
		    	"leafs" : [{
		    		"devlid" : "",
		    		"devlname" : ""
		    	}]
		    }]
		},
		DEVICE_LEAF:{
			"devs":[],
			"devrid" : "",
		    "devtype" : 0,
		    "rdt" : "",
		    "crc32" : 0,
		    "enabled" : true,
		    "deviid" : "",
		    "corp" : ""
		},
		DEVICE_LEAF_DEVTYPE:{
			ismart:{name:"계량기",type:4},
			meter:{name:"미터기",type:3},
			pcs:{name:"PCS",type:11},
			bms:{name:"BMS",type:12},
			battery:{name:"Battery",type:13},
			pv:{name:"태양광",type:5}
		},
		DEVICE_LEAF_DEVS:{
			meter:{//devtype 3
				"devlid" : "",
		        "devlname" : "",
		        "devst" : 1,	//장비 상태
		        "devsubtype" : 0,
		        "ipaddr" : "0.0.0.0",
		        "port" : 0,
		        "macaddr" : "",
		        "slaveid" : 1,
		        "usbport" : "",
		        "metaname" : "",
		        "rdt" : "",
		        "rdpms" : 0
			},
			ismart:{//devtype 4
				"devlid" : "",
		        "devlname" : "",
		        "devst" : 1,	//장비 상태
		        "devsubtype" : 0,
		        "ipaddr" : "0.0.0.0",
		        "port" : 0,
		        "macaddr" : "",
		        "slaveid" : 1,
		        "usbport" : "",
		        "metaname" : "",
		        "rdt" : "",
		        "rdpms" : 0
			},
			pcs:{//devtype 11
				"devlid" : "",
		        "devlname" : "",
		        "devst" : 1,	//장비 상태
		        "devsubtype" : 0,
				"ipaddr" : "0.0.0.0",
		        "port" : 502,
		        "macaddr" : "",
		        "slaveid" : 1,
		        "metaname" : "",
		        "maxpkw" : 0,
		        "socctrmode" : 5,	//soc 제한 모드
		        "efcper" : 96,	//효율 efficiency(0~100)
		        "aiopcs" : true,	//all in one PCS 여부(default = true)
		        "rdpms" : 0,	//검침 주기
		        "rdt" : ""
				},
			bms:{//devtype 12
				"devlid" : "",
		        "devlname" : "",
		        "devst" : 1,	//장비 상태
		        "devsubtype" : 0,
		        "ipaddr" : "0.0.0.0",
		        "port" : 502,
		        "macaddr" : "",
		        "slaveid" : 1,
		        "metaname" : "",
		        "aiopcs" : true,	//all in one PCS 여부(default = true)
		        "rdt" : "",
		        "rdpms" : 0		//검침 주기
			},
			battery:{//devtype 13
				"devlid" : "",
		        "devlname" : "",
		        "devst" : 1,	//장비 상태
		        "devsubtype" : 0,
		        "rackcnt" : "",		//rack 개수
		        "designkw" : 0,	//설계 용량
		        "safecycle" : 0,	//보장 사이클
		        "rdt" : ""
			},
			pv:{//devtype 5
				"devlid" : "",
		        "devlname" : "",
		        "devst" : 1,	//장비 상태
		        "devsubtype" : 0,
		        "ipaddr" : "0.0.0.0",
		        "port" : 0,
		        "macaddr" : "",
		        "slaveid" : 1,
		        "usbport" : "",
		        "metaname" : "",
		        "rdpms" : 0,	//검침 주기
		        "rdt" : 0
			}
		}

	},
	SCHEDULE_PCS:{
		"id" : "",
		"data" : {
	        "holyday" : true,
	        "validated" : true,
	        "run" : false,
	        "scname" : "",
	        "months" : [
	            {
	                "month" : 1,
	                "scdayname" : ""
	            },
	            {
	                "month" : 2,
	                "scdayname" : ""
	            },
	            {
	                "month" : 3,
	                "scdayname" : ""
	            },
	            {
	                "month" : 4,
	                "scdayname" : ""
	            },
	            {
	                "month" : 5,
	                "scdayname" : ""
	            },
	            {
	                "month" : 6,
	                "scdayname" : ""
	            },
	            {
	                "month" : 7,
	                "scdayname" : ""
	            },
	            {
	                "month" : 8,
	                "scdayname" : ""
	            },
	            {
	                "month" : 9,
	                "scdayname" : ""
	            },
	            {
	                "month" : 10,
	                "scdayname" : ""
	            },
	            {
	                "month" : 11,
	                "scdayname" : ""
	            },
	            {
	                "month" : 12,
	                "scdayname" : ""
	            }
	        ],
	        "devs" : [

	        ]
	    },
	    "bizid" : "em18",
	    "type" : 11,
	    "sid" : ""
	},
	SCHEDULE_DAY:{
		"data" : {
	        "scdayname" : "",
	        "times" : [
	            {
	                "h" : 0,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 1,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 2,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 3,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 4,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 5,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 6,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 7,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 8,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 9,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 10,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 11,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 12,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 13,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 14,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 15,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 16,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 17,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 18,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 19,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 20,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 21,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 22,
	                "cmd" : 14,
	                "pkw" : 0
	            },
	            {
	                "h" : 23,
	                "cmd" : 14,
	                "pkw" : 0
	            }
	        ]
	    },
	    "bizid" : "em18",
	    "type" : 12,
	    "sid" : ""
	},
	HOLIDAY:{

	},
	SOCMODE:{
		"PERFORMANCE1" : {soc:1,text:"성능모드1(0%~100%)",min:0,max:100},
		"PERFORMANCE2" : {soc:2,text:"성능모드2(2%~98%)",min:2,max:98},
		"PERFORMANCE3" : {soc:3,text:"성능모드3(5%~95%)",min:5,max:95},
		"NOMAL1" : {soc:4,text:"일반모드1(10%~90%)",min:10,max:90},
		"NOMAL2" : {soc:5,text:"일반모드2(12%~90%)",min:12,max:90},
		"NOMAL3" : {soc:6,text:"일반모드3(15%~90%)",min:15,max:90},
		"SAFE1" : {soc:7,text:"보호모드1(20%~80%)",min:20,max:80},
		"SAFE2" : {soc:8,text:"보호모드2(25%~80%)",min:25,max:80},
		"SAFE3" : {soc:9,text:"보호모드3(30%~80%)",min:30,max:80},
		"TEST" : {soc:0,text:"테스트모드(40%~60%)",min:40,max:60}
	},
	BCODE:[
		//[요금제 타입] | [수전 전압 종류]
		{bcode:100,text:"주택용(저압)"},
		{bcode:110,text:"주택용(고압)"},
		{bcode:250,text:"일반용(갑)II|고압A:선택I "},
		{bcode:260,text:"일반용(갑)II|고압A:선택II"},
		{bcode:270,text:"일반용(갑)II|고압A:선택I "},
		{bcode:280,text:"일반용(갑)II|고압B:선택II"},
		{bcode:300,text:"일반용(을)|고압A:선택I   "},
		{bcode:310,text:"일반용(을)|고압A:선택II  "},
		{bcode:320,text:"일반용(을)|고압A:선택III "},
		{bcode:330,text:"일반용(을)|고압B:선택I   "},
		{bcode:340,text:"일반용(을)|고압B:선택II  "},
		{bcode:350,text:"일반용(을)|고압B:선택III "},
		{bcode:360,text:"일반용(을)|고압C:선택I   "},
		{bcode:370,text:"일반용(을)|고압C:선택II  "},
		{bcode:380,text:"일반용(을)|고압C:선택III "},
		{bcode:450,text:"교육용(을)|고압A:선택I   "},
		{bcode:460,text:"교육용(을)|고압A:선택II  "},
		{bcode:470,text:"교육용(을)|고압B:선택I   "},
		{bcode:480,text:"교육용(을)|고압B:선택II  "},
		{bcode:550,text:"산업용(갑)II|고압A:선택I "},
		{bcode:560,text:"산업용(갑)II|고압A:선택II"},
		{bcode:570,text:"산업용(갑)II|고압B:선택I "},
		{bcode:580,text:"산업용(갑)II|고압B:선택II"},
		{bcode:600,text:"산업용(을)|고압A:선택I   "},
		{bcode:610,text:"산업용(을)|고압A:선택II  "},
		{bcode:620,text:"산업용(을)|고압A:선택III "},
		{bcode:630,text:"산업용(을)|고압B:선택I   "},
		{bcode:640,text:"산업용(을)|고압B:선택II  "},
		{bcode:650,text:"산업용(을)|고압B:선택III "},
		{bcode:660,text:"산업용(을)|고압C:선택I   "},
		{bcode:670,text:"산업용(을)|고압C:선택II  "},
		{bcode:680,text:"산업용(을)|고압C:선택III "}
	]

})
// Adding the auth interceptor here, to check every $http request
.config(function ($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
});
var dtOption = {
        "sEmptyTable":     "데이타가 없습니다.",
        "sInfo":           "[_START_ 페이지] _END_ / _TOTAL_",
        "sInfoEmpty":      "전체 0개",
        "sInfoFiltered":   "(전체 _MAX_ 개 )",
        "sInfoPostFix":    "",
        "sInfoThousands":  ",",
        "sLengthMenu":     "_MENU_ 단위 페이지",
        "sLoadingRecords": "로딩...",
        "sProcessing":     "진행중...",
        "sSearch":         "검색:",
        "sZeroRecords":    "검색 결과 없음",
        "oPaginate": {
            "sFirst":    "처음",
            "sLast":     "마지막",
            "sNext":     "다음",
            "sPrevious": "이전"
        },
        "oAria": {
            "sSortAscending":  ": activate to sort column ascending",
            "sSortDescending": ": activate to sort column descending"
        }
    };
app.controller('constant_ctrl', function($rootScope, $scope,Session,$window,$uibModal,AUTH_EVENTS,$state,$timeout,DEFINED,apiService,translation,$cacheFactory){
	$rootScope.disconnected=0;
//  ※ 웹소켓 연동 프로세스
	// 페이지 구동시 한번 연결
	if(!DEFINED.devMode){
		DEFINED.server_root_url = window.location.origin+"/ice/v1/";
		DEFINED.webSocket_host = window.location.hostname;

		$rootScope.url = DEFINED.server_root_url;
		$rootScope.webSocket_host = DEFINED.webSocket_host;
	}else{
		$rootScope.url = DEFINED.server_root_url;
		$rootScope.webSocket_host = DEFINED.webSocket_host;
	}
	$scope.menuToggle = function($event){
		$($event.currentTarget.parentElement).toggleClass("menu-open");
		$($event.currentTarget.nextElementSibling).slideToggle('slow');
		$event.preventDefault();
	}
	//모바일 여부 체크
	var filter = "win16|win32|win64|mac";
	if(navigator.platform){
		if(0 > filter.indexOf(navigator.platform.toLowerCase())){
			$rootScope.isPC = false;
			angular.element(document.querySelector(".sidebar-mini")).removeClass("sidebar-open");
			console.log("Mobile");
//			alert("Mobile");
		}else{
			$rootScope.isPC = true;
			console.log("PC");
//			alert("PC");
		}
	}
	
	function getLanguage() {
		$rootScope.lang =navigator.language || navigator.userLanguage;
		console.log("언어 : "+$rootScope.lang);
	  return $rootScope.lang;
	}
	
//	translation.getLanguage($scope);
    $rootScope.multiLng = function( langtype ) {
    	multiLng(langtype, function(){
    		$window.location.reload();
    	})
    }
    function multiLng(langtype, callback){
    	apiService.get_Language(langtype)
    	.then(
    		function(d) {
    			var result = d;
    			result.data.content = JSON.parse(d.data.content);
    			$rootScope.ts = result.data.content; //ts=translation
    		    $rootScope.langtype = result.data.langtype;
    		    setCookie('lang',JSON.stringify(result.data));
    		    if(callback != undefined){
    		    	callback();
    		    }
    		    
//    		    $window.location.reload();
    		  },
            function(errResponse){
            	console.log('function getRealtime() \n['+ errResponse.status +'] : ' + errResponse.statusText);
            }
    	);
    }
    
  //lang 쿠키 있는지 확인
	if(getCookie('lang') != undefined){
		multiLng(JSON.parse(getCookie('lang')).langtype);
	}else{
		var langtype = 1;
		if (getLanguage() != 'ko-KR') {
			langtype = 2;
		}
		multiLng(langtype);
	}

//	 function getProperties (type){
//         console.log('초기 api 실행')
//             apiService.get_properties(type)
//                 .then(
//                     (res)=>{
//                     	$rootScope.currentProperties = res;
//         				$window.sessionStorage["properties"] = JSON.stringify($rootScope.currentProperties);
//                     },
//                     (err)=>{
//                         console.log(err)
//                     }
//                 )
//     }
//	 getProperties(2);

	
	var spinner;
	var target;
	$rootScope.spinStart = function(spinPageShow){
		//if(spinPageShow)
			$('#spinPage').show();

		if(spinner==undefined){
			spinner = new Spinner();
			target = document.getElementById('spinPage');
		}
		spinner.spin(target);
	}
	$rootScope.spinStop = function(){
		$('#spinPage').hide();
		if(spinner!=undefined){
			spinner.stop();
		}
	}
	$rootScope.loadingStart = function(spinPageShow){
			$('#loadingPage').show();
	}
	$rootScope.loadingStop = function(){
		$('#loadingPage').hide();
	}
	$scope.closeSidebar = function(){
//		$('#right-sidebar').removeClass('control-sidebar-open');
		$rootScope.showRight = false;
//		angular.element(document.querySelector(".sidebar-mini")).removeClass("sidebar-open");
	}

	$rootScope.themeClassName = "simple";
	$scope.changeThemeClass = function(){
		var reval = "simple";
		if(!$rootScope.isLogin){
			if(!angular.isUndefined(getCookie('themeClassName'))){
				reval = getCookie('themeClassName');
			}
		}
		return reval;
	}

	$scope.changeTheme = function(name){
//		$rootScope.themeClassName =name;
		$window.sessionStorage["themeClassName"] = JSON.stringify(name);
//		$scope.cacheThema.put('themeClassName',name);
		setCookie('themeClassName', name);
		$rootScope.themeClassName = name;
		console.log("");
	}
	$rootScope.configInfo = {svgname:"",pcs:null,pv:null,meter:null};
	$rootScope.changeSVG_dashboard = function(url){
		reval = "./svg/simple/"+url+"_simple_"+$rootScope.configInfo.svgname+".svg";
		if(!angular.isUndefined(getCookie('themeClassName'))){
			var name = getCookie('themeClassName');
			if(name == 'mechanic'){
//				reval = "./svg/mechanic/"+url+"_mechanic.svg";
				reval = "./svg/mechanic/"+url+"_mechanic_"+$rootScope.configInfo.svgname+".svg";
			}
		}
		return reval;
	}
	$rootScope.changeSVG = function(url){
		reval = "./svg/simple/"+url+"_simple.svg";
		if(!angular.isUndefined(getCookie('themeClassName'))){
			var name = getCookie('themeClassName');
			if(name == 'mechanic'){
				reval = "./svg/mechanic/"+url+"_mechanic.svg";
//				reval = "./svg/mechanic/"+url+"_mechanic_coolingtower.svg";
			}
		}
		return reval;
	}
	$rootScope.changeSidebar = function(){
		var classname = "overflowY";
		if($(".sidebar-mini").hasClass("sidebar-collapse")){
			classname = "";
		}
		return classname;
	}
	 $rootScope.ModalOpen = function(param, template, controller) {
	 	var returnVal;
        $rootScope.modalInstance = $uibModal.open({
            templateUrl: template,
            controller: controller,
            size:"lg",//lg,sm
        	resolve: {
        		params: function() {
	              return param;
	            }
	          }
        });
    };

	$scope.yyyymmdd = function(){
		var date = new Date();
		var yyyy = date.getFullYear().toString();
		var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
		var dd  = date.getDate().toString();
		return yyyy + (mm[1]?mm:"0"+mm[0])+ (dd[1]?dd:"0"+dd[0]); // padding
	};

	$scope.hhmmss = function(){
 	  var d = new Date(Date.parse(new Date));
 	 // var s = leadingZeros(d.getHours(), 2) + '시' +leadingZeros(d.getMinutes(), 2) + '분' + leadingZeros(d.getSeconds(), 2)+'초';
 	 var s = leadingZeros(d.getHours(), 2) + '' +leadingZeros(d.getMinutes(), 2) + '' + leadingZeros(d.getSeconds(), 2)+'';
 	  return s;
 	};
 	//focus 이동시키기
 	$scope.focus = function(name){
	    $timeout(function (){
	      $rootScope.$broadcast('focusOn', name);
	    });
 	}

 	//TODO 년 월 일 시 파싱해 리턴

 	/**
 	 * 3자리 콤마
 	 * @param obj
 	 */
 	$scope.NumberCommas= function(number){

 		 var string = number + ""; // 숫자일 경우, 문자로 바꾸기.

 		 string = string.replace( /^\s+|\s+$|,|[^+-\.\d]/g, "" ) // ±기호, 소수점, 숫자가 아닌 부분은 지우기.

 		 var regExp = /([+-]?\d+)(\d{3})(\.\d+)?/; // 필요한 정규식.

 		 while ( regExp.test( string ) ) string = string.replace( regExp, "$1" + "," + "$2" + "$3" ); // 쉼표 삽입.

 		 return string;
 	}

 	$scope.dateFormat= function(number){
 		 var string = "";
 		var numstr = number+"";

 		if(numstr.length == 4){
 			string = numstr+"-";
 		}else if(numstr.length == 6){
 			string = numstr.substring(0, 4) +"-"+ numstr.substring(4, 6) +"-";
 		}else if(numstr.length  ==8){
 			string = numstr.substring(0, 4) +"-"+ numstr.substring(4, 6) +"-"+ numstr.substring(6, 8);
 		}
 		return string;
 	}

 	$scope.timeFormat1= function(number){
		 var string = "";
		var numstr = number+"";
		if(numstr.length == 2){
 			string = numstr+"시";
 		}else if(numstr.length == 4){
 			string = numstr.substring(0, 2) +"시 "+ numstr.substring(2, 4) +"분";
 		}else if(numstr.length  ==6){
 			string = numstr.substring(0, 2) +"시 "+ numstr.substring(2, 4) +"분 "+ numstr.substring(4, 6)+"초";
 		}
		return string;
	}
 	$scope.timeFormat2= function(number){
 		var string = "";
 		var ampm="AM ";
		var numstr = number+"";
		var h=numstr.substring(0,2);
 		var m=numstr.substring(2,4);
 		var s=numstr.substring(4,6);
 		if(h>12){
 			ampm="PM ";
 			h=h-12;
 		}
		if(numstr.length == 2){
			string = ampm + h+"시";
		}else if(numstr.length == 4){
			string = ampm + h +"시 "+ m +"분";
		}else if(numstr.length  ==6){
			string = ampm + h +"시 "+ m +"분 "+ s+"초";
		}
		return string;
	}
 	$scope.addYear_yyyyMM= function(add){
 		var d = new Date();
 		var date = new Date();
 		date.setFullYear(d.getFullYear() + Number(add))
 		var datevalues = [
 			          	    date.getFullYear()
 			          	    ,((date.getMonth()+1) < 10 ? "0":"") + (date.getMonth()+1)
 			          	    ,(date.getDate() < 10 ? "0":"") + date.getDate()
 			          	,(date.getHours() < 10 ? "0":"") + date.getHours()
 			          	    ,(date.getMinutes() < 10 ? "0":"") + date.getMinutes()
 			          	    ,(date.getSeconds() < 10 ? "0":"") + date.getSeconds()
 			          	    ,(date.getMilliseconds() < 1000 ? "0":"") + date.getMilliseconds()
 			          	     ];

 			          		var yyyy=datevalues[0];
 			          		var MM=datevalues[1];
 			          	return yyyy+""+MM;
 	}
 	$scope.setyyyymmdd = function(date){
 		var datevalues = [
 			          	    date.getFullYear()
 			          	    ,((date.getMonth()+1) < 10 ? "0":"") + (date.getMonth()+1)
 			          	    ,(date.getDate() < 10 ? "0":"") + date.getDate()
 			          	,(date.getHours() < 10 ? "0":"") + date.getHours()
 			          	    ,(date.getMinutes() < 10 ? "0":"") + date.getMinutes()
 			          	    ,(date.getSeconds() < 10 ? "0":"") + date.getSeconds()
 			          	    ,(date.getMilliseconds() < 1000 ? "0":"") + date.getMilliseconds()
 			          	     ];

 			          		var yyyy=datevalues[0];
 			          		var MM=datevalues[1];
 			          		var DD=datevalues[2];
 			          	return yyyy+""+MM+""+DD;
 	}

 	function leadingZeros(n, digits) {
		var zero = '';
		n = n.toString();
		if (n.length < digits) {
			for (var i = 0; i < digits - n.length; i++)
			zero += '0';
		}
		return zero + n;
 	};




	$scope.configCodeSign = function(i){
		var re = "";
		if(i == 12) re="+";
		if(i == 13) re="-";
		return re;
	};
	$scope.configCodeString = function(i){
		var re = "";
		if(i < 0) re="충전";
		if(i > 0) re="방전";
		return re;
	};
	$scope.configCodeInt = function(s){
		var re = 0;
		if(s == "충전") re=12;
		if(s == "방전") re=13;
		return re;
	};
	$scope.configCodeIntToBoolean = function(i){
		var re = true;
		if(i == 12) re=true;
		if(i == 13) re=false;
		return re;
	};
	$scope.configCodeBooleanToInt = function(s){
		var re = 0;
		if(s == true) re=12;
		if(s == false) re=13;
		return re;
	};
	$rootScope.goURL = function(url){
		$state.go(url);
	}
	$rootScope.goBack = function(){
		$window.history.back();
	}
	
/////////////////////////////////////////////[ cookie ]/////////////////////////////////////////////////////
//	// cookie setting
//	function setCookie(cookieName, value, exdays){
//	    var exdate = new Date();
//	    exdate.setDate(exdate.getDate() + exdays);
//	    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
//	    document.cookie = cookieName + "=" + cookieValue;
//	}
//
//	// cookie getting
//	function getCookie(cookieName){
//		cookieName = cookieName + '=';
//	    var cookieData = document.cookie;
//	    var start = cookieData.indexOf(cookieName);
//	    var cookieValue = '';
//	    if(start != -1){
//	        start += cookieName.length;
//	        var end = cookieData.indexOf(';', start);
//	        if(end == -1)end = cookieData.length;
//	        cookieValue = cookieData.substring(start, end);
//	    }
//	    return unescape(cookieValue);
//	}
//
//	function deleteCookie(cookieName){
//		var expireDate = new Date();
//		expireDate.setDate(expireDate.getDate() -1);
//		document.cookie = cookieName + "= "+"; expires="+ expireDate.toGMTString();
//	}
	function safeApply(scope,fn) {
		  var phase = scope.$root.$$phase;
		  if(phase == '$apply' || phase == '$digest') {
		    if(fn && (typeof(fn) === 'function')) {
		      fn();
		    }
		  } else {
		    scope.$apply(fn);
		  }
	};
	var showLoginDialog = function() {
//		if(!$rootScope.showLogin){
			$rootScope.showLogin = true;
			$state.go('login');
			console.log("로그인 페이지로");
//		}else{
//			$scope.modalShown = false;
//		}
	};
	var showInitConfirm = function() {
		$state.go('initConfirm')
//		$state.go('initSetting')
	}
	var showNotAuthorized = function(){
//		alert("권한이 없습니다.");
	}
	var showLoginFailed = function(){
		alert("로그인에 실패하였습니다.");
	}
	var showDisconnected = function(){
		if($rootScope.disconnected == 0){
			$rootScope.disconnected++;
			console.log("=========================================");
			alert("서버와 통신 불가합니다.");
		}

//		showLoginDialog();
	}
	var setCurrentUser = function(){
//		$scope.currentUser = $rootScope.currentUser;
	}
	$rootScope.$on(AUTH_EVENTS.loginFailed, showLoginFailed);
	$rootScope.$on(AUTH_EVENTS.notAuthorized, showNotAuthorized);
//	$rootScope.$on(AUTH_EVENTS.notAuthenticated, showInitConfirm);
	$rootScope.$on(AUTH_EVENTS.notAuthenticated, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.sessionTimeout, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);
	$rootScope.$on(AUTH_EVENTS.disconnected, showDisconnected);
});