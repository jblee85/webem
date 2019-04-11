<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<style>
.selectcmd{
	background-color:red !important;
}
.tbody_scroll{
	display: block;
    width: 100%;
    overflow-y: auto;
    height: 800px;
}
</style>
<div class="content-wrapper">
    <section class="content-header">
      <h1>
        <b translate>환경설정</b>
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
								<div class="graphWrap dashBox boxTextOverflow" id="monthSchedule" style="height:900px;">
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
								<div ng-if="mytree.currentNode.label=='다국어'" class="graphWrap dashBox boxTextOverflow rightBtnSet" id="timeSchedule" style="height:900px;">
									<p>{{ts.MULTILANGUAGE}} {{ts.SETTING}}</p>

									<div class="aWrap">
										<button type="button" ng-click="addRow()"><i class="icoAdd"></i></button>
										<button type="button" ng-click="delRows()"><i class="icoDel"></i></button>
									</div>
<!-- 									<div class="userRegist"> -->
<!-- 										<input id="translateSearchbox" ng-model="f" type="text" class="searchBox form-control" placeholder="검색"> -->
<!-- 									</div> -->
									<table id="translationTable" class="tbl-type-c" style="width: 100%;display: inline-block;">
									<colgroup>
										<col width="5%">
										<col width="30%">
										<col width="30%">
										<col width="30%">
									</colgroup>
									<thead class="ng-scope">
										<tr>
											<th><input type="checkbox" ng-checked="selectAllRow" ng-model="selectAllRow" ng-change="checkAllRow(selectAllRow)"></th>
											<th>KEY</th>
											<th>{{ts.KOREAN}}</th>
											<th>{{ts.ENGLISH}}</th>
										</tr>
									</thead>
									<tbody class="tbody_scroll">
										<tr ng-repeat="t in tsList | filter: f"" ng-class="{active : selectedrow == $index}" ng-click="getSelectrow($index)">
											<td style="width:5%;"><input type="checkbox" ng-model="t.selected"></td>
											<td style="width:30%;"><input type="text" class="form-control" ng-model="t.key"></td>
											<td style="width:30%;"><input type="text" class="form-control" ng-model="t.ko"></td>
											<td style="width:30%;"><input type="text" class="form-control" ng-model="t.en"></td>
										</tr>
									</tbody>
								</table>
								</div>
								<div ng-if="mytree.currentNode.label=='레이아웃'" class="graphWrap dashBox boxTextOverflow rightBtnSet" id="timeSchedule">
									<p>레이아웃 설정</p>

									<div class="aWrap">
										<button type="button" ng-click="multiLng(1)">한국어</button>
										<button type="button" ng-click="multiLng(2)">English</button>
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
													<th>KEY</th>
													<th>번역</th>
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
												<tr ng-repeat="(key, val) in ts" ng-class="{active : selectedrow == $index}" ng-click="getSelectrow($index)">
													<td><input type="checkbox" ng-model="$index"></td>
													<td>{{key}}</input></td>
<!-- 													<td><input type="text" class="form-control" ng-model="ts[key]"></input></td> -->
													<td><input type="text" class="form-control" ng-model="ts[key]"></input></td>
<!-- 													<td>{{key}}</td> -->
<!-- 													<td>{{value}}</td> -->
												</tr>
											</tbody>
										</table>
									</div>
									<div class="graph"><div id="scheduleChart" width="100%" height="100%"></div></div>
								</div>
								<div ng-if="mytree.currentNode.label=='메뉴구성'" class="graphWrap dashBox boxTextOverflow rightBtnSet" id="timeSchedule">
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
										<li ng-if="isKeyDupl">중복된 key값이 있습니다.</li>
										<li ng-if="isKeyEmpty">비어있는 key값이 있습니다.</li>
									</ul>
								</div>
								<div class="buttonWrap">
									<button class="btn btn-default btn-sm" type="button" ng-click="reset()">초기화</button>
									<button class="btn btn-default btn-sm" type="button" ng-disabled="!isSave" ng-click="save()">저장</button>
								</div>
						</div>
					</div>
				</div>
			</div>

        </div>
    </section>
    <!-- /.content -->
  </div>
