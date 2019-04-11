<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<title>스케줄 적용</title>
	</head>
	<body>
		<div class="content-wrapper ng-scope" >
			<div class="container-fluid content">
				<h3>스케줄 적용</h3>
				<div class="location">
					<a href="#"><img src="<c:url value='/images/ico_home.gif' />" alt="홈"></a>
					<a href="#">스케줄 적용</a>
					<span class="current">스케줄 적용</span>
				</div>
				<div class="fullWrap">
					<div class="bBox scheduleApWrap">
						<div class="top">
<!-- 							<div class="right"> -->
<!-- 								<div class="onoffswitch word3"> -->
<!-- 								    <input type="checkbox" name="onoffswitch1"	class="onoffswitch-checkbox" id="myonoffswitch1" -->
<!-- 								    ng-change="runSchedule(schedule.data.running)" ng-model="schedule.data.running" ng-checked="schedule.data.running"> -->
<!-- 									<label class="onoffswitch-label" for="myonoffswitch1"> -->
<!-- 										<span class="onoffswitch-inner"></span> -->
<!-- 										<span class="onoffswitch-switch"></span> -->
<!-- 										<span class="name1">활성화</span> -->
<!-- 										<span class="name2">비활성화</span> -->
<!-- 									</label> -->
<!-- 								</div> -->
<!-- 							</div> -->
						</div>
						<div class="row">
							<div class="col-lg-4">
								<div class="bBox enrolment">
									<h5>적용 스케쥴</h5>
										<ul class="allSchedule">
											<li>
												<i class="scOn"></i>
												<span>적용 월</span>
												<div class="selcetSchedule"><b ng-repeat="m in monthAllList" ng-class="{on : m.is == true}">{{m.id}}</b>
											</li>
										</ul>
										<ul>
											<li ng-class="{on : scheduleSelected == s.id,shadow : scheduleSelected == s.id}" ng-repeat="s in scheduleList" ng-click="getScheduleDetail(s.id)">
												<i ng-class="{scOn : s.data.applied == true, scOff : s.data.applied == false}"></i>
												<span>{{s.data.schedulename}}</span>
												<div class="selcetSchedule">
													<b ng-repeat="m in s.monthList" ng-class="{on : m.is == true}">{{m.id}}</b>
												</div>
											</li>
										</ul>
								</div>
							</div>
							<div class="col-lg-5">
								<div class="bBox saptableWrap">
									<h5>스케쥴 상세</h5>
									<div class="mdbtn">
<!-- 								<button class="form-control btn-primary" ng-click="runSchedule()">스케줄 적용</button> -->
										<div class="onoffswitch word2">
										    <input type="checkbox" name="onoffswitch2" class="onoffswitch-checkbox" id="myonoffswitch2"
										    ng-change="isApplied(schedule.data.applied)" ng-model="schedule.data.applied" ng-checked="schedule.data.applied">
											<label class="onoffswitch-label" for="myonoffswitch2">
												<span class="onoffswitch-inner"></span>
												<span class="onoffswitch-switch"></span>
												<span class="name1">ON</span>
												<span class="name2">OFF</span>
											</label>
										</div>
									</div>
									<div class="tableWrap">
										<table width="100%" border="0" cellspacing="0" cellpadding="0" class="basicTable">
											<colgroup>
												<col width="50">
												<col width="100">
												<col width="200">
												<col width="200">
											</colgroup>
											<thead>
											<tr>
												<th>순서</th>
												<th>상태</th>
												<th>출력값</th>
												<th>시작시간</th>
											</tr>
											</thead>
											<tbody>
											<tr ng-repeat="s in schedule.data.times">
												<td>{{$index}}</td>
												<td>{{s.cmd}}</td>
												<td>{{s.kw}}kw</td>
												<td>{{s.hour}}시 {{s.min}}분</td>
											</tr>
											</tbody>
										</table>
									</div>
									<ul class="left">
										<li>SOC 완전 충전방지 </li>
										<li class="exampleText">90%</li>
										<li>SOC 완전 방전방지 </li>
										<li class="exampleText">10%</li>

									</ul>
									<ul class="right">
										<li>휴일 적용중</li>
									</ul>
								</div>
							</div>
							<div class="col-lg-3">
								<div class="bBox feeWrap presentWrap">
									<h5>예상 편익 요금(예시)</h5>
									<ul>
										<li><div>요금종류</div><div class="exampleText">산업용(을) II</div></li>
										<li><div>계약전력</div><div class="exampleText">121 kW</div></li>
										<li><div>요금적응 전력</div><div class="exampleText">121 kW</div></li>
										<li><div>현재 전력 요금</div><div class="exampleText">121 kW</div></li>
										<li><div>예상 편익</div><div class="exampleText">1,000 kW</div></li>
										<li><div>금일 절감 효과</div><div class="exampleText">8,622 kW</div></li>
										<li><div>요금종류</div><div class="exampleText">10%</div></li>
									</ul>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-12">
								<div class="bBox chart">
									<h4>챠트</h4>
									챠트
								</div>
						</div>
					</div>
				</div>
				<!-- //fullWrap -->
			</div>
		</div>
	</body> <!-- /body -->
	<script src="<c:url value='/lib/bootstrap-3.3.7-dist/js/sb-admin.js' />"></script>
</html> <!-- /html -->

