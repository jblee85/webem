'use strict';
app.controller('scheduleManagement_registPCS_ctrl', function($scope, $uibModalInstance, params) {
	$scope.params = [];
	$scope.returnVal =[];
	$scope.selectAll=false;
	params.apiService.get_Site()
	.then(
		function(d) {
			$scope.devrids=[];
			for(var i in d.refdevs){
				if(d.refdevs[i].bizid == params.bizid){
					$scope.devrids.push(d.refdevs[i].devrid);
				}
			}
			params.apiService.gets_DeviceLeafs($scope.devrids)
			.then(
				function(d) {
					try{
						//TODO 충전/방전을 위해 임시로 세션에 rid를 저장(나중에 삭제)
						$scope.params=[];
						if(d.length != 0){
							for(var i in d){
								if(d[i].devtype == 11){
									$scope.params=d[i];
//									$scope.params[i].selected = false;
									for(var j in params.devs){
										if($scope.params.devs[j].devlid == params.devs[j].devlid){
											$scope.params.devs[j].selected = true;
										}
									}
								}
							}
						}else{
							$scope.params.devs=[];
						}

					}catch(error){
						console.log(error.message);
					}
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

	$scope.checkAll = function () {
        if ($scope.selectAll) {
            $scope.selectAll = true;
        } else {
            $scope.selectAll = false;
        }
        angular.forEach($scope.params, function (item) {
            item.selected = $scope.selectAll;
        });
    };
    $scope.checkSelectPCS = function(index){
//    	$scope.params[index].selected = $scope.params[index].selected ? false:true;
    	$scope.PCSList.push($scope.params.devs[index].selected);
    }
    $scope.ok = function() {
    	for(var i in $scope.params.devs){
			if($scope.params.devs[i].selected == true){
				$scope.returnVal.push({devlname:$scope.params.devs[i].devlname,devrid:$scope.params.devrid,devlid:$scope.params.devs[i].devlid});
			}
		}
    	$uibModalInstance.close($scope.returnVal);
    };

    $scope.cancel = function() {
    	$uibModalInstance.dismiss('cancel');
    };
});
app.controller('scheduleManagement_ctrl',[ '$scope','$state','$rootScope', '$window','$uibModal','apiService','MODEL','DEFINED',
	function($scope, $state, $rootScope,$window,$uibModal,apiService,MODEL,DEFINED) {
	var self = this;
	$scope.scheduleID = $window.sessionStorage["scheduleid"];
	$scope.deviceLeaf = MODEL.DEVICE.DEVICE_LEAF_DEVS;

	$scope.isSave=true;
	$scope.isScheduleName = true;
	$scope.isSchedulePCS = true;
	$scope.isScheduleMonthName = true;
	$scope.isTotalkw = true;
	$scope.isScheduleTimeName = true;
	$scope.isChargeZero = true;

	$scope.monthList=[];
	$scope.selectedSchedule="";
	$scope.scheduleListObj=[];
	$scope.scheduleList=[];
	$scope.scheduleDetailList=[];
	$scope.scheduleDetailListObj=[];
	$scope.scheduleObj=[];
	$scope.scheduleObj.push($scope.scheduleListObj);
	$scope.scheduleObj.push($scope.scheduleDetailListObj);

	//스케줄 불러오기
	function getsSchedule(){
		apiService.gets_ConfigSchedule()
		.then(
			function(d) {
				try{
					$scope.scheduleList = d;
					angular.copy($scope.scheduleList, $scope.scheduleListObj);

					for(var i in $scope.scheduleList){
						if($scope.scheduleList[i].data.run){
							alert("모든 스케줄이 운전 정지 상태에서만 저장이 가능 합니다.");
							$scope.isSave=false;
							$scope.selectedSchedule = $scope.scheduleList[i].id;
						}
					}
					if($scope.selectedSchedule == "" || $scope.selectedSchedule == "undefined" || $scope.selectedSchedule == undefined || $scope.selectedSchedule == null){
						$scope.getsScheduleMonth($scope.scheduleList[0].id);
					}else{
						$scope.getsScheduleMonth($scope.selectedSchedule);
					}


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
												for(var j in $scope.scheduleList){
													for(var z in $scope.scheduleList[j].data.devs){
														if($scope.scheduleList[j].data.devs[z].devlid == d[i].devs[0].devlid){
															$scope.scheduleList[j].data.devs[z].devlname = d[i].devs[0].devlname;
														}
													}
												}
												$scope.deviceLeaf.pcs.maxpkw = d[i].devs[0].maxpkw;
												for(var key in MODEL.SOCMODE){
													if(d[i].devs[0].socctrmode == MODEL.SOCMODE[key].soc){
														$scope.deviceLeaf.pcs.socctrmode = MODEL.SOCMODE[key];
													}
												}
											}else if(d[i].devtype == 13){
												$scope.deviceLeaf.battery.designkw = d[i].devs[0].designkw;
												$scope.deviceLeaf.battery.abledkw = d[i].devs[0].designkw * ($scope.deviceLeaf.pcs.socctrmode.max - $scope.deviceLeaf.pcs.socctrmode.min)/100;
											}
										}

									}catch(error){
										console.log(error.message);
									}
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


				}catch(error){
					console.log(error.message);
				}
			},
			function(errResponse){
				console.log("errResponse gets_timeline status : "+errResponse.status);
			}
		);
	}
	getsSchedule();
	//월 스케줄 불러오기
	$scope.getsScheduleMonth = function(id){
		$scope.selectedSchedule = id;
		$scope.selectedScheduleList=[];
		for(var i in $scope.scheduleList){
			if($scope.scheduleList[i].id == id){
				$scope.selectedScheduleName = $scope.scheduleList[i].data.scname;
				$scope.selectedScheduleList = $scope.scheduleList[i].data.months;
			}
		}
		for(var i in $scope.selectedScheduleList){
			if($scope.selectedScheduleList[i].month == Number($scope.yyyymmdd().substring(4,6))){
				$scope.selectedScheduleDetailscname = $scope.selectedScheduleList[i].scdayname;
			}
		}
		getSchduleDetail();
	}
	$scope.hourList=[];
	$scope.pkwList=[];
	//스케줄 디테일 불러오기
	function getSchduleDetail(){
		apiService.gets_ConfigSchedule(12)
		.then(
			function(d) {
				try{
					$scope.scheduleDetailList = d;
					for(var i in d){
						$scope.scheduleDetailList[i].totalkw = 0;
						if($scope.scheduleDetailList[i].data.scdayname == $scope.selectedScheduleDetailscname){
							$scope.selectedScheduleDetail = $scope.scheduleDetailList[i].id;
						}
						for(var j in d[i].data.times){
							if(d[i].data.times[j].cmd == 12){
								$scope.scheduleDetailList[i].totalkw = $scope.scheduleDetailList[i].totalkw + d[i].data.times[j].pkw ;
							}else if(d[i].data.times[j].cmd == 13){
								$scope.scheduleDetailList[i].totalkw = $scope.scheduleDetailList[i].totalkw - d[i].data.times[j].pkw ;
							}
							$scope.scheduleDetailList[i].data.times[j].cmd = $scope.scheduleDetailList[i].data.times[j].cmd.toString();
						}
					}
					angular.copy($scope.scheduleDetailList, $scope.scheduleDetailListObj);
					if($scope.selectedScheduleDetail == "" || $scope.selectedScheduleDetail == "undefined" || $scope.selectedScheduleDetail == undefined){
						$scope.getSelectScheduleDetail($scope.scheduleDetailList[0].id);
					}else{
						$scope.getSelectScheduleDetail($scope.selectedScheduleDetail);
					}
				}catch(e){
					console.log(e.message);
				}

			},
			function(errResponse){
				console.log("errResponse gets_timeline status : "+errResponse.status);
			}
		);
	}
	$scope.getSelectScheduleDetail = function(id){
		$scope.hourList=[];
		$scope.pkwList=[];
		$scope.selectedScheduleDetail = id;
		$scope.selectedScheduleTimesList=[];
		for(var i in $scope.scheduleDetailList){
			if($scope.scheduleDetailList[i].id == id){
				$scope.selectedScheduleTimesName = $scope.scheduleDetailList[i].data.scdayname;
				$scope.selectedScheduleTimesList = $scope.scheduleDetailList[i].data.times;
				for(var j in $scope.selectedScheduleTimesList){
					$scope.hourList.push($scope.selectedScheduleTimesList[j].h);
					if($scope.selectedScheduleTimesList[j].cmd == 13){
						$scope.pkwList.push($scope.selectedScheduleTimesList[j].pkw*-1);
					}else{
						$scope.pkwList.push($scope.selectedScheduleTimesList[j].pkw);
					}

				}
				drawChart();
			}
		}
	}
	//timeline불러오기
	$scope.timeline={pcsSchedule:{add:0,modi:0,del:0},timeSchedule:{add:0,modi:0,del:0}};
	function getsTimeline(){
		apiService.gets_Timeline($scope.yyyymmdd())
		.then(
			function(d){
				for(var i in d){
					if(d[i].tcode == 205){
						$scope.timeline.pcsSchedule.add++;
					}else if(d[i].tcode == 206){
						$scope.timeline.pcsSchedule.modi++;
					}else if(d[i].tcode == 207){
						$scope.timeline.pcsSchedule.del++;
					}else if(d[i].tcode == 208){
						$scope.timeline.timeSchedule.add++;
					}else if(d[i].tcode == 209){
						$scope.timeline.timeSchedule.modi++;
					}else if(d[i].tcode == 210){
						$scope.timeline.timeSchedule.del++;
					}
				}
//				$scope.timeline = d;
			},
			function(errResponse){
				console.log("errResponse gets_timeline status : "+errResponse.status);
			}
		);
	}
	getsTimeline();
	$scope.selectCMD = function(cmd, index){
		$scope.selectedScheduleTimesList[index].cmd = cmd;
	}
	//스케줄 초기화
	$scope.reset=function(){
		getsSchedule();
		getSchduleDetail();
	}
	$scope.checkAllSchedulePCS = function () {
        if ($scope.selectAllSchedulePCS) {
            $scope.selectAllSchedulePCS = true;
        } else {
            $scope.selectAllSchedulePCS = false;
        }
        angular.forEach($scope.scheduleList, function (item) {
            item.selected = $scope.selectAllSchedulePCS;
        });
    };
    $scope.checkAllScheduleDAY = function () {
        if ($scope.selectAllScheduleDAY) {
            $scope.selectAllScheduleDAY = true;
        } else {
            $scope.selectAllScheduleDAY = false;
        }
        angular.forEach($scope.scheduleDetailList, function (item) {
            item.selected = $scope.selectAllScheduleDAY;
        });
    };

	$scope.addPCS = function(index,devs){
		var tempobj = {};
		tempobj.devs = devs;
		tempobj.bizid = DEFINED.bizid;
		tempobj.apiService = apiService;
		$rootScope.ModalOpen(tempobj, './jsp/modal/regist_pcs.jsp','scheduleManagement_registPCS_ctrl');
		$rootScope.modalInstance.result.then(function (val) {
            //products = selectedItems;
			$scope.scheduleList[index].data.devs = val;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });

	}
	//PCS스케줄새로 만들기
	$scope.addSchedulePCS = function(){
		var tempObj = {};
		angular.copy(MODEL.SCHEDULE_PCS, tempObj);
		tempObj.id = newID();
		tempObj.sid = $rootScope.currentUser.siteids[0];
		$scope.scheduleList.push(tempObj);
		$scope.getsScheduleMonth(tempObj.id);
	}
	//PCS스케줄 row 지우기
	$scope.delSchedulePCS = function(){
		for(var i in $scope.scheduleList){
			if($scope.scheduleList[i].selected == true){
				delete $scope.scheduleList[i];
			}
		}
		$scope.scheduleList = $scope.scheduleList.filter(function(e){
			return e != undefined
		});
	}
	//DAY스케줄 새로 만들기
	$scope.addScheduleDAY = function(){
		var tempObj = {};
		angular.copy(MODEL.SCHEDULE_DAY, tempObj);
		tempObj.id = newID();
		tempObj.sid = $rootScope.currentUser.siteids[0];
		$scope.scheduleDetailList.push(tempObj);
		$scope.getSelectScheduleDetail(tempObj.id);
		$scope.selectAllScheduleDAY = false;
	}
	//DAY스케줄 row 지우기
	$scope.delScheduleDAY = function(){
		for(var i in $scope.scheduleDetailList){
			if($scope.scheduleDetailList[i].selected == true){
				delete $scope.scheduleDetailList[i];
			}
		}
		$scope.scheduleDetailList = $scope.scheduleDetailList.filter(function(e){
			return e != undefined
		});
		$scope.getSelectScheduleDetail($scope.scheduleDetailList[0].id);
		$scope.selectAllScheduleDAY = false;
	}

	$scope.$watch('[scheduleList,scheduleDetailList]',function(newVal, oldVal){
		$scope.isScheduleName = true;
		$scope.isSchedulePCS = true;
		$scope.isScheduleMonthName = true;
		for(var i in $scope.scheduleList){
			//스케줄 이름 check
			if($scope.scheduleList[i].data.scname == ""){
				$scope.isScheduleName = false;
			}
			if($scope.scheduleList[i].data.devs.length == 0){
				$scope.isSchedulePCS = false;
			}

			for(var j in $scope.scheduleList[i].data.months){
				//월 check
				if($scope.scheduleList[i].data.months[j].scdayname == "" || $scope.scheduleList[i].data.months[j].scdayname == null){
					$scope.isScheduleMonthName = false;
				}
			}

		}
		//타임 스케줄 이름 check

		//출력량 합 표시 & 출력량 계획 0 check
		$scope.isTotalkw = true;
		$scope.isScheduleTimeName = true;
		for(var i in $scope.scheduleDetailList){
			$scope.scheduleDetailList[i].totalkw = 0;
			for(var j in $scope.scheduleDetailList[i].data.times){
				if($scope.scheduleDetailList[i].data.times[j].cmd == 14 && $scope.scheduleDetailList[i].data.times[j].pkw > 0){
					$scope.scheduleDetailList[i].data.times[j].pkw = 0;
					return;
				}
				if($scope.scheduleDetailList[i].data.times[j].cmd != 14 && $scope.scheduleDetailList[i].data.times[j].pkw == 0){
					$scope.isChargeZero = false;
					return;
				}else{
					$scope.isChargeZero = true;
				}
				if($scope.scheduleDetailList[i].data.times[j].pkw > $scope.deviceLeaf.pcs.maxpkw && $scope.deviceLeaf.pcs.maxpkw > 0){
					$scope.scheduleDetailList[i].data.times[j].pkw = $scope.deviceLeaf.pcs.maxpkw;
					return;
				}
				if($scope.scheduleDetailList[i].data.times[j].cmd == 12){
					$scope.scheduleDetailList[i].totalkw = $scope.scheduleDetailList[i].totalkw + $scope.scheduleDetailList[i].data.times[j].pkw ;
				}else if($scope.scheduleDetailList[i].data.times[j].cmd == 13){
					$scope.scheduleDetailList[i].totalkw = $scope.scheduleDetailList[i].totalkw - $scope.scheduleDetailList[i].data.times[j].pkw ;
				}
				$scope.scheduleDetailList[i].data.times[j].cmd = $scope.scheduleDetailList[i].data.times[j].cmd.toString();
			}
			if($scope.scheduleDetailList[i].totalkw != 0){
				$scope.isTotalkw = false;
			}
			if($scope.scheduleDetailList[i].data.scdayname == ""){
				$scope.isScheduleTimeName = false;
			}
		}

		//타임 스케줄 time 출력량 연속된 합은 운전 가능량을 넘을 수 없다.


	},true);
	//스케줄 저장
	$scope.saveSchedule = function(){
		//유효성체크(마지막 저장 하는 순간 운전중인 스케줄이 있는지 확인해야 함)
		var isRun = false;
		if(!$scope.isScheduleName) {alert("PCS스케줄 이름을 확인해 주세요.");return;}
		if(!$scope.isSchedulePCS)  {alert("PCS스케줄에 적용할 PCS를 추가해 주세요.");return;}
		if(!$scope.isScheduleMonthName)  {alert("월 적용 스케줄을 확인해 주세요.");return;}
		if(!$scope.isTotalkw) {alert("출력량 계획은 0이어야 합니다.");return;}
		if(!$scope.isScheduleTimeName) {alert("타임 스케줄 이름을 확인해 주세요.");return;}
		if(!$scope.isChargeZero) {alert("충전, 방전 출력량은 0이 될 수 없습니다.");return;}
		//모델링
		//$$hashKey 삭제
		$scope.scheduleList = JSON.parse(angular.toJson($scope.scheduleList));
		$scope.scheduleDetailList = JSON.parse(angular.toJson($scope.scheduleDetailList));
		$scope.schedule = {};

		for(var i in $scope.scheduleList){
			$scope.scheduleList[i].rdt = convertDateStringsToDates($scope.scheduleList[i].rdt);
			$scope.scheduleList[i].udt = convertDateStringsToDates($scope.scheduleList[i].udt);
			delete $scope.scheduleList[i].selected;

			//TODO 아이디 지우는 여부 변경
			if($scope.scheduleList[i].id.length < 24){
				delete $scope.scheduleList[i].id;
			}
			for(var j in $scope.scheduleList[i].data.devs){
				$scope.scheduleList[i].data.devs[j].fdt = convertDateStringsToDates($scope.scheduleList[i].data.devs[j].fdt);
				delete $scope.scheduleList[i].data.devs[j].devlname
			}
		}
		for(var i in $scope.scheduleDetailList){
			delete $scope.scheduleDetailList[i].totalkw;
			delete $scope.scheduleDetailList[i].selected;
			delete $scope.scheduleDetailList[i].id;
			$scope.scheduleDetailList[i].rdt = convertDateStringsToDates($scope.scheduleDetailList[i].rdt);
			$scope.scheduleDetailList[i].udt = convertDateStringsToDates($scope.scheduleDetailList[i].udt);
			for(var j in $scope.scheduleDetailList[i].data.times){
				$scope.scheduleDetailList[i].data.times[j].cmd = parseInt($scope.scheduleDetailList[i].data.times[j].cmd);
			}
		}

		apiService.posts_ConfigESSSchedule($scope.scheduleDetailList, 12)
		.then(
			function(d) {
				apiService.posts_ConfigESSSchedule($scope.scheduleList, 11)
				.then(
					function(d) {
						alert("저장 되었습니다.");
						getsSchedule();
						getSchduleDetail();
					},
					function(errResponse){
						if(errResponse.status == 403){
							alert("스케줄 이름이 중복 됩니다.");
						}else{
							alert("저장 실패");
						}
						console.log("errResponse gets_timeline status : "+errResponse.status);
					}
				);

			},
			function(errResponse){
				if(errResponse.status == 403){
					alert("타임 스케줄 이름이 중복 됩니다.");
				}else{
					alert("저장 실패");
				}
				console.log("errResponse gets_timeline status : "+errResponse.status);
			}
		);
	}

	$scope.goScheduleApply = function(id){
		$window.sessionStorage["scheduleid"] = id;
		$state.go('scheduleApply',{id:id});
	}
	//수정 모드
	$scope.runSchedule = function(){
		apiService.put_ConfigESSScheduleRun()
		.then(
			function(d) {
				alert("활성화 성공");
				getsSchedule();
			},
			function(errResponse){

				if(errResponse.status == 403){
					alert("1.현재 충방전 상태를 확인해 주세요.2.활성화를 위해선 12개월치 스케줄들이 필요합니다.");
				}
				getsSchedule();
				console.log("errResponse gets_timeline status : "+errResponse.status);
			}
		);
	}
	//스케줄 삭제
	$scope.delSchedule = function(){
		//확인 팝업창
		if($scope.schedule.id != "" && $scope.schedule.id != undefined){
			if(confirm("삭제 하시겠습니까?")==true){
				apiService.delete_ConfigESSSchedule($scope.schedule.id)
				.then(
					function(d) {
						alert("삭제 성공");
						$scope.isModifyMode = false;
						getsSchedule();
					},
					function(errResponse){
						console.log("errResponse gets_timeline status : "+errResponse.status);
					}
				);
			}
		}else{
			alert("저장 후 삭제해 주세요.");
		}

	}


	//스케줄 row 추가
	$scope.addRow = function(){
		//전에 생성한 줄 상태값 유지하여 생성하기
		var beforecmd = $scope.schedule.data.times[$scope.schedule.data.times.length-1].cmd;
		$scope.schedule.data.times.push({cmd:beforecmd,kw:0,hour:0,min:0});
	}
	//스케줄 디테일(row) 수정
	$scope.EditIndex = null;
	$scope.modifyRow = function(index){
		if($scope.EditIndex ==null){
			$scope.EditIndex = index;
		}else{
			$scope.EditIndex = null;
		}
	}

	//스케줄 디테일(row) 삭제
	$scope.delRow = function(index){
		if(index != 0){
			$scope.schedule.data.times.splice(index,1);
		}else{
			alert("무조건 0시0분은 시작값으로 셋팅 해야 합니다.");
		}
	}
	//device_leaf에서 soc, 총용량 가져오기
	//chart
	var chart;
	function drawChart(){
		chart = Highcharts.chart('scheduleChart',{
			chart: {
				type:'bar',
				backgroundColor:  false ,
				height: 360

			},
			title: {
				text:''
			},
			rangeSelector: {
				enabled: false
			},
	    	navigator: {
		        height: 110,
		        backgroundColor:  false,
		        borderColor: '#000000'
	    	},
	    	plotOptions: {
	    	      bar: {
	    	        negativeColor: 'red',
	    	        threshold: 0,
	    	        dataLabels: {
	    	          enabled: true,
	    	          formatter: function(e) {
//	    	        	  console.log("color param : "+e);
	    	          }
	    	        }
	    	      }
	    	    },
	    	xAxis:{
	    		title:false,
				categories:$scope.hourList
			},
			yAxis:{
	    		title:false
			},
			series:
				[{
					showInLegend: false,
					name: $rootScope.ts.AMOUNT_OUTPUT+'(kW)',
					data: $scope.pkwList
				}
			]
		});
	}

}]);

