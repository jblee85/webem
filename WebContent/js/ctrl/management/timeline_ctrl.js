'use strict';
angular.module('iceApp').controller('timeline_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','apiService','DEFINED','Session','$cacheFactory','$timeout','DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,apiService,DEFINED,Session,$cacheFactory,$timeout,DTOptionsBuilder, DTColumnDefBuilder) {

	$scope.dtColumns = [
        DTColumnDefBuilder.newColumnDef(0).notSortable()
     ];
	$scope.dtOptions = DTOptionsBuilder.newOptions()
	.withOption('searching', true) //검색 기능
	.withOption('paging', true)
	.withOption('lengthChange', false) //검색 출력수
	.withOption('info', false)
	.withOption('order',[0,'desc'])
	.withOption('pageLength', 15)

	$("#timeLineSearchbox").keyup(function() {
		$('#timeLineTable').dataTable().fnFilter(this.value);
    });

	$scope.filter = {};
	$scope.filter.dateType = "year";
	$scope.filter.actionType = "";
	$scope.filter.authType = "";

	var startDate = addDay_yyyyMMddhhmmss(-7);
	$("#searchBarStart").val(startDate.substring(0,4)+"-"+startDate.substring(4,6)+"-"+startDate.substring(6,8));
	$scope.startVal = startDate.substring(0,8);
	var scheduleObj = new dhtmlXCalendarObject("searchBarStart");
	scheduleObj.loadUserLanguage('kr');
	scheduleObj.setSkin("dhx_terrace");
	scheduleObj.setWeekStartDay(7); //일요일부터 시작
	scheduleObj.hideTime();
	$("#searchBarStart").click(function(){
		scheduleObj.show();
		scheduleObj.attachEvent("onClick", function(side,d){
			$scope.startVal = side.toISOString().slice(0,10).replace(/-/g,"");
			scheduleObj.setDateFormat("%Y-%m-%d");
			scheduleObj.hide();
		});
	});

	var endDate = get_yyyyMMddhhmmssSSS();
	$("#searchBarEnd").val(endDate.substring(0,4)+"-"+endDate.substring(4,6)+"-"+endDate.substring(6,8));
	$scope.endVal = endDate.substring(0,8);

	var scheduleObjENd = new dhtmlXCalendarObject("searchBarEnd");
	scheduleObjENd.setDate(new Date(endDate.substring(0,4),Number(endDate.substring(4,6))-1,1));
	scheduleObjENd.loadUserLanguage('kr');
	scheduleObjENd.setSkin("dhx_terrace");
	scheduleObjENd.setWeekStartDay(7); //일요일부터 시작
	scheduleObjENd.hideTime();

	$("#searchBarEnd").click(function(){
		scheduleObjENd.show();
		scheduleObjENd.attachEvent("onClick", function(side,d){
			$scope.endVal = side.toISOString().slice(0,10).replace(/-/g,"");
			scheduleObjENd.setDateFormat("%Y-%m-%d");
			scheduleObjENd.hide();
		});
	});
	$scope.year = $("#searchBarEnd").val().substring(0,4);
	getTimelineStat();
	//통계내역 가져오기
	function getTimelineStat(){
		apiService.gets_TimelineStat()
		.then(
				function(data){

					var yearMap = new Map();
					var dataList = [];
					while(dataList.length < 12){
						dataList.push({});
					}
					for(var i = 0; i< data.length; i++){
						if(data[i].month.toString().substring(0,4) == $scope.year){
							var month = Number(data[i].month.toString().substring(4,6)) -1;
							for(var j = 0; j < dataList.length; j++){
								if(month == j){
									dataList[j] = data[i];
								}
							}
						}
					}
					yearMap.set($scope.year,dataList);
					$scope.timelineStat = yearMap.get($scope.year);
				},
				function(errResponse){

				}
		)
	}

	//운전 제어 이력 가져오기
	$scope.startday = $scope.yyyymmdd();
	$scope.endday = $scope.yyyymmdd();
	function getControlHistory(){
		$rootScope.loadingStart();
		var startday = 0;
		var endday = 0;
//		if($scope.filter.dateType == "year"){
//			startday = new Date($scope.filter.dateVal).getFullYear().toString() + "0101";
//			endday = new Date($scope.filter.dateVal).getFullYear().toString() + "12" + new Date(new Date($scope.filter.dateVal).getFullYear(),12,0).getDate().toString();
//		}else if($scope.filter.dateType == "month"){
//			startday = new Date($scope.filter.dateVal).getFullYear().toString() + (new Date($scope.filter.dateVal).getMonth()+1).toString() + "01";
//			endday = new Date($scope.filter.dateVal).getFullYear().toString() + (new Date($scope.filter.dateVal).getMonth()+1).toString() + new Date(new Date($scope.filter.dateVal).getFullYear(),(new Date($scope.filter.dateVal).getMonth()+1),0).getDate();
//		}
		startday = $("#searchBarStart").val().replace(/-/gi,'');
		endday = $("#searchBarEnd").val().replace(/-/gi,'');
		apiService.gets_Timeline(startday, endday, $scope.filter.authType, $scope.filter.actionType)
		.then(
			function(d) {
				$scope.essHistoryList = [];
				$scope.essHistoryList = d;
				$scope.timelineTmp = [];

				for(var i in d){
					$scope.essHistoryList[i].data = JSON.parse(d[i].data);
				}
				angular.copy($scope.essHistoryList, $scope.timelineTmp);

				if($scope.essHistoryList.length != 0) {
					$scope.selectHistory(0);
				}
				$rootScope.loadingStop();
			},
			function(errResponse){
				$rootScope.loadingStop();
				console.log("errResponse gets_timeline status : "+errResponse.status);
			}
		);
	}
	getControlHistory();
	$scope.selectedHidstory = {};
	$scope.selectHistory = function(index){
		$scope.selectedHistory = $scope.timelineTmp[index];
	}

	$scope.search = function(filter){
		$scope.year = $("#searchBarEnd").val().substring(0,4);
		getControlHistory();
		getTimelineStat();
	}



//	var scheduleObj = new dhtmlXCalendarObject('yearSearchBar');
//	scheduleObj.loadUserLanguage('kr');
//	scheduleObj.setSkin("dhx_terrace");
//	scheduleObj.setWeekStartDay(7); //일요일부터 시작
//	scheduleObj.hideTime();
//
//	$("#yearSearchBar").click(function(){
//		scheduleObj.show();
//		scheduleObj.attachEvent("onClick", function(side,d){
//			if($scope.filter.dateType == 'year'){
//				scheduleObj.setDateFormat("%Y");
//			} else {
//				scheduleObj.setDateFormat("%Y-%m");
//			}
//			$scope.filter.dateVal = side;
//			scheduleObj.hide();
//		});
//	});
//
//	$scope.changeDateType = function(dateType){
//		var year = new Date().getFullYear();
//		var month = new Date().getUTCMonth()+1;
//		if(month < 10 ? month = '0'+month : month);
//
//		if(dateType == 'year'){
//			$("#yearSearchBar").val(year);
//		} else {
//			$("#yearSearchBar").val(year+"-"+month);
//		}
//	};

//	makeStartCalendar('searchBarStart');
//	makeEndCalendar('searchBarEnd');
	//운전 제어 이력 가져오기
//	function getControlHistory(){
//		apiService.gets_Timeline_day($scope.sday,$scope.eday,$scope.taction,$scope.authlv)
//		.then(
//			function(d) {
//				$scope.essHistoryList = [];
//				$scope.essHistoryList = d;
//
//				for(var i in d){
//					$scope.essHistoryList[i].data = JSON.parse(d[i].data);
//				}
//				console.log($scope.essHistoryList);
//			},
//			function(errResponse){
//				console.log("errResponse gets_timeline status : "+errResponse.status);
//			}
//		);
//	}
//	getControlHistory();
}]);
