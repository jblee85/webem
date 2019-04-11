'use strict';
angular.module('iceApp').controller('pcsDetail_ctrl',[ '$scope','$state','$rootScope', '$window','apiService','DTOptionsBuilder', 'DTColumnDefBuilder', '$sce', 'DEFINED','MODEL','$interval',
	function($scope, $state, $rootScope,$window,apiService, DTOptionsBuilder, DTColumnDefBuilder, $sce, DEFINED, MODEL,$interval) {


	$scope.$on('websocket',function(event, data){
		$scope.devlid = $scope.dashBoardData.devlid;
		$scope.devrid = $scope.dashBoardData.devrid;
		$scope.pcsData = $scope.dashBoardData.pcs;
		$scope.pcsData.st = $scope.dashBoardData.pcs.st;
		if($scope.currentSchedule == null){
			$scope.controlMode = "manual";
		} else {
			$scope.controlMode = "schedule";
		}
		getPcsRSTData();
		getPcsVHzData();
	});
	$rootScope.intervalDashboard = $interval(intervalF,900000);
	function intervalF(){
		getPCSInfo();
		$scope.getESSMonth();
	}
	$scope.$watch('controlMode',function(newMode, oldMode){
		if(newMode != undefined && oldMode != undefined){
			if(newMode != oldMode){
				if(oldMode == 'schedule' && newMode == 'manual'){ //스케줄 -> 수동 (스케줄 준비할 경우만)
					$scope.panelMsg = "stopped";
					$scope.newSname = "대기";

					$rootScope.PCScontrol.cmd = "정지";
					$rootScope.PCScontrol.name = "수동제어";
					$rootScope.PCScontrol.type = "ACTIVE";
				} else if(oldMode == 'manual' && newMode == 'schedule'){ //수동 -> 스케줄 (스케줄 실행시만)
					$scope.panelMsg = "saved";
					$scope.newSname = "스케줄제어 - "+$scope.scModel.data.scname;

					$rootScope.PCScontrol.cmd = "충전";
					$rootScope.PCScontrol.name = $scope.scModel.data.scname;
					$rootScope.PCScontrol.type = "SCHEDULE";
				}
				$rootScope.loadingStop();
				gets_ConfigSchedule();
			}
		}
	});

	$scope.$watch('pcsData.st', function(newVal, oldVal){
		if(newVal != oldVal){
			if(oldVal != undefined){
				if($scope.pcsData.st == 0 || $scope.pcsData.st == 1){
					$scope.panelMsg = "saved";
					$rootScope.loadingStop();
				}
				if($scope.isScheduleOn == false && $scope.controlMode == 'manual'){
						if($scope.type == 'stop'){
							$scope.newSname = "대기";
							$rootScope.PCScontrol.cmd = "정지";
						} else if($scope.type == "charge"){
							$scope.newSname = "수동제어 - 충전 "+$scope.mOutput+ "kw";
							$rootScope.PCScontrol.cmd = "충전";
						} else if($scope.type == "discharge"){
							$scope.newSname = "수동제어 - 방전 "+$scope.mOutput+ "kw";
							$rootScope.PCScontrol.cmd = "방전";
						}
						$rootScope.PCScontrol.name = "수동제어";
						$rootScope.PCScontrol.type = "ACTIVE";
						$scope.mOutput = "";
						$rootScope.loadingStop();
						gets_ConfigSchedule();
				}
			}
		}
	});
	$scope.getSession = function(){
		apiService.getDashBoard($scope.yyyymmdd())
		.then(
			function(r){
				$scope.dashboard = r[0];
				//sessions
				var sessions = $scope.dashboard.sessions==null ? [] : $scope.dashboard.sessions;
				var todayTimeList = [];		//오늘 현재까지 시간단위 List
				var todayChargeList = [];	//오늘 충방전 값 List
				var todaySOCList = [];		//오늘 SOC 값 List
				var data = [{name: '충전',y: 0},
							{name: '방전',y: 0},
							{name: '대기',y: 0}];
				$scope.todayCharge = 0;		//오늘 충전 누적값
				$scope.todayDischarge = 0;	//오늘 방전 누적값
				var lastTime = "";
				for(var z in sessions){
					for(var i in sessions[z].times){
						if(sessions[z].times[i].dayh.toString().substring(0,8) == $scope.yyyymmdd()){
							if(sessions[z].times[i].mins.length != 0){
								for(var j in sessions[z].times[i].mins){
									var x = 0;
									lastTime = new Date(sessions[z].times[i].mins[j].cdt).getMinutes();
									if(j == 0){
										x = lastTime;
									}else{
										x = lastTime - new Date(sessions[z].times[i].mins[j-1].cdt).getMinutes();
									}
									if(sessions[z].times[i].mins[j].st == 2){
										data[0].y = data[0].y + x;
									}else if(sessions[z].times[i].mins[j].st == 3){
										data[1].y = data[1].y + x;
									}else{
										data[2].y = data[2].y + x;
									}
								}
							}

						}
					}
				}
				makePcsOperTimeChart(data);
			},function(errResponse){
				console.error('function getDashBoard - getDashBoard() \n['+ errResponse.status +'] : ' + errResponse.statusText);
			}
		);
	}
	$scope.getSession();
	$scope.getESSMonth = function(){
		apiService.gets_EnergyESSModel_month($rootScope.currentRid,$scope.devlid,$scope.yyyymmdd().substring(0,6))
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

	function getPCSInfo(){
		$scope.panelMsg = 'init';
		$scope.isScheduleOn = false;
		gets_ConfigSchedule(); //스케줄 불러오기
		//수동제어 값 placeholder
		getOutputLimit();
		getControlHistory();
		$scope.getESSMonth();
		getPcsSpec(); //1.PCS 스펙
	};
	getPCSInfo();
	//스케줄 목록 불러오기 ( 스케줄의 run이 true이면 스케줄 존재, false 이면 수동제어 [ rootScope에서 websocket 정보로 판단 ] )
	function gets_ConfigSchedule(){
		apiService.gets_ConfigSchedule()
		.then(
				function(scheduleList){
					$scope.currentSchedule = null;
					for(var i = 0; i < scheduleList.length; i++){
						if(scheduleList[i].data.run == true){
							$scope.currentSchedule = scheduleList[i]; //활성 스케줄
							$scope.isScheduleOn = true;
							$scope.scModel = scheduleList[i];
						}
					}
					$scope.scheduleList = scheduleList;
					if($scope.currentSchedule == null){
						$scope.scModel = scheduleList[0];
					}
				},
				function(errResponse){
					console.log('function gets_ConfigSchedule() \n['+ errResponse.status +'] : ' + errResponse.statusText);
				}
		);
	};

	/* 제어패널 종류
	 * 공통: init(처음로딩) , soc(soc제한), stop(정지 클릭한 상태), stopped(정지 완료 후),
	 * 스케줄제어: save(적용 클릭한 상태), saved(적용 완료 후),
	 * 수동제어: charge(충전 클릭한 상태), discharged(방전 클릭한 상태)
	 * PCS재설정: resetpcs, BMS재설정: resetbms
	*/
	$scope.changePanelMsg = function(type){
		if(type == "stop"){
			$scope.panelMsg = "stop"; //정지 버튼 클릭 시
		} else if(type == "save"){
			$scope.panelMsg = "save"; //적용 버튼 클릭 시
		} else if(type == "init"){
			$scope.panelMsg = "init"; //아니오 버튼 클릭 시
		} else if(type == "charge"){
			$scope.panelMsg = "charge"; //충전 버튼 클릭 시
		} else if(type == "discharge"){
			$scope.panelMsg = "discharge"; //충전 버튼 클릭 시
		} else if(type == 'resetpcs'){
			$scope.panelMsg = "resetpcs";
		} else if(type == 'resetbms'){
			$scope.panelMsg = "resetbms";
		}
	}

	$scope.putCtrlPanel = function(control, type, value){ //type은 정지 요청 상태(stop) ,적용 요청 상태(save) 으로 나누어진다.
		//스케줄 변경 api요청 //control 값에 따라 다른 put 요청 가능 (스케줄 schedule, 수동 auto)
		//결과값 받아온 후 결과에 따른 메세지 출력 및 운전정보 이름 갱신!
		//스케줄 모델
		if(control == "schedule"){
			var scModel = JSON.parse(angular.toJson(value)); //프로퍼티 삭제 추가
			//스케줄 put api 요청
			scModel.data.run = true;
			scModel.rdt = convertDateStringsToDates(scModel.rdt);
			scModel.udt = convertDateStringsToDates(scModel.udt);
			scModel.data.devs[0].fdt = convertDateStringsToDates(scModel.data.devs[0].fdt);

			if(type == 'stop'){
				$scope.tempObj = {};
				angular.copy($scope.currentSchedule, $scope.tempObj);
			}

			$rootScope.loadingStart();
			apiService.put_ConfigESSScheduleRun(scModel, type=='stop'? false: true)
			.then(
					function(response){
						if(response.result){
							gets_ConfigSchedule();
						} else {
							//put error
							alert("스케줄 결과 false");
							$rootScope.loadingStop();
						}

					},function(errResponse){
						$rootScope.loadingStop();
					}
			)
		} else if(control == "manual"){
			var cmdModel = {
					cmd:type=="stop"? 14 : type == "charge" ? 12 : 13
					,value: value
					,sid: ""
			};

			if($scope.controlMode == 'schedule'){
				$scope.tempObj = {};
				angular.copy($scope.currentSchedule, $scope.tempObj);
			} else if($scope.controlMode == 'manual'){
				$scope.tempPcs = {};
				angular.copy($scope.pcsData, $scope.tempPcs);
				if($scope.tempPcs.st == 1){
					$scope.tempSt = "대기";
				} else if($scope.tempPcs.st == 2){
					$scope.tempSt = "충전";
				} else if($scope.tempPcs.st == 3){
					$scope.tempSt = "방전";
				}
			}

			//수동제어 put api 요청
			$rootScope.loadingStart();
			apiService.put_ESSChargingStatus($scope.devrid, $scope.devlid, cmdModel)
			.then(
					function(response){
						if(response.result){
							$scope.type = type;
							var reqSt;
							type == 'stop' ? reqSt=1 : type=="charge" ? reqSt=2 : reqSt=3
						    if(reqSt == $scope.pcsData.st){
						    	if(value == $scope.pcsData.inppkw){ //input 값 비교
						    		pcsStUpdateSuccess();
						    		$rootScope.loadingStop();
						    	} else {
						    		$window.setTimeout(function(){
							    		if(value != $scope.pcsData.inppkw){
							    			alert("입력한 출력값이 실제 PCS에 적용되지 않았습니다. 다시 시도해 주세요");
							    			$rootScope.loadingStop();
							    			$scope.panelMsg = "init";
							    			return false;
							    		} else {
							    			pcsStUpdateSuccess();
							    			$rootScope.loadingStop();
							    		}
						    		}, 5000);
						    	}
						    } else {
						    	//5초 대기 후 -> 값 비교 -> 변경 X 시 error 메세지
						    	//setTimeout 사용 하여 5초뒤에 요청
						    	$window.setTimeout(function(){
						    		if(reqSt != $scope.pcsData.st){
						    			alert("모드를 변경하지 못했습니다. 다시 시도해 주세요");
						    			$rootScope.loadingStop();
						    			$scope.panelMsg = "init";
						    			return false;
						    		} else {
						    			if(value == $scope.pcsData.inppkw){ //input 값 비교
								    		pcsStUpdateSuccess();
								    		$rootScope.loadingStop();
								    	} else {
								    		$window.setTimeout(function(){
									    		if(value != $scope.pcsData.inppkw){
									    			alert("입력한 출력값이 실제 PCS에 적용되지 않았습니다. 다시 시도해 주세요");
									    			$rootScope.loadingStop();
									    			$scope.panelMsg = "init";
									    			return false;
									    		} else {
									    			pcsStUpdateSuccess();
									    			$rootScope.loadingStop();
									    		}
								    		}, 5000);
								    	}
						    		}
						    	}, 5000);
						    }
						}
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
		} else if(control == "reset"){
			//Plugin Contoller flesh 사용 //현재 비활성화
			if(type == 'pcs'){
				$scope.panelMsg = "pcsreset";
			} else if(type == 'bms'){
				$scope.panelMsg = "bmsreset";
			}
		}
	};

	//설정
	//제어권
	//fault reset
	var cmdModel = {
			cmd:0
			,value: 0
			,sid: ""
	};
	$scope.put_ESSChargingStatus_confrim = function(){
			$scope.panelMsg = "changing";
			try{
				$rootScope.loadingStart();
				apiService.put_ESSChargingStatus($scope.devrid, $scope.devlid, cmdModel)
				.then(
						function(response){
							if(response.result){
								$scope.panelMsg = "changing";
						    } else {
						    	$scope.panelMsg = "fail";
						    }
						},function(errResponse){
							console.log(errResponse);
							if(errResponse.data.errcode == 17){
								alert(errResponse.data.errdes);
							} else if(errResponse.data.errcode == 14){
								alert(errResponse.data.errdes);
							}
							return false;
							//현재 authkey null로 받아오는 에러로 연결됨
						}
				)
			}catch(e){
				$scope.panelMsg = "fail";
				$rootScope.loadingStop();
			}

	};
	$scope.actionText = "";
	$scope.put_ESSChargingStatus = function(cmd){
		cmdModel.cmd=cmd;
		$scope.panelMsg = "confirm";
		switch(cmd) {
		case 20:
			$scope.actionText = "PCS 결함 초기화";
			break;
		case 11:
			$scope.actionText = "정지";
			break;
		case 10:
			$scope.actionText = "대기";
			break;
		case 22:
			$scope.actionText = "PCS 제어";
			break;
		case 23:
			$scope.actionText = "EMS 제어";
			break;
		}
	}
	//모드 변경 성공 시 처리 함수
	function pcsStUpdateSuccess(){
		if($scope.type == 'stop'){
			$scope.panelMsg = "stopped";
			$scope.newSname = "대기";
		} else if($scope.type == "charge"){
			$scope.panelMsg = "charged";
			$scope.newSname = "수동제어 - 충전 "+$scope.mOutput+ "kw";
		} else if($scope.type == "discharge"){
			$scope.panelMsg = "discharged";
			$scope.newSname = "수동제어 - 방전 "+$scope.mOutput+ "kw";
		}
		$scope.mOutput = "";
		gets_ConfigSchedule();
	}

	//수동제어 출력 최대값 구하기 | SOC 모드
	function getOutputLimit(){
		apiService.get_Site()
		.then(
			function(d) {
				$scope.devrids=[];
				for(var i in d.refdevs){
					if(d.refdevs[i].bizid == DEFINED.bizid){
						$scope.devrids.push(d.refdevs[i].devrid);
					}
				}
				apiService.gets_DeviceLeafs($scope.devrids)
				.then(
					function(d) {
						try{
							//TODO 충전/방전을 위해 임시로 세션에 rid를 저장(나중에 삭제)
							$scope.deviceLeafList = [];
							$scope.deviceLeafList = d;
							for(var i in d){
								if(d[i].devtype == 11){
									$scope.maxpkw = d[i].devs[0].maxpkw;
								}
								for(var key in MODEL.SOCMODE){
									if(d[i].devs[0].socctrmode == MODEL.SOCMODE[key].soc){
										$scope.socctrmode = MODEL.SOCMODE[key];
									}
								}
							}

						}catch(error){
							console.log(error.message);
						}
					},
					function(errResponse){
						console.log("errResponse gets_DeviceLeafs status : "+errResponse.status);
					}
				);
			},
			function(errResponse){
				console.log("errResponse get_Site status : "+errResponse.status);
			}
		);
	}
	$scope.disableAction = false;
	$scope.mOutputCheck = function(mOutput){
		if(typeof(mOutput) != 'string'){
			$scope.disableAction = true;
			$scope.mOutputValid = $sce.trustAsHtml("숫자만 입력해 주세요");
			$(".mechanic div.alertBox").show();
			return false;
		}
		if(mOutput == 0){
			$scope.disableAction = true;
			$scope.mOutputValid = $sce.trustAsHtml("0 보다 큰 값을 입력해 주세요");
			$(".mechanic div.alertBox").show();
			return false;
		} else {
			if(mOutput > $scope.maxpkw){
				$scope.disableAction = true;
				$scope.mOutputValid = $sce.trustAsHtml("출력값은 "+$scope.maxpkw+"를 초과할 수 없습니다");
				$(".mechanic div.alertBox").show();
			} else {
				$scope.disableAction = false;
				$scope.mOutputValid = "";
				$(".mechanic div.alertBox").hide();
			}
		}
	};

	//탭 화면 클래스 변경
	$scope.changeClass = function(type, elementName, tabName){
		var elements = angular.element(document.getElementsByName(elementName)); //li tag class 변경위해 name으로 검색
		for(var i = 0; i< elements.length; i++){
			elements[i].className = 'col-lg-4';
			if(type == i){
				elements[i].className = 'active col-lg-4';
			}
		}
		if(tabName == 'panel'){ //제어 패널 초기화를 위한 조건
			$scope.panelMsg = "init";
			$scope.scname = $scope.scheduleList[0].data.scname;
			$scope.mOutput = "";
			$scope.mOutputValid = "";
			$(".mechanic div.alertBox").hide();
		}
	}

	//1. pcs 스펙 불러오기
	function getPcsSpec(){
		apiService.gets_DeviceLeafs($scope.devrids)
		.then(
				function(response){
					for(var i = 0; i< response.length; i++){
						if(response[i].devtype == 11){
							$scope.pcsSpec = response[i];
						}
					}
				}
		)
	}

	//Highchart 시간 옵션
	Highcharts.setOptions({
	    time: {
	        timezoneOffset: 9 * 60
	    }
	});

	//2. 오늘 PCS 운전 시간 CHART
	/*
	211=1|1| ESS 충전 시작 (%s)
	213=1|1| ESS 방전 시작 (%s)
	215=1|1| ESS 대기 시작 (%s)
	 */

	function getPCSPieChart(){
		var today = new Date().toISOString().split('T')[0];
		apiService.gets_Timeline()
		.then(
			function(response) {
				$scope.timeList = [];
				for(var i = 0; i<response.length; i++){
					var cDate = new Date(response[i].cdt).toISOString().split('T')[0].substring(0,10);
					if(cDate == today){
						if(response[i].tcode == 211 || response[i].tcode == 213 || response[i].tcode == 215){
							$scope.timeList.push(response[i]);
						}
					}
				}
			},
			function(errResponse){
				console.log("errResponse gets_Timeline status : "+errResponse.status);
			}
		);
	};

	var pcsOperTimeChart;
	var labelColor = "black";
	if($rootScope.themeClassName == 'mechanic'){
		labelColor = "white";
	}
	function makePcsOperTimeChart(y){
		pcsOperTimeChart = Highcharts.chart('pcsOperTime', {
			chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: null,
		        plotShadow: false,
		        type: 'pie',
		        backgroundColor:  false
		    },
		    title: {
		        text: ''
		    },

		    plotOptions: {
		        pie: {
		        	colors:['#1c95d3','#ff0000','#92979c'],
		            allowPointSelect: true,
		            cursor: 'pointer',
		            dataLabels: {
		                enabled: true,
		                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                style: {
//		                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
		                	color: labelColor
		                }
		            }
		        }
		    },
		    series: [{
		        name: '타입',
		        colorByPoint: true,
		        data: y
		    }]
		});
	}

	//4. 타임라인 사용자 제어 화면
	function getControlHistory(){
		apiService.gets_Timeline()
		.then(
			function(d) {
				$scope.essHistoryList = [];
				$scope.essHistoryList = d;

				for(var i in d){
					$scope.essHistoryList[i].data = JSON.parse(d[i].data);
				}
			},
			function(errResponse){
				console.log("errResponse gets_Timeline status : "+errResponse.status);
			}
		);
	}

	$scope.reloadTimeline = function(){
		getControlHistory();
	};

	//5. PCS 3상 RST
	var pcsRSTchart;
//	function makePcsRSTchart(){
		pcsRSTchart = Highcharts.chart('pcsRST', {
			chart: {
				type: 'spline',
				animation: Highcharts.svg, // don't animate in old IE
				marginRight: 50,
				events: {
//					load: function () {
//						getPcsRSTData();
//					}
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
			colors: ['#333333','red','#3c8dbc'],
			title: {
				text: ''
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis: {
				title: {
					align:'high',
		            offset: 0,
		            text: 'V',
		            rotation: 0,
		            y: -10
		        },
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
					Highcharts.numberFormat(this.y, 0);
				}
			},
			legend: {
				align: 'right',
				verticalAlign: 'top',
				layout: 'vertical',
				x: 10
			},
			exporting: {
				enabled: false
			},
			series: [
				{ //series[0]
					name: 'R',
					data: (function () { //미리 보여지는 데이터
						var data = [];
						var time = (new Date()).getTime()+ (1000 * 60 * 60 * 18); //18시간 더함
						var i;
						//이전 시간의 데이터 배열
						for (i = -12; i <= 0; i += 1) {
							data.push( //push 안에 배열
									{x: time + i * 2000, y: 0}
							);
						}
						return data;
					}())
				},
				{ //series[1]
					name: 'S',
					data: (function () { //미리 보여지는 데이터
						var data = [];
						var time = (new Date()).getTime()+ (1000 * 60 * 60 * 18);
						var i;
						//이전 시간의 데이터 배열
						for (i = -12; i <= 0; i += 1) {
							data.push( //push 안에 배열
									{x: time + i * 2000, y: 0}
							);
						}
						return data;
					}())
				},
				{ //series[2]
					name: 'T',
					data: (function () { //미리 보여지는 데이터
						var data = [];
						var time = (new Date()).getTime()+ (1000 * 60 * 60 * 18);
						var i;
						//이전 시간의 데이터 배열
						for (i = -12; i <= 0; i += 1) {
							data.push( //push 안에 배열
									{x: time + i * 2000, y: 0}
							);
						}
						return data;
					}())
				}
				]
		});
//	}

	function getPcsRSTData(){
		var rv = 0;
		var sv = 0;
		var tv = 0;
		if($scope.pcsData == undefined){

		} else {
				var rvArray = [];
				var svArray = [];
				var tvArray = [];
				var time = new Date().getTime() + (1000 * 60 * 60 * 18);

				rv = rv + $scope.pcsData.rst.rv;
				rvArray.push(time);
				rvArray.push(rv);
				sv = sv + $scope.pcsData.rst.sv;
				svArray.push(time);
				svArray.push(sv);
				tv = tv + $scope.pcsData.rst.tv;
				tvArray.push(time);
				tvArray.push(tv);

				pcsRSTchart.series[0].addPoint(rvArray, false, true);
				pcsRSTchart.series[1].addPoint(svArray, false, true);
				pcsRSTchart.series[2].addPoint(tvArray, true, true);
		}
	}

	//6. PCS DC전압, 주파수
	var pcsVHzchart;
//	function makePcsVHzchart(){
		pcsVHzchart = Highcharts.chart('pcsVHz', {
			chart: {
				type: 'spline',
				animation: Highcharts.svg, // don't animate in old IE
				marginRight: 75,
//				events: {
//					load: function () {
//						getPcsVHzData();
//					}
//				},
				backgroundColor:  false
			},
			plotOptions: {
				series: {
					marker: {
						enabled: true
					}
				}
			},
			colors: ['#333333','red'],
			title: {
				text: ''
			},
			xAxis: {
				type: 'datetime',
			},
			yAxis: {
				title: {
					align:'high',
		            offset: 0,
		            text: 'V',
		            rotation: 0,
		            y: -10
		        },
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
					Highcharts.numberFormat(this.y, 0); //소수점
				}
			},
			legend: {
				align: 'right',
				verticalAlign: 'top',
				layout: 'vertical',
				x: 10
			},
			exporting: {
				enabled: false
			},
			series: [
				{ //series[0]
					name: 'DC전압',
					data: (function () { //미리 보여지는 데이터
						var data = [];
						var time = (new Date()).getTime() + (1000 * 60 * 60 * 18);
						var i;

						//이전 시간의 데이터 배열
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
				{ //series[1]
					name: '주파수',
					data: (function () { //미리 보여지는 데이터
						var data = [];
						var time = (new Date()).getTime() + (1000 * 60 * 60 * 18);
						var i;

						//이전 시간의 데이터 배열
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
//	}

	function getPcsVHzData(){
		var dcv = 0; //DC 전압
		var hz = 0; //주파수
		if($scope.pcsData == undefined){

		} else {
//			setInterval(function () {
				var dcvArray = [];
				var hzArray = [];
				var time = new Date().getTime() + (1000 * 60 * 60 * 18);
				dcv = dcv + $scope.pcsData.dcv;
				dcvArray.push(time);
				dcvArray.push(dcv);
				hz = hz + $scope.pcsData.rst.hz;
				hzArray.push(time);
				hzArray.push(hz);
				pcsVHzchart.series[0].addPoint(dcvArray, false, true);
				pcsVHzchart.series[1].addPoint(hzArray, true, true);
//			}, 2000);
		}
	}
}]);
