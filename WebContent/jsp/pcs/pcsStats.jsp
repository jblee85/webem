<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
	<div class="content-wrapper ng-scope">
		<div class="container-fluid content">
			<h3>전체 PCS 상세화면</h3>
			<div class="location">
				<a href="#"><img src="<c:url value='/images/ico_home.gif' />" alt="홈"></a>
				<a href="#">PCS</a> <span class="current">전체 PCS</span>
			</div>
			<div class="fullWrap pcsWrap">
				<div class="row">
					<div class="col-lg-4 col-md-12">
						<div class="bBox pcsBWrap">
							<h4>수동 제어</h4>
							<div class="mdbtn guide">
								<div class="guideCont">
								배터리 충방전을 하기 위해선<br>
								1.스케줄 OFF<br>
								2.배터리 활성화<br>
								3.전력량 입력 후 충전 또는 방전 클릭
								</div>
							</div>
							<div class="status">
								<p>활성화</p>
								<div class="onoffswitch">
									<input type="checkbox" name="onoffswitch1"	class="onoffswitch-checkbox" id="myonoffswitch1"
									ng-change="modifyBattActive(isBattActive)" ng-model="isBattActive" ng-checked="isBattActive">
									<label class="onoffswitch-label" for="myonoffswitch1">
										<span class="onoffswitch-inner"></span>
										<span class="onoffswitch-switch"></span>
										<span class="name1">활성화</span>
										<span class="name2">비활성화</span>
									</label>
								</div>
							</div>
							<div class="charge">
								<p>충전중</p>
								<div>
									<input type="number" min="1" class="form-control" ng-model="kw" ng-disabled="!isBattActive">
									<span>kW</span>
									<button class="form-control" ng-class="{'btn-primary' : battStatus==true}" ng-click="modifyBattStatus('charge')" ng-disabled="!isBattActive">충전</button>
									<button class="form-control" ng-class="{'btn-primary' : battStatus==false}" ng-click="modifyBattStatus('discharge')" ng-disabled="!isBattActive">방전</button>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-2  col-md-12">
						<div class="bBox pcsSWrap">
							<h4>스케쥴 제어</h4>
							<div class="mdbtn revise" ng-click="goSchedule(essScheduleList.id)"></div>
							<div class="status">
								<p ng-show="!notActiveSchedule">{{essScheduleList.data.schedulename}}</p>
								<p ng-show="notActiveSchedule">비활성화</p>
								<div class="onoffswitch  word2">
									<input type="checkbox" name="onoffswitch2"	class="onoffswitch-checkbox" id="myonoffswitch2"
									ng-change="runSchedule(essScheduleList.data.running)" ng-model="essScheduleList.data.running" ng-checked="essScheduleList.data.running">
									<label class="onoffswitch-label" for="myonoffswitch2">
										<span class="onoffswitch-inner"></span>
										<span class="onoffswitch-switch"></span>
										<span class="name1">ON</span>
										<span class="name2">OFF</span>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-12">
						<div class="bBox pcsPWrap">
							<h4>PV 제어</h4>
							<div class="status">
								<ul>
									<li>한전</li>
									<li>배터리</li>
								</ul>
								<div class="onoffswitch">
									<input type="checkbox" name="onoffswitch3"
										class="onoffswitch-checkbox" id="myonoffswitch3"> <label
										class="onoffswitch-label" for="myonoffswitch3"> <span
										class="onoffswitch-inner"></span> <span
										class="onoffswitch-switch"></span> <span class="name1">PV
											to Grid</span> <span class="name2">PV to Battery</span>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3  col-md-12 w100">
						<div class="bBox pcsIWrap">
							<ul>
								<li><span>수신율</span>
								<p>98%</p></li>
								<li><span>효율</span>
								<p>99%</p></li>
								<li><span>상태정보수집</span>
								<p>8건</p></li>
								<li><span>설비가동률</span>
								<p>65%</p></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="row">
					<!-- middle tabled1 -->
					<div class="col-lg-9 col-md-12 col-sm-12">
						<div class="bBox">
							<h4>실시간 상세정보</h4>
							<table class="basicTable" width="100%" border="0" cellspacing="0"
								cellpadding="0">
								<colgroup>
									<col width="160">
									<col width="120">
									<col width="120">
									<col width="120">
									<col width="100">
									<col width="100">
									<col width="100">
									<col width="100">
									<col width="100">
									<col width="100">
								</colgroup>
								<thead>
									<tr>
										<th>이름</th>
										<th>DC power</th>
										<th>active power</th>
<!-- 										<th>무효전력</th> -->
										<th>frequency</th>
	<!-- 									<th>교류전압</th> -->
										<th>DC voltage</th>
										<th>DC current</th>
<!-- 										<th>스케쥴</th> -->
										<th>제어</th>
										<th>상세</th>
									</tr>
								</thead>
								<tr ng-repeat="b in capped">
									<td>pcs01</td>
									<td>{{cappedData[$index].pcs.dcpkw}}</td>
									<td>{{cappedData[$index].pcs.pkw}}</td>
<!-- 									<td>0</td> -->
									<td>{{cappedData[$index].pcs.rst.hz}}</td>
	<!-- 								<td>{{b.}}</td> -->
									<td>{{cappedData[$index].pcs.dcv}}</td>
									<td>{{cappedData[$index].pcs.dca}}</td>
<!-- 									<td></td> -->
									<td>{{cappedData[$index].pcs.stName}}</td>
									<td><a class="midMore" ng-click="goPCSDetail(cappedData[$index].devrid)"><b>more</b><span>더보기</span></a></td>
								</tr>
							</table>
						</div>
					</div>

					<div class="col-lg-3 col-md-12 col-sm-12">
						<div class="bBox">
							<div class="edHead">
								<h4>사용자 운전 제어 이력</h4>
								<a href="#" class="moreBt">more<i></i></a>
							</div>
							<table class="midTb  driveList basicTable" width="100%"	border="0" cellspacing="0" cellpadding="0">
								<thead>
									<tr class="midTh dirveList-th">
										<th>사용자</th><th>시간</th><th>운전제어</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>admin</td>
										<td>2018-04-04 09:43:11</td>
										<td>수동제어</td>
									</tr>
									<tr class="midTd dirveList-td" ng-repeat="h in essHistoryList">
										<td>{{h.data}}</td><td>{{h.title}}</td><td>{{h.cdt}}</td>
									</tr>
								<tbody>
							</table>
						</div>
					</div>

				</div>
				<div class="midContent row">
					<div class="row">
							<div class="col-lg-6">
								<div class="bBox chart" style="height:275px !important;">
										<h4>Temperature(℃)</h4>
										<div id="Temperature" style="height: 100%;"></div>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="bBox chart" style="height:275px !important;">
									<h4>SOC(%)</h4>
									<div id="Soc" style="height: 100%;"></div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-6">
								<div class="bBox chart" style="height:275px !important;">
									<h4>Voltage(V)</h4>
									<div id="Voltage" style="height: 100%;"></div>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="bBox chart" style="height:275px !important;">
									<h4>Current(A)</h4>
									<div id="Current" style="height: 100%;"></div>
								</div>
							</div>
						</div>
				</div>
				<!-- //fullWrap -->
			</div>

		</div>

	</div>

</body>
<!-- /body -->
<script src="<c:url value='/lib/bootstrap-3.3.7-dist/js/sb-admin.js' />"></script>
</html>
<!-- /html -->

