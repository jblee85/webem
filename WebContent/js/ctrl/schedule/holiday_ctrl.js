'use strict';
angular.module('iceApp').controller('holiday_ctrl',[ '$scope','$state','$rootScope', '$window','apiService','DTOptionsBuilder', 'DTColumnDefBuilder','$timeout','$uibModal',
	function($scope, $state, $rootScope,$window,apiService, DTOptionsBuilder, DTColumnDefBuilder,$timeout, $uibModal) {
	var holiday = this;

	//초기 로드
	$scope.init = function(){
		$scope.showtype = "year";
		$scope.year = new Date().getFullYear();
		$scope.month = new Date().getMonth() + 1;
		get_Holiday($scope.year);
	};

	function get_Holiday(year){
		//Holiday는 공통 공휴일, cHoliday는 커스텀공휴일
		try{
			$rootScope.spinStart();
			apiService.get_config(1)
			.then(
					function(holiday){
						$scope.holiday = holiday;
						$scope.holidayTmp = {};
						angular.copy($scope.cHoliday, $scope.holidayTmp);
						apiService.get_config(2)
						.then(
								function(cHoliday){
									$scope.cHoliday = cHoliday;
									$scope.customHolidayList = [];
									if(cHoliday == '' || (cHoliday.data.days.length == 0 && cHoliday.data.years.length == 0 && cHoliday.data.monthes.length == 0)){
//										$scope.cHolidayTmp = null;
										$scope.cHolidayTmp = {data:{}};
									} else {
										$scope.cHolidayTmp = {data:{}};
										angular.copy($scope.cHoliday, $scope.cHolidayTmp);
										makeCustomId($scope.cHolidayTmp); //id값 대입
										mergeCustomHoliday(); //커스텀 휴일 리스트로 통합
									}
									makeYearCalendar(year);
									$rootScope.spinStop();
								}, function(errResponse){
									$rootScope.spinStop();
									console.log(errResponse);
								}
						)
					}, function(errResponse){
						$rootScope.spinStop();
						console.log(errResponse);
					}
			)
		}catch(e){
			$rootScope.spinStop();
		}

	}

	//Custom 휴일 목록 통합
	function mergeCustomHoliday(){
		var dataList = Object.values($scope.cHolidayTmp.data);
		for(var i = 0; i< dataList.length; i++){
			for(var j = 0; j<dataList[i].length; j++){
				var strDate = dataList[i][j].day.toString();
				var date = new Date(strDate.substring(0,4), strDate.substring(4,6)-1, strDate.substring(6,8));
				var tmp = {};
				angular.copy(dataList[i][j], tmp);
				tmp.day = date;
				$scope.customHolidayList.push(tmp);
			}
		}
	}

	//Custom 휴일 id 만들기
	function makeCustomId(){
		for(var i = 0; i<$scope.cHolidayTmp.data.days.length; i++){
			$scope.cHolidayTmp.data.days[i].id = newID();
		}
		for(var i = 0; i<$scope.cHolidayTmp.data.monthes.length; i++){
			$scope.cHolidayTmp.data.monthes[i].id = newID();
		}
		for(var i = 0; i<$scope.cHolidayTmp.data.years.length; i++){
			$scope.cHolidayTmp.data.years[i].id = newID();
		}
	}

	// 년, 월 달력 표시
	$scope.changeShowType= function(showtype){
		$scope.showtype = showtype;
		if(showtype == 'year'){
			$scope.year = new Date().getFullYear();
			makeYearCalendar($scope.year);
		} else if(showtype == 'month'){
			$scope.month = new Date().getMonth() + 1;
			makeMonthCalendar($scope.year, $scope.month);
		}
	};

	// 좌,우 버튼 년도 변경
	$scope.yearChange = function(year,caltype){
		if(caltype == 'L'){
			$scope.year = Number(year) - 1;
		} else if(caltype == 'R'){
			$scope.year = Number(year) + 1;
		}
		get_Holiday($scope.year);
	}

	//년 달력 만들기
	var map = new Map();
	var monthList = ["jan","feb","mar","apr","may","june","july","aug","sep","oct","nov","dec"];
	function makeYearCalendar(year){
		var holiday = $scope.holiday;
		var cHoliday = $scope.cHolidayTmp;

		var cHolidayMonthTmp = []; //월 반복 위한 임시 리스트
		angular.copy(cHoliday.data.monthes, cHolidayMonthTmp);

		for(var i = 0; i < monthList.length; i++){
			var calendar = new dhtmlXCalendarObject(monthList[i]);
			calendar.loadUserLanguage('kr');
			calendar.setDate(new Date(year,i,1)); //매월 출력
			calendar.setSkin("dhx_terrace");
			calendar.setWeekStartDay(7); //일요일부터 시작
			calendar.hideTime();
			calendar.show();

			makeCommonHolidayDays(i, calendar, holiday); //공휴일 - 1.반복X //index, 달력Obj, 휴일 데이터
			if(cHoliday != null){
				makeCustomHolidayDays(i, calendar, cHoliday); //커스텀 - 1.반복X //index, 달력Obj, 휴일 데이터
				makeCustomHolidayMonthes(i, calendar, cHolidayMonthTmp); //커스텀 - 2.월반복 //index, 달력Obj, 임시 휴일 데이터
				makeCustomHolidayYears(i, calendar, cHoliday); //커스텀 - 3.년반복 //index, 달력Obj, 휴일 데이터
			}

			calendar.attachEvent("onClick", function(side,d){
				//두 클래스만 이벤트
				$scope.selectedDate = side;
				showModal(false,'add');
			});
		}
		//필요없는 요소 삭제 ( 월선택 왼쪽 화살표 / 오른쪽 화살표 / 년 표시 )
		angular.element(document.getElementsByClassName("dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_left")).remove();
		angular.element(document.getElementsByClassName("dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_right")).remove();
		angular.element(document.getElementsByClassName("dhtmlxcalendar_month_label_year")).remove();
	};

	//공휴일 - 1.반복X
	function makeCommonHolidayDays(i, calendar, holiday){
		for(var j = 0; j < holiday.data.days.length; j++){
			var strDate = makeNumDateToStrDate(holiday.data.days[j].day);
			var numYear = makeYearToNumYear(strDate);
			var numMonth = makeMonthToNumMonth(strDate) -1; //numMonth 2 -> 실제 3월
			var numDay = makeDayToNumDay(strDate);
			if(numYear == $scope.year){
				if(i == numMonth){
					calendar.setHolidays(new Date($scope.year,numMonth,numDay));
					calendar.setTooltip(new Date($scope.year,numMonth,numDay), holiday.data.days[j].name, true, false);
				}
			}
		}
	}

	//커스텀 - 1.반복X
	function makeCustomHolidayDays(i, calendar, choliday){
		if(choliday.data.days != undefined){
			for(var j = 0; j < choliday.data.days.length; j++){
				var strDate = makeNumDateToStrDate(choliday.data.days[j].day);
				var numYear = makeYearToNumYear(strDate);
				var numMonth = makeMonthToNumMonth(strDate) -1; //numMonth 2 -> 실제 3월
				var numDay = makeDayToNumDay(strDate);
				if(i == numMonth){
					calendar.setHolidays(new Date(numYear,numMonth,numDay));
					calendar.setTooltip(new Date(numYear,numMonth,numDay), choliday.data.days[j].name, true, false);
				}
			}
		}

	};

	//커스텀 - 2.월반복
	function makeCustomHolidayMonthes(i, calendar, cHolidayMonthTmp){
		var thisYear = new Date().getFullYear();
		if(thisYear == $scope.year){
			for(var j = 0; j < cHolidayMonthTmp.length; j++){
				var strDate = makeNumDateToStrDate(cHolidayMonthTmp[j].day);
//				var numYear = makeYearToNumYear(strDate);
				var numMonth = makeMonthToNumMonth(strDate) -1; //numMonth 2 -> 실제 3월
				var numDay = makeDayToNumDay(strDate);
				if(i == numMonth){
					if(numDay == 29 || numDay == 30){
						if( i != 1){ //2월 제외한 모든 달에 휴일 적용
							calendar.setHolidays(new Date($scope.year,i,numDay));
							calendar.setTooltip(new Date($scope.year,i,numDay), cHolidayMonthTmp[j].name, true, false);
						}
					} else if(numDay == 31){ //31일이 없는 달의 경우 휴일 생성 X
						if(i == 0 || i == 2 || i == 4 || i == 6 || i == 7 || i == 9 || i == 11){
							calendar.setHolidays(new Date($scope.year,i,numDay));
							calendar.setTooltip(new Date($scope.year,i,numDay), cHolidayMonthTmp[j].name, true, false);
						}
					} else {
						calendar.setHolidays(new Date($scope.year,i,numDay));
						calendar.setTooltip(new Date($scope.year,i,numDay), cHolidayMonthTmp[j].name, true, false);
					}
					//월 반복인 경우 다음달 {day: 20180202 , id: } obj 추가
					var tmpObj = {};
					angular.copy(cHolidayMonthTmp[j], tmpObj);
					cHolidayMonthTmp.push(tmpObj);
					tmpObj.day += 100;
				}
			}
//			console.log(cHolidayMonthTmp);
		} else {
			for(var j = 0; j < cHolidayMonthTmp.length; j++){
				var strDate = makeNumDateToStrDate(cHolidayMonthTmp[j].day);
				var numDay = makeDayToNumDay(strDate);
				if(numDay == 29 || numDay == 30){
					if( i != 1){ //2월 제외한 모든 달에 휴일 적용
						calendar.setHolidays(new Date($scope.year,i,numDay));
						calendar.setTooltip(new Date($scope.year,i,numDay), cHolidayMonthTmp[j].name, true, false);
					}
				} else if(numDay == 31){ //31일이 없는 달의 경우 휴일 생성 X
					if(i == 0 || i == 2 || i == 4 || i == 6 || i == 7 || i == 9 || i == 11){
						calendar.setHolidays(new Date($scope.year,i,numDay));
						calendar.setTooltip(new Date($scope.year,i,numDay), cHolidayMonthTmp[j].name, true, false);
					}
				} else {
					calendar.setHolidays(new Date($scope.year,i,numDay));
					calendar.setTooltip(new Date($scope.year,i,numDay), cHolidayMonthTmp[j].name, true, false);
				}
			}
		}
	}

	//커스텀 - 3.년반복
	function makeCustomHolidayYears(i, calendar, choliday){
		if(choliday.data.years != undefined){
			for(var j = 0; j < choliday.data.years.length; j++){
				var strDate = makeNumDateToStrDate(choliday.data.years[j].day);
				var numYear = makeYearToNumYear(strDate);
				var numMonth = makeMonthToNumMonth(strDate) -1; //numMonth 2 -> 실제 3월
				var numDay = makeDayToNumDay(strDate);
				if(i == numMonth){
					calendar.setHolidays(new Date($scope.year,numMonth,numDay));
					calendar.setTooltip(new Date($scope.year,numMonth,numDay), choliday.data.years[j].name, true, false);
				}
			}
		}

	}

	// 좌,우 버튼 월 변경
	$scope.monthChange = function(year, month, caltype){
		if(caltype == 'L'){
			$scope.month = Number(month) - 1;
		} else if(caltype == 'R'){
			$scope.month = Number(month) + 1;
		}
		makeMonthCalendar($scope.year, $scope.month);
	}

	$scope.openModal = function(){
		showModal(true, 'new');
	}

	//월 달력 만들기
	function makeMonthCalendar(year, month){
		var scheduler = new dhtmlXCalendarObject("month");
		scheduler.loadUserLanguage('kr');
		scheduler.setDate(new Date(year,month-1,new Date().getDate())); //매월 출력
		scheduler.setSkin("dhx_terrace");
		scheduler.setWeekStartDay(7);
		scheduler.hideTime();
		scheduler.show();
		angular.element(document.getElementsByClassName("dhtmlxcalendar_month_cont")).remove(); //월 달력 년,월 표시 클래스 삭제
		angular.element(document.getElementsByClassName("dhtmlxcalendar_days_cont")).css("border-top",'1px solid #cccccc'); //요일 css 선 추가
		//클래스명 변경
		//css 클래스명 추가하여 추가로 css 설정하게 끔 하였음
		scheduler.attachEvent("onClick", function(side,d){
			showModal(false, 'add');
		});
	}

	$scope.repeatLists = [
		{type:0,name:"안함"}
//		,{type:1,name:"매주"}
		,{type:2,name:"매월"}
		,{type:3,name:"매년"}
	];

	function makeNumDateToStrDate(intDate){
		return intDate.toString();
	}

	function makeYearToNumYear(strDate){
		return Number(strDate.substring(0,4));
	}

	function makeMonthToNumMonth(strDate){
		return Number(strDate.substring(4,6));
	}

	function makeDayToNumDay(strDate){
		return Number(strDate.substring(6,8));
	}

///////////////////////////////////////////////////////////////////// Modal Function /////////////////////////////////////////////////////////////////////
	function showModal(isNew, type){
		$scope.repeatType = $scope.repeatLists[0].type;
		$scope.modalInstance = $uibModal.open({
			templateUrl : 'jsp/schedule/setHoliday.jsp',
			scope:$scope
		});

		$scope.modalInstance.result.then(
			function (result) {
//				alert(result);
			}, function(result){
				$scope.modalInstance.close(); //달력 사라짐
			}
		);

		if(isNew == false){
			if(type == 'modify'){
				$scope.holidayType = 'modify';
				$scope.calendarDt = getYYYYMMDD($scope.modifyModel.day);
				$scope.hname = $scope.modifyModel.name;
				$scope.repeatType = $scope.modifyModel.repeattype;
				$scope.holidayId = $scope.modifyModel.id;
			} else if(type == 'add'){
				$scope.holidayType = 'post';
				$scope.hname = '';
				$scope.repeatType = 0;
				$scope.calendarDt = getYYYYMMDD($scope.selectedDate);
			}
		} else { //'new'
			$scope.holidayType = 'post';
			$scope.calendarDt = "";
			$scope.selectedDate = new Date();
		}
	}

	$scope.cancel = function(){
		$scope.modalInstance.close();
	}

	$scope.add = function(hname, calendarDt, repeatType, id){
		var cHoliday = $scope.cHolidayTmp;

		var year = calendarDt.getFullYear().toString();
		var month = Number(calendarDt.getMonth()+1).toString();
		var day = calendarDt.getDate(); //timeZOne 때문에 day 따로 받아서
		if(day < 10? day="0"+day : day);
		if(month < 10? month="0"+month : month);
		var calDt = year+month+day;

		var obj = {};
		obj.day = Number(calDt); //날짜 변환
		obj.name = hname;
		obj.repeattype = repeatType;

		//{type:0,name:"안함"},{type:1,name:"매주"},{type:2,name:"매월"},{type:3,name:"매년"}
		if($scope.cHoliday == ''){ //최초 DB에 등록되지 않은 경우
			var hModel = {};
			hModel.data = {};
			if(repeatType == 0){
				hModel.data.days = [];
				hModel.data.days.push(obj);
			} else if(repeatType == 2){
				hModel.data.monthes = [];
				hModel.data.monthes.push(obj);
			} else if(repeatType == 3){
				hModel.data.years = [];
				hModel.data.years.push(obj);
			}
			apiService.post_holiday(2, hModel)
			.then(
					function(result){
						alert("휴일이 등록되었습니다");
						$scope.modalInstance.close();
						get_Holiday($scope.year);
					}, function(errResponse){
						console.log(errResponse);
					}
			)
		} else {
			//수정과 추가 등록의 차이
			if($scope.holidayType == 'post' || $scope.holidayType == 'add'){
				if(repeatType == 0){ //따로 TMP에서 처리 X
					$scope.cHoliday.data.days.push(obj);
				} else if(repeatType == 2){
					$scope.cHoliday.data.monthes.push(obj);
				} else if(repeatType == 3){
					$scope.cHoliday.data.years.push(obj);
				}
			} else{
				var tmpObj = {};
				//1. 같은 아이디로 찾은 후 -> 따로 tmpObj에 담는다. 기존 List에서 제거
				for(var i = 0; i<cHoliday.data.days.length; i++){
					if(cHoliday.data.days[i].id == id){
						tmpObj = cHoliday.data.days[i];
						cHoliday.data.days.splice(i,1);
					} else {
						delete cHoliday.data.days[i].id;
					}
				}
				for(var i = 0; i<cHoliday.data.years.length; i++){
					if(cHoliday.data.years[i].id == id){
						tmpObj = cHoliday.data.years[i];
						cHoliday.data.years.splice(i,1);
					} else {
						delete cHoliday.data.years[i].id;
					}
				}
				for(var i = 0; i<cHoliday.data.monthes.length; i++){
					if(cHoliday.data.monthes[i].id == id){
						tmpObj = cHoliday.data.monthes[i];
						cHoliday.data.monthes.splice(i,1);
					} else {
						delete cHoliday.data.monthes[i].id;
					}
				}
				//2. 따로 담아놓은 tmpObj를 반복 여부에 따라 구분해서 담음
				if($scope.holidayType == 'modify'){
					if(repeatType == 0){
						cHoliday.data.days.push(obj);
					} else if(repeatType == 2){
						cHoliday.data.monthes.push(obj);
					} else if(repeatType == 3){
						cHoliday.data.years.push(obj);
					}
				}
				$scope.cHoliday = cHoliday; //Tmp에서 정리된 데이터를 실제 cHoliday에 대입
			}
			$scope.cHoliday.rdt = convertDateStringsToDates($scope.cHoliday.rdt);

			console.log($scope.cHoliday);
//			return false;
			//3. 바꾼 후 put 요청
			apiService.put_holiday(JSON.parse(angular.toJson($scope.cHoliday)))
			.then(
					function(result){
						if($scope.holidayType == 'delete'){
							alert("휴일이 삭제되었습니다");
							get_Holiday($scope.year);
						} else if($scope.holidayType == 'modify'){
							alert("휴일이 수정되었습니다");
							$scope.modalInstance.close();
							get_Holiday($scope.year);
						} else if($scope.holidayType == 'add' || $scope.holidayType == 'post'){
							alert("휴일이 등록되었습니다");
							$scope.modalInstance.close();
							get_Holiday($scope.year);
						}
					}, function(errResponse){
						console.log(errResponse);
					}
			)
		}
	}

	$scope.modalCalendar = function(selectedDate, holidayType){
		$scope.modalCal = new dhtmlXCalendarObject("datepicker");
		$scope.modalCal.loadUserLanguage('kr');

		if(selectedDate == undefined){
			var selectedDate = $scope.modifyModel.day;
			$scope.modalCal.setDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate())); //날짜 설정
		} else {
			$scope.modalCal.setDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate())); //날짜 설정
		}
		$scope.modalCal.setSkin("dhx_terrace");
		$scope.modalCal.setWeekStartDay(7);
		$scope.modalCal.hideTime();
		$scope.modalCal.show();
		angular.element(document.getElementsByClassName("dhtmlxcalendar_dhx_terrace dhtmlxcalendar_in_input")).css('z-index','1800');
		$scope.modalCal.attachEvent("onClick", function(side,d){
			$scope.selectedDate = side;
			$scope.calendarDt = getYYYYMMDD(side);
			angular.element(document.getElementById('datepicker'))[0].value = $scope.calendarDt; //날짜 값 대입
		});
	}

	$scope.modifyHoliday = function(type,day,name,id){
		$scope.selectedDate = day;
		$scope.modifyModel = {"repeattype":type, "day":day, "name":name,"id":id};
		showModal(false,'modify');
	}

	$scope.deleteHoliday = function(type,day,name,id){
		$scope.holidayType = 'delete';
		$scope.selectedDate = day;
//		$scope.modifyModel = {"repeattype":type, "day":day, "name":name,"id":id};
		if(confirm(name+"을 삭제하시겠습니까?")){
			$scope.add(name, day, type, id);
		}
//		showModal(false,'delete');
	}
///////////////////////////////////////////////////////////////////// Modal Function /////////////////////////////////////////////////////////////////////
	function getYYYYMMDD(date){
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		return year+"년 "+month+"월 "+day+"일";
	}

}]);

