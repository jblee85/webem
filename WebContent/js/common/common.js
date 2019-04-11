'use strict';

$.datepicker.setDefaults({
	showOn: "both",
	autoSize: true,
	showAnim: 'drop',
    buttonImageOnly: true,
    showMonthAfterYear: true,
    buttonText: "날짜 선택",
    nextText: '다음달',
    prevText: '이전달',
   // dateFormat: 'yy/mm/dd',
    dayNamesMin: ['월','화','수','목','금','토','일'],
    dayName: ['월요일','화요일','수요일','목요일','금요일','토요일','일요일'],
    monthNames: ['1','2','3','4','5','6','7','8','9','10','11','12'],
    monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
//    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
//    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    changeMonth: true,
    changeYear: true
//    yearSuffix: '년'
});

var newID = function () {
	  return Math.random().toString(36).substr(2, 16);
	}
//date type 변경 api로 자바에 param넘길때 "yyyy-MM-dd'T'HH:mm:ss.SSSZ"로 변경.(ex. rdt,udt,..)
function convertDateStringsToDates(date) {
	if(date == null || date == ""){
		return null;
	}
    var tempDate = new Date(date);
	return tempDate.toISOString();
}

var postVal;
function openPostcode(callback){
	daum.postcode.load(function(){
		new daum.Postcode({
			oncomplete: function(data) {
				postVal = data;
				callback();
			}
		}).open();
	});
}
function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x7|0x8)).toString(16);
	});
	return uuid;
}
/**
 * 기간 검색 달력 설정
 * @param startDt  시작일 input id
 * @param endDt  종료일 input id
 */
function cfn_settingCalendar(startDtId, endDtId){
	$("#"+startDtId).datepicker();
	$("#"+endDtId).datepicker();
}
/**
 * 한글 월 선택 달력
 * @param startDtId
 */
function cfn_han_settingCalendar(startDtId){
	$("#"+startDtId).Zebra_DatePicker({
		format: 'Y-m',
		months : ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
	});
}
/**
 * 기간검색 자동입력
 * @param minusMonth
 * @param startDtId
 * @param endDtId
 */
function cfn_searchMinusMonth(minusMonth, startDtId, endDtId){
	var startDt, yyyy, mm, dd;
	startDt = new Date();
	startDt.setMonth(startDt.getMonth() - minusMonth);
	yyyy = startDt.getFullYear();		mm = (startDt.getMonth()+ 1);		dd = '01';
	$("#"+startDtId).val(yyyy+"-"+(mm < 10 ? "0" + mm : mm )+"-"+dd);
	var nowDt = new Date();
	var endDt = new Date(nowDt.getFullYear(), (nowDt.getMonth()+ 1), 0);
	yyyy = endDt.getFullYear();		mm = (endDt.getMonth()+ 1);		dd = endDt.getDate();
	$("#"+endDtId).val(yyyy+"-"+(mm < 10 ? "0" + mm : mm )+"-"+dd);
}
/**
 * 3자리 콤마
 * @param obj
 */
function cfn_toNumberFormat(num){
	num = num.toString();
	var pattern = /(-?[0-9]+)([0-9]{3})/;
	while(pattern.test(num)) {
		num = num.replace(pattern,"$1,$2");
	}
	return num;
}

function cfn_toDateFormat(){

	var dt = "Tue May 16 17:00:00 KST 2017";
	var d = new Date(dt);
	var curr_date =  d.getDate();
	var curr_month = d.getMonth() + 1;
	var curr_year= d.getFulYear();

	return curr_year+" "+curr_month+" "+curr_date;
}

/**
 * 영문자 입력(대문자 변환)
 * @param obj
 */
function cfn_engCheck(obj, show_msg){
	var expText = /[^A-Za-z]/;
	cfn_commonCheck(obj, expText, "영문만 입력이 가능합니다.", true, show_msg);
}
/**
 * 숫자만 입력
 * @param obj
 */
function cfn_numCheck(obj, show_msg){
	var expText = /[^0-9]/;
	cfn_commonCheck(obj, expText, "숫자만 입력이 가능합니다.", false, show_msg);
}


/**
 * 영문 숫자 입력(대문자 변환)
 * @param obj
 */
function cfn_engNumCheck(obj, show_msg){
	var expText = /[^0-9A-Za-z]/;
	cfn_commonCheck(obj, expText, "영문 및 숫자만 입력이 가능합니다.", true, show_msg);
}



/**
 * 문자열 체크 처리 함수
 * @param obj    체크 대상 object
 * @param expText 정규식
 * @param msg	메세지
 * @param doUpper  대문자 변환 여부 (true/false)
 */
function cfn_commonCheck(obj, expText, msg, doUpper, show_msg){
	if(expText.test(jQuery(obj).val())) {
		if(show_msg == undefined || show_msg)
			alert(jQuery(obj).attr("fname")+" " + msg);
		var tempStr = "";
		for(var i=0 ; i < jQuery(obj).val().length; i++){
			var chr = jQuery(obj).val().substr(i,1);
			if(!expText.test(chr)){
				tempStr += chr;
			}
		}
		jQuery(obj).val(tempStr);
		jQuery(obj).focus();
	}else {
		if(doUpper)	jQuery(obj).val(jQuery(obj).val().toUpperCase());
	}
}

//현재 년도
function get_yyyy(){
	var date = new Date();
	return date.getFullYear();
}
//현재 월
function get_MM(){
	var date = new Date();
	return ((date.getMonth()+1) < 10 ? "0":"") + (date.getMonth()+1);
}

//현재 일
function get_dd(){
	var date = new Date();
	return (date.getDate() < 10 ? "0":"") + date.getDate();
}
//현재 시
function get_hh(){
	var date = new Date();
	return (date.getHours() < 10 ? "0":"") + date.getHours();
}
//현재 분
function get_mm(){
	var date = new Date();
	return (date.getMinutes() < 10 ? "0":"") + date.getMinutes();
}
//현재 초
function get_ss(){
	var date = new Date();
	return (date.getSeconds() < 10 ? "0":"") + date.getSeconds();
}
/*
Jackson 에서 받아 들일 수 있는 Date Format
"yyyy-MM-dd'T'HH:mm:ss.SSSZ",
"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
"EEE, dd MMM yyyy HH:mm:ss zzz",
"yyyy-MM-dd"
*/
function get_JacksonDate(){
	console.log("jacksonDate");
}
//현재 날짜시간
function get_yyyyMMddhhmmss(){

	var date = new Date();
	var datevalues = [
	    date.getFullYear()
	    ,((date.getMonth()+1) < 10 ? "0":"") + (date.getMonth()+1)
	    ,(date.getDate() < 10 ? "0":"") + date.getDate()
	,(date.getHours() < 10 ? "0":"") + date.getHours()
	    ,(date.getMinutes() < 10 ? "0":"") + date.getMinutes()
	    ,(date.getSeconds() < 10 ? "0":"") + date.getSeconds()
	    ,(date.getMilliseconds() < 1000 ? "0":"") + date.getMilliseconds()
	     ];

		var yyyy=datevalues[0];
		var MM=datevalues[1];
		var dd=datevalues[2];
		var hh=datevalues[3];
		var mm=datevalues[4];
		var ss=datevalues[5];
	return yyyy+""+MM+""+dd+""+hh+""+mm+""+ss;
}

//현재 날짜시간
function get_yyyyMMddhhmmssSSS(){

	var date = new Date();
	var datevalues = [
	    date.getFullYear()
	    ,((date.getMonth()+1) < 10 ? "0":"") + (date.getMonth()+1)
	    ,(date.getDate() < 10 ? "0":"") + date.getDate()
	,(date.getHours() < 10 ? "0":"") + date.getHours()
	    ,(date.getMinutes() < 10 ? "0":"") + date.getMinutes()
	    ,(date.getSeconds() < 10 ? "0":"") + date.getSeconds()
	    ,(date.getMilliseconds() < 1000 ? "0":"") + date.getMilliseconds()
	     ];

		var yyyy=datevalues[0];
		var MM=datevalues[1];
		var dd=datevalues[2];
		var hh=datevalues[3];
		var mm=datevalues[4];
		var ss=datevalues[5];
		var sss=datevalues[6];
	return yyyy+""+MM+""+dd+""+hh+""+mm+""+ss+""+sss;
}

function addYear_yyyyMMddhhmmss(add){
	var d = new Date();
	var date = new Date();
	date.setFullYear(d.getFullYear() + Number(add))
	var datevalues = [
		          	    date.getFullYear()
		          	    ,((date.getMonth()+1) < 10 ? "0":"") + (date.getMonth()+1)
		          	    ,(date.getDate() < 10 ? "0":"") + date.getDate()
		          	,(date.getHours() < 10 ? "0":"") + date.getHours()
		          	    ,(date.getMinutes() < 10 ? "0":"") + date.getMinutes()
		          	    ,(date.getSeconds() < 10 ? "0":"") + date.getSeconds()
		          	    ,(date.getMilliseconds() < 1000 ? "0":"") + date.getMilliseconds()
		          	     ];

		          		var yyyy=datevalues[0];
		          		var MM=datevalues[1];
		          		var dd=datevalues[2];
		          		var hh=datevalues[3];
		          		var mm=datevalues[4];
		          		var ss=datevalues[5];
		          	return yyyy+""+MM+""+dd+""+hh+""+mm+""+ss;
}
function addMonth_yyyyMMddhhmmss(add){
	var d = new Date();
	var date = new Date();
	date.setMonth(d.getMonth() + Number(add))
	var datevalues = [
	          	    date.getFullYear()
	          	    ,((date.getMonth()+1) < 10 ? "0":"") + (date.getMonth()+1)
	          	    ,(date.getDate() < 10 ? "0":"") + date.getDate()
	          	,(date.getHours() < 10 ? "0":"") + date.getHours()
	          	    ,(date.getMinutes() < 10 ? "0":"") + date.getMinutes()
	          	    ,(date.getSeconds() < 10 ? "0":"") + date.getSeconds()
	          	    ,(date.getMilliseconds() < 1000 ? "0":"") + date.getMilliseconds()
	          	     ];

	          		var yyyy=datevalues[0];
	          		var MM=datevalues[1];
	          		var dd=datevalues[2];
	          		var hh=datevalues[3];
	          		var mm=datevalues[4];
	          		var ss=datevalues[5];
	          	return yyyy+""+MM+""+dd+""+hh+""+mm+""+ss;
}
function addDay_yyyyMMddhhmmss(add){
	var d = new Date();
	var date = new Date();
	date.setDate(d.getDate() + Number(add))
	var datevalues = [
		          	    date.getFullYear()
		          	    ,((date.getMonth()+1) < 10 ? "0":"") + (date.getMonth()+1)
		          	    ,(date.getDate() < 10 ? "0":"") + date.getDate()
		          	,(date.getHours() < 10 ? "0":"") + date.getHours()
		          	    ,(date.getMinutes() < 10 ? "0":"") + date.getMinutes()
		          	    ,(date.getSeconds() < 10 ? "0":"") + date.getSeconds()
		          	    ,(date.getMilliseconds() < 1000 ? "0":"") + date.getMilliseconds()
		          	     ];

		          		var yyyy=datevalues[0];
		          		var MM=datevalues[1];
		          		var dd=datevalues[2];
		          		var hh=datevalues[3];
		          		var mm=datevalues[4];
		          		var ss=datevalues[5];
		          	return yyyy+""+MM+""+dd+""+hh+""+mm+""+ss;

}
function addHour_yyyyMMddhhmmss(add){
	var d = new Date();
	var date = new Date();
	date.setHours(d.getHours() + Number(add))
	var datevalues = [
		          	    date.getFullYear()
		          	    ,((date.getMonth()+1) < 10 ? "0":"") + (date.getMonth()+1)
		          	    ,(date.getDate() < 10 ? "0":"") + date.getDate()
		          	,(date.getHours() < 10 ? "0":"") + date.getHours()
		          	    ,(date.getMinutes() < 10 ? "0":"") + date.getMinutes()
		          	    ,(date.getSeconds() < 10 ? "0":"") + date.getSeconds()
		          	    ,(date.getMilliseconds() < 1000 ? "0":"") + date.getMilliseconds()
		          	     ];

		          		var yyyy=datevalues[0];
		          		var MM=datevalues[1];
		          		var dd=datevalues[2];
		          		var hh=datevalues[3];
		          		var mm=datevalues[4];
		          		var ss=datevalues[5];
		          	return yyyy+""+MM+""+dd+""+hh+""+mm+""+ss;

}
function addMinute_yyyyMMddhhmmss(add){
	var d = new Date();
	var date = new Date();
	date.setMinutes(d.getMinutes() + Number(add))
	var datevalues = [
		          	    date.getFullYear()
		          	    ,((date.getMonth()+1) < 10 ? "0":"") + (date.getMonth()+1)
		          	    ,(date.getDate() < 10 ? "0":"") + date.getDate()
		          	,(date.getHours() < 10 ? "0":"") + date.getHours()
		          	    ,(date.getMinutes() < 10 ? "0":"") + date.getMinutes()
		          	    ,(date.getSeconds() < 10 ? "0":"") + date.getSeconds()
		          	    ,(date.getMilliseconds() < 1000 ? "0":"") + date.getMilliseconds()
		          	     ];

		          		var yyyy=datevalues[0];
		          		var MM=datevalues[1];
		          		var dd=datevalues[2];
		          		var hh=datevalues[3];
		          		var mm=datevalues[4];
		          		var ss=datevalues[5];
		          	return yyyy+""+MM+""+dd+""+hh+""+mm+""+ss;

}
function addSecond_yyyyMMddhhmmss(add){
	var d = new Date();
	var date = new Date();
	date.setSeconds(d.getSeconds() + Number(add))
	var datevalues = [
		          	    date.getFullYear()
		          	    ,((date.getMonth()+1) < 10 ? "0":"") + (date.getMonth()+1)
		          	    ,(date.getDate() < 10 ? "0":"") + date.getDate()
		          	,(date.getHours() < 10 ? "0":"") + date.getHours()
		          	    ,(date.getMinutes() < 10 ? "0":"") + date.getMinutes()
		          	    ,(date.getSeconds() < 10 ? "0":"") + date.getSeconds()
		          	    ,(date.getMilliseconds() < 1000 ? "0":"") + date.getMilliseconds()
		          	     ];

		          		var yyyy=datevalues[0];
		          		var MM=datevalues[1];
		          		var dd=datevalues[2];
		          		var hh=datevalues[3];
		          		var mm=datevalues[4];
		          		var ss=datevalues[5];
		          	return yyyy+""+MM+""+dd+""+hh+""+mm+""+ss;
}

/**
 * 날자 계산
 * @param date YYYY-MM-DD
 * @param type (plus/minus)
 * @param addDay
 */
function cfn_dateCalculation(date, type, addDay){
	var start_yyyy = date.substring(0,4);
	var start_mm = date.substring(5,7);
	var start_dd = date.substring(8,date.length);
	var oDate = new Date(start_yyyy, start_mm-1, start_dd);
	var sDate;
	if(null == addDay || "" == addDay){
		addDay = 1;
	}
	if(type == 'minus'){
		sDate = new Date(Date.parse(oDate) - addDay * 1000 * 60 * 60 * 24);
	}else {
		sDate = new Date(Date.parse(oDate) + addDay * 1000 * 60 * 60 * 24);
	}
	var yyyy = sDate.getFullYear();
	var mm = sDate.getMonth()+1;
	var dd = sDate.getDate();
	var addDate = yyyy+"-"+(mm < 10 ? "0"+mm : mm)+"-"+(dd < 10 ? "0"+dd : dd);
	return addDate;
}
/**
 * 현재 일자
 * @param separator
 * @returns YYYY (separator) MM (separator) DD
 * 		예:) separator '-' 인 경우 YYYY-MM-DD
 */
function cfn_getNowDate(separator){	return cfn_getDate("NOW", separator);}
function cfn_getYear(){		return cfn_getDate("YYYY");	}
function cfn_getMonth(){	return cfn_getDate("MM");	}
function cfn_getDay(){		return cfn_getDate("DD");	}
function cfn_getHour(){		return cfn_getDate("HH");	}
function cfn_getMinute(){	return cfn_getDate("MI");	}
function cfn_getSecond(){	return cfn_getDate("SS");	}
function cfn_getDate(command, separator){
	var result = "";
	var date = new Date();
	var yyyy = date.getFullYear();
	var mm = date.getMonth()+1;
	var dd = date.getDate();
	var hh = date.getHours();
	var mi = date.getMinutes();
	var ss = date.getSeconds();
	dd = (dd < 10 ? "0"+dd : dd);
	if(command == "YYYY"){		result = yyyy;
	}else if(command == "MM"){	result = mm;
	}else if(command == "DD"){	result = dd;
	}else if(command == "MM"){	result = mm;
	}else if(command == "HH"){	result = hh;
	}else if(command == "MI"){	result = mi;
	}else if(command == "SS"){	result = ss;
	}else if(command == "NOW"){
		var temp = separator;
		if(temp == undefined || temp == null){
			temp = "";
		}
		result = yyyy+temp+(mm < 10 ? "0"+mm : mm)+temp+dd;
	}
	return result
}
/**
 * @param strTime  HHMM 형식의 시간정보
 * @param separator 구분 값 예) :
 */
function cft_getTimeFormat(strTime,separator){
	var tempT = strTime;
	var tempS = separator;
	if(tempS == undefined || tempS == null){		tempS = "";	}
	return  tempT.substring(0,2) + tempS  + tempT.substring(2,4)
}
function cfn_getTime(isHangle, separator){
	var tempS = separator;
	if(tempS == undefined || tempS == null){		tempS = "";	}
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	hours = (hours < 10 ? "0" + hours : hours);
	minutes = (minutes < 10 ? "0" + minutes : minutes);
	var strTime = hours + (isHangle? "시":tempS) + minutes + (isHangle? "분":"");
	return strTime;
}
/**
 * 분을 시간단위로  예) duration:130 => 2시간10분
 * @param duration 분 단위
 */
function cfn_getDurationTime(duration){
	var result = "";
	var tmpH = Math.floor(duration/60);
	var tmpM = duration%60;
	if(tmpH > 0)	result = tmpH + "시간" ;
	if(tmpM > 0)	result +=tmpM + "분";
	return result;
}
/**
 * maxbyte 체크
 * @param maxByte
 * @param text
 * @param id
 * @returns {Boolean}
 */
function cfn_checkByte(maxByte, text, id){
	if(stringByteSize($("#"+id).val()) > maxByte ){
		if(g_langType == 'en')
			alert("["+fname + "] Field Please input Max[" + maxByte + "] Bytes or less.");
		else if(g_langType != 'en')
			alert(text+" 는 최대 "+maxByte+"byte 까지 입력이 가능합니다.");
		$("#"+id).val('');
		$("#"+id).focus();
		return true;
	}
	return false;
}
/**
 * null 체크
 * @param id
 * @param text
 * @returns {Boolean}
 */
function cfn_nullCkeck(id, text){
	if($("#"+id).val() == ""){
		alert(text+" 를(을) 입력/선택 해주세요.");
		$("#"+id).focus();
		return true;
	}
	return false;
}
var divFocusOutFlag = true;
/**
* @param targetId 이벤트 대상ID
* @param divId	toggle div id
* @param addTop  높이좌표
* @param addLeft  좌측 좌표
* @param callbackFunction 콜백함수
* @param callbakParam 콜백함수 매개변수
*/
function cfn_divToggle(targetId, divId, addTop, addLeft,callbackFunction,callbakParam){
	$('#' + divId).css("z-index", 100);
	$("#" + targetId).click(function(){
		var divTop = $("#" + targetId).offset().top;
		var divLeft = $("#" + targetId).offset().left;
		var at = 0 , al = 0;
		var divH = $("#" + divId).height();
		var divW = $("#" + divId).width();
		var pageH = $(document).height();
		var pageW = $(document).width();
		var divPosition = 0;
		//열려있는 다른 Div 닫기
		$("div[title=divArea]").each(function(){
			if($(this).attr('id') != divId){	$(this).hide();	}
		});
		if(addTop != '') at = addTop;
		if(addLeft != '') al = addLeft;
		divPosition = pageH - divH - divTop - at;

		//화면의 하단 남은 하단 높이가 div 높이보다 작을때 div를 위로 출력
		if(divPosition <= 0){
			divPosition = pageH - divTop - at;
			if((divTop - divH - at) > 0){
				divTop = divTop - divH;			at =  (at * -1);
			}
		}
		divPosition = pageW - divW - divLeft - al;
		//화면의 하단 남은 하단 높이가 div 높이보다 작을때 div를 위로 출력
		if(divPosition <= 0){
			divPosition = pageW - divLeft - al;
			if((divLeft - divW - al) > 0){
				divLeft = divLeft - divW;
				al =  (al * -1);
			}else{
				divLeft = divLeft - (divW/2);
				al =  (al * -1);
			}
		}
		$("#" + divId).show();
		$("#" + divId).offset({top:divTop +at ,left : divLeft +al});
		$("#" + divId).attr("tabindex", -1).focus();
		if(typeof(callbackFunction) == 'function') {
			callbackFunction(callbakParam);
		}
	}).css("cursor", "pointer");
	$('#' + divId).hover(function(){
		divFocusOutFlag = false;
	}, function(){
		divFocusOutFlag = true;
	});
	$('#' + divId).focusout(function(event){
		event.preventDefault();
		if(divFocusOutFlag) $(this).hide();
	});
};
//자동 완성  토글
//keyup 이벤트 마지막에 call back 함수 실행
function cfn_divToggleKeyup_callback(targetId, divId, addTop, addLeft, idx, callbackFunction, callbakParam){
	$('#' + divId).css("z-index", 100);
	$("#" + targetId).bind("keyup", function(event){
		var divTop = $("#" + targetId).offset().top;
		var divLeft = $("#" + targetId).offset().left;
		var at = 0 , al = 0;
		var divH = $("#" + divId).height();
		var divW = $("#" + divId).width();
		var pageH = $(document).height();
		var pageW = $(document).width();
		var divPosition = 0;
		//열려있는 다른 Div 닫기
		$("div[title=divArea]").each(function(){
			if($(this).attr('id') != divId){
				$(this).hide();
			}
		});
		if(addTop != '') at = addTop;
		if(addLeft != '') al = addLeft;
		divPosition = pageH - divH - divTop - at;
		//화면의 하단 남은 하단 높이가 div 높이보다 작을때 div를 위로 출력
		if(divPosition <= 0){
			divPosition = pageH - divTop - at;
			if((divTop - divH - at) > 0){
				divTop = divTop - divH;
				at =  (at * -1);
			}
		}
		divPosition = pageW - divW - divLeft - al;
		//화면의 하단 남은 하단 높이가 div 높이보다 작을때 div를 위로 출력
		if(divPosition <= 0){
			divPosition = pageW - divLeft - al;
			if((divLeft - divW - al) > 0){
				divLeft = divLeft - divW;
				al =  (al * -1);
			}else{
				divLeft = divLeft - (divW/2);
				al =  (al * -1);
			}
		}
		$("#" + divId).show();
		$("#" + divId).offset({top:divTop +at ,left : divLeft +al});
		$("#" + divId).attr("tabindex", -1).focus();
		var text = $("#"+targetId).val();
		// 입력된 데이터 정렬
		$('#' + divId+" tr").each(function(){
			if(jQuery(this).index() != 0){
				var flag = false;
				if(jQuery(this).find("td:eq("+idx+") span").text().indexOf(text.toUpperCase()) >= 0)
					flag = true;
				if(flag)	jQuery(this).show();
				else		jQuery(this).hide();
			}
		});
		if(typeof(callbackFunction) == 'function') {			callbackFunction(callbakParam);		}
		$("#"+targetId).focus();
	});
	$('#' + divId).hover(function(){
		divFocusOutFlag = false;
	}, function(){
		divFocusOutFlag = true;
	});
	$('#' + targetId).focusout(function(event){
		event.preventDefault();
		divFocusOutFlag = false;
	});
	$('#' + divId).focusout(function(event){
		event.preventDefault();
		if(divFocusOutFlag) $(this).hide();
	});
}
//자동 완성  토글
function cfn_divToggleKeyup(targetId, divId, addTop, addLeft, idx){
	cfn_divToggleKeyup_callback(targetId, divId, addTop, addLeft, idx);
};
/**
 * 페이지 리다이렉트
 * @param url
 */
function cfn_redirectPageUrl(url){
	//현재 창이 frame, iframe 일 경우 parent 로 로그인페이지 이동처리
	//popup 창일 경우 부모창이 로그인페이지로 이동처리 후 팝업 닫음
	if(opener != undefined && opener != null){
		$(opener.location).attr("href", "javascript:redirectPageUrl('"+url+"');");
		window.close();
	}else if(self==top){
		location.href=url;
	}else{
		parent.location.href=url;
	}
}
/**
 * <,> 문자 변환
 * @param str
 * @returns {String}
 */
function cfn_getXssStr(str){
	var returnStr = '';
	if(str != undefined && str != ''){
		for(var i = 0; i< str.length; i++){
			if(str.charAt(i) == '<')
				returnStr += str.charAt(i).replace("<","&lt;");
			else if(str.charAt(i) == '>')
				returnStr += str.charAt(i).replace(">","&gt;");
			else if(str.charAt(i) == '(')
				returnStr += str.charAt(i).replace("(","&#40");
			else if(str.charAt(i) == ')')
				returnStr += str.charAt(i).replace(")","&#41");
			else if(str.charAt(i) == '#')
				returnStr += str.charAt(i).replace("#","&#35");
			else
				returnStr += str.charAt(i);
		}
	}
	return returnStr;
}
var isFileUpload = false;
/**
 * <pre>
 * ajax 파일 업로드 1건씩
 * callback function은 inputId, resultData 를 매개변수로 받는는다.
 * </pre>
 * @param inputId       -  input file name
 * @param requestData   - json 타입의 데이터
 * @param uploadUrl
 * @param callbackFunction  - function()
 */
function cfn_commonFileUpload(inputId, requestData, uploadUrl, callbackFunction){
	var resultData = "";
	if(isFileUpload){	alert("서버에 파일 업로드 중 입니다.");		return ;	}
	isUpload = true;
	$.ajaxFileUpload({
        async : false,
        cache : false,
		secureuri:false,
		data : requestData,
		fileElementId: inputId,
        url: uploadUrl,
		type: "post",
		dataType : 'json',
        success: function(json, status) {
			isFileUpload = false;
			resultData = json;
			if(json.RESULT == 'FILE_IS_NULL')				json.RESULT = "파일이 없습니다.";
			else if(json.RESULT == 'FILE_SIZE_OVER')		json.RESULT = "파일 사이즈가 초과 되었습니다.";
			else if(json.RESULT == 'FILE_ALLOWEXT')			json.RESULT = "지원하지 않는 확장자입니다.";
			else if(json.RESULT == 'WIDTH_SIZE_OVER')		json.RESULT = "가로 길이 사이즈가 초과 되었습니다.";
			else if(json.RESULT == 'HEIGHT_SIZE_OVER')		json.RESULT = "세로 길이 사이즈가 초과 되었습니다.";
			else if(json.RESULT == 'FAIL_UPLOAD')			json.RESULT = "파일 업로드 실패하였습니다.";
			if(typeof(callbackFunction) == 'function')	callbackFunction(inputId, resultData);	//callback
        },
        error: function(xhr, textStatus, e){
        	isFileUpload = false;
        	throw e;
        }
	});
}
/**
 * 쿠키 설정
 * */
function cfn_setCookie( name, value, expiredays ) {
	 var todayDate = new Date();
	 todayDate.setDate( todayDate.getDate() + expiredays );
	 document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}
/**
 * 쿠키 가져오기
 * */
function cfn_getCookie( name ){
    var nameOfCookie = name + "=";
    var x = 0;
    while ( x <= document.cookie.length ){
        var y = (x+nameOfCookie.length);
        if ( document.cookie.substring( x, y ) == nameOfCookie ) {
                if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
                        endOfCookie = document.cookie.length;
                return unescape( document.cookie.substring( y, endOfCookie ) );
        }
        x = document.cookie.indexOf( " ", x ) + 1;
        if ( x == 0 )   break;
    }
    return "";
}
/**
 * JSON 방식 세션체크
 */
function cfn_sessionCheckJSON(json){
	if(json.SESSION_OUT_REDIRECT_URL != undefined){
		//메세지 있는 경우 메세지 alert
		if(json.SESSION_OUT_MESSAGE != undefined){
			alert(json.SESSION_OUT_MESSAGE);
		}
		//페이지 리다이렉트
		cfn_redirectPageUrl(json.SESSION_OUT_REDIRECT_URL);
		return false;
	}else{
		return true;
	}
}
/**
 * JSON 세션 종료 여부 확인 RES_CODE == 'SESSION_IS_NULL' 세션 종료
 * @param req
 * @returns {Boolean}
 */
function sessionCheckJSON(req){
	if(req.RES_CODE != undefined && req.RES_CODE != '')
		if(req.RES_CODE == 'SESSION_IS_NULL'){
			return false;
		}
	return true;
}
var lock_url = "";
var isSessionNull = false;
/**
 * ajax 호출시 중복호출 방지 + 로딩이미지 처리
 */
$.ajaxPrefilter(function(options, originalOptions, jqXHR){
	if(lock_url == options.url || isSessionNull){
		jqXHR.abort();
	}
	lock_url = options.url;
	if(lock_url != "/main/getDrStatus.do" && lock_url != "/main/getChartInfo.do"){
		$("#loading").show();
	}
	options.success = function(req,stat,xhr){
		var dataType = options.dataType;
		if(dataType.toUpperCase() == "JSON" ){			//json type 호출일 경우
			if(sessionCheckJSON(req)) 					//세션 체크
				originalOptions.success(req,stat,xhr);	//페이지에서 정의 한 함수 실행
			else{
				//세션 오류 문구는 한번만 노출
				if(!isSessionNull){
					isSessionNull = true;
					if(!req.ISERROR){
						alert("세션이 종료되었습니다. 로그인페이지로 이동합니다.");
						location.href = ((req.USER_TYPE == 'ADMIN')?"/ven":"/prt") + "Login.do";
					}else{
						alert("세션 종료 오류가 발생하였습니다.");
					}
				}
			}
		}else
			originalOptions.success(req,stat,xhr);		//페이지에서 정의 한 함수 실행
	};
});
/*$(document).ajaxComplete(function(event,request, settings){
	if(lock_url == settings.url) lock_url = "";
	setTimeout(function(){$("#loading").hide();}, 500);
});*/
$(document).ajaxError(function(event,request, settings){
	lock_url = "";
	setTimeout(function(){$("#loading").hide();}, 500);
});
$(document).ajaxStop(function(){
	lock_url = "";
	setTimeout(function(){$("#loading").hide();}, 500);
});

// 달력 표시 한글 설정
dhtmlXCalendarObject.prototype.langData["kr"] = {
//	dateformat: '%Y.%m.%d',
	monthesFNames: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
	monthesSNames: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
	daysFNames: ["일","월","화","수","목","금","토"],
	daysSNames: ["일","월","화","수","목","금","토"],
	weekstart: 1,
	weekname: "주"
};
