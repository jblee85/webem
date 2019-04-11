'use strict';
angular.module('iceApp').controller('dashboard_svg_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','DTOptionsBuilder', 'DTColumnDefBuilder','Session','DEFINED','apiService',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,DTOptionsBuilder, DTColumnDefBuilder,Session,DEFINED,apiService) {

	/*
	 * DashBoard SVG
	 *
	 * 1. Grid(한전 전원)에서 Factory(수용가)로 이동하는 전력 흐름 - 항상 애니메이션 동작
	 * 2. Grid에서 Battery로 이동하는 전력 흐름 - PCS Charge(충전)시 에니메이션 동작
	 * 3. Battery에서 Factory(수용가)로 이동하는 전력흐름 - PCS Discharge(방전)시 에니메이션 동작
	 * 4. PV(태양광 패널)에서 Factory(수용가)로 이동하는 전력 흐름 - 태양광  발전시 애니메이션 동작
	 *
 */

  $scope.pcs = null;
  $scope.bms = null;
	$scope.pvStatus = false; // on off 상태
	$scope.batteryStatus = "Stand-by"; // 충전 방전 상태

	$scope.moveTo = function(param) {
		$state.go(param);
	}

	// ************************ [ svg 초기값 ]  ************************

	//soc_svg 초기 값
	$scope.soc_svg = 0;
	$scope.soc_backColor = "#BABABA";

	$scope.pcsOn = {
		left : "#ABABAB",
		right : "#ABABAB"
	}

	$scope.pvOn = {
		pv_fill : "#ABABAB",
		sun_fill : "#ABABAB"
	}


	// 전력 배선 색상
	$scope.flowGridToFactory= {
		fill : "#EE2725",
		opacity : 1.0
	}
	$scope.flowPcsToBattery = {
		fill : "#ABABAB",
		opacity : 1.0
	}
	$scope.flowPcsToFactory = {
		fill : "#ABABAB",
		opacity : 1.0
	}
	$scope.flowBatteryToFactory = {
		fill : "#ABABAB",
		opacity : 1.0
	}
	$scope.flowPvToFactory1 = {
		fill : "#ABABAB",
		opacity : 1.0
	}
	$scope.flowPvToFactory2 = {
			fill : "#ABABAB",
			opacity : 1.0
	}
	$scope.flowPvToFactory3 = {
			fill : "#ABABAB",
			opacity : 1.0
	}
	$scope.flowAll = {
		fill : "#ABABAB",
		opacity : 1.0
	}

	// 태양광 화살표
	$scope.pvArrow1 = {
			path : "M20 0 -180 0",
			fill : "url(#off)"
	}
	$scope.pvArrow2 = {
			path : "M-180 0 -380 0",
			fill : "url(#off)"
	}
	$scope.pvArrow3 = {
			path : "M20 0 -45 0",
			fill : "url(#off)"
	}
	$scope.pvArrow4 = {
			path : "M-45 0 -110 0",
			fill : "url(#off)"
	}
	$scope.pvArrow5 = {
			path : "M0 -10 0 55",
			fill : "url(#off)"
	}
	$scope.pvArrow6 = {
			path : "M0 55 0 120",
			fill : "url(#off)"
	}
	$scope.pvArrow7 = {
			path : "M10 0 -155 0",
			fill : "url(#off)"
	}
	$scope.pvArrow8 = {
			path : "M-155 0 -320 0",
			fill : "url(#off)"
	}
	$scope.pvArrow9 = {
			path :"M 0 -10 0 80",
			fill : "url(#off)"
	}
	$scope.pvArrow10 = {
			path :"M 0 80 0 160",
			fill : "url(#off)"
	}

	// 배터리 화살표
	$scope.batteryArrow1 = {
		path :"M 20 0 -130 0",
		fill : "url(#off)"
	}
	$scope.batteryArrow2 = {
			path :"M -130 0 -280 0",
			fill : "url(#off)"
	}
	$scope.batteryArrow3 = {
			path :"M 0 10 0 -40",
			fill : "url(#off)"
	}
	$scope.batteryArrow4 = {
			path :"M 0 -40 0 -90",
			fill : "url(#off)"
	}
	$scope.batteryArrow5 = {
			path :"M 10 0 -169 0",
			fill : "url(#off)"
	}
	$scope.batteryArrow6 = {
			path :"M -169 0 -348 0",
			fill : "url(#off)"
	}
	$scope.batteryArrow7 = {
			path :"M -348 0 -527 0",
			fill : "url(#off)"
	}
	$scope.batteryArrow8 = {
			path :"M 0 -10 0 80",
			fill : "url(#off)"
	}
	$scope.batteryArrow9 = {
			path :"M 0 80 0 160",
			fill : "url(#off)"
	}

	// 그리드 화살표
	$scope.gridArrow1 = {
		path : "M0, -20 0, 120",
		fill : "url(#gridArrow1)"
	}
	$scope.gridArrow2 = {
		path : "M0, 53 0, 193",
		fill : "url(#gridArrow2)"
	}
	$scope.gridArrow3 = {
		path : "M-10, 0 184, 0",
		fill : "url(#off)"
	}
	$scope.gridArrow4 = {
			path : "M184, 0 378 0",
			fill : "url(#off)"
	}
	$scope.gridArrow5 = {
		path : "M 378, 0 580 0",
		fill : "url(#off)"
	}
	$scope.gridArrow6 = {
		path : "M 0, -25 0 20", // -60
		fill : "url(#off)"
	}
	$scope.gridArrow7 = {
		path : "M 0, -35 0, 10",
		fill : "url(#off)"
	}
	$scope.gridArrow8 = {
		path : "M -10, 0 140 0",
		fill : "url(#off)"
	}
	$scope.gridArrow9 = {
		path : "M -130, 0 20 0",
		fill : "url(#off)"
	}
	// ************************ [ svg 제어 ] ************************
	// grid 흐름 변경
	$scope.gridFlowFn = function() {
		// grid --> battery
		if (($scope.pcsStatus == "None") || ($scope.pcsStatus == "Stand-by")  || ($scope.pcsStatus == "Fault")) {
			$scope.gridArrow4.fill = "url(#off)";
			$scope.gridArrow5.fill = "url(#off)";
			$scope.gridArrow6.fill = "url(#off)";
			$scope.gridArrow7.fill = "url(#off)";
			$scope.gridArrow8.fill = "url(#off)";
			$scope.gridArrow9.fill = "url(#off)";

			$scope.batteryArrow1.fill = "url(#off)";
			$scope.batteryArrow2.fill = "url(#off)";
			$scope.batteryArrow3.fill = "url(#off)";
			$scope.batteryArrow4.fill = "url(#off)";
	  	$scope.batteryArrow5.fill = "url(#off)";
			$scope.batteryArrow6.fill = "url(#off)";
			$scope.batteryArrow7.fill = "url(#off)";
			$scope.batteryArrow8.fill = "url(#off)";
			$scope.batteryArrow9.fill = "url(#off)";

			$scope.pvArrow1.fill = "url(#off)";
			$scope.pvArrow2.fill = "url(#off)";
			$scope.pvArrow3.fill = "url(#off)";
			$scope.pvArrow4.fill = "url(#off)";
			$scope.pvArrow5.fill = "url(#off)";
			$scope.pvArrow6.fill = "url(#off)";
			$scope.pvArrow7.fill = "url(#off)";
			$scope.pvArrow8.fill = "url(#off)";
			$scope.pvArrow9.fill = "url(#off)";
			$scope.pvArrow10.fill = "url(#off)";

		} else if ($scope.pcsStatus == "Charge") {

			// 그리드 화살표 애니메이션
			$scope.gridArrow3.fill = "url(#gridArrow3)";
		  $scope.gridArrow4.fill = "url(#gridArrow4)";
		  $scope.gridArrow5.fill = "url(#gridArrow5)";
		  $scope.gridArrow6.fill = "url(#gridArrow6)";
		  $scope.gridArrow7.fill = "url(#gridArrow7)";
			$scope.gridArrow8.fill = "url(#gridArrow8)";
			$scope.gridArrow9.fill = "url(#gridArrow9)";

			$scope.batteryArrow1.fill = "url(#off)";
			$scope.batteryArrow2.fill = "url(#off)";
			$scope.batteryArrow3.fill = "url(#off)";
			$scope.batteryArrow4.fill = "url(#off)";
			$scope.batteryArrow5.fill = "url(#off)";
			$scope.batteryArrow6.fill = "url(#off)";
			$scope.batteryArrow7.fill = "url(#off)";
			$scope.batteryArrow8.fill = "url(#off)";
			$scope.batteryArrow9.fill = "url(#off)";

			$scope.pvArrow1.fill = "url(#off)";
			$scope.pvArrow2.fill = "url(#off)";
			$scope.pvArrow3.fill = "url(#off)";
			$scope.pvArrow4.fill = "url(#off)";
			$scope.pvArrow5.fill = "url(#off)";
			$scope.pvArrow6.fill = "url(#off)";
			$scope.pvArrow7.fill = "url(#off)";
			$scope.pvArrow8.fill = "url(#off)";
			$scope.pvArrow9.fill = "url(#off)";
			$scope.pvArrow10.fill = "url(#off)";


		} else if ($scope.pcsStatus == "Discharge") {
			$scope.batteryArrow1.fill = "url(#batteryArrow1)";
			$scope.batteryArrow2.fill = "url(#batteryArrow2)";
			$scope.batteryArrow3.fill = "url(#batteryArrow3)";
			$scope.batteryArrow4.fill = "url(#batteryArrow4)";
			$scope.batteryArrow5.fill = "url(#batteryArrow5)";
			$scope.batteryArrow6.fill = "url(#batteryArrow6)";
			$scope.batteryArrow7.fill = "url(#batteryArrow7)";
			$scope.batteryArrow8.fill = "url(#batteryArrow8)";
			$scope.batteryArrow9.fill = "url(#batteryArrow9)";

			$scope.pvArrow1.fill = "url(#off)";
			$scope.pvArrow2.fill = "url(#off)";
			$scope.pvArrow3.fill = "url(#off)";
			$scope.pvArrow4.fill = "url(#off)";
			$scope.pvArrow5.fill = "url(#off)";
			$scope.pvArrow6.fill = "url(#off)";
			$scope.pvArrow7.fill = "url(#off)";
		  $scope.pvArrow8.fill = "url(#off)";
			$scope.pvArrow9.fill = "url(#off)";
			$scope.pvArrow10.fill = "url(#off)";

			$scope.gridArrow4.fill = "url(#off)";
			$scope.gridArrow5.fill = "url(#off)";
			$scope.gridArrow6.fill = "url(#off)";
			$scope.gridArrow7.fill = "url(#off)";
			$scope.gridArrow8.fill = "url(#off)";

		} else if ($scope.pcsStatus == "Pv") {
			$scope.pvArrow1.fill = "url(#pvArrow1)";
			$scope.pvArrow2.fill = "url(#pvArrow2)";
			$scope.pvArrow3.fill = "url(#pvArrow3)";
			$scope.pvArrow4.fill = "url(#pvArrow4)";
			$scope.pvArrow5.fill = "url(#pvArrow5)";
			$scope.pvArrow6.fill = "url(#pvArrow6)";
			$scope.pvArrow7.fill = "url(#pvArrow7)";
			$scope.pvArrow8.fill = "url(#pvArrow8)";
			$scope.pvArrow9.fill = "url(#pvArrow9)";
			$scope.pvArrow10.fill = "url(#pvArrow10)";

			$scope.batteryArrow1.fill = "url(#off)";
			$scope.batteryArrow2.fill = "url(#off)";
			$scope.batteryArrow3.fill = "url(#off)";
			$scope.batteryArrow4.fill = "url(#off)";
			$scope.batteryArrow5.fill = "url(#off)";
			$scope.batteryArrow6.fill = "url(#off)";
			$scope.batteryArrow7.fill = "url(#off)";
			$scope.batteryArrow8.fill = "url(#off)";

			$scope.gridArrow4.fill = "url(#off)";
			$scope.gridArrow5.fill = "url(#off)";
			$scope.gridArrow6.fill = "url(#off)";
			$scope.gridArrow7.fill = "url(#off)";
			$scope.gridArrow8.fill = "url(#off)";
		}
	}

	// 전력 배선 변경
	$scope.electricLineSet = function() {
		// grid --> battery
		if (($scope.pcsStatus== "None") || ($scope.pcsStatus == "Stand-by")  || ($scope.pcsStatus == "Fault")) {
			$scope.flowPcsToBattery.fill = "#ABABAB";
			$scope.flowPcsToFactory.fill = "#ABABAB";
			$scope.flowPvToFactory1.fill = "#ABABAB";
			$scope.flowPvToFactory2.fill = "#ABABAB";
			$scope.flowPvToFactory3.opacity = 0;
		} else if ($scope.pcsStatus == "Charge") {
			$scope.flowPcsToBattery.fill = "#FFC92C";
			$scope.flowPcsToFactory.fill = "#EE2725";
			$scope.flowPvToFactory1.fill = "#ABABAB";
			$scope.flowPvToFactory2.fill = "#ABABAB";
			$scope.flowPvToFactory3.fill = "#EE2725";

			$scope.flowPvToFactory3.opacity = 1;
		} else if ($scope.pcsStatus == "Discharge") {
			$scope.flowPcsToBattery.fill = "#FFC92C";
			$scope.flowPcsToFactory.fill = "#EE2725";
			$scope.flowPvToFactory1.fill = "#ABABAB";
			$scope.flowPvToFactory2.fill = "#ABABAB"
			$scope.flowPvToFactory3.fill = "#EE2725";

			$scope.flowPvToFactory3.opacity = 1;
		} else if ($scope.pcsStatus == "Pv") {
			$scope.flowPvToFactory1.fill = "#FFC92C";
			$scope.flowPvToFactory2.fill = "#EE2725";
			$scope.flowPvToFactory3.fill = "#EE2725";

			$scope.flowPvToFactory1.opacity = 1;
			$scope.flowPvToFactory2.opacity = 1;
			$scope.flowPvToFactory3.opacity = 1;
		}
	}

	// 장비 활성화
	$scope.deviceSet = function() {
		if (($scope.pcsStatus== "None") || ($scope.pcsStatus == "Stand-by") || ($scope.pcsStatus == "Fault")) {

			$scope.pcsOn.left = "#ABABAB";
			$scope.pcsOn.right = "#ABABAB";
			$scope.pvOn.pv_fill = "#ABABAB";
			$scope.pvOn.sun_fill = "#ABABAB";

		} else if ($scope.pcsStatus == "Charge") {

			$scope.pcsOn.left= "#1C95D3";
			$scope.pcsOn.right = "#1C95D3";
			$scope.pvOn.pv_fill = "#ABABAB";
			$scope.pvOn.sun_fill = "#ABABAB";

		} else if ($scope.pcsStatus == "Discharge") {

			$scope.pcsOn.left = "#42B549";
			$scope.pcsOn.right = "#42B549";
			$scope.pvOn.pv_fill = "#ABABAB";
			$scope.pvOn.sun_fill = "#ABABAB";

		} else if ($scope.pcsStatus == "Pv") {

			$scope.pcsOn.left = "#ABABAB";
			$scope.pcsOn.right = "ABABAB";
			$scope.pvOn.pv_fill = "#1C95D3";
			$scope.pvOn.sun_fill = "#1C95D3";
		}
	}

	/*
	 * $scope.goPCSDetail = function(rid){
	 * $window.sessionStorage["rid"] = rid;
	 * $state.go('pcsDetail',{rid:rid}); }
	 */

	// pcs 바로가기 버튼
	$scope.goPCSDetail = function() {
		$state.go('pcsDetail');
	}

	// battery 바로가기 버튼
	$scope.goBMSDetail = function() {
		$state.go('bmsDetail');
	}


/**
 * websocket data 수신부
 *
 * svg 모든 데이터의 시작점
 *
 * 1. 데이터 수신
 * 2. pcs 상태 확인 후 on off 처리
 * 3. battery 상태 on off 처리
 * 4. pv 상태 on off 처리
 * 5. 전력 배선 그리드 활성화 처리
 * 6. 전력 흐름 화살표 처리
 */
	$scope.$on('websocket', function(event, data) {
		// 1. 데이터 수신
		$scope.pcs = $scope.dashBoardData.pcs;
		//	$scope.pcs.st = Math.floor(Math.random() * 4) + 1;
		$scope.pcs.chargeSt = Math.abs($scope.pcs.dummy.split("|")[2])
	  $scope.bms = $scope.dashBoardData.bms;



		// 실시간 PCS 데이터
		$scope.pcs_data = {
			pkw : $scope.pcs.pkw, // 방전
			pf : $scope.pcs.pf, // 역률
			dcv : $scope.pcs.dcv, // DC 전압
			mode : $scope.pcs.mode, // 제어모드
			hz : $scope.pcs.gridrst.hz, //주파수
			rst_rv : $scope.pcs.rst.rv,
			rst_sv : $scope.pcs.rst.sv,
			rst_tv : $scope.pcs.rst.tv,
			rst_ra : $scope.pcs.rst.ra,
			rst_sa : $scope.pcs.rst.sa,
			rst_ta : $scope.pcs.rst.ta,
			warnings : $scope.bms.warnings,
    	faults : $scope.bms.faults,
      alrams : $scope.bms.alrams
		}

		//실시간 Battery 데이터
		$scope.bms_data = {
				max: {
					cellv : $scope.bms.max.cellv, // 셀 전압
          rackvno : $scope.bms.max.rackvno, // 랙 번호
          modulevno : $scope.bms.max.modulevno, // 모듈 번호
          moduletm : $scope.bms.max.moduletm, // 모둘 온도
          racktmno : $scope.bms.max.racktmno, // 랙 번호
          moduletmno : $scope.bms.max.moduletmno  // 모둘 온도
				},
				bsc : {
				  soc : $scope.bms.bsc.soc,
          soh : $scope.bms.bsc.soh,
          dcv : $scope.bms.bsc.dcv,
          dca : $scope.bms.bsc.dca,
				},
				sts : $scope.bms.sts,
        warnings : $scope.bms.warnings,
      	faults : $scope.bms.faults,
        alrams : $scope.bms.alrams
		}

		// pcs 제어모드  (0: CV, 1: CP, 2: CCCV 3: CC 4: CV)
		if ($scope.pcs_data.mode == 0) {
			$scope.pcs_data.mode = "CV";
		} else if ($scope.pcs_data.mode == 1) {
			$scope.pcs_data.mode = "CP";
		} else if ($scope.pcs_data.mode == 2) {
			$scope.pcs_data.mode = "CCCV";
		} else if ($scope.pcs_data.mode == 3) {
			$scope.pcs_data.mode = "CC";
		} else if ($scope.pcs_data.mode == 4) {
			$scope.pcs_data.mode = "CV";
		}

		// 동기화 시간
		$scope.cdt = $scope.dashBoardData.cdt;

		// battert soc
//		$scope.bms_data.bsc.soc = $scope.bms_data.bsc.soc * 100;

		// battert soh
//		$scope.bms_data.bsc.soh = $scope.bms_data.bsc.soh * 100;

		// battery soc_svg
		$scope.soc_svg = 80.18 * $scope.bms.bsc.soc; // 61.16 : 배터리 SVG 너비


		if($scope.soc_svg > 0) {
			$scope.soc_backColor = "#1C95D3";
		}

		if ($scope.pcs.st == 0) {
			$scope.pcsStatus = "None";
//			$scope.pcsStatusKR = "정지";
			$scope.pcsStatusKR = $rootScope.ts.STOP;
		} else if ($scope.pcs.st == 1) {
			$scope.pcsStatus = "Stand-by";
//			$scope.pcsStatusKR = "정지";
			$scope.pcsStatusKR = $rootScope.ts.STANDBY;
		} else if ($scope.pcs.st == 2) {
			$scope.pcsStatus = "Charge";
//			$scope.pcsStatusKR = "충전";
			$scope.pcsStatusKR = $rootScope.ts.CHARGE;
		} else if ($scope.pcs.st == 3) {
			$scope.pcsStatus = "Discharge";
//			$scope.pcsStatusKR = "방전";
			$scope.pcsStatusKR = $rootScope.ts.DISCHARGE;
		} else if ($scope.pcs.st == 4) {
			$scope.pcsStatus = "Fault";
//			$scope.pcsStatusKR = "결함";
			$scope.pcsStatusKR = $rootScope.ts.FAULT;
		} else if ($scope.pcs.st == 5) {
			$scope.pcsStatus = "Pv";
//			$scope.pcsStatusKR = "태양광";
			$scope.pcsStatusKR = $rootScope.ts.PV;
	  }

		// 5. 전력 배선 그리드 활성화 처리
		$scope.electricLineSet();

		// 6. 전력 흐름 화살표 처리
		$scope.gridFlowFn();

		$scope.deviceSet();

		// 장애 갯수
	});

} ]);