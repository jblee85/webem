'use strict';
angular.module('iceApp').controller('bmsDetail_ctrl',[ '$scope','$state','$rootScope', '$window','apiService','DTOptionsBuilder', 'DTColumnDefBuilder','$timeout','$interval',
	function($scope, $state, $rootScope,$window,apiService, DTOptionsBuilder, DTColumnDefBuilder,$timeout,$interval) {

	//탭 변경 시 클래스 명 변경을 위함
	$scope.rackIndex = 0;
	$scope.rackId = 0;
	$scope.changeClass = function(type, elementName, className){
		var elements = angular.element(document.getElementsByName(elementName));
		for(var i = 0; i< elements.length; i++){
			elements[i].className = className;
			if(type == i){
				elements[i].className = 'active '+className;
				$scope.rackId = i;
			}
		}
	};
	$scope.changeRackTab = function(index){
		$scope.rackIndex = index;
	}

	getBatteryBMSSpec();
	$scope.$on('websocket', function(event, data){
		$scope.bmsData = $scope.dashBoardData.bms;
		$scope.changeRackTab($scope.rackIndex);
		getbmsSOCData();
		bmsDcaDcvData();
		getbmsTempData();
	});
	$rootScope.intervalDashboard = $interval(intervalF,9000);
	function intervalF(){
		getBatteryBMSSpec();
		$scope.getESSLatest();
		$scope.getESSMonth();
	}

	var cmdModel = {
			cmd:0
			,value: 0
			,sid: ""
	};
	$scope.put_ESSChargingStatus = function(cmd){
		switch(cmd) {
		case 60:
			$scope.actionText = "배터리 결함 초기화";
			break;
		case 61:
			$scope.actionText = "대기";
			break;
		case 62:
			$scope.actionText = "정지";
			break;
		}
		if(confirm("["+$scope.actionText+"]를 실행 하시겠습니까?")==true){
			cmdModel.cmd = cmd;
			try{
				$rootScope.loadingStart();
				apiService.put_ESSChargingStatus($rootScope.currentRid, $scope.BMSdevlid, cmdModel)
				.then(
						function(response){
							if(response.result){
								$scope.panelMsg = "complete";
						    } else {
						    	$scope.panelMsg = "fail";
						    }
							$rootScope.loadingStop();
						},function(errResponse){
							console.log(errResponse);
							if(errResponse.data.errcode == 17){
								alert(errResponse.data.errdes);
							} else if(errResponse.data.errcode == 14){
								alert(errResponse.data.errdes);
							}
							$rootScope.loadingStop();
							return false;
							//현재 authkey null로 받아오는 에러로 연결됨
						}
				)
			}catch(e){
				$scope.panelMsg = "fail";
				$rootScope.loadingStop();
			}
		}
	};
	//1. 배터리 스펙 & BMS 스펙
	function getBatteryBMSSpec(){
		apiService.gets_DeviceLeafs($scope.devrids)
		.then(
				function(response){
					console.log(response);
					for(var i = 0; i< response.length; i++){
						if(response[i].devtype == 12){
							$scope.BMSSpec = response[i];
							$scope.BMSdevlid = response[i].devs[0].devlid;
						} else if(response[i].devtype == 13){ //Battery Spec
							$scope.batterySpec = response[i];
							$scope.designkw = response[i].devs[0].designkw;
							$scope.getESSMonth();
						} else if(response[i].devtype == 11){
							$scope.PCSdevlid = response[i].devs[0].devlid;
							$scope.getESSLatest();
						}
					}

				}
		)
	}
	$scope.essDayCycle = 0;
	$scope.essDayLatest = "";
	//ess day 데이타
	$scope.getESSLatest = function(){
		apiService.getDashBoard($scope.yyyymmdd())
		.then(
			function(d) {
				//search화면에 데이타 주기
				$scope.essDayCycle = 0;
				$scope.essDay=d[0].sessions;
				var essDayLatestReturn = false;

				if($scope.essDay.length!=0){
					for(var i = $scope.essDay.length-1; i >= 0; i--){
						$scope.essDayCycle = $scope.essDayCycle + $scope.essDay[i].e;
						if($scope.essDay[i].times.length != 0){
							for(var j = $scope.essDay[i].times.length-1; j >= 0; j--){
								if($scope.essDay[i].times[j].mins.length != 0){
									if(!essDayLatestReturn){
										for(var z = $scope.essDay[i].times[j].mins.length-1; z >= 0; z--){
											if($scope.essDay[i].times[j].mins[z].st == 1){
												$scope.essDayLatest = $scope.essDay[i].times[j].mins[z].cdt;
												essDayLatestReturn = true;
											}
										}
									}

								}
							}
						}
					}
				}
				$scope.dashboard = d[0];
				var todayTimeList = [];		//오늘 현재까지 시간단위 List
				var todayChargeList = [];	//오늘 충방전 값 List
				var todaySOCList = [];		//오늘 SOC 값 List
				$scope.todayCharge = 0;		//오늘 충전 누적값
				$scope.todayDischarge = 0;	//오늘 방전 누적값
				var sessions = $scope.dashboard.sessions==null ? [] : $scope.dashboard.sessions;
				for(var i in sessions){
					for(var j in sessions[i].times){
						if(sessions[i].times[j].dayh.toString().substring(0,8) == $scope.yyyymmdd()){
							if(i != 0){
								if(sessions[i].times[j].dayh.toString() == sessions[i-1].times[sessions[i-1].times.length-1].dayh.toString()){
									todayChargeList[todayChargeList.length-1] = todayChargeList[todayChargeList.length-1] + (sessions[i].times[j].dcckwh - sessions[i].times[j].dcdsckwh)
								}else{
									todayTimeList.push(sessions[i].times[j].dayh.toString().substring(8,10));
									todayChargeList.push(sessions[i].times[j].dcckwh - sessions[i].times[j].dcdsckwh);
									todaySOCList.push(sessions[i].times[j].fsoh + sessions[i].times[j].soch);
								}
							}else{
								todayTimeList.push(sessions[i].times[j].dayh.toString().substring(8,10));
								todayChargeList.push(sessions[i].times[j].dcckwh - sessions[i].times[j].dcdsckwh);
								todaySOCList.push(sessions[i].times[j].fsoh + sessions[i].times[j].soch);
							}

							$scope.todayCharge = $scope.todayCharge + sessions[i].times[j].dcckwh;
							$scope.todayDischarge = $scope.todayDischarge - sessions[i].times[j].dcdsckwh;
						}
					}
				}

			  },
	        function(errResponse){
	        	console.log('function getDashBoard() \n['+ errResponse.status +'] : ' + errResponse.statusText);
	        }
		);
	}
	//ess month 데이타
	$scope.getESSMonth = function(){
		apiService.gets_EnergyESSModel_month($rootScope.currentRid,$scope.PCSdevlid,$scope.yyyymmdd().substring(0,6))
		.then(
			function(d) {
				//search화면에 데이타 주기
				$scope.essMonth=d;
			  },
	        function(errResponse){
	        	console.log('function gets_EnergyESSModel_month() \n['+ errResponse.status +'] : ' + errResponse.statusText);
	        }
		);
	}


	Highcharts.setOptions({
	    time: {
	        timezoneOffset: 9 * 60
	    }
	});
	var bmsSOCchart;
	bmsSOCchart = Highcharts.chart('bmsSOC', {
		chart:{
			type: 'spline',
	        animation: Highcharts.svg, // don't animate in old IE
	        marginRight: 50,
	        events: {
//	            load: function () {
//	            	getbmsSOCData();
//	            }
	        },
	        backgroundColor:  false
		},
		plotOptions: {
	        series: {
	            marker: {
	                enabled: true
	            }
	        }
	    },
		title: {
			text:''
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: {
//	        title: {
//	            text: 'V'
//	        },
	        plotLines: [{
	            value: 0,
	            width: 1,
	            color: '#808080'
	        }]
	    },
	    tooltip: {
	        formatter: function () {
	            return '<b>' + this.series.name + '</b><br/>' +
	                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	                Highcharts.numberFormat(this.y, 1); //소수점
	        }
	    },
	    legend:{
	    	enabled: false
	    },
	    series: [
	    	{
	    		name:'SOC',
	    		data: (function () {
		            var data = [];
		            var time = (new Date()).getTime() + (1000 * 60 * 60 * 18);
		            var i;

		            var value = 0;
		            for (i = -12; i <= 0; i += 1) {
		                data.push( //push 안에 배열
		                	{x: time + i * 2000, //시간 1초마다 보여주기 (i * 1000)
		                	 y: 0}
		                );
		            }
		            return data;
		        }())
	    	}
	    ]
	});
	$scope.s_svg_width = 61.16;
	$scope.m_svg_width = 65.797;

	function getbmsSOCData(){
		var soc = 0;
			var socArr = [];
			var time = new Date().getTime() + (1000 * 60 * 60 * 18);
			soc = soc + $scope.bmsData.bsc.soc;
            socArr.push(time);
            socArr.push(soc);
        	bmsSOCchart.series[0].addPoint(socArr, true, true);
	}

	var bmsDcaDcvchart;
	bmsDcaDcvchart = Highcharts.chart('bmsDcaDcv', {
		chart:{
			type: 'spline',
	        animation: Highcharts.svg, // don't animate in old IE
	        marginRight: 70,
	        events: {
//	            load: function () {
//	            	bmsDcaDcvData();
//	            }
	        },
	        backgroundColor:  false
		},
		title: {
			text:''
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: {
//	        title: {
//	            text: 'V'
//	        },
	        plotLines: [{
	            value: 0,
	            width: 1,
	            color: '#808080'
	        }]
	    },
	    tooltip: {
	        formatter: function () {
	            return '<b>' + this.series.name + '</b><br/>' +
	                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	                Highcharts.numberFormat(this.y, 1); //소수점
	        }
	    },
	    legend: {
	    	align: 'right',
	        verticalAlign: 'top',
	        layout: 'vertical',
	        x: 10
//	        y: 0
	    },
	    series: [
	    	{
	    		name:'전압',
	    		data: (function () {
		            var data = [];
		            var time = (new Date()).getTime() + (1000 * 60 * 60 * 18);
		            var i;

		            var value = 0;
		            for (i = -12; i <= 0; i += 1) {
		                data.push( //push 안에 배열
		                	{x: time + i * 2000, //시간 1초마다 보여주기 (i * 1000)
		                	 y: 0}
		                );
		            }
		            return data;
		        }())
	    	},
	    	{
	    		name:'전류',
	    		data: (function () {
		            var data = [];
		            var time = (new Date()).getTime() + (1000 * 60 * 60 * 18);
		            var i;

		            var value = 0;
		            for (i = -12; i <= 0; i += 1) {
		                data.push( //push 안에 배열
		                	{x: time + i * 2000, //시간 1초마다 보여주기 (i * 1000)
		                	 y: 0}
		                );
		            }
		            return data;
		        }())
	    	}
	    ]
	});

	function bmsDcaDcvData(){
		var dca = 0;
		var dcv = 0;
		var dcaArr = [];
		var dcvArr = [];
		var time = new Date().getTime() + (1000 * 60 * 60 * 18);
		dca = dca + $scope.bmsData.bsc.dca;
		dcaArr.push(time);
		dcaArr.push(dca);

        dcv = dcv + $scope.bmsData.bsc.dcv;
        dcvArr.push(time);
        dcvArr.push(dcv);

        bmsDcaDcvchart.series[0].addPoint(dcaArr, true, true);
        bmsDcaDcvchart.series[1].addPoint(dcvArr, true, true);
	}


	var bmsTempchart;
	bmsTempchart = Highcharts.chart('bmsTemp', {
		chart:{
			type: 'spline',
	        animation: Highcharts.svg, // don't animate in old IE
	        marginRight: 70,
	        events: {
//	            load: function () {
//	            	bmsDcaDcvData();
//	            }
	        },
	        backgroundColor:  false
		},
		title: {
			text:''
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: {
//	        title: {
//	            text: 'V'
//	        },
	        plotLines: [{
	            value: 0,
	            width: 1,
	            color: '#808080'
	        }]
	    },
	    tooltip: {
	        formatter: function () {
	            return '<b>' + this.series.name + '</b><br/>' +
	                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	                Highcharts.numberFormat(this.y, 1); //소수점
	        }
	    },
	    legend: {
	    	align: 'right',
	        verticalAlign: 'top',
	        layout: 'vertical',
	        x: 10
//	        y: 0
	    },
	    series: [
	    	{
	    		name:'온도',
	    		data: (function () {
		            var data = [];
		            var time = (new Date()).getTime() + (1000 * 60 * 60 * 18);
		            var i;

		            var value = 0;
		            for (i = -12; i <= 0; i += 1) {
		                data.push( //push 안에 배열
		                	{x: time + i * 2000, //시간 1초마다 보여주기 (i * 1000)
		                	 y: 0}
		                );
		            }
		            return data;
		        }())
	    	},
	    	{
	    		name:'전압',
	    		data: (function () {
		            var data = [];
		            var time = (new Date()).getTime() + (1000 * 60 * 60 * 18);
		            var i;

		            var value = 0;
		            for (i = -12; i <= 0; i += 1) {
		                data.push( //push 안에 배열
		                	{x: time + i * 2000, //시간 1초마다 보여주기 (i * 1000)
		                	 y: 0}
		                );
		            }
		            return data;
		        }())
	    	}
	    ]
	});
	function getbmsTempData(){
		var temp = 0;
		var cellv = 0;
		var tempArr = [];
		var cellvArr = [];
		var time = new Date().getTime() + (1000 * 60 * 60 * 18);
		temp = temp + $scope.bmsData.max.moduletm;
		tempArr.push(time);
		tempArr.push(temp);

		cellv = cellv + $scope.bmsData.max.cellv;
		cellvArr.push(time);
		cellvArr.push(cellv);

		bmsTempchart.series[0].addPoint(tempArr, true, true);
		bmsTempchart.series[1].addPoint(cellvArr, true, true);
	}
}]);