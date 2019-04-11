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
		<title>공지사항</title>
	</head>
	<body>
		<div class="content-wrapper ng-scope" >
			<div class="container-fluid content">
				<h3>스케줄</h3>
				<div class="location">
					<a ui-sref="{{main}}" ><img src="<c:url value='/images/ico_home.gif' />" alt="홈"></a>
					<a href="#">BMS</a>
					<span class="current">BMS-1</span>
				</div>
				<div class="fullWrap">
					<div class="row">
						<div class="col-lg-2 col-md-2 col-sm-12">
							<div class="bBox enrolment">
								<h5>등록된 스케줄</h5>
								<ul>
									<li ng-class="{on : scheduleSelected == s.id,shadow : scheduleSelected == s.id}" ng-repeat="s in scheduleList" ng-click="getScheduleDetail(s.id)">
										<i ng-class="{scOn : s.data.applied, scOff : !s.data.applied}"></i>
										<span>{{s.data.schedulename}}</span>
									</li>
								</ul>
								<button class="form-control blueBg" ng-click="createSchedule()">새로운 스케줄 만들기</button>
							</div>
							<div class="bBox scheduleFee">
								<h5>스케줄 별 편익 요금 비교</h5>
								<ul>
									<li>
										<div>Peak Cut</div>
										<div class="progressWrap">
											<span class="blueBg" style="width: 10%"></span>
										</div>
									</li>
									<li>
										<div>산업용 갑</div>
										<div class="progressWrap">
											<span class="blueBg" style="width: 10%"></span>
										</div>
									</li>
									<li>
										<div>산업용 을1</div>
										<div class="progressWrap">
											<span class="blueBg" style="width: 10%"></span>
										</div>
									</li>
									<li>
										<div>봄</div>
										<div class="progressWrap">
											<span class="blueBg" style="width: 10%"></span>
										</div>
									</li>
									<li>
										<div>스케줄2</div>
										<div class="progressWrap">
											<span class="blueBg" style="width: 10%"></span>
										</div>
									</li>
									<li>
										<div>스케줄3</div>
										<div class="progressWrap">
											<span class="blueBg" style="width: 10%"></span>
										</div>
									</li>

								</ul>
							</div>
						</div>
						<div class="col-lg-10 col-md-10 col-sm-12">
							<div class="bBox scheduleCont">
								<ul class="info">
									<li><span>배터리총량</span><span> -400<span></li>
									<li><span>총방전 합계</span><span class="redFt"> -400<span></li>
									<li><span>SOC 완전 충전방지</span><span>60%<span></li>
									<li><span>SOC 완전 방지</span><span>10%<span></li>
									<li><p>휴일적용중</p></li>
<!-- 									<li><p>{{schedule.data.applied}}</p></li> -->
								</ul>
								<div class="btnWrap">
									<div class="left">
										<input type="text" class="form-control" ng-model="schedule.data.schedulename" focus-on="schedulename">
										<span>의 스케줄 리스트</span>
									</div>
									<div class="right form-group">
										<button class="form-control btn-primary" ng-click="saveSchedule()">저장</button>
										<button class="form-control" ng-click="delSchedule()">삭제</button>
										<button class="form-control" ng-click="reset()">초기화</button>
										<button class="form-control" ng-click="goScheduleApply(schedule.id)">적용</button>
									</div>
								</div>
								<div class="apMonth form-group">
									<span>적용 월</span>
									<div class="checkbox">
										<label class="checkbox-inline" ng-repeat="m in monthList"><input type="checkbox" ng-checked="m.is" ng-model="m.is">{{m.id}}월</label>
									</div>
								</div>
								<div class="tableWrap">
									<table width="100%" border="0" cellspacing="0" cellpadding="0" class="basicTable">
										<colgroup>
											<col width="50">
											<col width="200">
											<col width="200">
											<col width="300">
											<col width="100">
										</colgroup>
										<thead>
										<tr>
											<th>순서</th>
											<th>상태</th>
											<th>출력값</th>
											<th>시작시간</th>
											<th>편집</th>
										</tr>
										</thead>
										<tbody>
										<tr ng-repeat="s in schedule.data.times">
											<td>{{$index}}</td>
											<td>
												<div class="onoffswitch word2">
												    <input type="checkbox" name="onoffswitch3" class="onoffswitch-checkbox" id="{{'chargeflipSwitch-'+$index}}" ng-model="s.cmd" ng-checked="s.cmd">
												    <label class="onoffswitch-label" for="{{'chargeflipSwitch-'+$index}}">
												        <span class="onoffswitch-inner"></span>
												        <span class="onoffswitch-switch"></span>
												        <span class="name1">충전</span>
														<span class="name2">방전</span>
												    </label>
												</div>
											</td>
											<td><input type="text" class="form-control" ng-model="s.kw" >kW</td>
											<td>
												<select class="form-control" ng-model="s.hour" ng-disabled="$index == 0" ng-options="selectHour.id as selectHour.id for selectHour in hourList">
												</select>
												<span>
												시
												</span>
												<select class="form-control" ng-model="s.min" ng-disabled="$index == 0" ng-options="selectMin.id as selectMin.id for selectMin in minList">
												</select>
												<span>
												분
												</span>
												</td>
												<td><button class="form-control" ng-click="delRow($index)">삭제</button></td>
											</tr>

										</tbody>
									</table>

								</div>
								<button class="form-control btn-primary" ng-click="addRow()">행추가버튼이용</button>
							</div>
							<div class="bBox scheduleChart">
								<h5>챠트</h5>
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

