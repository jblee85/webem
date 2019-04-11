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
		apiService.get_customHoliday(1)
		.then(
				function(holiday){
					$scope.holiday = holiday;
					$scope.holidayTmp = {};
					angular.copy($scope.cHoliday, $scope.holidayTmp);
					apiService.get_customHoliday(2)
					.then(
							function(cHoliday){
								$scope.cHoliday = cHoliday;
								$scope.customHolidayList = [];
								if(cHoliday == '' || (cHoliday.data.days.length == 0 && cHoliday.data.years.length == 0 && cHoliday.data.monthes.length == 0)){
									$scope.cHolidayTmp = null;
								} else {
									$scope.cHolidayTmp = {};
									angular.copy($scope.cHoliday, $scope.cHolidayTmp);
									//일,월,년 반복 데이터별 id값 대입
									for(var i = 0; i<$scope.cHolidayTmp.data.days.length; i++){
										$scope.cHolidayTmp.data.days[i].id = newID();
									}
									for(var i = 0; i<$scope.cHolidayTmp.data.monthes.length; i++){
										$scope.cHolidayTmp.data.monthes[i].id = newID();
									}
									for(var i = 0; i<$scope.cHolidayTmp.data.years.length; i++){
										$scope.cHolidayTmp.data.years[i].id = newID();
									}
									//커스텀 휴일 리스트로 통합
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
								makeYearCalendar(year);
							}, function(errResponse){
								console.log(errResponse);
							}
					)
				}, function(errResponse){
					console.log(errResponse);
				}
		)
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

		var commonDaysMap = new Map();
		var commonYearsMap = new Map();
		var commonMonthsMap = new Map();
		var customDaysMap = new Map();
		var customYearsMap = new Map();
		var customMonthsMap = new Map();

		for(var i = 0; i < monthList.length; i++){
			map.set(monthList[i],new dhtmlXCalendarObject(monthList[i])); //1월~12월 달력 만들기
			//1.commonHolidayMap
			var commonDaysList = [];
			var commonYearsList = [];
			var commonMonthsList = [];
			//1-1. 반복 X
			for(var j = 0; j < holiday.data.days.length; j++){ // 월 별로 휴일 정리
				var strDate = holiday.data.days[j].day.toString();
				var numMonth = Number(strDate.substring(4,6)) -1;
				if(i == numMonth){
					commonDaysList.push(holiday.data.days[j]);
				}
			}
			commonDaysMap.set(monthList[i],commonDaysList); //map에 월별 휴일 담기
			if(cHoliday != null){
				//2. customHolidayMap
				var customDaysList = [];
				var customYearsList = [];
				var customMonthsList = [];
				//2-1. 반복X
				for(var j = 0; j < cHoliday.data.days.length; j++){
					var strDate = cHoliday.data.days[j].day.toString();
					var numMonth = Number(strDate.substring(4,6)) -1;
					if(i == numMonth){
						customDaysList.push(cHoliday.data.days[j]);
					}
				}
				customDaysMap.set(monthList[i],customDaysList);
				//2-2. 매년
				for(var j = 0; j < cHoliday.data.years.length; j++){
					var strDate = cHoliday.data.years[j].day.toString();
					var numMonth = Number(strDate.substring(4,6)) -1;
					if(i == numMonth){
						customYearsList.push(cHoliday.data.years[j]);
					}
				}
				customYearsMap.set(monthList[i],customYearsList);
				//2-3. 매월
				for(var j = 0; j < cHoliday.data.monthes.length; j++){
					var strDate = cHoliday.data.monthes[j].day.toString();
					var numMonth = Number(strDate.substring(4,6)) -1;
					if(i == numMonth){
						customMonthsList.push(cHoliday.data.monthes[j]);
					}
				}
				customMonthsMap.set(monthList[i],customMonthsList);

//				for(var j = 0; j < cHoliday.data.monthes.length; j++){
//					var strDate = cHoliday.data.monthes[j].day.toString();
//					var numMonth = Number(strDate.substring(4,6)) -1;
//					if(i == numMonth){
//						customMonthsList.push(cHoliday.data.monthes[j]);
//					}
//				}
//				customMonthsMap.set(monthList[i],customMonthsList);
			}
		};

		//3. 달력에 일치하는 월별로 setHolidays 설정
		for(var i = 0; i < monthList.length; i++){
			var scheduleObj = map.get(monthList[i]);
			scheduleObj.loadUserLanguage('kr');
			scheduleObj.setDate(new Date(year,i,1)); //매월 출력
			scheduleObj.setSkin("dhx_terrace");
			scheduleObj.setWeekStartDay(7); //일요일부터 시작
			scheduleObj.hideTime();
			scheduleObj.show();
			//공휴일 휴일 설정
			var commonDayValue = commonDaysMap.get(monthList[i]);
			for(var j = 0; j < commonDayValue.length; j++){
				var date = commonDayValue[j].day.toString();
				var numYear = Number(date.substring(0,4));
				var numMonth = Number(date.substring(4,6))-1;
				if(numMonth == 0 ? 12: numMonth);
				var numDay = Number(date.substring(6,8));
				scheduleObj.setHolidays(new Date(numYear,numMonth,numDay));
				scheduleObj.setTooltip(new Date(numYear,numMonth,numDay), commonDayValue[j].name, true, false);
			}
			//custom 공휴일 설정
			if(cHoliday != null){
				var customDaysValue = customDaysMap.get(monthList[i]);
				//1.1 반복X
				for(var j = 0; j < customDaysValue.length; j++){
					var day = customDaysValue[j].day.toString();
					var numYear = Number(day.substring(0,4));
					var numMonth = Number(day.substring(4,6))-1;
					if(numMonth == 0 ? 12: numMonth);
					var numDay = Number(day.substring(6,8));
					scheduleObj.setHolidays(new Date(numYear,numMonth,numDay));
					scheduleObj.setTooltip(new Date(numYear,numMonth,numDay), customDaysValue[j].name, true, false);
				}
				//1.2 매년 반복
				var customYearsValue = customYearsMap.get(monthList[i]);
				for(var j = 0; j < customYearsValue.length; j++){
					var day = customYearsValue[j].day.toString();
					var numYear = Number(day.substring(0,4));
					var numMonth = Number(day.substring(4,6))-1;
					if(numMonth == 0 ? 12: numMonth);
					var numDay = Number(day.substring(6,8));
//					scheduleObj.setHolidays(new Date(numYear,numMonth,numDay));
//					scheduleObj.setTooltip(new Date(numYear,numMonth,numDay), customYearsValue[j].name, true, false);
					scheduleObj.setHolidays(new Date($scope.year,numMonth,numDay)); //년 증가
					scheduleObj.setTooltip(new Date($scope.year,numMonth,numDay), customYearsValue[j].name, true, false);
				}
				//1.3 매월 반복
				var customMonthsValue = customMonthsMap.get(monthList[i]);
//				console.log(customMonthsValue);
				for(var j = 0; j < customMonthsValue.length; j++){
					var day = customMonthsValue[j].day.toString();
					var numYear = Number(day.substring(0,4));
					var numMonth = Number(day.substring(4,6))-1;
//					if(numMonth == 0 ? numMonth = 12: numMonth);
					var numDay = Number(day.substring(6,8));

					scheduleObj.setHolidays(new Date(numYear,numMonth,numDay));
					scheduleObj.setTooltip(new Date(numYear,numMonth,numDay), customMonthsValue[j].name, true, false);
				}
			}

			scheduleObj.attachEvent("onClick", function(side,d){
				//두 클래스만 이벤트
				$scope.selectedDate = side;
				showModal(false,'add');
			});
		};
		//필요없는 요소 삭제 ( 월선택 왼쪽 화살표 / 오른쪽 화살표 / 년 표시 )
		angular.element(document.getElementsByClassName("dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_left")).remove();
		angular.element(document.getElementsByClassName("dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_right")).remove();
		angular.element(document.getElementsByClassName("dhtmlxcalendar_month_label_year")).remove();
	};

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

	// 달력 표시 한글 설정
	dhtmlXCalendarObject.prototype.langData["kr"] = {
		dateformat: '%d.%m.%Y',
		monthesFNames: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
		monthesSNames: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
		daysFNames: ["일","월","화","수","목","금","토"],
		daysSNames: ["일","월","화","수","목","금","토"],
		weekstart: 1,
		weekname: "주"
	};

	$scope.repeatLists = [
		{type:0,name:"안함"}
//		,{type:1,name:"매주"}
		,{type:2,name:"매월"}
		,{type:3,name:"매년"}
	];

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

		var day = calendarDt.getDate(); //timeZOne 때문에 day 따로 받아서
		var fullCalDt = calendarDt.toISOString().split('T')[0].split('-');
		var calDt = fullCalDt[0]+fullCalDt[1]+day;
		//매월 마지막일 구해서 넣어야함...   fullCalDt[2]의 마지막일.. 계산

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

