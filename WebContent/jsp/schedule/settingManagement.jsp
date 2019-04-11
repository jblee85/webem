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
        <b>환겅설정</b>
        <small>환경 설정</small>
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
						<div class="row">
							<div class="col-lg-4 col-xs-12">
								<div class="graphWrap dashBox boxTextOverflow" id="monthSchedule" style="height:800px;">
									<p>설정 탐색기</p>
									<div class="aWrap" style="width: 100%;text-align: right;">
										<button type="button" ng-click="editChild()"><i class="icoPopup"></i></button>
										<button type="button" ng-click="addChild()"><i class="icoAdd"></i></button>
										<button type="button" ng-click="deleteChild()"><i class="icoDel"></i></button>
									</div>
									<div style="float:left;"
									    data-angular-treeview="true"
										data-tree-id="mytree"
										data-tree-model="treedata"
										data-node-id="id"
										data-node-label="label"
										data-node-children="children" >
									</div>
								</div>
							</div>
							<div class="col-lg-8 col-xs-12">
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
