<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<div class="content-wrapper" style="min-height: 897px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        <b>PCS</b>
        <small>- PCS 전력 계통 운영현황 및 주요 PCS 운영 정보를 확인할 수 있습니다.</small>
      </h1>
      <ol class="breadcrumb">
        <li><a ui-sref="pcsDetail" href="#"><i class="fa fa-dashboard"></i> PCS</a></li>
        <li class="active">PCS</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
    	<div class="dashboardWrap">
			<div class="pcsContentWrap">
				<div class="row">
					<div class="col-lg-8 col-xs-12">
						<div class="svg2 dashBox" style="text-align: center;" ng-controller="pcs_svg_ctrl as psvg" resize>
<!-- 							<div ng-include=" './svg/simple/pcs_simple.svg'"></div> -->
							<div ng-show="windowWidths > 1200" ng-include="changeSVG('pcs')" style="width: 100%;"></div>
							<div ng-show="windowWidths <= 1200" class="appDashWrap">
								<div id="pcsData" class="dashBox appSvgBox dataBoxList">
									<h4>PCS</h4>
									<div class="">
										<div class="">
											<p><b>{{ pcsStatusKR | uppercase }}</b></p>
											<ul>
												<li><b>{{ pcs_data.pkw }}</b></li>
												<li>kW</li>
											</ul>
										</div>
										<div>
											<p><b>주파수</b></p>
											<ul>
												<li><b>{{ pcs_data.hz }}</b></li>
												<li>Hz</li>
											</ul>
										</div>
										<div>
											<p><b>표면온도</b></p>
											<ul>
												<li><b>{{ pcs_data.tm }}</b></li>
												<li>℃</li>
											</ul>
										</div>
										<div>
											<p><b>역률</b></p>
											<ul>
												<li><b>19.3</b></li>
												<li>kW</li>
											</ul>
										</div>
										<div>
											<p><b>DC 전압</b></p>
											<ul>
												<li><b>{{ pcs_data.dcv }}</b></li>
												<li>V</li>
											</ul>
										</div>
										<div>
											<p><b>제어모드</b></p>
											<ul>
												<li><b>{{ pcs_data.mode }}</b></li>
												<li>mode</li>
											</ul>
										</div>
									</div>
									<div class="tableWrap">
										<table>
											<colgroup>
												<col width="20%">
												<col width="40%">
												<col width="40%">
											</colgroup>
											<tr>
												<th>R</th>
												<td><b>{{ pcs_data.rst_rv }}</b>V</td>
												<td><b>{{ pcs_data.rst_ra }}</b>A</td>
											</tr>
											<tr>
												<th>S</th>
												<td><b>{{ pcs_data.rst_sv }}</b>V</td>
												<td><b>{{ pcs_data.rst_sa }}</b>A</td>
											</tr>
											<tr>
												<th>T</th>
												<td><b>{{ pcs_data.rst_tv }}</b>V</td>
												<td><b>{{ pcs_data.rst_ta }}</b>A</td>
											</tr>
										</table>
									</div>
								</div>
								<div id="" class="dashBox appSvgBox dataBoxList">
									<h4>통신상태</h4>
									<div>
										<div>
											<p><b>수신주기</b></p>
											<ul>
												<li><b>{{connectPeriod}}</b></li>
												<li>ms</li>
											</ul>
										</div>
										<div>
											<p><b>수신성능</b></p>
											<ul>
												<li><b>{{connectTPS | number : 3}}</b></li>
												<li>TPS</li>
											</ul>
										</div>
										<div>
											<p><b>최근수신</b></p>
											<ul>
												<li><b>{{connectLastTime}}</b></li>
												<li>분</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-xs-12" ng-if="isPC">
						<div class="svg2 dashBox">
							<div class="tabWrap pcsControler">
								<ul class="nav nav-tabs">
									<li class="active col-lg-4" name="pcsCtrlTabs"><a data-toggle="tab" href data-target="#scheduleControl" ng-click="changeClass(0,'pcsCtrlTabs','panel')">스케줄 제어</a></li>
									<li class="col-lg-4" name="pcsCtrlTabs"><a data-toggle="tab" href data-target="#manualControl" ng-click="changeClass(1,'pcsCtrlTabs','panel')">수동 제어</a></li>
									<li class="col-lg-4" name="pcsCtrlTabs"><a data-toggle="tab" href data-target="#setting"  ng-click="changeClass(2,'pcsCtrlTabs','panel')">설정</a></li>
<!-- hide기능 -->						<li class="col-lg-4" name="pcsCtrlTabs"><a data-toggle="tab" href data-target="#pcsRestart" ng-click="changeClass(3,'pcsCtrlTabs','panel')" ng-hide="true">재 시작</a></li>
								</ul>
								<div class="tab-content">
									<div id="scheduleControl" class="tab-pane in active">
										<div class="graphWrap table-responsive">
											<table class="dashTable1 table-hover">
												<tbody>
													<tr>
														<th>운전 정보</th>
														<td>
															<span ng-show="controlMode == 'schedule'">스케줄제어 - {{scModel.data.scname}}</span>
															<span ng-show="controlMode == 'manual' && pcsData.st == 0">수동제어 - 정지</span>
															<span ng-show="controlMode == 'manual' && pcsData.st == 1">수동제어 - 대기</span>
															<span ng-show="controlMode == 'manual' && pcsData.st == 2">수동제어 - 충전 {{pcsData.pkw}}kW</span>
															<span ng-show="controlMode == 'manual' && pcsData.st == 3">수동제어 - 방전 {{pcsData.pkw}}kW</span>
														</td>
													</tr>
													<tr>
														<th>SOC 모드</th>
														<td>
															<span>{{socctrmode.text}}</span>
														</td>
													</tr>
													<tr>
														<th>스케줄 선택</th>
														<td>
															<select class="form-control" ng-model="scModel" ng-options="s as s.data.scname for s in scheduleList" ng-disabled="controlMode == 'schedule' || currentUser.authlv != 3">
															</select>
															<a ng-if="currentUser.authlv == 3" ui-sref="scheduleManagement" href="/scheduleManagement"><i class="icoLink"></i></a>
														</td>
													</tr>
												</tbody>
											</table>
											<div>
												<ul class="subFont">
													<li ng-if="panelMsg == 'init'">등록된 스케줄을 선택하여 PCS를 자동으로 운전할 수 있습니다.</li>
<!-- 													<li ng-if="panelMsg == 'init'">스케줄을 추가, 수정을 하는 경우 스케줄 편집 기능을 이용하세요.</li> -->
													<li ng-if="panelMsg == 'soc'">적절한 SOC 제한 모드 설정은 배터리의 수명을 연장 할 수 있습니다.</li>
													<li ng-if="panelMsg == 'soc'">배터리 보호 모드는 배터리의 사용 범위가 줄어 전력요금 절감이 감소 합니다.</li>
													<li ng-if="controlMode == 'schedule' && panelMsg == 'stop'">[스케줄제어 - {{scModel.data.scname}}]에서 [대기]로 변경하시겠습니까?</li>
													<li ng-if="controlMode == 'manual' && panelMsg == 'save'">[수동제어 - 대기]에서 [{{scModel.data.scname}}]로 변경하시겠습니까?</li>
													<li ng-if="panelMsg == 'stopped'">[스케줄제어 - {{tempObj.data.scname}}]에서 [대기]로 변경이 완료되었습니다.</li>
													<li ng-if="controlMode == 'schedule' && panelMsg == 'saved'">[수동제어 - 대기]에서 [{{scModel.data.scname}}]로 변경이 완료되었습니다.</li>
													<li ng-if="panelMsg == 'init' || panelMsg == 'saved'">스케줄 변경은 현재 작동중인 스케줄 또는 수동제어 모드의 대기 후에 변경이 가능합니다.</li>
												</ul>
											</div>
											<div class="buttonWrap">
												<button class="btn btn-red btn-sm" type="button" ng-if="panelMsg == 'init' || panelMsg == 'soc' || panelMsg == 'stopped' || panelMsg == 'saved'" ng-click="changePanelMsg('stop')" ng-disabled="controlMode == 'manual' || currentUser.authlv != 3">대기</button>
												<button class="btn btn-trace btn-sm" type="button" ng-if="panelMsg == 'init' || panelMsg == 'soc' || panelMsg == 'stopped' || panelMsg == 'saved'" ng-click="changePanelMsg('save')" ng-disabled="controlMode == 'schedule' || pcsData.st == 2 || pcsData.st == 3 || pcsData.st == 4 || currentUser.authlv != 3">적용</button>
												<button class="btn btn-red btn-sm" type="button" ng-if="panelMsg == 'stop' || panelMsg == 'save'" ng-click="changePanelMsg('init')">아니오</button>
												<button class="btn btn-primary btn-sm" type="button" ng-if="panelMsg == 'stop'" ng-click="putCtrlPanel('schedule','stop',scModel); $event.preventDefault();">네</button>
												<button class="btn btn-primary btn-sm" type="button" ng-if="panelMsg == 'save'" ng-click="putCtrlPanel('schedule','save',scModel); $event.preventDefault();">네</button>
											</div>
										</div>
									</div>
									<div id="manualControl" class="tab-pane">
										<div class="graphWrap table-responsive">
											<table class="dashTable1 table-hover">
												<tbody><tr>
													<th>운전 정보</th>
													<td>
														<span ng-show="controlMode == 'schedule'">스케줄제어 - {{scModel.data.scname}}</span>
														<span ng-show="controlMode == 'manual' && pcsData.st == 0">수동제어 - 정지</span>
														<span ng-show="controlMode == 'manual' && pcsData.st == 1">수동제어 - 대기</span>
														<span ng-show="controlMode == 'manual' && pcsData.st == 2">수동제어 - 충전 {{pcsData.pkw}}kW</span>
														<span ng-show="controlMode == 'manual' && pcsData.st == 3">수동제어 - 방전 {{pcsData.pkw}}kW</span>
													</td>
												</tr>
												<tr>
													<th>SOC 모드</th>
													<td>
														<span>{{socctrmode.text}}</span>
													</td>
												</tr>
												<tr>
													<th>출력</th>
													<td>
														<input type="text" class="form-control" placeholder="숫자를 입력해주세요 (1~{{maxpkw}})" ng-model="mOutput" ng-disabled="(panelMsg == 'stop' || panelMsg == 'charge' || panelMsg == 'discharge' || currentUser.authlv != 3)" ng-required="true" ng-pattern="/^\d+$/" ng-keyup="mOutputCheck(mOutput);">
														 kW<br/>
														 <div class="alertBox">
															<span ng-bind-html="mOutputValid"></span>
														</div>
													</td>
												</tr>
											</tbody></table>
											<div>
												<ul class="subFont">
													<li ng-if="panelMsg == 'init'">PCS 최대 출력량 ({{maxpkw}}kW) 이 초과되지 않는 값을 입력하여 주세요.</li>
													<li ng-if="panelMsg == 'init'">수동 제어 운영 시, 과 충/방전 설정에 의해 자동으로 [대기]가 될 수 있습니다.</li>
													<li ng-if="panelMsg == 'soc'">적절한 SOC 제한 모드 설정은 배터리의 수명을 연장 할 수 있습니다.</li>
													<li ng-if="panelMsg == 'soc'">배터리 보호모드는 배터리의 사용 범위가 줄어 전력요금 절감이 감소합니다.</li>
													<li ng-if="panelMsg == 'stop'">[
														<span ng-show="controlMode == 'schedule'">스케줄제어 - {{scModel.data.scname}}</span>
														<span ng-show="controlMode == 'manual' && pcsData.st == 1">수동제어 - 대기</span>
														<span ng-show="controlMode == 'manual' && pcsData.st == 2">수동제어 - 충전 {{pcsData.pkw}}kW</span>
														<span ng-show="controlMode == 'manual' && pcsData.st == 3">수동제어 - 방전 {{pcsData.pkw}}kW</span>
													]에서 [대기]로 변경하시겠습니까?
													</li>
													<li ng-if="panelMsg == 'charge'">[
														<span ng-show="controlMode == 'manual' && pcsData.st == 1">수동제어 - 대기</span>
														<span ng-show="controlMode == 'manual' && pcsData.st == 2">수동제어 - 충전 {{pcsData.pkw}}kW</span>
														<span ng-show="controlMode == 'manual' && pcsData.st == 3">수동제어 - 방전 {{pcsData.pkw}}kW</span>
														]에서 [수동제어 - 충전 {{mOutput}}kW]로 변경하시겠습니까?
													</li>
													<li ng-if="panelMsg == 'discharge'">[
														<span ng-show="controlMode == 'manual' && pcsData.st == 1">수동제어 - 대기</span>
														<span ng-show="controlMode == 'manual' && pcsData.st == 2">수동제어 - 충전 {{pcsData.pkw}}kW</span>
														<span ng-show="controlMode == 'manual' && pcsData.st == 3">수동제어 - 방전 {{pcsData.pkw}}kW</span>
													]에서 [수동제어 - 방전 {{mOutput}}kW]로 변경하시겠습니까?
													</li>
													<li ng-if="controlMode == 'schedule' && panelMsg == 'stopped'">[스케줄제어 - {{tempObj.data.scname}}]에서 [{{newSname}}]로 변경이 완료되었습니다.</li>
													<li ng-if="controlMode == 'manual' && panelMsg == 'stopped'">[수동제어 - {{tempSt}}]에서 [{{newSname}}]로 변경이 완료되었습니다.</li>
													<li ng-if="controlMode == 'manual' && panelMsg == 'charged'">[수동제어 - {{tempSt}}]에서 [{{newSname}}]로 변경이 완료되었습니다.</li>
													<li ng-if="controlMode == 'manual' && panelMsg == 'discharged'">[수동제어 - {{tempSt}}]에서 [{{newSname}}]로 변경이 완료되었습니다.</li>
<!-- 													<li ng-if="controlMode == 'schedule'">현재 스케줄을 대기한 후에 충/방전을 해주세요.</li> -->
												</ul>
											</div>
											<div class="buttonWrap">
												<button class="btn btn-red btn-sm" type="button" ng-if="panelMsg == 'init' || panelMsg == 'soc' || panelMsg == 'stopped' || panelMsg == 'charged' || panelMsg == 'discharged'" ng-click="changePanelMsg('stop')" ng-disabled="controlMode == 'schedule' || currentUser.authlv != 3">대기</button>
												<button class="btn btn-primary btn-sm" type="button" ng-if="panelMsg == 'init' || panelMsg == 'soc' || panelMsg == 'stopped' || panelMsg == 'charged' || panelMsg == 'discharged'" ng-click="changePanelMsg('charge')" ng-disabled="controlMode == 'schedule' || currentUser.authlv != 3 || disableAction">충전</button>
												<button class="btn btn-trace btn-sm" type="button" ng-if="panelMsg == 'init' || panelMsg == 'soc' || panelMsg == 'stopped' || panelMsg == 'charged' || panelMsg == 'discharged'" ng-click="changePanelMsg('discharge')" ng-disabled="controlMode == 'schedule' || currentUser.authlv != 3 || disableAction">방전</button>
												<button class="btn btn-red btn-sm" type="button" ng-if="panelMsg == 'stop' || panelMsg == 'charge' || panelMsg == 'discharge'" ng-click="changePanelMsg('init')">아니오</button>
												<button class="btn btn-primary btn-sm" type="button" ng-if="panelMsg == 'stop'" ng-click="putCtrlPanel('manual','stop',''); $event.preventDefault();">네</button>
												<button class="btn btn-primary btn-sm" type="button" ng-if="panelMsg == 'charge'" ng-click="putCtrlPanel('manual','charge',mOutput); $event.preventDefault();">네</button>
												<button class="btn btn-primary btn-sm" type="button" ng-if="panelMsg == 'discharge'" ng-click="putCtrlPanel('manual','discharge',mOutput); $event.preventDefault();">네</button>
											</div>
										</div>
									</div>
									<div id="setting" class="tab-pane">
										<div class="graphWrap table-responsive">
											<table class="dashTable1 table-hover">
												<tbody>
												<tr>
													<th>PCS 결함</th>
													<td>
														<button class="btn-red btn-sm col-lg-10 col-sm-5 col-xs-5" type="button" ng-disabled="currentUser.authlv != 3" ng-click="put_ESSChargingStatus(20)">PCS 결함 초기화</button>
													</td>
												</tr>
												<tr>
													<th>PCS 동작</th>
													<td>
														<button class="btn-sm col-lg-5 col-sm-5 col-xs-5" ng-disabled="currentUser.authlv != 3" ng-class="{'btn-primary btn-on' : pcsData.st == 0,'btn-trace btn-off' : pcsData.st != 0}" type="button" ng-click="put_ESSChargingStatus(11)">정지</button>
														<button class="btn-sm col-lg-5 col-sm-5 col-xs-5" ng-disabled="currentUser.authlv != 3" style="margin-left:5px;" ng-class="{'btn-primary btn-on' : pcsData.st == 1,'btn-trace btn-off' : pcsData.st != 1}" type="button" ng-click="put_ESSChargingStatus(10)">대기</button>
													</td>
												</tr>
												<tr>
													<th>제어권</th>
													<td>
														<button class="btn-sm col-lg-5 col-sm-5 col-xs-5" ng-disabled="currentUser.authlv != 3" ng-class="{'btn-primary btn-on' : pcsData.permission != 2,'btn-trace btn-off' : pcsData.permission == 2}" type="button" ng-click="put_ESSChargingStatus(22)">PCS 제어</button>
														<button class="btn-sm col-lg-5 col-sm-5 col-xs-5" ng-disabled="currentUser.authlv != 3" style="margin-left:5px;" ng-class="{'btn-primary btn-on' : pcsData.permission == 2, 'btn-trace btn-off' : pcsData.permission != 2}" type="button" ng-click="put_ESSChargingStatus(23)">EMS 제어</button>
													</td>
												</tr>
											</tbody></table>
											<div>
												<ul class="subFont" style="height:125px;">
													<li ng-if="panelMsg == 'init'">[PCS 결함 초기화]를 통해 결함/위험/알림이 해결 될 수 있는지 EMS 시스템 관리자에게 문의 바랍니다.</li>
													<li ng-if="panelMsg == 'init'">PCS 동작과 제어권은 장치 초기 설정 시 필요로 합니다.</li>
													<li ng-if="panelMsg == 'confirm'">[{{actionText}}]를 하시겠습니까?</li>
													<li ng-if="panelMsg == 'changing'">[{{actionText}}]가 진행 중입니다.(20~30초 가량 소요됩니다.)</li>
													<li ng-if="panelMsg == 'saved'">[{{actionText}}]가 완료 되었습니다.</li>
													<li ng-if="panelMsg == 'fail'">[{{actionText}}] 명령이 실패 하였습니다. 통신 상태를 점검하세요.</li>
												</ul>
											</div>
											<div class="buttonWrap">
												<button class="btn btn-trace btn-sm" type="button" ng-if="panelMsg == 'confirm'" ng-click="put_ESSChargingStatus_confrim(); $event.preventDefault();">네</button>
												<button class="btn btn-trace btn-sm" type="button" ng-if="panelMsg == 'confirm'" ng-click="changePanelMsg('init')">아니오</button>
											</div>
										</div>
									</div>
									<div id="pcsRestart" class="tab-pane">
										<div class="graphWrap table-responsive">
											<table class="dashTable1 table-hover">
												<tbody><tr>
													<th>운전 정보</th>
													<td><span>{{currentSname}}</span></td>
												</tr>
												<tr>
													<th>PCS 결함</th>
													<td>
														<span class="label"><span class="label-success" ng-model="pcsData.alrams">{{pcsData.alrams.length}}</span></span>
														<span class="label"><span class="label-warning" ng-model="pcsData.warnings">{{pcsData.warnings.length}}</span></span>
														<span class="label"><span class="label-danger" ng-model="pcsData.faults">{{pcsData.faults.length}}</span></span>
													</td>
												</tr>
												<tr>
													<th>BMS 결함</th>
													<td>
														<span class="label"><span class="label-success" ng-model="bmsData.alrams">{{bmsData.alrams.length}}</span></span>
														<span class="label"><span class="label-warning" ng-model="bmsData.warnings">{{bmsData.warnings.length}}</span></span>
														<span class="label"><span class="label-danger" ng-model="bmsData.faults">{{bmsData.faults.length}}</span></span>
													</td>
												</tr>
											</tbody></table>
											<div>
												<ul class="subFont">
													<li ng-if="panelMsg == 'init'">PCS 또는 BMS를 [재 시작]시 PCS 운전 제어가 [대기]됩니다.</li>
													<li ng-if="panelMsg == 'init'">[재 시작]으로 위험/경고/알람이 해결 될 수 있는지 EMS 시스템 관리자에게 문의 바랍니다.</li>
													<li ng-if="panelMsg == 'resetpcs'">[PCS 재시작]하시겠습니까?</li>
													<li ng-if="panelMsg == 'resetbms'">[BMS 재시작]하시겠습니까?</li>
													<li ng-if="panelMsg == 'pcsreset'">[PCS 재시작]이 완료되었습니다.</li>
													<li ng-if="panelMsg == 'bmsreset'">[BMS 재시작]이 완료되었습니다.</li>
												</ul>
											</div>
											<div class="buttonWrap">
												<button class="btn btn-red btn-sm" type="button" ng-if="panelMsg == 'init' || panelMsg == 'pcsreset' || panelMsg == 'bmsreset'" ng-click="changePanelMsg('resetpcs')" ng-disabled="pcsData.faults.length == 0">PCS 재 시작</button>
												<button class="btn btn-red btn-sm" type="button" ng-if="panelMsg == 'init' || panelMsg == 'pcsreset' || panelMsg == 'bmsreset'" ng-click="changePanelMsg('resetbms')" ng-disabled="bmsData.faults.length == 0">BMS 재 시작</button>
												<button class="btn btn-primary btn-sm" type="button" ng-if="panelMsg == 'resetpcs'" ng-click="putCtrlPanel('reset','pcs'); $event.preventDefault();">네</button>
												<button class="btn btn-primary btn-sm" type="button" ng-if="panelMsg == 'resetbms'" ng-click="putCtrlPanel('reset','bms'); $event.preventDefault();">네</button>
												<button class="btn btn-red btn-sm" type="button" ng-if="panelMsg == 'resetpcs' || panelMsg == 'resetbms'" ng-click="changePanelMsg('init')">아니오</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-3 col-xs-12">
						<div class="graphWrap dashBox">
							<p>PCS 스펙</p>
							<table class="table-hover">
								<tbody><tr>
									<th>제조사</th>
									<td>{{pcsSpec.corp}}</td>
								</tr>
								<tr>
									<th>모델명</th>
									<td>{{pcsSpec.devs[0].devlname}}</td>
								</tr>
								<tr>
									<th>IP주소</th>
									<td>{{pcsSpec.devs[0].ipaddr}}</td>
								</tr>
								<tr>
									<th>Port</th>
									<td>{{pcsSpec.devs[0].port}}</td>
								</tr>
								<tr>
									<th>최대 출력전력</th>
									<td>{{pcsSpec.devs[0].maxpkw}} kW</td>
								</tr>
							</tbody></table>
						</div>
					</div>
					<div class="col-lg-3 col-xs-12">
						<div class="graphWrap dashBox">
							<p>오늘 PCS 운전 비율</p>
							<div id="pcsOperTime" class="graph"></div>
						</div>
					</div>
					<div class="col-lg-3 col-xs-12">
						<div class="graphWrap dashBox">
							<p>PCS 결함</p>
							<div class="tabWrap">
								<ul class="nav nav-tabs" role="tablist">
									<li class="active col-lg-4" name="pcsTabs">
										<a href data-target="#pcsWarn" data-toggle="tab" ng-click="changeClass(0,'pcsTabs')" ng-model="pcsData.alrams">알림
											<span class="label">
												<span class="label-success" ng-hide="pcsData.alrams == null">{{pcsData.alrams.length}}</span>
											</span>
										</a>
									</li>

									<li class="col-lg-4" name="pcsTabs">
										<a href data-target="#pcsDanger" data-toggle="tab" ng-click="changeClass(1,'pcsTabs')" ng-model="pcsData.warnings">위험
											<span class="label">
												<span class="label-warning" ng-hide="pcsData.warnings == null">{{pcsData.warnings.length}}</span>
											</span>
										</a>
									</li>
									<li class="col-lg-4" name="pcsTabs">
										<a href data-target="#pcsError" data-toggle="tab" ng-click="changeClass(2,'pcsTabs')" ng-model="pcsData.faults">결함
											<span class="label">
												<span class="label-danger" ng-hide="pcsData.faults == null">{{pcsData.faults.length}}</span>
											</span>
										</a>
									</li>
								</ul>
								<div class="tab-content subFont">
									<div role="tabpanel" id="pcsWarn" class="tab-pane active">
										<ol>
											<li ng-repeat="alramsMsg in pcsData.alrams" ng-hide="pcsData.alrams == null"><p><span class="alertFont">{{alramsMsg}}</span></p></li>
											<li ng-show="pcsData.alrams == null"><p><span>알림 내역이 없습니다.</span></p>
										</ol>
									</div>

									<div role="tabpanel" id="pcsDanger" class="tab-pane">
										<ol>
											<li ng-repeat="warningMsg in pcsData.warnings" ng-hide="pcsData.warnings == null"><p><span class="warningFont">{{warningMsg}}</span></p></li>
											<li ng-show="pcsData.warnings == null"><p><span>위험 내역이 없습니다.</span></p></li>
										</ol>
									</div>
									<div role="tabpanel" id="pcsError" class="tab-pane">
										<ol>
											<li ng-repeat="faultMsg in pcsData.faults" ng-hide="pcsData.faults == null"><p><span class="dangerFont">{{faultMsg}}</span></p></li>
											<li ng-show="pcsData.faults == null"><p><span>결함 내역이 없습니다.</span></p></li>
										</ol>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-xs-12">
						<div class="graphWrap dashBox boxTextOverflow rightBtnSet essTimeline">
							<p>타임라인 - 사용자 제어</p>
							<div class="aWrap"><button type="button"><i class="icoRefresh" ng-click="reloadTimeline();"></i></button><a ui-sref="timeline" href="/timeline"><i class="icoLink"></i></a></div>
							<div class="table">
								<table class="">
									<colgroup>
										<col width="40%">
										<col width="60%">
									</colgroup>
									<thead>
										<tr>
											<th>시간</th>
											<th>제목</th>
										</tr>
									</thead>
								</table>
							</div>
							<div class="table-responsive tableBody">
								<table class="table-hover">
									<colgroup>
										<col width="40%">
										<col width="60%">
									</colgroup>
									<tbody>
										<tr ng-repeat="ehl in essHistoryList | orderBy:'-ehl.cdt' | limitTo: 20">
											<td style="white-space:nowrap;">{{ehl.cdt | date:'yyyy-MM-dd HH:mm:ss'}}</td>
											<td style="white-space:nowrap;">{{ehl.title}}</td>
										</tr>

									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-6 col-xs-12">
						<div class="graphWrap dashBox">
							<p>PCS 3상 RST</p>
							<div id="pcsRST" class="graph"></div>
						</div>
					</div>
					<div class="col-lg-6 col-xs-12">
						<div class="graphWrap dashBox">
							<p>PCS DC전압, 주파수</p>
							<div id="pcsVHz" class="graph"></div>
						</div>
					</div>
				</div>
			</div>
        </div>
    </section>
    <!-- /.content -->
  </div>