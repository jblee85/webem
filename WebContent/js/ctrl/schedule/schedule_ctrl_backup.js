'use strict';
angular.module('iceApp').controller('scheduleManagement_ctrl',[ '$scope','$state','$rootScope', '$window','apiService','MODEL','DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $state, $rootScope,$window,apiService,MODEL, DTOptionsBuilder, DTColumnDefBuilder) {
	var self = this;
	$scope.scheduleID = $window.sessionStorage["scheduleid"];
	$scope.isMonthDisabled=false;
	$scope.monthList=[];
	$scope.selectedSchedule="";
	$scope.scheduleListObj=[];
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
					console.log($scope.scheduleList);
					if($scope.selectedSchedule == "" || $scope.selectedSchedule == "undefined" || $scope.selectedSchedule == undefined){
						$scope.getsScheduleMonth($scope.scheduleList[0].id);
					}else{
						$scope.getsScheduleMonth($scope.selectedSchedule);
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
	getsSchedule();
	//월 스케줄 불러오기
	$scope.getsScheduleMonth = function(id){
		$scope.selectedSchedule = id;
		$scope.selectedScheduleList=[];
		for(var i in $scope.scheduleList){
			if($scope.scheduleList[i].id == id){
				$scope.selectedScheduleList = $scope.scheduleList[i].data.months;
				if($scope.scheduleList[i].data.run){
					$scope.isMonthDisabled=true;
				}else{
					$scope.isMonthDisabled=false;
				}
			}
		}
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
	getSchduleDetail();
	$scope.getSelectScheduleDetail = function(id){
		$scope.hourList=[];
		$scope.pkwList=[];
		$scope.selectedScheduleDetail = id;
		$scope.selectedScheduleTimesList=[];
		for(var i in $scope.scheduleDetailList){
			if($scope.scheduleDetailList[i].id == id){
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
	var newID = function () {
	  return Math.random().toString(36).substr(2, 16);
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
//		for(var i in $scope.scheduleList){
//			if($scope.scheduleList[i].selected == true){
//				delete $scope.scheduleList[i];
//			}
//		}
//		$scope.scheduleList = $scope.scheduleList.filter(function(e){
//			return e != undefined
//		});
		for(var i in $scope.scheduleList){
			if($scope.scheduleList[i].id == $scope.selectedSchedule){
				$scope.scheduleList.splice(i,1);
			}
		}
		$scope.getsScheduleMonth($scope.scheduleList[0].id);
	}
	//DAY스케줄 새로 만들기
	$scope.addScheduleDAY = function(){
		var tempObj = {};
		angular.copy(MODEL.SCHEDULE_DAY, tempObj);
		tempObj.id = newID();
		tempObj.sid = $rootScope.currentUser.siteids[0];
		$scope.scheduleDetailList.push(tempObj);
		$scope.getSelectScheduleDetail(tempObj.id);
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
	}
	$scope.isSave=false;
	$scope.$watch('[scheduleList,scheduleDetailList]',function(newVal, oldVal){
		console.log("wahtch : scheduleList");
//		$scope.scheduleListObj=[];
//		$scope.scheduleDetailListObj=[];
		//수정 사항 없을 시 저장 버튼 disable
		if(!angular.equals($scope.scheduleObj, newVal) && newVal[0] != undefined && newVal[1] != undefined){
			$scope.isSave = true;
		}else{
			$scope.isSave = false;
		}
		//스케줄 이름 check

		//월 check

		//타임 스케줄 이름 check

		//출력량 합 표시 & 출력량 계획 0 check
		for(var i in $scope.scheduleDetailList){
			$scope.scheduleDetailList[i].totalkw = 0;
			for(var j in $scope.scheduleDetailList[i].data.times){
				if($scope.scheduleDetailList[i].data.times[j].cmd == 12){
					$scope.scheduleDetailList[i].totalkw = $scope.scheduleDetailList[i].totalkw + $scope.scheduleDetailList[i].data.times[j].pkw ;
				}else if($scope.scheduleDetailList[i].data.times[j].cmd == 13){
					$scope.scheduleDetailList[i].totalkw = $scope.scheduleDetailList[i].totalkw - $scope.scheduleDetailList[i].data.times[j].pkw ;
				}
				$scope.scheduleDetailList[i].data.times[j].cmd = $scope.scheduleDetailList[i].data.times[j].cmd.toString();
			}
		}

		//타임 스케줄 time 출력량 연속된 합은 운전 가능량을 넘을 수 없다.

		//스케줄에 pcs 등록되어있는지

	},true);
//	function put_ConfigESSScheduleRun(val){
//		apiService.put_ConfigESSScheduleRun(val)
//		.then(
//			function(d) {
//				getSchedule();
//			},
//			function(errResponse){
//				if(errResponse.status == 403){
//					alert("활성화 시킬 수 없습니다. 현재 충방전 상태를 확인해 주세요.");
//				}
//				$scope.essScheduleList = {data:{running:false}};
//				console.log("errResponse gets_timeline status : "+errResponse.status);
//			}
//		);
//	}
//	//스케줄 활성화/비활성화
//	$scope.runSchedule = function(val){
//		if(!val){
//			if(confirm("현재 적용중인 스케줄이 해제 됩니다. 계속 진행 하시겠습니까?")){
//				put_ConfigESSScheduleRun(val);
//			}
//		}else{
//				if($scope.isBattActive){
//					alert("수동 제어를 비활성화 해주세요.");
//					$scope.essScheduleList = {data:{running:false}};
//				}else{
//					put_ConfigESSScheduleRun(val);
//				}
//		}
//
//	}
	//스케줄 저장
	$scope.saveSchedule = function(){
		//모델링
		//$$hashKey 삭제
		$scope.scheduleList = JSON.parse(angular.toJson($scope.scheduleList))
		$scope.scheduleDetailList = JSON.parse(angular.toJson($scope.scheduleDetailList))


		for(var i in $scope.scheduleList){
			$scope.scheduleList[i].rdt = convertDateStringsToDates($scope.scheduleList[i].rdt);
			delete $scope.scheduleList[i].selected;
			delete $scope.scheduleList[i].id;
			for(var j in $scope.scheduleList[i].data.devs){
				$scope.scheduleList[i].data.devs[j].fdt = convertDateStringsToDates($scope.scheduleList[i].data.devs[j].fdt);
			}
		}
		for(var i in $scope.scheduleDetailList){
			delete $scope.scheduleDetailList[i].totalkw;
			delete $scope.scheduleDetailList[i].selected;
			$scope.scheduleDetailList[i].rdt = convertDateStringsToDates($scope.scheduleDetailList[i].rdt);
			for(var j in $scope.scheduleDetailList[i].data.times){
				$scope.scheduleDetailList[i].data.times[j].cmd = parseInt($scope.scheduleDetailList[i].data.times[j].cmd);
			}
		}

		apiService.posts_ConfigESSSchedule($scope.scheduleList, 11)
		.then(
			function(d) {
				getsSchedule();
			},
			function(errResponse){
				if(errResponse.status == 403){
					alert("출력 값은 0이 될 수 없고, 시간은 중복 될 수 없습니다.스케줄이 적용중이면 수정 할 수 없습니다.");
				}
				console.log("errResponse gets_timeline status : "+errResponse.status);
			}
		);
		apiService.posts_ConfigESSSchedule($scope.scheduleDetailList, 12)
		.then(
			function(d) {
				getSchduleDetail();
			},
			function(errResponse){
				if(errResponse.status == 403){
					alert("출력 값은 0이 될 수 없고, 시간은 중복 될 수 없습니다.스케줄이 적용중이면 수정 할 수 없습니다.");
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
//						$scope.essHistoryList = d;
						console.log($scope.essHistoryList);
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
//	$('#Temperature').highcharts('ScheduleChart', {
	var chart;
	function drawChart(){
		chart = Highcharts.chart('scheduleChart',{
			chart: {
				type:'bar',
				height: 360,
				backgroundColor:  false
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
		        borderColor: '#ff3535'
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
//	    	legend: {
//	            layout: 'vertical',
//	            align: 'right',
//	            verticalAlign: 'top',
//	            x: -40,
//	            y: 80,
//	            floating: true,
//	            borderWidth: 1,
//	            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
//	            shadow: true
//	        },
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
					name: '출력량(kW)',
					data: $scope.pkwList
				}
			]
		});
	}

}]);
angular.module('iceApp').controller('scheduleEdit_ctrl',[ '$scope','$state','$rootScope', '$window','apiService','DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $state, $rootScope,$window,apiService, DTOptionsBuilder, DTColumnDefBuilder) {
	var self = this;
	$scope.scheduleID = $window.sessionStorage["scheduleid"];
	$scope.dtOptions = DTOptionsBuilder.newOptions()
//	.withPaginationType('full_numbers')
	.withOption('order', [0,'asc'])
	.withOption('bLengthChange',false)
	.withOption('searching', false)
	.withOption('paging', false)
	.withOption('info', false)
	.withOption('scrollY', '100px')
	.withOption('scrollCollapse', true)
	.withLanguage(language);
	$scope.dtColumns = [
//        DTColumnDefBuilder.newColumnDef(0).notSortable()
		DTColumnDefBuilder.newColumnDef(0).notSortable(),
		DTColumnDefBuilder.newColumnDef(1).notSortable(),
		DTColumnDefBuilder.newColumnDef(2).notSortable(),
		DTColumnDefBuilder.newColumnDef(3).notSortable()

     ];
	$scope.dtColumns_left = [
//        DTColumnDefBuilder.newColumnDef(2).notSortable()
		DTColumnDefBuilder.newColumnDef(0).notSortable(),
		DTColumnDefBuilder.newColumnDef(1).notSortable(),
		DTColumnDefBuilder.newColumnDef(2).notSortable()
     ];
	$scope.monthList=[];
	function monthModel(){
		$scope.monthList=[];
		for(var i=1;i<13;i++){
			$scope.monthList.push({id:i,is:false});
		}
	}
	monthModel();
	$scope.hourList=[];
	//0시
	for(var i=0;i<24;i++){
		$scope.hourList.push({id:i});
	}
	$scope.minList=[{id:0},{id:15},{id:30},{id:45}];

//	$scope.scheduleID = "";
	$scope.scheduleList=[];
	$scope.schedule={data:{applied:false,running:false,holyday:false,schedulename:"",months:[],times:[{cmd:true,kw:0,hour:0,min:0}]}};
//	$scope.schedule.data.times=[{cmd:true,kw:0,hour:0,min:0}];
	$scope.isModifyMode = false;
	$scope.toggleEnable = function(val){
		var classname = "longFlip-innerafter";
		if(val){
			classname = "longFlip-innerbefore";
		}
		return classname;
	}
	$scope.isCharge = function(cmd){
		var ischarge = true;
		if(cmd == "방전"){
			ischarge = false;
		}
		return ischarge;
	}
	//스케줄 불러오기
	function getsSchedule(){
		apiService.gets_ConfigSchedule()
		.then(
			function(d) {
				try{
					$scope.scheduleList = d;
					console.log($scope.scheduleList);
					if($scope.scheduleID == "" || $scope.scheduleID == "undefined" || $scope.scheduleID == undefined){
						$scope.getScheduleDetail($scope.scheduleList[0].id);
					}else{
						$scope.getScheduleDetail($scope.scheduleID);
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
	getsSchedule();
	//스케줄 디테일 불러오기
	function getSchduleDetail(id){
		apiService.get_ConfigESSSchedule(id)
		.then(
			function(d) {
				try{
					$scope.scheduleID=id;
					$scope.isModifyMode = false;
					$scope.schedule = d;
					monthModel();
					var timeList = $scope.schedule.data.times;
					for(var i in timeList){
						timeList[i].cmd = $scope.configCodeIntToBoolean(timeList[i].cmd);
						if(timeList[i].kw < 0){
							timeList[i].cmd=true;
							timeList[i].kw = Math.abs(timeList[i].kw);
						}else{
							timeList[i].cmd=false;
						}
					}
					var monthList = $scope.schedule.data.months;
					for(var j in monthList){
						$scope.monthList[monthList[j]-1].is = true;
					}
					console.log($scope.schedule);
				}catch(e){
					console.log(e.message);
				}

			},
			function(errResponse){
				console.log("errResponse gets_timeline status : "+errResponse.status);
			}
		);
	}
	$scope.getScheduleDetail = function(id){
		if($scope.isModifyMode == true){
			if(confirm("입력중인 내용이 사라집니다. 진행 하시겠습니까?")==true){
				getSchduleDetail(id);
			}
		}else{
			getSchduleDetail(id);
		}
		$scope.scheduleSelected = id;

	}

	//스케줄 저장
	$scope.saveSchedule = function(){
		//유효성 체크
		if($scope.schedule.data.schedulename == null || $scope.schedule.data.schedulename == ""){
			alert("스케줄 이름을 정해주세요.");
			$scope.focus('schedulename');
			return;
		}
		//모델링
		for(var i in $scope.schedule.data.times){
			if($scope.schedule.data.times[i].kw != 0){
				if($scope.schedule.data.times[i].cmd == true){
					$scope.schedule.data.times[i].cmd=12;
					$scope.schedule.data.times[i].kw = Number("-"+$scope.schedule.data.times[i].kw);
				}else{
					$scope.schedule.data.times[i].cmd=12;
					$scope.schedule.data.times[i].kw = Number($scope.schedule.data.times[i].kw);
				}
			}else{
				alert("출력량은 0이 될 수 없습니다.");
				return;
			}

		}
		$scope.schedule.data.months=[];
		for(var i in $scope.monthList){
			if($scope.monthList[i].is){
				$scope.schedule.data.months.push($scope.monthList[i].id);
			}

		}

//		$scope.schedule.data.applied = $scope.schedule.data.applied ? false : true;
		console.log($scope.schedule);
		if($scope.schedule.id != "" && $scope.schedule.id != undefined){
			console.log("수정");
//			for(var i in $scope.schedule.data.times){
//				$scope.schedule.data.times[i].cmd = $scope.configCodeInt($scope.schedule.data.times[i].cmd);
//			}
			delete $scope.schedule.rdt;
			if($scope.schedule ==null){
				alert("내용이 없습니다. 내용을 작성 후 다시 시도해 주세요.");
			}else{
				//확인 팝업창
				apiService.put_ConfigESSSchedule($scope.schedule)
				.then(
					function(d) {
						alert("수정 성공");
						$scope.isModifyMode = false;
						getsSchedule();
						console.log(d);
					},
					function(errResponse){
						if(errResponse.status == 403){
							alert("출력 값은 0이 될 수 없고, 시간은 중복 될 수 없습니다.스케줄이 적용중이면 수정 할 수 없습니다.");
						}
						console.log("errResponse gets_timeline status : "+errResponse.status);
					}
				);
			}
		}else{
			console.log("저장");
			apiService.post_ConfigESSSchedule($scope.schedule)
			.then(
				function(d) {
					alert("저장 성공");
					$scope.isModifyMode = false;
					getsSchedule();
					console.log(d);
				},
				function(errResponse){
					if(errResponse.status == 403){
						alert("출력 값은 0이 될 수 없고, 시간은 중복 될 수 없습니다.");
					}
					console.log("errResponse gets_timeline status : "+errResponse.status);
				}
			);
		}
	}
	$scope.goScheduleApply = function(id){
		$window.sessionStorage["scheduleid"] = id;
		$state.go('scheduleApply',{id:id});
	}
	//수정 모드
	$scope.modifyMode = function(){
//		$scope.isModifyMode ? false:true;
		if($scope.isModifyMode == true){
			$scope.isModifyMode=false;
		}else{
			$scope.isModifyMode=true;
		}

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
//						$scope.essHistoryList = d;
						console.log($scope.essHistoryList);
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

	//스케줄 초기화
	$scope.reset=function(){
		monthModel();
		var id = $scope.scheduleID;
		if(id != ""){
			getSchduleDetail(id);
		}else{
			$scope.createSchedule();
		}
	}

	//스케줄 새로 만들기
	$scope.createSchedule = function(){
		monthModel();
		$scope.schedule={data:{applied:false,running:false,holyday:false,schedulename:"",months:[],times:[{cmd:true,kw:0,hour:0,min:0}]}};
//		$scope.schedule.data.times=[{cmd:true,kw:0,hour:0,min:0}];
		$scope.isModifyMode = true;
		$scope.scheduleID="";
		$scope.focus('schedulename');
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


}]);
angular.module('iceApp').controller('scheduleApply_ctrl',[ '$scope','$state','$rootScope', '$window','apiService','DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $state, $rootScope,$window,apiService, DTOptionsBuilder, DTColumnDefBuilder) {
	var self = this;
	$scope.scheduleID = $window.sessionStorage["scheduleid"];
	$scope.monthList=[];
	$scope.monthAllList=[];
	function monthModel(){
		$scope.monthList=[];
		for(var i=1;i<13;i++){
			$scope.monthList.push({id:i,is:false});
		}
	}
	function monthAllModel(){
		$scope.monthAllList=[];
		for(var i=1;i<13;i++){
			$scope.monthAllList.push({id:i,is:false});
		}
	}
	monthModel();
	monthAllModel();
//	$scope.scheduleID = "";
	$scope.scheduleList=[];
	$scope.schedule={data:{applied:false,holyday:false,schedulename:"",months:[],times:[{cmd:true,kw:0,hour:0,min:0}]}};
	$scope.isModifyMode = false;
	$scope.toggleEnable = function(val){
		var classname = "longFlip-innerafter";
		if(val){
			classname = "longFlip-innerbefore";
		}
		return classname;
	}
	$scope.isCharge = function(cmd){
		var ischarge = true;
		if(cmd == "방전"){
			ischarge = false;
		}
		return ischarge;
	}
	//스케줄 불러오기
	function getsSchedule(){
		apiService.gets_ConfigSchedule()
		.then(
			function(d) {
				try{
//					$scope.monthAllList=[];
					monthAllModel();
					$scope.scheduleList = d;
					console.log($scope.scheduleList);
					if($scope.scheduleID == "" || $scope.scheduleID == "undefined" || $scope.scheduleID == undefined){
						$scope.getScheduleDetail($scope.scheduleList[0].id);
					}else{
						$scope.getScheduleDetail($scope.scheduleID);
					}
					for(var i in $scope.scheduleList){
						var monthList = $scope.scheduleList[i].data.months;
						$scope.scheduleList[i].monthList=$scope.monthList;
						monthModel();
						for(var j in monthList){
							$scope.monthList[monthList[j]-1].is = true;
							if($scope.scheduleList[i].data.applied == true){
								$scope.monthAllList[monthList[j]-1].is = true;
							}

						}
						$scope.scheduleList[i].monthList=$scope.monthList;
						console.log($scope.monthList);
					}
					console.log($scope.scheduleList);
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
	//스케줄 디테일 불러오기
	$scope.getScheduleDetail = function(id){
		$scope.scheduleSelected = id;
		apiService.get_ConfigESSSchedule(id)
		.then(
			function(d) {
				try{
					$scope.scheduleID=id;
					$scope.isModifyMode = false;
					$scope.schedule = d;
					monthModel();
					var timeList = $scope.schedule.data.times;
					for(var i in timeList){
						timeList[i].cmd = $scope.configCodeIntToBoolean(timeList[i].cmd);
						if(timeList[i].kw < 0){
							timeList[i].cmd="충전";
							timeList[i].kw = Math.abs(timeList[i].kw);
						}else{
							timeList[i].cmd="방전";
						}
					}
					console.log($scope.schedule);
				}catch(e){
					console.log(e.message);
				}

			},
			function(errResponse){
				console.log("errResponse gets_timeline status : "+errResponse.status);
			}
		);
	}
	//스케줄 활성화/비활성화
	$scope.runSchedule = function(val){
		apiService.put_ConfigESSScheduleRun(val)
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
	//스케줄 상세 적용/미적용
//	$scope.isApplied = function(val){
//		if(!$scope.schedule.data.running){
//			apiService.put_ConfigESSScheduleApply($scope.schedule.id,val)
//			.then(
//				function(d) {
//					alert("적용 성공");
//					getsSchedule();
//					console.log(d);
//				},
//				function(errResponse){
//					if(errResponse.status == 403){
//						alert("현재 충방전 상태와 이미 적용중인 스케줄을 확인해 주세요.");
//					}
//					getsSchedule();
//					console.log("errResponse gets_timeline status : "+errResponse.status);
//				}
//			);
//		}else{
//			alert("스케줄을 먼저 비활성화 시켜주세요.");
//			getsSchedule();
//		}
//
//	}
//	$scope.modifySchduleActive = function(id){
//		var isApply = $scope.schedule.data.applied ? "해제" : "적용";
//		if(confirm("정말 스케줄을 "+isApply+"하시겠습니까?")==true){
//			for(var i in $scope.schedule.data.times){
//				$scope.schedule.data.times[i].cmd = $scope.configCodeInt($scope.schedule.data.times[i].cmd);
//				$scope.schedule.data.times[i].kw = Number($scope.schedule.data.times[i].kw);
//			}
//			delete $scope.schedule.rdt;
//			$scope.schedule.data.applied = $scope.schedule.data.applied ? false : true;
//			apiService.put_ConfigESSSchedule($scope.schedule)
//			.then(
//				function(d) {
//					alert("수정 성공");
//					console.log(d);
//				},
//				function(errResponse){
//					console.log("errResponse gets_timeline status : "+errResponse.status);
//				}
//			);
//		}
//	}
	//스케줄 편집 버튼
	$scope.goScheduleEdit = function(id){
		$window.sessionStorage["scheduleid"] = id;
		$state.go('scheduleApply',{id:id});
	}
	//휴일 관리 버튼
	$scope.goHolidayEdit = function(id){
		$window.sessionStorage["scheduleid"] = id;
		$state.go('scheduleApply',{id:id});
	}
}]);