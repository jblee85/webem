'use strict';
angular.module('iceApp').controller('leftbar_ctrl',[ '$scope', '$state' ,'apiService', '$window', '$location','$rootScope','AUTH_EVENTS','DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $state, apiService,$window, $location, $rootScope,AUTH_EVENTS,DTOptionsBuilder, DTColumnDefBuilder) {
	console.log("leftbar_ctrl");
	var self = this;
	$scope.dtColumns = [
        DTColumnDefBuilder.newColumnDef(0).notSortable()
     ];
	$scope.dtOptions = DTOptionsBuilder.newOptions()
	.withPaginationType('full_numbers')
	.withOption('order', [0, 'asc'])
	.withOption('bLengthChange',false)
	.withOption('searching', false)
	.withOption('paging', false)
	.withOption('info', false)
	.withLanguage(language);

	$scope.leftTitle="";
	//보여주기
	$scope.showSchedule = false;
	$scope.showPCSSelect = false;

//	$scope.menuToggle = function($event){
//		$event.preventDefault();
//		$($event.currentTarget.parentElement).toggleClass("menu-open");
//		$($event.currentTarget.nextElementSibling).slideToggle('slow');
//	}
	/*--------------------- PCS Stats*/
	$scope.selectPCSOption = [{rid:null,name:'전체'}];
	$scope.optPCSSelected=null;
	$scope.essScheduleList = {};
	$scope.notActiveSchedule = false;
	var date = new Date();
	var month = (date.getMonth()+1).toString();
	var hh = date.getHours();
	var mm = date.getMinutes();
	var nowTime = Number(hh.toString()+mm.toString());

	function setMin(val){
		var dt1 = new Date();
		dt1.setMinutes(dt1.getMinutes()+val)
		var setHour = dt1.getHours().toString();
		var setMin = dt1.getMinutes().toString();
		if(0 < dt1.getMinutes() && dt1.getMinutes() < 10){
			setMin="0"+dt1.getMinutes().toString();
		}else if(dt1.getMinutes() == 0){
			setMin ="00";
		}
		var setTime = Number(setHour+setMin);
		return setTime;
	}
	$scope.menuShow = function(menu){
		console.log(menu);
	}

	//스케줄 클래스 변경
	$scope.scheduleClass = function(shour,smin){
		var className="";
		var dbTime = Number(shour.toString()+smin.toString());
//		var dt = new Date();
//		dt.setMinutes(dt.getMinutes()-15)
//		var beforeTime = Number(dt.getHours().toString()+dt.getMinutes().toString());
		if(nowTime > dbTime && dbTime >= setMin(-15)){
			className = "now blink";
		}else if((setMin(-30) <= dbTime && dbTime < setMin(-15)) || (setMin(30) > dbTime && dbTime >= setMin(15))){
			className = "before";
		}
		console.log(className);
		return className;
	}
	$scope.scheduleClass(15,45);
	//스케줄 가져오기
	function getSchedule(){
		apiService.get_ConfigESSSchedule_enable(month)
		.then(
			function(d) {
				try{
					if(d==""){
						$scope.notActiveSchedule = true;
						console.log($scope.notActiveSchedule);
					}else{
						$scope.notActiveSchedule = false;
						$scope.essScheduleList = d;
						var timeList = $scope.essScheduleList.data.times;
						for(var i in timeList){
							timeList[i].cmd = $scope.configCodeString(timeList[i].cmd);
						}
						console.log($scope.essScheduleList);
					}

				}catch(error){
					console.log(error.message);
				}

			},
			function(errResponse){
				console.log("errResponse get_schedule status : "+errResponse.status);
			}
		);
	}
}]);