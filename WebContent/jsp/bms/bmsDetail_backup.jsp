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
	</head>
<!-- 	  <style> -->
<!-- 	.orangeFt {color: #ee8f2a} -->
<!--   </style> -->

	<body>
		<div class="content-wrapper ng-scope" data-ng-init="init()">
			<div class="container-fluid content">
				<h3>BMS 대시보드</h3>
				<div class="location">
					<a ui-serf="dashboard" href="#!/dashboard"><img src="/webem/images/ico_home.gif" alt="홈"></a>
					<a href="#">BMS</a>
					<span class="current">BMS 대시보드</span>
				</div>
				<div class="fullWrap">
					<div class="row">
						<div class="col-lg-6 col-md-6">svg</div>
						<div class="col-lg-6 col-md-6">
							<div class="col-lg-6 col-md-6">
								<table class="table">
									<thead>
										<tr><th colspan="2" scope="col">배터리 스펙</th></tr>
									</thead>
									<tbody>
										<tr>
											<td>제조사</td>
											<td>LG</td>
										</tr>
										<tr>
											<td>모델명</td>
											<td>LG BMS</td>
										</tr>
										<tr>
											<td>랙 개수</td>
											<td>12</td>
										</tr>
										<tr>
											<td>설계용량</td>
											<td>1.5MW</td>
										</tr>
										<tr>
											<td>보장 사이클</td>
											<td>4,000</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="col-lg-6 col-md-6">
								<table class="table">
									<thead>
										<tr><th colspan="2" scope="col">배터리 스펙</th></tr>
									</thead>
									<tbody>
										<tr>
											<td>제조사</td>
											<td>LG</td>
										</tr>
										<tr>
											<td>모델명</td>
											<td>LG BMS</td>
										</tr>
										<tr>
											<td>랙 개수</td>
											<td>12</td>
										</tr>
										<tr>
											<td>설계용량</td>
											<td>1.5MW</td>
										</tr>
										<tr>
											<td>보장 사이클</td>
											<td>4,000</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="col-lg-6 col-md-6">
								<table class="table">
									<thead>
										<tr><th colspan="2" scope="col">배터리 스펙</th></tr>
									</thead>
									<tbody>
										<tr>
											<td>제조사</td>
											<td>LG</td>
										</tr>
										<tr>
											<td>모델명</td>
											<td>LG BMS</td>
										</tr>
										<tr>
											<td>랙 개수</td>
											<td>12</td>
										</tr>
										<tr>
											<td>설계용량</td>
											<td>1.5MW</td>
										</tr>
										<tr>
											<td>보장 사이클</td>
											<td>4,000</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="col-lg-6 col-md-6">
								<table class="table">
									<thead>
										<tr><th colspan="2" scope="col">배터리 스펙</th></tr>
									</thead>
									<tbody>
										<tr>
											<td>제조사</td>
											<td>LG</td>
										</tr>
										<tr>
											<td>모델명</td>
											<td>LG BMS</td>
										</tr>
										<tr>
											<td>랙 개수</td>
											<td>12</td>
										</tr>
										<tr>
											<td>설계용량</td>
											<td>1.5MW</td>
										</tr>
										<tr>
											<td>보장 사이클</td>
											<td>4,000</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12 col-md-12">
						<!-- 랙 lenght별로 뿌려주기 -->
							<ul class="nav nav-justified" role="tablist">
								<li role="presentation" class="active"><a href data-targe="#tab1">1</a></li>
								<li role="presentation" class="active"><a href data-targe="#tab2">2</a></li>
								<li role="presentation" class="active"><a href data-targe="#tab3">3</a></li>
								<li role="presentation" class="active"><a href data-targe="#tab4">4</a></li>
								<li role="presentation" class="active"><a href data-targe="#tab5">5</a></li>
								<li role="presentation" class="active"><a href data-targe="#tab6">6</a></li>
								<li role="presentation" class="active"><a href data-targe="#tab7">7</a></li>
								<li role="presentation" class="active"><a href data-targe="#tab8">8</a></li>
								<li role="presentation" class="active"><a href data-targe="#tab9">9</a></li>
								<li role="presentation" class="active"><a href data-targe="#tab10">10</a></li>
								<li role="presentation" class="active"><a href data-targe="#tab11">11</a></li>
								<li role="presentation" class="active"><a href data-targe="#tab12">12</a></li>
							</ul>
							<div class="tab-content">
								<div role="tabpanel" id="tab1" class="tab-pane active">
									<div class="col-lg-1 col-md-1">
										이미지
									</div>
									<div class="col-lg-2 col-md-2">
										<table class="table">
											<tbody>
												<tr>
													<td>모듈개수</td>
													<td>10</td>
												</tr>
												<tr>
													<td>모듈개수</td>
													<td>10</td>
												</tr>
												<tr>
													<td>모듈개수</td>
													<td>10</td>
												</tr>
												<tr>
													<td>모듈개수</td>
													<td>10</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="col-lg-3 col-md-3">
										<table class="table">
											<tbody>
												<tr>
													<td colspan="2">셀 평균 전압</td>
													<td>10</td>
												</tr>
												<tr>
													<td colspan="2">모듈 평균 온도</td>
													<td>10</td>
												</tr>
												<tr>
													<td rowspan="2">제한 전류-전력</td>
													<td>충전</td>
													<td>10</td>
												</tr>
												<tr>
													<td>방전</td>
													<td>10</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="col-lg-3 col-md-3">
										<table class="table">
											<tbody>
												<tr>
													<td colspan="2">셀 평균 전압</td>
													<td>10</td>
												</tr>
												<tr>
													<td colspan="2">모듈 평균 온도</td>
													<td>10</td>
												</tr>
												<tr>
													<td rowspan="2">제한 전류-전력</td>
													<td>충전</td>
													<td>10</td>
												</tr>
												<tr>
													<td>방전</td>
													<td>10</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="col-lg-3 col-md-3">
										<table class="table">
											<thead>
											    <tr>
													<th colspan="2" scope="col">pcs 결함</th>
											    </tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<ul class="nav nav-justified" role="tablist">
															<li role="presentation" class="active"><a href data-target="#tab1" aria-controls="tab1" role="tab" data-toggle="tab" aria-expanded="true">결함<span class="label"><span class="label-danger">1</span></span></a></li>
															<li role="presentation" class=""><a href data-target="#tab2" aria-controls="tab2" role="tab" data-toggle="tab" aria-expanded="false">위험<span class="label"><span class="label-warning">10</span></span></a></li>
															<li role="presentation" class=""><a href data-target="#tab3" aria-controls="tab3" role="tab" data-toggle="tab" aria-expanded="false">알림<span class="label"><span class="label-success">10</span></span></a></li>
														 </ul>
														<div class="tab-content">
															<div role="tabpanel" id="tab1" class="tab-pane active">
																<h3>결함</h3>
																<p>test content</p>
															</div>
															<div role="tabpanel" id="tab2" class="tab-pane">
																<h3>위험</h3>
																<p>test content1</p>
															</div>
															<div role="tabpanel" id="tab3" class="tab-pane">
																<h3>알림</h3>
																<p>test content2</p>
															</div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
<!-- 		<div class="content-wrapper" id="developMode"> -->
<!-- 			<div class="container-fluid content"> -->
<!-- 				<h3>Battery</h3> -->
<!-- 				<div class="location"> -->
<!-- 					<a href="#"><img src="images/ico_home.gif" alt="홈"></a> -->
<!-- 					<a href="#">Battery</a> -->
<!-- 					<span class="current">Battery 상세</span> -->
<!-- 				</div> -->
<!-- 				<div class="fullWrap"> -->
<!-- 					<p>IP 주소 : 192.168.1.136     port 정보 : 22</p> -->
<!-- 					<div class="bmsWrap"> -->
<!-- 						<div class="bmsBox bBox"> -->
<!-- 							<h6>BMS</h6> -->
<!-- 							<ul> -->
<!-- 								<li> -->
<!-- 									<div class="ico"> -->
<!-- 										<ul class="status"> -->
<!-- 											<li class="greenBg">정상</li> -->
<!-- 											<li class="purpleBg">충전</li> -->
<!-- 										</ul> -->
<!-- 									</div> -->
<!-- 								</li> -->
<!-- 								<li><p>BMS 전압</p><p>{{capped.bms.bsc.dcv}}</p><p>V</p></li> -->
<!-- 								<li><p>BMS 전류</p><p>{{capped.bms.bsc.dca}}</p><p>A</p></li> -->
<!-- 								<li><p>온도</p><p>{{capped.bms.max.moduletm}}/{{capped.bms.min.moduletm}}</p><p>℃</p></li> -->
<!-- 								<li><p>PCS주파수</p><p>{{capped.pcs.rst.hz}}</p><p>㎐</p></li> -->
<!-- 								<li><p>PCS역률</p><p>{{capped.pcs.pf}}</p></li> -->
<!-- 							</ul> -->
<!-- 						</div> -->
<!-- 						<div class="btyBox bBox"> -->
<!-- 							<h6>Battery</h6> -->
<!-- 							<ul> -->
<!-- 								<li> -->
<!-- 									<div class="btyWidth"> -->
<!-- 										<span class="charge" style="width: 20%"></span> -->
<!-- 										<span class="discharge" style="width: 20%"></span> -->
<!-- 									</div> -->
<!-- 									<div class="ico"> -->
<!-- 										<ul class="status"> -->
<!-- 											<li class="greenBg">정상</li> -->
<!-- 											<li class="purpleBg">충전</li> -->
<!-- 										</ul> -->
<!-- 									</div> -->
<!-- 								</li> -->
<!-- 								<li><p>누적 총방전 횟수</p><p>미정</p><p>회</p></li> -->
<!-- 								<li><p>누적 총전량</p><p>{{capped.bms.bsc.limitdcckw}}</p><p>kWh</p></li> -->
<!-- 								<li><p>누적 방전량</p><p>{{capped.bms.bsc.limitdcckw}}</p><p>kWh</p></li> -->
<!-- 								<li><p>SOH</p>{{capped.bms.bsc.soh}}</li> -->
<!-- 							</ul> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 					<div class="bmsTapWrap"> -->

<!-- 						<ul class="nav nav-tabs"> -->
<!-- 							<li class="active" ng-if="capped.bms.racks == ''"> -->
<!-- 								<a data-toggle="tab">There is no RACK information.</a> -->
<!-- 							</li> -->
<!-- 							<li ng-class="{active : toggleIndex == ($index+1)}" ng-repeat="r in capped.bms.racks"> -->
<!-- 								<a data-toggle="tab" ng-click="toggle($index+1)">RACK-{{$index+1}}</a> -->
<!-- 								<i ng-show="r.faults.length != 0">{{r.faults.length}}</i> -->
<!-- 							</li> -->
<!-- <!-- 							<li class="active"><a data-toggle="tab" ng-click="toggle(1)">RACK-1</a></li> --> -->
<!-- <!-- 							<li><a data-toggle="tab" ng-click="toggle(2)">RACK-2</a></li> --> -->
<!-- <!-- 							<li><a data-toggle="tab" href="#menu3">RACK-3</a></li> --> -->
<!-- <!-- 							<li><a data-toggle="tab" href="#menu4">RACK-4</a></li> --> -->
<!-- <!-- 							<li><a data-toggle="tab" href="#menu5">RACK-5</a></li> --> -->
<!-- <!-- 							<li><a data-toggle="tab" href="#menu6">RACK-6</a></li> --> -->
<!-- <!-- 							<li><a data-toggle="tab" href="#menu7">RACK-7</a></li> --> -->
<!-- <!-- 							<li><a data-toggle="tab" href="#menu8">RACK-8</a></li> --> -->
<!-- 						</ul> -->

<!-- 						<div class="tab-content"> -->
<!--  							<div ng-show="toggleIndex == ($index+1)" ng-repeat="r in capped.bms.racks" id="menu{{$index+1}}" class="tab-pane fade in active bBox"> -->
<!-- 								<table width="100%" border="0" cellspacing="0" cellpadding="0" class="basicTable"> -->
<!-- 									<thead> -->
<!-- 									<tr> -->
<!-- 										<th>충/방전 한도</th> -->
<!-- 										<th>모듈 수</th> -->
<!-- 										<th>전압</th> -->
<!-- 										<th>전류</th> -->
<!-- 										<th>온도</th> -->
<!-- 										<th>status</th> -->
<!-- 										<th>fault</th> -->
<!-- 										<th>warning</th> -->
<!-- 									</tr> -->
<!-- 									</thead> -->
<!-- 									<tbody> -->
<!-- 									<tr> -->
<!-- 										<td>{{r.rack.limitca}} / {{r.rack.limitdisca}}</td> -->
<!-- 										<td>{{r.modulecnt}}</td> -->
<!-- 										<td>{{r.rack.dcv}}</td> -->
<!-- 										<td>{{r.rack.dca}}</td> -->
<!-- 										<td>{{r.avg.moduletm}}</td> -->
<!-- 										<td><div ng-repeat="s in r.sts" style="width:20px;background-color:white;margin-right: 2px;">{{s}}</div></td> -->
<!-- 										<td><div ng-repeat="f in r.faults" style="margin-right: 2px;" class="redFt">{{f}}</div></td> -->
<!-- 										<td><div ng-repeat="w in r.warnings" style="margin-right: 2px;" class="orangeFt">{{w}}</div></td> -->
<!-- 									</tr> -->
<!-- 									</tbody> -->
<!-- 								</table> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 					<div class="row"> -->
<!-- 							<div class="col-lg-6"> -->
<!-- 								<div class="bBox chart" style="height:275px !important;"> -->
<!-- 										<h4>Temperature</h4> -->
<!-- 										<div id="Temperature" style="height: 100%;"></div> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="col-lg-6"> -->
<!-- 								<div class="bBox chart" style="height:275px !important;"> -->
<!-- 									<h4>soc</h4>(State of charge) -->
<!-- 									<div id="Soc" style="height: 100%;"></div> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 						<div class="row"> -->
<!-- 							<div class="col-lg-6"> -->
<!-- 								<div class="bBox chart" style="height:275px !important;"> -->
<!-- 									<h4>Voltage</h4> -->
<!-- 									<div id="Voltage" style="height: 100%;"></div> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="col-lg-6"> -->
<!-- 								<div class="bBox chart" style="height:275px !important;"> -->
<!-- 									<h4>Current</h4> -->
<!-- 									<div id="Current" style="height: 100%;"></div> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 				</div> -->

<!-- 			</div> -->
	</body> <!-- /body -->
	<script src="<c:url value='/lib/bootstrap-3.3.7-dist/js/sb-admin.js' />"></script>
</html> <!-- /html -->

