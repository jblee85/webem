<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<div class="content-wrapper">
	<section class="content-header">
	      <h1><b>배터리</b><small>- 배터리 계통 현황, 배터리 운영정보 그리고 Rack 상세정보를 확인할 수 있습니다. </small></h1>
	      <ol class="breadcrumb">
	        <li><a href="#"><i class="fa fa-dashboard"></i>배터리</a></li>
	        <li class="active">배터리</li>
	      </ol>
	</section>
	<!-- Main content -->
	<section class="content container-fluid">
		<div class="dashboardWrap">
			<div class="batteryContentWrap">
				<div class="row">
					<div class="col-lg-6 col-xs-12">
						<div class="svg2 dashBox"  style="text-align: center;" ng-controller="bms_svg_ctrl as bc" resize>
<!-- 							<div ng-include=" './svg/simple/battery_simple.svg'"></div> -->
							<div ng-show="windowWidths > 1200" ng-include="changeSVG('battery')" style="width: 100%;"></div>
							<div ng-show="windowWidths <= 1200" class="appDashWrap">
								<div id="batteryData" class="dashBox appSvgBox dataBoxList">
									<h4>배터리</h4>
									<div>
										<div>
											<p><b>가용전력량</b></p>
											<ul>
												<li><b>{{bms_data.bsc.soc}}</b></li>
												<li>kW</li>
											</ul>
										</div>
										<div>
											<p><b>전류</b></p>
											<ul>
												<li><b>{{ bms_data.bsc.dca }}</b></li>
												<li>A</li>
											</ul>
										</div>
										<div>
											<p><b>전압</b></p>
											<ul>
												<li><b>{{ bms_data.bsc.dcv }}</b></li>
												<li>V</li>
											</ul>
										</div>
										<div>
											<p><b>출력전력</b></p>
											<ul>
												<li><b>{{ bms_data.bsc.dca }}</b></li>
												<li>kW</li>
											</ul>
										</div>
									</div>
									<div class="tableWrap">
										<table>
											<colgroup>
												<col width="10%">
												<col width="50%">
												<col width="40%">
											</colgroup>
											<tr>
												<th rowspan="4">최<br>대<br>값</th>
												<td>셀 전압</td>
												<td><b>{{ bms_data.max.cellv }}</b>V</td>
											</tr>
											<tr>
												<td>위치 (랙-모듈)</td>
												<td><b>{{bms_data.max.rackvno}}</b> - <b>{{bms_data.max.modulevno}}</b></td>
											</tr>
											<tr>
												<td>모듈온도</td>
												<td><b>{{bms_data.max.moduletm}}</b>℃</td>
											</tr>
											<tr>
												<td>위치 (랙-모듈)</td>
												<td><b>{{bms_data.max.racktmno}}</b> - <b>{{bms_data.max.moduletmno}}</b></td>
											</tr>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-6 col-xs-12 dashBoxWrap">
						<div class="row">
							<div class="col-lg-6 col-xs-12">
								<div class="graphWrap dashBox">
									<p>배터리 장치 정보</p>
									<div class="table-responsive">
										<table class="">
											<colgroup>
												<col width="40%">
												<col width="60%">
											</colgroup>
											<tr>
												<th>제조사</th>
												<td>{{batterySpec.corp}}</td><!-- LG화학 -->
											</tr>
											<tr>
												<th>모델명</th>
												<td>{{batterySpec.devs[0].devlname}}</td><!-- ALLINONE -->
											</tr>
											<tr>
												<th>랙 개수</th>
												<td>{{batterySpec.devs[0].rackcnt}}</td><!-- 11 -->
											</tr>
											<tr>
												<th>설계 용량</th>
												<td>{{batterySpec.devs[0].designkw}}kW</td>
											</tr>
											<tr>
												<th>보장 사이클</th>
												<td>{{batterySpec.devs[0].safecycle}}</td><!-- 3000 -->
											</tr>
										</table>
									</div>
								</div>
							</div>
							<div class="col-lg-6 col-xs-12">
								<div class="graphWrap dashBox">
									<p>현재 배터리 세션</p>
									<div class="table-responsive">
										<table class="">
											<colgroup>
												<col width="40%">
												<col width="60%">
											</colgroup>
											<tr>
												<th>충전 시작</th>
												<td>{{essDayLatest | date:'yyyy-MM-dd HH:mm:ss'}}</td>
											</tr>
											<tr>
												<th>운영사이클</th>
												<td>{{essDayCycle}}</td>
											</tr>
											<tr>
												<th>누적사이클</th>
												<td>{{essMonth.e}}</td>
											</tr>
											<tr>
												<th>충전</th>
												<td>{{essMonth.load.ckw}}kWh</td>
											</tr>
											<tr>
												<th>방전</th>
												<td>{{essMonth.load.dsckw}}kWh</td>
											</tr>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-6 col-xs-12" ng-if="isPC">
								<div class="graphWrap dashBox">
									<p>초기 제어</p>
									<div class="table-responsive bmsControler">
										<table class="">
											<colgroup>
												<col width="30%">
												<col width="70%">
											</colgroup>
											<tr>
												<th>결함</th>
												<td>
													<button class="btn-red btn-sm col-lg-10 col-sm-10 col-xs-10" type="button" ng-click="put_ESSChargingStatus(60)">배터리 결함 초기화</button>
												</td>
											</tr>
											<tr>
												<th>동작</th>
												<td>
													<button class="btn-sm col-lg-5 col-sm-5 col-xs-5" ng-class="{'btn-primary btn-on' : bmsData.mode == 1,'btn-trace btn-off' : bmsData.mode != 1}" type="button" ng-click="put_ESSChargingStatus(62)">정지</button>
													<button class="btn-sm col-lg-5 col-sm-5 col-xs-5" style="margin-left:5px;" ng-class="{'btn-primary btn-on' : bmsData.mode == 0,'btn-trace btn-off' : bmsData.mode != 0}" type="button" ng-click="put_ESSChargingStatus(61)">대기</button>
												</td>
											</tr>
										</table>
										<div>
											<ul class="subFont" style="margin-bottom:0;">
												<li>[배터리 결함 초기화]를 통해 결함/위험/알림이 해결 될 수 있는지 EMS 시스템 관리자에게 문의 바랍니다.</li>
												<li>배터리 동작은 장치 초기 설정 시 필요로 합니다.</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div class="col-lg-6 col-xs-12">
								<div class="graphWrap dashBox">
									<p>배터리 결함</p>
									<div class="tabWrap">
										<ul class="nav nav-tabs">
											<li class="active col-lg-4" name="bmsTabs"><a data-toggle="tab" href data-target="#bmsAlert" ng-click="changeClass(0,'bmsTabs','col-lg-4')">알림<span class="label"><span class="label-success" ng-if="bmsData.alrams != null">{{bmsData.alrams.length}}</span></span></a></li>
											<li class="col-lg-4" name="bmsTabs"><a data-toggle="tab" href data-target="#bmsWarning" ng-click="changeClass(1,'bmsTabs','col-lg-4')">위험<span class="label"><span class="label-warning" ng-if="bmsData.warnings != null">{{bmsData.warnings.length}}</span></span></a></li>
											<li class="col-lg-4" name="bmsTabs"><a data-toggle="tab" href data-target="#bmsFault" ng-click="changeClass(2,'bmsTabs','col-lg-4')">결함<span class="label"><span class="label-danger" ng-if="bmsData.faults != null">{{bmsData.faults.length}}</span></span></a></li>
										</ul>

										<div class="tab-content subFont">
											<div id="bmsAlert" class="tab-pane in active">
												<ol>
													<li ng-repeat="alramMsg in bmsData.alrams">
														<p>
<!-- 															<span>yy.mm.dd hh:mm:ss</span> -->
															<span class="alertFont">{{alramMsg}}</span>
														</p>
													</li>
												</ol>
											</div>
											<div id="bmsWarning" class="tab-pane">
												<ol>
													<li ng-repeat="warningMsg in bmsData.warnings">
														<p>
<!-- 															<span>yy.mm.dd hh:mm:ss</span> -->
															<span class="warningFont">{{warningMsg}}</span>
														</p>
													</li>
												</ol>
											</div>
											<div id="bmsFault" class="tab-pane">
												<ol>
													<li ng-repeat="faultMsg in bmsData.faults">
														<p>
															<span class="dangerFont">{{faultMsg}}</span>
														</p>
													</li>
												</ol>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div>
						<div class="graphWrap dashBox">
							<p>랙 상세정보</p>
							<div class="tabWrap rackTab">
								<ul class="nav nav-tabs">
									<li class="col-lg-1" ng-class="{'active' : rackId == $index}" ng-click="changeClass($index,'RackTabs','col-lg-1')" name="RackTabs" ng-repeat="rack in bmsData.racks">
										<a data-toggle="tab" href data-target="#rack{{$index}}">R-{{$index+1}}
											<span class="label"><span class="label-success" ng-if="rack.alrams != null">{{rack.alrams.length}}</span></span>
											<span class="label"><span class="label-warning" ng-if="rack.warnings != null">{{rack.warnings.length}}</span></span>
											<span class="label"><span class="label-danger" ng-if="rack.faults != null">{{rack.faults.length}}</span></span>
										</a>
									</li>
								</ul>

								<div ng-if="rackId == $index" class="tab-content" ng-repeat="r in bmsData.racks">
									<div id="rack{{$index}}" class="tab-pane in active">
										<div class="col-lg-3 col-sm-12">
											<div>
												<div ng-include="changeSVG('rack')" style="width: 100%;"></div>
											</div>
											<table class="">
												<tr>
													<th>모듈 개수</th>
													<td>{{r.modulecnt}}</td>
												</tr>
												<tr>
													<th>상태</th>
													<td>{{r.sts}}</td>
												</tr>
												<tr>
													<th>DC 전압</th>
													<td>{{r.rack.dcv}}V</td>
												</tr>
												<tr>
													<th>DC 전류</th>
													<td>{{r.rack.dca}}A</td>
												</tr>
											</table>
										</div>
										<div class="col-lg-6 col-sm-12">

											<table class="">
												<tr>
													<th colspan="2">셀 평균 전압</th>
													<td>{{r.avg.cellv}} V</td>
												</tr>
												<tr>
													<th colspan="2">모듈 평균 온도</th>
													<td>{{r.avg.moduletm}} ℃</td>
												</tr>
												<tr>
													<th rowspan="2">제한 전류-전력</th>
													<th>충전</th>
													<td>{{r.rack.limitca}}A-{{r.rack.limitdcckw}}KW</td>
												</tr>
												<tr>
													<th>방전</th>
													<td>{{r.rack.limitdisca}}A-{{r.rack.limitdisckw}}KW</td>
												</tr>
											</table>
											<table class="">
												<tr>
													<th colspan="3">최대 값</th>
												</tr>
												<tr>
													<th>구분</th>
													<th>값</th>
													<th>모듈위치</th>
												</tr>
												<tr>
													<th>셀 전압</th>
													<td>{{r.max.cellv}}V</td>
													<td>{{r.max.cellvno}}</td>
												</tr>
												<tr>
													<th>모듈 온도</th>
													<td>{{r.max.moduletm}} ℃</td>
													<td>{{r.max.moduletmno}}</td>
												</tr>
											</table>
										</div>
										<div class="col-lg-3 col-sm-12 innerTab">
											<ul class="nav nav-tabs">
													<li class="col-lg-4" ng-class="{'active' : rackIndex==0}" name="rackTabs"><a ng-click="changeRackTab(0)">알림<span class="label"><span class="label-success" ng-if="r.alrams != null">{{r.alrams.length}}</span></span></a></li>
													<li class="col-lg-4" ng-class="{'active' : rackIndex==1}" name="rackTabs"><a ng-click="changeRackTab(1)">위험<span class="label"><span class="label-warning" ng-if="r.warnings != null">{{r.warnings.length}}</span></span></a></li>
													<li class="col-lg-4" ng-class="{'active' : rackIndex==2}" name="rackTabs"><a ng-click="changeRackTab(2)">결함<span class="label"><span class="label-danger" ng-if="r.faults != null">{{r.faults.length}}</span></span></a></li>
												</ul>

												<div class="tab-content subFont">
													<div ng-show="rackIndex == 0" id="rack-1-Alert">
														<ol>
															<li ng-repeat="ra in r.alrams">
																<p><span class="dangerFont">{{ra}}</span></p>
															</li>
														</ol>
													</div>
													<div ng-show="rackIndex == 1" id="rack-1-Warning">
														<ol>
															<li ng-repeat="rw in r.warnings">
																<p><span class="warningFont">{{rw}}</span></p>
															</li>
														</ol>
													</div>
													<div ng-show="rackIndex == 2" id="rack-1-Fault">
														<ol>
															<li ng-repeat="rf in r.faults">
																<p><span class="alertFont">{{rf}}</span></p>
															</li>
														</ol>
													</div>
												</div>
										</div>
									</div>
									<div id="battery2" class="tab-pane">

									</div>
									<div id="battery3" class="tab-pane">

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-4 col-xs-12">
						<div class="graphWrap dashBox">
							<p>배터리 세션 SOC</p>
							<div class="graph" id="bmsSOC"></div>
						</div>
					</div>
					<div class="col-lg-4 col-xs-12">
						<div class="graphWrap dashBox">
							<p>배터리 전압 전류</p>
							<div class="graph" id="bmsDcaDcv"></div>
						</div>
					</div>
					<div class="col-lg-4 col-xs-12">
						<div class="graphWrap dashBox">
							<p>최대 온도, 전압</p>
							<div class="graph" id="bmsTemp"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- /.content -->
</div>
<!-- /.content-wrapper -->