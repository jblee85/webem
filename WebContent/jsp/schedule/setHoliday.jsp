<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>휴일등록</title>
</head>
<body>
	<div class="">
	    <div class="box-header with-border">
	    	<h3 class="box-title" ng-show="holidayType == 'post'">휴일 등록</h3>
	    	<h3 class="box-title" ng-show="holidayType == 'modify'">휴일 수정</h3>
	    </div>
	    <form class="form-horizontal" name="holidayForm">
	    	<div class="box-body">
		        <div class="form-group">
		          <label class="col-sm-2 control-label">제목</label>
		          <div class="col-sm-10">
		            <input class="form-control" placeholder="휴일명" name="hname" ng-model="hname" ng-required="true">
		          </div>
		        </div>
		        <div class="alertBox">
					<p ng-if="holidayForm.hname.$error.required"><span>휴일명을 입력해주세요</span></p>
				</div>
		        <div class="form-group">
	                <label class="col-sm-2 control-label">날짜</label>
	                <div class="col-sm-10">
	                  <div class="input-group-addon" style="width: 8%">
	                    <i class="fa fa-calendar"></i>
	                  </div>
	                  <input type="text" class="form-control pull-right" id="datepicker" name="hcalendar" ng-model="calendarDt" ng-click="modalCalendar(selectedDate)" readonly="readonly" placeholder="날짜 선택" ng-required="true">
	                </div>
	            </div>
	             <div class="alertBox">
					<p ng-if="holidayForm.hcalendar.$error.required"><span>날짜를 선택해주세요</span></p>
				</div>
	            <div class="form-group">
	               	<label class="col-sm-2 control-label">반복</label>
	               	<div class="col-sm-10">
	               		<select class="form-control" ng-model="repeatType" ng-options="list.type as list.name for list in repeatLists">
	                  	</select>
	                </div>
                 </div>
              </div>
              <input type="hidden" ng-model="holidayId">
		      <div class="box-footer">
		        <button type="button" class="btn btn-default pull-right" ng-click="cancel()">취소</button>
		        <button type="button" ng-show="holidayType == 'post'" class="btn btn-info pull-right" ng-click="add(hname, selectedDate, repeatType); $event.preventDefault();" ng-disabled="(hname == undefined || hname == '') || (calendarDt == undefined || calendarDt == '')">등록</button>
		     	<button type="button" ng-show="holidayType == 'modify'" class="btn btn-info pull-right" ng-click="add(hname, selectedDate, repeatType, holidayId); $event.preventDefault();" ng-disabled="(hname == undefined || hname == '') || (calendarDt == undefined || calendarDt == '')">수정</button>
		      </div>
	    </form>
	</div>
</body>
</html>