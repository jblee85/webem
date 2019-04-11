<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<style>
.selectcmd{
	background-color:red !important;
}
</style>
<div class="content-wrapper">
    <section class="content-header">
      <h1>
        <b>스케줄 관리</b>
        <small>스케줄 관리</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
        <li class="active">Here</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
    	<div class="dashboardWrap">
			<div class="scheduleContentWrap">
				<div class="row">
					<div class="col-lg-9 col-xs-12 scheduleContent">
						<div class="graphWrap dashBox boxTextOverflow rightBtnSet">
							<p>PCS 운전 스케줄</p>
							<div class="aWrap">
								<button ng-click="addSchedulePCS()"><i class="icoAdd"></i></button>
								<button ng-click="delSchedulePCS()"><i class="icoDel"></i></button>
							</div>
							<div class="table headTable">
								<table>
									<colgroup>
										<col width="8%">
										<col width="20%">
										<col width="20%">
										<col width="15%">
										<col width="20%">
										<col width="15%">
									</colgroup>
									<thead>
										<tr>
											<th><div class="checkboxWrap"><input type="checkbox" ng-model="selectAllSchedulePCS" ng-change="checkAllSchedulePCS()"></div></th>
											<th>스케줄</th>
											<th>PCS</th>
											<th>운전 가능</th>
											<th>휴일 적용<a ui-sref="holidayManagement" href="/holidayManagement"><i class="icoLink"></i></a></th>
											<th>운전 적용</th>
										</tr>
									</thead>
								</table>
							</div>
							<div class="table table-responsive">
								<table class="table-hover tableBody">
									<colgroup>
										<col width="8%">
										<col width="20%">
										<col width="20%">
										<col width="15%">
										<col width="20%">
										<col width="15%">
									</colgroup>
									<tbody>
										<tr ng-class="{active : selectedSchedule == s.id}" ng-repeat="s in scheduleList" ng-click="getsScheduleMonth(s.id)">
											<td><input type="checkbox" ng-model="s.selected"></td>
											<td><input type="text" class="form-control" ng-model="s.data.scname"></input></td>

											<td>
												<div class="pcsNameWrap" ng-repeat="sdd in s.data.devs"><p>{{sdd.devlname}}</p></div>
												<div class="aWrap"><button type="button" ng-click="addPCS($index,s.data.devs)"><i class="icoAdd"></i></button></div></td>
											<td><span ng-class="{primaryFont : s.data.validated, dangerFont : !s.data.validated}">{{s.data.validated ? 'O' : 'X'}}</span></td>
											<td>
												<div class="flipSwitch">
													<input type="checkbox" name="flipSwitch" class="flipSwitch-checkbox" id="{{'check_off_'+$index}}" ng-model="s.data.holyday" ng-checked="s.data.holyday" />
													<label class="flipSwitch-label" for="{{'check_off_'+$index}}">
														<span class="flipSwitch-switch"></span>
														<span class="flipSwitch-inner"></span>
													</label>
												</div>
											</td>
											<td><span ng-class="{primaryFont : s.data.run, dangerFont : !s.data.run}">{{s.data.run ? 'O' : 'X'}}</span></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-3 col-xs-12">
								<div class="graphWrap dashBox boxTextOverflow" id="monthSchedule">
									<p>{{selectedScheduleName}} - 월 적용 타임 스케줄</p>
									<table>
										<colgroup>
											<col width="20%">
											<col width="80%">
										</colgroup>
										<tr>
											<th>월</th>
											<th>타임 스케줄</th>
										</tr>
										<tr ng-repeat="m in selectedScheduleList">
											<th>{{m.month}}</th>
											<td>
												<select class="form-control" data-live-search="true" ng-disabled="isMonthDisabled" ng-model="m.scdayname" ng-options="sdl.data.scdayname as sdl.data.scdayname for sdl in scheduleDetailList">
												</select>
											</td>
										</tr>
									</table>
								</div>
							</div>
							<div class="col-lg-4 col-xs-12">
								<div class="graphWrap dashBox boxTextOverflow rightBtnSet" id="timeSchedule">
									<p>타임 스케줄</p>

									<div class="aWrap">
										<button type="button" ng-click="addScheduleDAY()"><i class="icoAdd"></i></button>
										<button type="button" ng-click="delScheduleDAY()"><i class="icoDel"></i></button>
									</div>
									<div class="table headTable">
										<table class="">
											<colgroup>
												<col width="5%">
												<col width="50%">
												<col width="45%">
											</colgroup>
											<thead>
												<tr>
													<th><input type="checkbox" ng-model="selectAllScheduleDAY" ng-change="checkAllScheduleDAY()"></th>
													<th>타임 스케줄</th>
													<th>출력량 계획</th>
												</tr>
											</thead>
										</table>
									</div>
									<div class="table table-responsive">
										<table class="table-hover">
											<colgroup>
												<col width="5%">
												<col width="50%">
												<col width="45%">
											</colgroup>
											<tbody>
												<tr ng-repeat="sdl in scheduleDetailList" ng-class="{active : selectedScheduleDetail == sdl.id}" ng-click="getSelectScheduleDetail(sdl.id)">
													<td><input type="checkbox" ng-model="sdl.selected"></td>
													<td><input type="text" class="form-control" ng-model="sdl.data.scdayname"></input></td>
													<td>{{sdl.totalkw}}</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="graph"><div id="scheduleChart" width="100%" height="100%"></div></div>
								</div>
							</div>
							<div class="col-lg-5 col-xs-12">
								<div class="graphWrap dashBox boxTextOverflow" id="seasonSchedule">
									<p>{{selectedScheduleTimesName}} - 타임 스케줄 (24시간)</p>
									<div class="table headTable">
										<table class="">
											<colgroup>
												<col width="15%">
												<col width="55%">
												<col width="30%">
											</colgroup>
											<tr>
												<th>시간</th>
												<th>PCS 제어</th>
												<th>출력량(kW)</th>
											</tr>
										</table>
									</div>
									<div class="table table-responsive">
										<table class="table-hover">
											<colgroup>
												<col width="15%">
												<col width="55%">
												<col width="30%">
											</colgroup>
											<tr ng-repeat="s in selectedScheduleTimesList">
												<th>{{s.h}}</th>
												<td>
													<button class="btn btn-default btn-sm off" ng-class="{active : 14 == s.cmd}" ng-click="selectCMD(14, $index)">정지</button>
													<button class="btn btn-default btn-sm disCharge" ng-class="{active : 13 == s.cmd}" ng-click="selectCMD(13, $index)">방전</button>
													<button class="btn btn-default btn-sm charge" ng-class="{active : 12 == s.cmd}" ng-click="selectCMD(12, $index)">충전</button>
												</td>
												<td><input type="number" class="form-control" ng-model="s.pkw"></input></td>
											</tr>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-xs-12 rightApply alignLeft">
						<div class="graphWrap dashBox">
							<div class="graphWrap dashBox">
								<p>피크 컷 - PCS명</p>
									<table class="">
										<colgroup>
												<col width="24%">
												<col width="78%">
										</colgroup>
										<tr>
											<th>PCS</th>
											<td>
												<table class="">
													<colgroup>
														<col width="45%">
														<col width="55%">
													</colgroup>
													<tr>
														<th>최대출력량</th>
														<td>{{deviceLeaf.pcs.maxpkw}} kW</td>
													</tr>
													<tr>
														<th>SOC 제한</th>
														<td>{{deviceLeaf.pcs.socctrmode.text}}</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr>
											<th>배터리</th>
											<td>
												<table class="">
													<colgroup>
														<col width="45%">
														<col width="55%">
													</colgroup>
													<tr>
														<th>용량</th>
														<td>{{deviceLeaf.battery.designkw}} kW</td>
													</tr>
													<tr>
														<th>운전가능량</th>
														<td>{{deviceLeaf.battery.abledkw}} kW</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</div>
<!-- 								<div class="graphWrap dashBox"> -->
<!-- 									<p>수정 사항</p> -->
<!-- 									<table class=""> -->
<%-- 										<colgroup> --%>
<%-- 											<col width="31%"> --%>
<%-- 											<col width="69%"> --%>
<%-- 										</colgroup> --%>
<!-- 										<tr> -->
<!-- 											<th>PCS운전</th> -->
<!-- 											<td> -->
<!-- 												<p>추가:{{timeline.pcsSchedule.add}}&nbsp;&nbsp;<p> -->
<!-- 												<p>수정:{{timeline.pcsSchedule.modi}}&nbsp;&nbsp;<p> -->
<!-- 												<p>삭제:{{timeline.pcsSchedule.del}}<p> -->
<!-- 											</td> -->
<!-- 										</tr> -->
<!-- 										<tr> -->
<!-- 											<th>타임 스케줄</th> -->
<!-- 											<td> -->
<!-- 												<p>추가:{{timeline.timeSchedule.add}}&nbsp;&nbsp;<p> -->
<!-- 												<p>수정:{{timeline.timeSchedule.modi}}&nbsp;&nbsp;<p> -->
<!-- 												<p>삭제:{{timeline.timeSchedule.del}}<p> -->
<!-- 											</td> -->
<!-- 										</tr> -->
<!-- 									</table> -->
<!-- 								</div> -->
								<div>
									<ul class="subFont">
										<li>모든 스케줄이 운전 정지 상태에서만 수정이 가능 합니다.</li>
										<li>스케줄을 추가, 수정을 하는 경우 스케줄 편집 기능을 이용하세요.</li>
										<li ng-if="!isScheduleName">PCS 운전 스케줄 이름이 비어 있습니다.</li>
										<li ng-if="!isSchedulePCS">PCS 운전 스케줄에 적어도 하나 이상의 PCS가 있어야 합니다.</li>
										<li ng-if="!isScheduleMonthName">월 적용 타임 스케줄이 비어 있습니다.</li>
										<li ng-if="!isScheduleTimeName">타임 스케줄 이름이 비어 있습니다.</li>
										<li ng-if="!isTotalkw">출력량 계획은 0이어야 합니다.</li>
										<li ng-if="!isChargeZero">충전, 방전 출력량은 0이 될 수 없습니다.</li>
									</ul>
								</div>
								<div class="buttonWrap">
									<button class="btn btn-default btn-sm" type="button" ng-click="reset()">초기화</button>
									<button class="btn btn-default btn-sm" type="button" ng-disabled="!isSave" ng-click="saveSchedule()">저장</button>
								</div>
						</div>
					</div>
				</div>
			</div>

        </div>
    </section>
    <!-- /.content -->
  </div>
