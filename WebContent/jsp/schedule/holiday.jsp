<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>

<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        <b>휴일관리</b>
        <small>- 휴일로 지정한 날은 ESS 운전을 하지 않도록 설정합니다.</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>PCS운전 제어</a></li>
        <li class="active">휴일</li>
      </ol>
    </section>

	 <section class="content container-fluid" ng-init="init()">
	   	<div class="dashboardWrap">
	   		<div class="calendarContentWrap">
	   			<div class="row calendarSet">
					<div class="col-lg-2 col-xs-12 buttonWrap">
					</div>
					<div class="col-lg-5 col-xs-12 monthyearWrap" ng-show="showtype == 'year'">
						<a style="cursor: pointer;" class="prev monthyearContent" ng-click="yearChange(year,'L')">&lt;</a>
						<div class="monthyear monthyearContent">{{year}}년</div>
						<a style="cursor: pointer;" class="next monthyearContent" ng-click="yearChange(year,'R')">&gt;</a>
					</div>
					<div class="col-lg-2 col-xs-12 buttonWrap">
					</div>
					<div class="col-lg-3 col-xs-12 buttonWrap"><a><i></i></a></div>
				</div>
				<div class="row">
					<div class="col-lg-9 col-xs-12 calendarContent">
						<div class="graphWrap dashBox" >
							<div class="row" ng-show="showtype == 'year'" style="margin-bottom: 270px;">
								<div id="jan" class="dhx_cal_container col-lg-3"></div>
								<div id="feb" class="dhx_cal_container col-lg-3"></div>
								<div id="mar" class="dhx_cal_container col-lg-3"></div>
								<div id="apr" class="dhx_cal_container col-lg-3"></div>
							</div>
							<div class="row" ng-show="showtype == 'year'" style="margin-bottom: 270px;">
								<div id="may" class="dhx_cal_container col-lg-3"></div>
								<div id="june" class="dhx_cal_container col-lg-3"></div>
								<div id="july" class="dhx_cal_container col-lg-3"></div>
								<div id="aug" class="dhx_cal_container col-lg-3"></div>
							</div>
							<div class="row" ng-show="showtype == 'year'" style="margin-bottom: 270px;">
								<div id="sep" class="dhx_cal_container col-lg-3"></div>
								<div id="oct" class="dhx_cal_container col-lg-3"></div>
								<div id="nov" class="dhx_cal_container col-lg-3"></div>
								<div id="dec" class="dhx_cal_container col-lg-3"></div>
							</div>
						</div>
						<button class="circleButton-lg" ng-click="openModal()">+</button>
					</div>
					<div class="col-lg-3 col-xs-12 rightApply">
						<div class="graphWrap dashBox">
							<div class="">
								<table>
									<colgroup>
										<col width="20%">
										<col width="20%">
										<col width="40%">
										<col width="20%">
									</colgroup>
									<thead>
										<tr class="">
											<th>반복</th>
											<th>날짜</th>
											<th>휴일명</th>
											<th>삭제</th>
										</tr>
									</thead>
								</table>
							</div>
							<div>
								<table class="table-hover">
									<colgroup>
										<col width="20%">
										<col width="20%">
										<col width="40%">
										<col width="20%">
									</colgroup>
										<tbody>
										<tr class="primaryFont" ng-repeat="ch in customHolidayList | orderBy: 'day'" style="cursor: pointer;">
											<td ng-if="ch.repeattype == 0" ng-click="modifyHoliday(ch.repeattype, ch.day, ch.name, ch.id); $event.preventDefault();">안함</td>
											<td ng-if="ch.repeattype == 2" ng-click="modifyHoliday(ch.repeattype, ch.day, ch.name, ch.id); $event.preventDefault();">매월</td>
											<td ng-if="ch.repeattype == 3" ng-click="modifyHoliday(ch.repeattype, ch.day, ch.name, ch.id); $event.preventDefault();">매년</td>
											<td ng-click="modifyHoliday(ch.repeattype, ch.day, ch.name, ch.id); $event.preventDefault();">{{ch.day | date : 'yyyy.MM.dd'}}</td>
											<td ng-click="modifyHoliday(ch.repeattype, ch.day, ch.name, ch.id); $event.preventDefault();">{{ch.name}}</td>
											<td ng-click="deleteHoliday(ch.repeattype, ch.day, ch.name, ch.id); $event.preventDefault();"><i class="icoDel"></i></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
	   		</div>
		</div>
	</section>
</div>
</html>