'use strict';
angular.module('iceApp').controller('dashboard_sgv_ctrl5',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','DTOptionsBuilder', 'DTColumnDefBuilder','Session','DEFINED','apiService',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,DTOptionsBuilder, DTColumnDefBuilder,Session,DEFINED,apiService) {
	var self = this;
	$scope.pcs = null;
	$scope.bms = null;
	$scope.pvStatus = false; //on off 상태
	$scope.batteryStatus = "Stand-by"; //충전 방전 상태


	$scope.moveTo = function(param){
		$state.go(param);
	}
	// ************************ [ svg 초기값 ] ************************
	$scope.pcsOn = {
			top :"#ACACAC",
			left : "#9D9D9D",
			right : "#6E7280"
	}
	$scope.pvOn =null; //
	$scope.chargePer = 59;
	$scope.batteryCharge = {
			lv00 :{top :"#54F066",front : "#2FBA40",side : "#37D94A"},
			lv10 :{top :"#54F066",front : "#2FBA40",side : "#37D94A"},
			lv20 :{top :"#54F066",front : "#2FBA40",side : "#37D94A"},
			lv30 :{top :"#54F066",front : "#2FBA40",side : "#37D94A"},
			lv40 :{top :"#54F066",front : "#2FBA40",side : "#37D94A"},
			lv50 :{top :"#54F066",front : "#2FBA40",side : "#37D94A"},
			lv60 :{top :"#54F066",front : "#2FBA40",side : "#37D94A"},
			lv70 :{top :"#54F066",front : "#2FBA40",side : "#37D94A"},
			lv80 :{top :"#54F066",front : "#2FBA40",side : "#37D94A"},
			lv90 :{top :"#54F066",front : "#2FBA40",side : "#37D94A"},
			lv100 :{top :"#54F066",front : "#2FBA40",side : "#37D94A"}
	}

	//배터리
	$scope.pcsChart={
			chart1 : { width : 0},
			chart2 : { x : 644 , width : 0}
	}
	$scope.batteryChart={
			chart1 : { width : 0},
			chart2 : { x : 1003 , width : 0}
	}
	//스위치
	$scope.onoff={x2 : 840 , y2 : 55.5 , stroke :"#0A6ECD"}

	//전력 배선
	$scope.electric = {
			line1 : { fill : "#17213f"},//grid_down
			line2 : { fill : "#17213f"},//grid_left
			line3 : { fill : "#17213f"},//grid_up
			line4 : { fill : "#17213f"},//grid_left
			line5 : { fill : "#17213f"}//center
	}

/*	//그리드 on

	$scope.grid = {
			flow1 : { fill : "url('#grid_arrow1')" , transform : "translate(0,0)" ,path : "M0,0, -35,-10"},//grid up
			//flow1 : { fill : "url('#grid_arrow1')" , transform : "translate(0,0)" ,path : "M0,0 -35,-10"},//grid up
			flow2 : { fill : "url('#grid_arrow2')" , transform : "translate(0,0)" ,path : "M0,0 180,-65"},//right
			flow3 : { fill : "url('#grid_arrow3')" , transform : "translate(0,0)" ,path : "M0,0 230,75"},//down center
			flow4 : { fill : "url('#grid_arrow4')" , transform : "translate(0,0)" ,path : "M0,0 180,-65"},//right factory
			flow5 : { fill : "url('#grid_arrow5')" , transform : "translate(0,0)" ,path : "M0,0 140,-45"},//right battery
			flow6 : { fill : "url('#grid_arrow6')" , transform : "translate(0,0) " ,path : "M0,0 200,55"}//down battery
	}


	//배터리 방전 on
	$scope.battery = {
			flow1 : { fill : "url(#battery_arrow1)" , transform : "translate(0,0)" , path : "M0,0 -115,-35" },//up to pcs
			flow2 : { fill : "url(#battery_arrow2)" , transform : "translate(0,0)" ,path : "M0,0 -130,51" },//left to pcs
			flow3 : { fill : "url(#battery_arrow3)" , transform : "translate(0,0)" ,path : "M0,0 -230,-78" },//up center
			flow4 : { fill : "url(#battery_arrow4)" , transform : "translate(0,0)" ,path : "M0,0 150,-56" },//right to factory
	}



	//태양광 on
	$scope.pv = {
			flow1 : { fill : "url('#sun_arrow1')" , transform : "translate(0,0)" , path : "M0,0 -115,-35" },//up,
			flow2 : { fill : "url('#sun_arrow2')" , transform : "translate(0,0) " ,path : "M0,0 180,-65"},//right
			flow3 : { fill : "url('#sun_arrow3')" , transform : "translate(0,0) " ,path : "M0,0 110,-37"},//right
			flow4 : { fill : "url('#sun_arrow4')" , transform : "translate(0,0)" ,path : "M0,0 200,55"},//down battery
			flow5 : { fill : "url('#sun_arrow5')" , transform : "translate(0,0)" ,path : "M0,0 -230,-78" },//up center
			flow6 : { fill : "url('#sun_arrow6')" , transform : "translate(0,0)" ,path : "M0,0 180,-65"},//left
	}*/



	//배터리 방전 off
	$scope.battery = {
			flow1 : { fill : "url(#off)" , transform : "translate(0,0)" , path : "M0,0 -115,-35" },//up to pcs
			flow2 : { fill : "url(#off)" , transform : "translate(0,0)" ,path : "M0,0 -130,51" },//left to pcs
			flow3 : { fill : "url(#off)" , transform : "translate(0,0)" ,path : "M0,0 -230,-78" },//up center
			flow4 : { fill : "url(#off)" , transform : "translate(0,0)" ,path : "M0,0 150,-56" },//right to factory
	}

	//그리드 off

 	$scope.grid = {
			flow1 : { fill : "url('#off')" , transform : "translate(0,0)" ,path : "M0,0 -35,-10"},//grid up
			flow2 : { fill : "url('#off')" , transform : "translate(0,0)" ,path : "M0,0 180,-65"},//right
			flow3 : { fill : "url('#off')" , transform : "translate(0,0)" ,path : "M0,0 230,75"},//down center
			flow4 : { fill : "url('#off')" , transform : "translate(0,0)" ,path : "M0,0 180,-65"},//right factory
			flow5 : { fill : "url('#off')" , transform : "translate(0,0)" ,path : "M0,0 140,-45"},//right battery
			flow6 : { fill : "url('#off')" , transform : "translate(0,0) " ,path : "M0,0 200,55"}//down battery
	}

	//태양광 off
	$scope.pv = {
			flow1 : { fill : "url('#off')" , transform : "translate(0,0)" , path : "M0,0 -115,-35" },//up,
			flow2 : { fill : "url('#off')" , transform : "translate(0,0) " ,path : "M0,0 180,-65"},//right
			flow3 : { fill : "url('#off')" , transform : "translate(0,0) " ,path : "M0,0 110,-37"},//right
			flow4 : { fill : "url('#off')" , transform : "translate(0,0)" ,path : "M0,0 200,55"},//down battery
			flow5 : { fill : "url('#off')" , transform : "translate(0,0)" ,path : "M0,0 -230,-78" },//up center
			flow6 : { fill : "url('#off')" , transform : "translate(0,0)" ,path : "M0,0 180,-65"},//left
	}


	// ************************ [ svg 제어 ] ************************

	//pcs 상태 변경
	$scope.pcsStatusFn=function(){
		if($scope.pcs.st == "None"){
			$scope.pcsOn = {
					top :"#ADB1BA",
					right : "#868C9C",
					left : "#6E7280"
			}
		}else if($scope.pcs.st == "Stand-by"){
			$scope.pcsOn = {
					top :"#ADB1BA",
					right : "#868C9C",
					left : "#6E7280"
			}
		}else if($scope.pcs.st == "Discharge"){
			$scope.pcsOn = {
					top :"url(#discharge-top-gradient)",
					right : "url(#discharge-right-gradient)",
					left : "url(#discharge-left-gradient)"
			}
		}else if($scope.pcs.st == "Charge"){
			$scope.pcsOn = {
					top :"url(#charge-top-gradient)",
					right : "url(#charge-right-gradient)",
					left : "url(#charge-left-gradient)"
			}
		}
	}
	//battery 상태 변경 soc
	$scope.batterySocFn=function(){
		$scope.bms.bsc.soh = 100;
		$scope.batteryChart.chart1.width = $scope.bms.bsc.soh;
		var charge = $scope.chargePer;
		$scope.bms.bsc.soc = $scope.chargePer;
		var batteryCharge = $scope.batteryCharge;

		$.each(batteryCharge, function( index, value ) {
			if(Number(index.substring(2)) >= Number(charge)){
				//  색상 어둡게 표현
				value.side = "#6E7280";
				value.top = "#ADB1BA";
				value.front = "#868C9C";
			}else{
				// 색상 표현
				if(Number($scope.bms.bsc.soc) > 70){
					//녹색
					value.side = "#37D94A";
					value.top = "#54F066";
					value.front = "#2FBA40";
				}else if(30 < (Number($scope.bms.bsc.soc)) && (Number($scope.bms.bsc.soc) <= 70)){
					//노란색
					value.side = "#EDC61A";
					value.top = "#D69F51";
					value.front = "#D6AF51";
				}else if(Number($scope.bms.bsc.soc) <= 30 ){
					//빨간색
					value.side = "#D83939";
					value.top = "#EF5656";
					value.front = "#B73030";
				}
			}
		});
	}

	//battery 전력 흐름 화살표 변경
	$scope.batteryFlowFn=function(){

		//{"0":"None","1":"BMS not connected","2":"Initializing","3":"Normal","4":"NPS (Normal Power Saving)","5":"Manual","6":"Emergency","7":"PPS (Protective Power Saving)"}

		$scope.batteryStatus =$scope.pcs.st;

		if($scope.batteryStatus == "Discharge"){//방전
			$scope.battery.flow1.fill = "url(#battery_arrow1)"
			$scope.battery.flow2.fill = "url(#battery_arrow2)"
			$scope.battery.flow3.fill = "url(#battery_arrow3)"
			$scope.battery.flow4.fill = "url(#battery_arrow4)"
		}else if($scope.batteryStatus == "Charge"){
			//충전
			$scope.battery.flow1.fill = "url(#off)"
			$scope.battery.flow2.fill = "url(#off)"
			$scope.battery.flow3.fill = "url(#off)"
			$scope.battery.flow4.fill = "url(#off)"
		}else if(($scope.batteryStatus == "None") || ($scope.batteryStatus == "Stand-by") ){
			// "Stand-by"
			$scope.battery.flow1.fill = "url(#off)"
			$scope.battery.flow2.fill = "url(#off)"
			$scope.battery.flow3.fill = "url(#off)"
			$scope.battery.flow4.fill = "url(#off)"
		}
	}

	//grid 흐름 변경
	$scope.gridFlowFn=function(){
		//grid --> factory
		$scope.grid.flow1.fill = "url(#grid_arrow1)"  //grid up
		$scope.grid.flow2.fill = "url(#grid_arrow2)"  //right
		$scope.grid.flow4.fill = "url(#grid_arrow4)"  //right factory

		//grid --> battery
		if(($scope.pcs.st == "None") || ($scope.pcs.st == "Stand-by")){
			$scope.grid.flow3.fill = "url(#off)" // down center
			$scope.grid.flow5.fill = "url(#off)" //right battery
			$scope.grid.flow6.fill = "url(#off)" //down battery
		}else if($scope.pcs.st == "Charge") {
			$scope.grid.flow3.fill = "url(#grid_arrow3)"
			$scope.grid.flow5.fill = "url(#grid_arrow5)"
			$scope.grid.flow6.fill = "url(#grid_arrow6)"
		}else if($scope.pcs.st == "Discharge"){
			$scope.grid.flow3.fill = "url(#off)"
			$scope.grid.flow5.fill = "url(#off)"
			$scope.grid.flow6.fill = "url(#off)"
		}
	}

	//pv 흐름 변경
	$scope.pvFlowFn=function(){
		if($scope.pvStatus == false){
			// off
			$scope.pvOn = "#878787";

			$scope.pv.flow1.fill = "url(#off)"
			$scope.pv.flow2.fill = "url(#off)"
			$scope.pv.flow3.fill = "url(#off)"
			$scope.pv.flow4.fill = "url(#off)"
			$scope.pv.flow5.fill = "url(#off)"
			$scope.pv.flow6.fill = "url(#off)"

		}else if($scope.pvStatus == true){
			// on
			$scope.pvOn = "#6286EF";

			$scope.pv.flow1.fill = "url(#sun_arrow1)"
			$scope.pv.flow2.fill = "url(#sun_arrow2)"
				if($scope.batteryStatus == true){
					//배터리 라인 충전
					$scope.pv.flow3.fill = "url(#sun_arrow3)"
					$scope.pv.flow4.fill = "url(#sun_arrow4)"
				}else{
					$scope.pv.flow3.fill = "url(#off)"
					$scope.pv.flow4.fill = "url(#off)"
				}

				//팩토리 라인
			$scope.pv.flow5.fill = "url('#pv_up')"
			$scope.pv.flow6.fill = "url(#pv_left)"
		}
	}

	//전력 라인 변경
	$scope.electricLineSet=function(){

		if(($scope.pcs.st == "None") || ($scope.pcs.st == "Stand-by")){
			$scope.electric = {
					line1 : { fill : "#7195fc"},//factory to center
					line2 : { fill : "#7195fc"},//grid to center
					line3 : { fill : "#17213F"},//center
					line4 : { fill : "#17213F"},//pcs to pv
					line5 : { fill : "#17213F"}//pcs to battery
			}
		}else if($scope.pcs.st == "Charge"){
			$scope.electric = {

					line1 : { fill : "#7195fc"},//factory to center
					line2 : { fill : "#7195fc"},//grid to center
					line3 : { fill : "#7195fc"},//center
					line4 : { fill : "#17213F"},//pcs to pv
					line5 : { fill : "url(#charge-top-gradient)"}//pcs to battery
			}

			if($scope.pvStatus == false){
				$scope.electric.line4.fill = "#17213f"//pv_up
			}else{
				$scope.electric.line4.fill = "#7195fc"//pv_up
			}
		}else if($scope.pcs.st == "Discharge"){
			$scope.electric = {

					line1 : { fill : "#7195fc"},//factory to center
					line2 : { fill : "#7195fc"},//grid to center
					line3 : { fill : "#7195fc"},//center
					line4 : { fill : "#17213F"},//pcs to pv
					line5 : { fill : "url(#discharge-top-gradient)"}//pcs to battery
			}

			if($scope.pvStatus == false){
				$scope.electric.line4.fill = "#17213f"//pv_up
			}else{
				$scope.electric.line4.fill = "#7195fc"//pv_up
			}
		}else if($scope.pcs.st == "Fault"){
			$scope.electric = {
					line1 : { fill : "#7195fc"},//factory to center
					line2 : { fill : "#7195fc"},//grid to center
					line3 : { fill : "#17213F"},//center
					line4 : { fill : "#17213F"},//pcs to pv
					line5 : { fill : "#17213F"}//pcs to battery
			}
		}
	}


	//장애 리스트 데이터 정리
	function faultCount(data){
		$scope.cnt_pcs_F = 0;
		$scope.cnt_pcs_W = 0;
		$scope.cnt_pcs_A = 0;
		$scope.cnt_bms_F = 0;
		$scope.cnt_bms_W = 0;
		$scope.cnt_bms_A = 0;

		$scope.cnt_pcs_F_fill = "#1B233A";
		$scope.cnt_pcs_W_fill = "#1B233A";
		$scope.cnt_pcs_A_fill = "#1B233A";
		$scope.cnt_bms_F_fill = "#1B233A";
		$scope.cnt_bms_W_fill = "#1B233A";
		$scope.cnt_bms_A_fill = "#1B233A";

		if (typeof data != 'undefined') {
			var db = data
			var line = "";
			$scope.faultList=[];
			$.each(db.pcs.faults, function( i, v ) {
				$scope.cnt_pcs_F++;
			});
			$.each(db.pcs.warnings, function( i, v ) {
				$scope.cnt_pcs_W++;
			});
			$.each(db.pcs.alrams, function( i, v ) {
				$scope.cnt_pcs_A++;
			});
			$.each(db.bms.faults, function( i, v ) {
				$scope.cnt_bms_F++;
			});
			$.each(db.bms.warnings, function( i, v ) {
				$scope.cnt_bms_W++;
			});
			$.each(db.bms.alrams, function( i, v ) {
				$scope.cnt_bms_A++;
			});


			if($scope.cnt_pcs_F  > 0){
				$scope.cnt_pcs_F_fill = "#EE8F2A";
			}else{
				$scope.cnt_pcs_F_fill = "#AFB4C5";
			}

			if($scope.cnt_pcs_W  > 0){
				$scope.cnt_pcs_W_fill = "#59D1A3";
			}else{
				$scope.cnt_pcs_W_fill = "#AFB4C5";
			}

			if($scope.cnt_pcs_A  > 0){
				$scope.cnt_pcs_A_fill = "#E63544";
			}else{
				$scope.cnt_pcs_A_fill = "#AFB4C5";
			}

			if($scope.cnt_bms_F  > 0){
				$scope.cnt_bms_F_fill = "#EE8F2A";
			}else{
				$scope.cnt_bms_F_fill = "##EE8F2A";
			}

			if($scope.cnt_bms_W  > 0){
				$scope.cnt_bms_W_fill = "#59D1A3";
			}else{
				$scope.cnt_bms_W_fill = "#AFB4C5";
			}

			if($scope.cnt_bms_A  > 0){
				$scope.cnt_bms_A_fill = "#E63544";
			}else{
				$scope.cnt_bms_A_fill = "#AFB4C5";
			}
		}
	}


	//websocket data 수신부
	// svg 모든 데이터의 시작점
	// 1. 데이터 수신
	// 2. pcs 상태 확인 후 on off 처리
	// 3. bettery 상태 on off 처리
	// 4. pv 상태 on off 처리
	// 5. 전력 배선 그리드 활성화 처리
	// 6. 전력 흐름 화살표 처리
	$rootScope.$on('websocket',function(event, data){
		// 1. 데이터 수신

		// 기본 grid --> factory
		$scope.grid.flow1.fill ="url('#grid_up')"
		$scope.grid.flow2.fill ="url('#grid_left')"
		$scope.grid.flow3.fill ="url('#grid_left')"
		$scope.grid.flow4.fill ="url('#grid_down')"

		$scope.pcs = $scope.dashBoardData.pcs;
//		$scope.pcs.chargeSt =Math.abs($scope.pcs.dummy.split("|")[2])
		$scope.bms = $scope.dashBoardData.bms;
		//mode *제어 모드  (0: CV, 1: CP, 2: CCCV 3: CC 4: CV)
		//st *충/방전 상태 (0:None 1:Stand-by 2:Charge 3:Discharge 4:Fault)
		if($scope.pcs.st == 0){
		//	$scope.pcs.st = "None";
		}else if($scope.pcs.st == 1){
	//		$scope.pcs.st = "Stand-by";
		}else if($scope.pcs.st == 2){
		//	$scope.pcs.st = "Charge";
		}else if($scope.pcs.st == 3){
		//	$scope.pcs.st = "Discharge";
		}else if($scope.pcs.st == 4){
		//	$scope.pcs.st = "Fault";
		}
		//$scope.pcs.st = "Discharge";
		$scope.batteryStatus =$scope.pcs.st;


		// 2. pcs 상태 확인 후 on off 처리
		$scope.pcsStatusFn();
		// 3. bettery 상태 on off 처리
		$scope.batterySocFn();


		// 5. 전력 배선 그리드 활성화 처리
		$scope.electricLineSet();

		// 6. 전력 흐름 화살표 처리
		$scope.gridFlowFn();
		$scope.batteryFlowFn();
		$scope.pvFlowFn();

		//장애 갯수
		faultCount(data);
	});

	//pv 상태 변경
	/*$scope.pvOnFn=function(){
		if($scope.pvStatus == true){
			// off
			$scope.pvStatus = false;
		}else if($scope.pvStatus == false){
			// on
			$scope.pvStatus = true;
		}
		$scope.pvFlowFn();
	}
	$scope.pvOnFn();*/


    //배터리 차트1 +
    $scope.battery_chart1_plus = function() {
    	if($scope.batteryChart.chart1.width >= 80){
    		$scope.batteryChart.chart1.width = 80;
		}else{
			$scope.batteryChart.chart1.width = $scope.batteryChart.chart1.width+10;
			//text1.textContent= "+"+tw;
		}
    }
    //배터리 차트1 -
    $scope.battery_chart1_minus = function() {
    	if($scope.batteryChart.chart1.width <= 0){
    		$scope.batteryChart.chart1.width = 0;
    	}else{
    		$scope.batteryChart.chart1.width = $scope.batteryChart.chart1.width-10;
    		//text1.textContent= "+"+tw;
    	}
    }
  //배터리 차트2 +
    $scope.battery_chart2_plus = function() {
    	if($scope.batteryChart.chart2.width >= 80){
    		$scope.batteryChart.chart2.width = 80;
		}else{
			$scope.batteryChart.chart2.width = $scope.batteryChart.chart2.width+10;
			$scope.batteryChart.chart2.x = $scope.batteryChart.chart2.x-10;
			//text1.textContent= "+"+tw;
		}
    }
    //배터리 차트2 -
    $scope.battery_chart2_minus = function() {
    	if($scope.batteryChart.chart2.width <= 0){
    		$scope.batteryChart.chart2.width = 0;
    	}else{
    		$scope.batteryChart.chart2.width = $scope.batteryChart.chart2.width-10;
    		$scope.batteryChart.chart2.x = $scope.batteryChart.
    		chart2.x+10;
    		//text1.textContent= "+"+tw;
    	}
    }

	//pcs 차트1+
    $scope.pcs_chart1_plus = function() {
    	if($scope.pcsChart.chart1.width >= 80){
    		$scope.pcsChart.chart1.width = 80;
		}else{
			$scope.pcsChart.chart1.width = $scope.pcsChart.chart1.width+10;
			//text1.textContent= "+"+tw;
		}
    }
	//pcs 차트1-
    $scope.pcs_chart1_minus = function() {
    	if($scope.pcsChart.chart1.width <= 0){
    		$scope.pcsChart.chart1.width = 0;
    	}else{
    		$scope.pcsChart.chart1.width = $scope.pcsChart.chart1.width-10;
    		//text1.textContent= "+"+tw;
    	}
    }
	//pcs 차트2+
    $scope.pcs_chart2_plus = function() {
    	if($scope.pcsChart.chart2.width >= 80){
    		$scope.pcsChart.chart2.width = 80;
		}else{
			$scope.pcsChart.chart2.width = $scope.pcsChart.chart2.width+10;
			$scope.pcsChart.chart2.x = $scope.pcsChart.chart2.x-10;
			//text1.textContent= "+"+tw;
		}
    }
	//pcs 차트2-
    $scope.pcs_chart2_minus = function() {
    	if($scope.pcsChart.chart2.width <= 0){
    		$scope.pcsChart.chart2.width = 0;
    	}else{
    		$scope.pcsChart.chart2.width = $scope.pcsChart.chart2.width-10;
    		$scope.pcsChart.chart2.x = $scope.pcsChart.chart2.x+10;
    		//text1.textContent= "+"+tw;
    	}
    }
    //스위치 온
    $scope.onoff_on = function() {
    	$scope.onoff.x2 = 840;
    	$scope.onoff.y2 = 55;
    	$scope.onoff.stroke = "#0A6ECD";
    }
    //스위치 오프
    $scope.onoff_off = function() {
    	$scope.onoff.x2 = 837;
    	$scope.onoff.y2 = 35;
    	$scope.onoff.stroke = "#aaaaaa";
    }
    //배터리 방전
    $scope.discharge = function() {
    	//송전탑
    	$scope.transmission.tower.fill ="#7195FC";
    	$scope.transmission.light.fill = "#7195FC";
    	//공장
    	$scope.factory.tower.fill ="url('#factory-gradient')";
    	$scope.factory.cloud.fill ="url('#light-gradient')";

    	$scope.factory.fill ="url('#factory-gradient')";

    	//배터리외곽
    	$scope.battery.background.stroke = "url('#factory-gradient')";

    	//배선
		$scope.electric.line1.fill = "#aaaaaa";
		$scope.electric.line2.fill = "url('#factory-gradient')";
		$scope.electric.line3.fill = "url('#factory-gradient')";
		$scope.electric.line4.fill = "url('#factory-gradient')";
		$scope.electric.line5.fill = "#aaaaaa";
		$scope.electric.line6.fill = "url('#factory-gradient')";
		$scope.electric.line7.fill = "#aaaaaa";
		$scope.electric.line8.fill = "url('#factory-gradient')";

		//흐름
		$scope.electric_flow.flow1.fill = "url('#battery-gradient')";
		$scope.electric_flow.flow2.fill = "url('#battery-gradient')";
		$scope.electric_flow.flow3.fill = "url('#battery-gradient')";
		$scope.electric_flow.flow4.fill = "url('#battery-gradient')";
		$scope.electric_flow.flow5.fill = "url('#battery-gradient')";
		$scope.electric_flow.flow6.fill = "url('#battery-gradient')";

		$scope.electric_flow.flow1.transform = "translate(118.5,250) rotate(90) scale(0.8)";
		$scope.electric_flow.flow2.transform = "translate(210,259) rotate(180) scale(0.8)";
		$scope.electric_flow.flow3.transform = "translate(400,259) rotate(180) scale(0.8)";
		$scope.electric_flow.flow4.transform = "translate(680,259) rotate(180) scale(0.8)";
		$scope.electric_flow.flow5.transform = "translate(678.5,282) rotate(-90) scale(0.8)";
		$scope.electric_flow.flow6.transform = "translate(850,373.5) rotate(180) scale(0.8)";

		//$scope.electric_flow.flow1.path = "M0,50 0,33";
		$scope.electric_flow.flow1.path = "M0,-55 0,33";
		$scope.electric_flow.flow2.path = "M100,0 -100,0";
		$scope.electric_flow.flow3.path = "M150,0 -50,0";
		$scope.electric_flow.flow4.path = "M67,0 -75,0";
		$scope.electric_flow.flow5.path = "M0,43 0,-40";
		$scope.electric_flow.flow6.path = "M60,0 -60,0";
    }
    //배터리 충전
    $scope.charge = function() {
    	//송전탑
    	$scope.transmission.tower.fill ="url('#power-gradient')";
    	$scope.transmission.light.fill = "url('#light-gradient')";
    	//공장
    	$scope.factory.tower.fill ="#7195FC";
    	$scope.factory.cloud.fill ="#7195FC";
    	//배터리외곽
    	$scope.battery.background.stroke = "url('#battery-gradient')";
    	//배선
		$scope.electric.line1.fill = "url('#power-gradient')";
		$scope.electric.line2.fill = "#aaaaaa";
		$scope.electric.line3.fill = "url('#power-gradient')";
		$scope.electric.line4.fill = "url('#power-gradient')";
		$scope.electric.line5.fill = "#aaaaaa";
		$scope.electric.line6.fill = "url('#power-gradient')";
		$scope.electric.line7.fill = "#aaaaaa";
		$scope.electric.line8.fill = "url('#power-gradient')";
		//흐름

		$scope.electric_flow.flow1.fill = "url('#grid-gradient')";
		$scope.electric_flow.flow2.fill = "url('#grid-gradient')";
		$scope.electric_flow.flow3.fill = "url('#grid-gradient')";
		$scope.electric_flow.flow4.fill = "url('#grid-gradient')";
		$scope.electric_flow.flow5.fill = "url('#grid-gradient')";
		$scope.electric_flow.flow6.fill = "url('#grid-gradient')";

		$scope.electric_flow.flow1.transform = "translate(118.5,118) rotate(90) scale(0.8)";
		$scope.electric_flow.flow2.transform = "translate(150,138.5) scale(0.8)";
		$scope.electric_flow.flow3.transform = "translate(340,138.5) scale(0.8)";
		$scope.electric_flow.flow4.transform = "translate(620,138.5) scale(0.8)";
		$scope.electric_flow.flow5.transform = "translate(798.5,230) rotate(90) scale(0.8)";
		$scope.electric_flow.flow6.transform = "translate(790,253.5) scale(0.8)";

		$scope.electric_flow.flow1.path = "M0,-28 0,35";
		$scope.electric_flow.flow2.path = "M-100,0 100,0";
		$scope.electric_flow.flow3.path = "M-50,0 150,0";
		$scope.electric_flow.flow4.path = "M-80,0 67,0";
		$scope.electric_flow.flow5.path = "M0,-50 0,33";
		$scope.electric_flow.flow6.path = "M-60,0 60,0";
    }
}]);