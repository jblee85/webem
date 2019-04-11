'use strict';
angular.module('iceApp').controller('header_ctrl',[ '$scope', '$state' , '$window','$timeout', '$location','$rootScope','$interval','AUTH_EVENTS','apiService','DEFINED',
	function($scope, $state, $window,$timeout, $location, $rootScope, $interval, AUTH_EVENTS, apiService,DEFINED) {
	var self = this;
	$rootScope.toggled=null;

//	display_ct();
	$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    $interval(function(){
    	$scope.day=$scope.dateFormat($scope.yyyymmdd());
 		$scope.ampm="AM";
		var numstr = $scope.hhmmss().substring(0,4)+"";
		$scope.h=numstr.substring(0,2);
		$scope.m=numstr.substring(2,4);
 		if($scope.h>12){
 			$scope.ampm="PM";
 			$scope.h=$scope.h-12;
 		}
    },1000);
    $rootScope.$on('interval', function() {
    	getsSchedule();
    	$rootScope.intervalSchedule = $interval(function(){getsSchedule();},60000);
      });
    $rootScope.PCScontrol={
			type:"",
			name:"",
			cmd:"",
			pkw:0
		};
    $scope.cmdState = function(){
    	var reval = "";
    	switch($rootScope.PCScontrol.cmd){
    	case "stop" :
    	case "정지" :
    		reval = "stopState";
    		break;
    	case "standby" :
    	case "대기" :
    		reval = "readyState";
    		break;
    	case "charge" :
    	case "충전" :
    		reval = "chargeState";
    		break;
    	case "discharge" :
    	case "방전" :
    		reval = "dischargeState";
    		break;
    	
    	default : reval = "";
    	}
    	return reval;
    }
	//capped data에서 수동,스케줄 모드인지 확인 후 스케줄 모드이면 작동중인(running=true) 스케줄 정보 가져오기

    setTimeout(function() {
    	 if(!angular.isUndefined(getCookie('userInfo'))){
    		getsSchedule();
			$scope.getVersionInfo();
    	}
    }, 1200);
    $scope.runSchedule=false;
	function getsSchedule(){
		apiService.gets_ConfigSchedule()
		.then(
			function(d) {
				try{
					$scope.scheduleList = d;
					for(var i in $scope.scheduleList){

						if($scope.scheduleList[i].data.run == true){
							$scope.runSchedule = true;
							$scope.scheduleData=$scope.scheduleList[i].data;
							$rootScope.PCScontrol.type="SCHEDULE";
							$rootScope.PCScontrol.name=$scope.scheduleData.scname;
						}
					}
					if(!$scope.runSchedule){
						$rootScope.PCScontrol.type="ACTIVE";
						$rootScope.PCScontrol.name = $rootScope.ts.MANUAL_CONTROL;
					}

				}catch(error){
					console.log(error.message);
				}
			},
			function(errResponse){
				console.log("errResponse gets_timeline status : "+errResponse.status);
			}
		);
	}

    $scope.readyMenu = function(){
    	alert("정지중");
    }
    // Toggle the side navigation
    $("#sidenavToggler").click(function(e) {
      e.preventDefault();
      $("body").toggleClass("sidenav-toggled");
      $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
      $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
    });

    // Force the toggled class to be removed when a collapsible nav link is clicked
    $(".navbar-sidenav .nav-link-collapse").click(function(e) {
      e.preventDefault();
      $("body").removeClass("sidenav-toggled");
    });

    $scope.soc = 0;
    $scope.socColor = '';
	//websocket data 수신부
	$rootScope.$on('websocket',function(event, data){
		$scope.capped = data;
		$scope.soc = data.bms.bsc.soc;
//		var test = $rootScope.ts.STOP;

		if($scope.soc < 20){
			$scope.socColor = 'red';
		}else{
			$scope.socColor = '#00eca2';
		}
		if(data.pcs.st == 0){
//			$rootScope.PCScontrol.cmd="정지";
			$rootScope.PCScontrol.cmd=$rootScope.ts.STOP;
		}else if(data.pcs.st == 1){
//			$rootScope.PCScontrol.cmd="대기";
			$rootScope.PCScontrol.cmd=$rootScope.ts.STANDBY;
		}else if(data.pcs.st == 2){
//			$rootScope.PCScontrol.cmd="충전";
			$rootScope.PCScontrol.cmd=$rootScope.ts.CHARGE;
		}else if(data.pcs.st == 3){
//			$rootScope.PCScontrol.cmd="방전";
			$rootScope.PCScontrol.cmd=$rootScope.ts.DISCHARGE;
		}else if(data.pcs.st == 4){
//			$rootScope.PCScontrol.cmd="결함";
			$rootScope.PCScontrol.cmd=$rootScope.ts.FAULT;
		}

		$rootScope.PCScontrol.pkw=Math.abs(data.pcs.pkw);
	});
	//dashBoard data 수신부
	$rootScope.$on('dashBoardOn',function(event,dashBoard){

		if(dashBoard.schedule != null ){
			$scope.schedulename = dashBoard.schedule.data.schedulename;
		}else{
			$scope.schedulename = "There is no schedule."
		}

	});

	//장애 리스트 데이터 정리
	$scope.idx_F = 0;
	$scope.idx_W = 0;
	$scope.idx_A = 0;
	function faultCount(data){
		$scope.idx_F = 0;
		$scope.idx_W = 0;
		$scope.idx_A = 0;
		if (typeof data != 'undefined') {
			var db = data
			var line = "";
			$scope.faultList=[];
			$.each(db.pcs.faults, function( i, v ) {
				$scope.idx_F++;
			});
			$.each(db.pcs.warnings, function( i, v ) {
				$scope.idx_W++;
			});
			$.each(db.pcs.alrams, function( i, v ) {
				$scope.idx_A++;
			});
			$.each(db.bms.faults, function( i, v ) {
				$scope.idx_F++;
			});
			$.each(db.bms.warnings, function( i, v ) {
				$scope.idx_W++;
			});
			$.each(db.bms.alrams, function( i, v ) {
				$scope.idx_A++;
			});
		}
	}
	//업데이트
	$scope.openUpdate = function(){
		var tempobj = {};
		tempobj.uri = $rootScope.uri;
		tempobj.versionHistory = $rootScope.versionHistory;
		tempobj.apiService = apiService;
		tempobj.rootScope = $rootScope;
		tempobj.state = $state;
		tempobj.timeout = $timeout;
		$rootScope.ModalOpen(tempobj, './jsp/modal/header_update.jsp','header_update_ctrl');
		$rootScope.modalInstance.result.then(function (val) {
			console.log("dd");
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
		console.log("dd");
	}
	$scope.getVersionInfo = function(){
		apiService.get_Version()
		.then(
				function(d) {
					console.log(d);
					$rootScope.uri = d;
					apiService.get_SystemCommitsResb()
					.then(
							function(d) {
								console.log(d);
								$rootScope.versionHistory = d.children;
							},
							function(errResponse){
//								alert("외부 통신이 안될 경우 수동 업데이트 하셔야 합니다.");
								console.log("errResponse get_schedule status : "+errResponse.status);
							}
					);
				},
				function(errResponse){
//					alert("외부 통신이 안될 경우 수동 업데이트 하셔야 합니다.");
					console.log("errResponse get_schedule status : "+errResponse.status);
				}
		);
	}

}]);
app.controller('header_update_ctrl', function($scope, $uibModalInstance, params) {
	$scope.params = [];
	$scope.returnVal =[];
	$scope.selectAll=false;
	$scope.version = params.uri;
	$scope.versionHistory = params.versionHistory;
	var apiService = params.apiService;

	$scope.selectIndex = 0;
	for(var i in $scope.versionHistory){
		if($scope.versionHistory[i].uri == $scope.version){
			$scope.selectIndex = i;
		}
	}
	$scope.selectVersion = function(index){
		$scope.selectIndex = index;
	}
	$scope.update = function(){
		if($scope.versionHistory[$scope.selectIndex].uri == $scope.version){
			alert("같은 버전 입니다.");
		}else{
			if(confirm("변경 된 내용을 저장 하시겠습니까?")==true){
				params.rootScope.spinStart();
				console.log("d");
				apiService.put_UpdateVersion($scope.versionHistory[$scope.selectIndex].uri)
				.then(
						function(d) {
							params.timeout(function(){
								var interval = setInterval(function() {
									apiService.post_Login(params.rootScope.loginModel)
									.then(
										function(d) {
											console.log("업데이트 성공!!!!!!!!!!!!!!!!");
											clearInterval(interval);
											params.rootScope.spinStop();
											params.state.go('login');
										},
										function(errResponse){
											console.log("대기중~~~~~~~~~~~~~~~~~~~");
										}
									);
							      }, 3000);
							},10000);

						},
						function(errResponse){
							params.rootScope.spinStop();
							console.log("errResponse get_schedule status : "+errResponse.status);
						}
				);
			}
		}
	}

    $scope.cancel = function() {
    	$uibModalInstance.dismiss('cancel');
    };
});