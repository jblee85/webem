'use strict';
angular.module('iceApp').controller('pcs_svg_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','DTOptionsBuilder', 'DTColumnDefBuilder','Session','DEFINED','apiService',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,DTOptionsBuilder, DTColumnDefBuilder,Session,DEFINED,apiService) {

	/*
	 * PCS_Detail SVG
	 *
	 * 1. Grid에서 Battery로 이동하는 전력 흐름 - PCS Charge(충전)시 에니메이션 동작
	 * 2. Battery에서 Factory(수용가)로 이동하는 전력흐름 - PCS Discharge(방전)시
	 * 3. EMS와 PCS가 상호 통신하는 애니메이션(통신 두절시 비활성화)
	 * 4. BMS와 PCS가 상호 통신하는 애니메이션(통신 두절시 비활성화)
	 *
	 */

	// --------------------------------- mechanic thema ------------------------------------

	//soc_svg 초기 값

	/*
  	AC 전력선 : #FF5F5F
  	DC 전력선 : #E7FF5C
  	IDLE : #1a3045
  	통신선 : #417EFF
	 */

	$scope.m_flowPcsToEms = {
			fill : "#1a3045",
			opacity : 1,
			shadow : 0
	}

	$scope.m_flowPcsToBms = {
			fill : "#1a3045",
			opacity : 1,
			shadow : 0
	}

	$scope.m_flowBmsToBattery = {
			fill : "#1a3045",
			opacity : 1,
			shadow : 0
	}

	$scope.m_flowPcsToGrid = {
			fill : "#1a3045",
			opacity : 1,
			shadow : 0
	}

	$scope.m_flowPcsToBattery = {
			fill : "#1a3045",
			opacity : 1,
			shadow : 0
	}

	$scope.m_Ems = {
			line_fill : "#1a3045",
			line_opacity : 1,
	}
	$scope.m_Bms = {
			line_fill : "#1a3045",
			line_opacity : 1,
	}

	// Light Circle

	$scope.grid_circle = {
			fill : "url(#off)"
	}
	$scope.ems_circle = {
			fill : "url(#off)"
	}
	$scope.bms_circleRight = {
			fill : "url(#off)"
	}
	$scope.bms_circleLeft = {
			fill : "url(#off)"
	}
	$scope.battery_circleRight = {
			fill : "url(#off)"
	}
	$scope.battery_circleLeft = {
			fill : "url(#off)"
	}
	$scope.pcs_circleRight = {
			fill : "url(#off)"
	}
	$scope.pcs_circleLeft = {
			fill : "url(#off)"
	}


	// 배터리 방전 화살표
	$scope.m_batteryArrow1 = {
			path : "M 10 0 -300 0",
			fill : "url(#off)",
			shadow_path : "M 10 0 -300 0",
			shadow_opacity : 0
	}
	$scope.m_batteryArrow2 = {
			path : "M 20 0 -135 0",
			fill : "url(#off)",
			shadow_path : "M 20 0 -135 0",
			shadow_opacity : 0
	}
	$scope.m_batteryArrow3 = {
			path : "M 0 0 -43 43",
			fill : "url(#off)",
			shadow_path : "M 0 0 -43 43",
			shadow_opacity : 0
	}
	$scope.m_batteryArrow4 = {
			path : "M 0 0 -50 0",
			fill : "url(#off)",
			shadow_path : "M 0 0 -50 0",
			shadow_opacity : 0
	}


	// 그리드 충전 화살표
	$scope.m_gridArrow1 = {
			path : "M -5 0 55 0",
			fill : "url(#off)",
			shadow_path : "M -5 0 55 0",
			shadow_opacity : 0
	}
	$scope.m_gridArrow2 = {
			path : "M 0 0 43 -43",
			fill : "url(#off)",
			shadow_path :  "M 0 0 43 -43",
			shadow_opacity : 0
	}
	$scope.m_gridArrow3 = {
			path : "M 0 0 140 0",
			fill : "url(#off)",
			shadow_path : "M 0 0 140 0",
			shadow_opacity : 0
	}
	$scope.m_gridArrow4 = {
			path : "M -20 0 270 0",
			fill : "url(#off)",
			shadow_path : "M -20 0 270 0",
			shadow_opacity : 0
	}


	// 상태별 전력 화살표 색상 변경

	$scope.m_electricArrowSet = function() {
		if (($scope.pcsStatus == "None") || ($scope.pcsStatus == "Stand-by") || ($scope.pcsStatus == "Fault")) {
			$scope.m_gridArrow1.fill = "url(#off)";
			$scope.m_gridArrow2.fill = "url(#off)";
			$scope.m_gridArrow3.fill = "url(#off)";
			$scope.m_gridArrow4.fill = "url(#off)";

			$scope.m_batteryArrow1.fill = "url(#off)";
			$scope.m_batteryArrow2.fill = "url(#off)";
			$scope.m_batteryArrow3.fill = "url(#off)";
			$scope.m_batteryArrow4.fill = "url(#off)";


			$scope.m_gridArrow1.shadow_opacity = 0;
			$scope.m_gridArrow2.shadow_opacity = 0;
			$scope.m_gridArrow3.shadow_opacity = 0;
			$scope.m_gridArrow4.shadow_opacity = 0;

			$scope.m_batteryArrow1.shadow_opacity = 0;
			$scope.m_batteryArrow2.shadow_opacity = 0;
			$scope.m_batteryArrow3.shadow_opacity = 0;
			$scope.m_batteryArrow4.shadow_opacity = 0;

		} else if ($scope.pcsStatus == "Charge") {

			$scope.m_gridArrow1.fill = "url(#m_gridArrow1)";
			$scope.m_gridArrow2.fill = "url(#m_gridArrow2)";
			$scope.m_gridArrow3.fill = "url(#m_gridArrow3)";
			$scope.m_gridArrow4.fill = "url(#m_gridArrow4)";

			$scope.m_batteryArrow1.fill = "url(#off)";
			$scope.m_batteryArrow2.fill = "url(#off)";
			$scope.m_batteryArrow3.fill = "url(#off)";
			$scope.m_batteryArrow4.fill = "url(#off)";

			$scope.m_gridArrow1.shadow_opacity = 1;
			$scope.m_gridArrow2.shadow_opacity = 1;
			$scope.m_gridArrow3.shadow_opacity = 1;
			$scope.m_gridArrow4.shadow_opacity = 1;

			$scope.m_batteryArrow1.shadow_opacity = 0;
			$scope.m_batteryArrow2.shadow_opacity = 0;
			$scope.m_batteryArrow3.shadow_opacity = 0;
			$scope.m_batteryArrow4.shadow_opacity = 0;

		} else if ($scope.pcsStatus == "Discharge") {

			$scope.m_batteryArrow1.fill = "url(#m_batteryArrow1)";
			$scope.m_batteryArrow2.fill = "url(#m_batteryArrow2)";
			$scope.m_batteryArrow3.fill = "url(#m_batteryArrow3)";
			$scope.m_batteryArrow4.fill = "url(#m_batteryArrow4)";

			$scope.m_gridArrow1.fill = "url(#off)";
			$scope.m_gridArrow2.fill = "url(#off)";
			$scope.m_gridArrow3.fill = "url(#off)";
			$scope.m_gridArrow4.fill = "url(#off)";

			$scope.m_gridArrow1.shadow_opacity = 0;
			$scope.m_gridArrow2.shadow_opacity = 0;
			$scope.m_gridArrow3.shadow_opacity = 0;
			$scope.m_gridArrow4.shadow_opacity = 0;

			$scope.m_batteryArrow1.shadow_opacity = 1;
			$scope.m_batteryArrow2.shadow_opacity = 1;
			$scope.m_batteryArrow3.shadow_opacity = 1;
			$scope.m_batteryArrow4.shadow_opacity = 1;

		}
	}

	// 상태별 전력선 색상 변경

	/*
		AC 전력선 : #FF5F5F
		DC 전력선 : #E7FF5C
		IDLE : #1a3045
		통신선 : #417EFF
	 */
	$scope.m_electricLineSet = function() {
		if (($scope.pcsStatus == "None") || ($scope.pcsStatus == "Stand-by") || ($scope.pcsStatus == "Fault")) {
			$scope.m_flowPcsToGrid.fill = "#1a3045";
			$scope.m_flowPcsToBattery.fill = "#1a3045";

			$scope.grid_circle.fill = "url(#off)";
			$scope.pcs_circleLeft.fill = "url(#off)";
			$scope.pcs_circleRight.fill =  "url(#off)";
			$scope.battery_circleLeft.fill =  "url(#off)";

		} else if ($scope.pcsStatus == "Charge") {
			$scope.m_flowPcsToGrid.fill = "#FF5F5F";
			$scope.m_flowPcsToBattery.fill = "#E7FF5C";

			$scope.grid_circle.fill = "url(#grid_circle)";
			$scope.pcs_circleLeft.fill = "url(#pcs_circleLeft)";
			$scope.pcs_circleRight.fill =  "url(#pcs_circleRight)";
			$scope.battery_circleLeft.fill =  "url(#battery_circleLeft)";

		} else if ($scope.pcsStatus == "Discharge") {
			$scope.m_flowPcsToGrid.fill = "#FF5F5F";
			$scope.m_flowPcsToBattery.fill = "#E7FF5C";

			$scope.grid_circle.fill = "url(#grid_circle)";
			$scope.battery_circleLeft.fill =  "url(#battery_circleLeft)";
			$scope.pcs_circleLeft.fill = "url(#pcs_circleLeft)";
			$scope.pcs_circleRight.fill =  "url(#pcs_circleRight)";

		}
	}

	// 상태별 통신선 색상 변경
	$scope.m_connectLineSet = function() {
		if($rootScope.connected==true) {
			$scope.m_flowPcsToEms.fill = "#417EFF";
			$scope.m_flowBmsToBattery.fill = "417EFF";
			$scope.m_flowPcsToBms.fill = "#417EFF";
			$scope.m_flowBmsToBattery.fill = "#417EFF";

			$scope.m_Ems.line_fill = "#417EFF";
			$scope.m_Bms.line_fill = "#417EFF";
			$scope.ems_circle.fill = "url(#ems_circle)";
			$scope.battery_circleRight.fill =  "url(#battery_circleRight)";
			$scope.bms_circleLeft.fill =  "url(#bms_circleLeft)";
			$scope.bms_circleRight.fill =  "url(#bms_circleRight)";
		} else {
			$scope.m_flowPcsToEms.fill = "#417EFF";
			$scope.m_flowBmsToBattery.fill = "417EFF";
			$scope.m_flowPcsToBms.fill = "#417EFF";
			$scope.m_flowBmsToBattery.fill = "#417EFF";

			$scope.m_Ems.line_fill = "#417EFF";
			$scope.m_Bms.line_fill = "#417EFF";
			$scope.ems_circle.fill = "url(#off)";
			$scope.battery_circleRight.fill =  "url(#off)";
			$scope.bms_circleLeft.fill =  "url(#off)";
			$scope.bms_circleRight.fill =  "url(#off)";
		}
	}



	// --------------------------------------- simple thema -----------------------------------------
	//soc_svg 초기 값
	$scope.soc_svg = 0;
	$scope.soc_backColor = "#BABABA";

	$scope.pcsOn = {
			left : "#ABABAB",
			right : "#ABABAB"
		}

	$scope.emsOn = {
			fill : "#525252"
	}

	$scope.bmsOn = {
			fill : "#525252"
	}


	$scope.flowEmsToPcs = {
		fill : "#ABABAB",
		opacity : 1
	}

	$scope.flowBmsToPcs = {
			fill : "#ABABAB",
			opacity : 1
	}

	$scope.flowBmsToBattery = {
			fill : "#ABABAB",
			opacity : 1
	}

	$scope.flowGridToPcs = {
			fill : "#ABABAB",
			opacity : 1
	}

	$scope.flowBatteryToPcs = {
			fill : "#ABABAB",
			opacity : 1
	}


	// 배터리 방전 화살표
	$scope.batteryArrow1 = {
			path : "M30, 0 -150 0",
			fill : "url(#off)"
	}
	$scope.batteryArrow2 = {
			path : "M134, 0 -46 0",
			fill : "url(#off)"
	}
	$scope.batteryArrow3 = {
			path : "M40, 0 -120 0",
			fill : "url(#off)"
	}
	$scope.batteryArrow4 = {
			path : "M146, 0 -14 0",
			fill : "url(#off)"
	}


	// 그리드 충전 화살표
	$scope.gridArrow1 = {
			path : "M-10, 0 150 0",
			fill : "url(#off)"
	}
	$scope.gridArrow2 = {
			path : "M-115, 0 45 0",
			fill : "url(#off)"
	}
	$scope.gridArrow3 = {
			path : "M-46, 0 134 0",
			fill : "url(#off)"
	}
	$scope.gridArrow4 = {
			path : "M-150, 0 30 0",
			fill : "url(#off)"
	}

	// 상태별 전력선 색상 변경
	$scope.electricLineSet = function() {
		if (($scope.pcsStatus == "None") || ($scope.pcsStatus == "Stand-by") || ($scope.pcsStatus == "Fault")) {

			$scope.flowGridToPcs.fill = "#ABABAB";
			$scope.flowBatteryToPcs.fill = "#ABABAB";

			$scope.pcsOn.left = "#ABABAB";
			$scope.pcsOn.right = "#ABABAB";

		} else if ($scope.pcsStatus == "Charge") {

			$scope.flowGridToPcs.fill = "#ED2C27";
			$scope.flowBatteryToPcs.fill = "#FFC92F";

			$scope.pcsOn.left= "#1C95D3";
			$scope.pcsOn.right = "#1C95D3";

		} else if ($scope.pcsStatus == "Discharge") {

			$scope.flowEmsToPcs.fill = "#82D1E6";
			$scope.flowBmsToPcs.fill = "#82D1E6";
			$scope.flowBmsToBattery.fill = "#82D1E6";
			$scope.flowGridToPcs.fill = "#ED2C27";
			$scope.flowBatteryToPcs.fill = "#FFC92F";

			$scope.pcsOn.left = "#42B549";
			$scope.pcsOn.right = "#42B549";
		}
	}

	// 상태별 통신선 색상 변경
	$scope.connectLineSet = function() {
		if($rootScope.connected==true) {
			$scope.flowEmsToPcs.fill = "#82D1E6";
			$scope.flowBmsToPcs.fill = "#82D1E6";
			$scope.flowBmsToBattery.fill = "#82D1E6";
			$scope.emsOn.fill = "#2095D3";
			$scope.bmsOn.fill = "#2095D3";
		} else {
			$scope.flowEmsToPcs.fill = "#ABABAB";
			$scope.flowBmsToPcs.fill = "#ABABAB";
			$scope.flowBmsToBattery.fill = "#ABABAB";
			$scope.emsOn.fill = "#525252";
			$scope.bmsOn.fill = "#525252";
		}
	}

	// 상태별 전력 화살표 색상 변경
	$scope.electricArrowSet = function() {
		if (($scope.pcsStatus == "None") || ($scope.pcsStatus == "Stand-by") || ($scope.pcsStatus == "Fault")) {
			$scope.gridArrow1.fill = "url(#off)";
			$scope.gridArrow2.fill = "url(#off)";
			$scope.gridArrow3.fill = "url(#off)";
			$scope.gridArrow4.fill = "url(#off)";

			$scope.batteryArrow1.fill = "url(#off)";
			$scope.batteryArrow2.fill = "url(#off)";
			$scope.batteryArrow3.fill = "url(#off)";
			$scope.batteryArrow4.fill = "url(#off)";

		} else if ($scope.pcsStatus == "Charge") {

			$scope.gridArrow1.fill = "url(#gridArrow1)";
			$scope.gridArrow2.fill = "url(#gridArrow2)";
			$scope.gridArrow3.fill = "url(#gridArrow3)";
			$scope.gridArrow4.fill = "url(#gridArrow4)";

			$scope.batteryArrow1.fill = "url(#off)";
			$scope.batteryArrow2.fill = "url(#off)";
			$scope.batteryArrow3.fill = "url(#off)";
			$scope.batteryArrow4.fill = "url(#off)";

		} else if ($scope.pcsStatus == "Discharge") {

			$scope.batteryArrow1.fill = "url(#batteryArrow1)";
			$scope.batteryArrow2.fill = "url(#batteryArrow2)";
			$scope.batteryArrow3.fill = "url(#batteryArrow3)";
			$scope.batteryArrow4.fill = "url(#batteryArrow4)";

			$scope.gridArrow1.fill = "url(#off)";
			$scope.gridArrow2.fill = "url(#off)";
			$scope.gridArrow3.fill = "url(#off)";
			$scope.gridArrow4.fill = "url(#off)";

		}
	}

	// websocket data 수신부
	// svg 모든 데이터의 시작점
	// 1. 데이터 수신
	// 2. pcs 상태 확인 후 on off 처리
	// 3. bettery 상태 on off 처리
	// 4. pv 상태 on off 처리
	// 5. 전력 배선 그리드 활성화 처리
	// 6. 전력 흐름 화살표 처리
	$rootScope.$on('websocket', function(event, data) {
		// 1. 데이터 수신
		$scope.pcs = $scope.dashBoardData.pcs;
//		$scope.pcs.chargeSt = Math.abs($scope.pcs.dummy.split("|")[2])
		$scope.bms = $scope.dashBoardData.bms;

	//	$scope.pcs.st = Math.floor(Math.random() * 4) + 1;

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
			tm : $scope.pcs.tm,
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

		// 알림/경고/결함 메세지
		$scope.pcsWarnings_length = 0;
		$scope.pcsAlrams_length = 0;
		$scope.pcsFaluts_length = 0;

		if ( $scope.pcs.warnings == null) {
			$scope.pcsWarnings_length = 0;
		} else {
			$scope.pcsWarnings_length =  $scope.pcs.warnings.length;
		}

		if ( $scope.pcs.alrams == null) {
			$scope.pcsAlrams_length = 0;
		} else {
			$scope.pcsAlrams_length =  $scope.pcs.alrams.length;
		}

		if ( $scope.pcs.faults == null) {
			$scope.pcsFaluts_length = 0;
		} else {
			$scope.pcsFaluts_length =  $scope.pcs.faults.length;
		}

		$scope.bmsWarnings_length = 0;
		$scope.bmsAlrams_length = 0;
		$scope.bmsFaluts_length = 0;

		if ( $scope.bms.warnings == null) {
			$scope.bmsWarnings_length = 0;
		} else {
			$scope.bmsWarnings_length =  $scope.bms.warnings.length;
		}
		if ( $scope.bms.alrams == null) {
			$scope.bmsAlrams_length = 0;
		} else {
			$scope.bmsAlrams_length =  $scope.bms.alrams.length;
		}

		if ( $scope.bms.faults == null) {
			$scope.bmsFaluts_length = 0;
		} else {
			$scope.bmsFaluts_length =  $scope.bms.faults.length;
		}

		// 동기화 시간
		$scope.cdt = $scope.dashBoardData.cdt;

		// battert soc
//		$scope.bms_data.bsc.soc = $scope.bms_data.bsc.soc * 100;

		// battert soh
//		$scope.bms_data.bsc.soh = $scope.bms_data.bsc.soh * 100;

		// battery soc_svg
		$scope.soc_svg = 61.16 * $scope.bms.bsc.soc/100; // 61.16 : 배터리 SVG 너비
		$scope.m_soc_svg = 104.932 * $scope.bms.bsc.soc/100; // 61.16 : 배터리 SVG 너비
		if($scope.soc_svg > 0) {
			$scope.soc_backColor = "#1C95D3";
		}


		// pcs  상태
		if ($scope.pcs.st == 0) {
			$scope.pcsStatus = "None";
//			$scope.pcsStatusKR = "작동안함";
			$scope.pcsStatusKR = $rootScope.ts.STOP;
			// $scope.pcs.st = "Stand-by";
			// $scope.pcsStatus = "Charge";
			//$scope.pcs.st = "Discharge";
			// $scope.pcs.st = "Fault";
			// $scope.pcs.st = "Pv";
		} else if ($scope.pcs.st == 1) {
			$scope.pcsStatus = "Stand-by";
//			$scope.pcsStatusKR = "대기";
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
		}
		//$scope.pcsStatus = "Charge";

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

		// 5. 전력 배선 그리드 활성화 처리
		$scope.electricLineSet();
		$scope.m_electricLineSet();
		$scope.connectLineSet();
		$scope.m_connectLineSet();

		// 6. 전력 흐름 화살표 처리
	   $scope.electricArrowSet();
	   $scope.m_electricArrowSet();

		// 장애 갯수
		// faultCount(data);
	});


} ]);