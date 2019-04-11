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
        <b>Schedule</b>
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
						<div class="graphWrap dashBox">
							<p>PCS 운전 스케줄</p>
							<div class="aWrap">
								<button ng-click="addSchedulePCS()">추가</button>
								<button ng-click="delSchedulePCS()">삭제</button>
							</div>
							<div class="table">
								<table>
									<colgroup>
										<col width="8%">
										<col width="20%">
										<col width="26%">
										<col width="12%">
										<col width="10%">
										<col width="12%">
										<col width="12%">
									</colgroup>
									<thead>
										<tr>
<!-- 											<th><input type="checkbox" ng-model="selectAllSchedulePCS" ng-click="checkAllSchedulePCS()"></th> -->
											<th>선택</th>
											<th>스케줄</th>
											<th>PCS</th>
											<th>유효성 검사</th>
											<th>운전 가능</th>
											<th>휴일 적용</th>
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
										<col width="26%">
										<col width="12%">
										<col width="10%">
										<col width="12%">
										<col width="12%">
									</colgroup>
									<tbody>
										<tr ng-class="{on : selectedSchedule == s.id,shadow : selectedSchedule == s.id}" ng-repeat="s in scheduleList" ng-click="getsScheduleMonth(s.id)">
<!-- 											<td><input type="checkbox" ng-model="s.selected"></td> -->
											<td><input type="radio" ng-model="selectedSchedule" value="{{s.id}}" name="scheduleSelected" required="required"></td>
											<td><input type="text" class="form-control" ng-model="s.data.scname"></input></td>
											<td><p ng-repeat="sdd in s.data.devs">{{sdd.devrid}} </p><div class="aWrap"><button ng-click="addPCS($index,s.data.devs)">add</button></div></td>
											<td><button type="submit" class="btn btn-default btn-sm">확인</button></td>
											<td>{{s.data.validated}}</td>
											<td><input type="checkbox" ng-checked="s.data.holyday"></td>
											<td>{{s.data.run}}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-3 col-xs-12">
								<div class="graphWrap dashBox" id="monthSchedule">
									<p>월 적용 타임 스케줄</p>
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
												<select class="form-control" ng-disabled="isMonthDisabled" ng-model="m.scdayname" ng-options="sdl.data.scdayname as sdl.data.scdayname for sdl in scheduleDetailList">
												</select>
											</td>
										</tr>
									</table>
								</div>
							</div>
							<div class="col-lg-4 col-xs-12">
								<div class="graphWrap dashBox" id="timeSchedule">
									<p>타임 스케줄</p>
									<div class="aWrap">
										<button ng-click="addScheduleDAY()">추가</button>
										<button ng-click="delScheduleDAY()">삭제</button>
									</div>
									<div class="table">
										<table class="">
											<colgroup>
												<col width="20%">
												<col width="50%">
												<col width="30%">
											</colgroup>
											<thead>
												<tr>
													<th><input type="checkbox" ng-model="selectAllScheduleDAY" ng-click="checkAllScheduleDAY()"></th>
													<th>타임 스케줄</th>
													<th>출력량 계획</th>
												</tr>
											</thead>
										</table>
									</div>
									<div class="table table-responsive">
										<table class="table-hover">
											<colgroup>
												<col width="20%">
												<col width="50%">
												<col width="30%">
											</colgroup>
											<tbody>
												<tr ng-repeat="sdl in scheduleDetailList" ng-click="getSelectScheduleDetail(sdl.id)">
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
								<div class="graphWrap dashBox" id="seasonSchedule">
									<p>겨울 - 타임 스케줄 (24시간)</p>
									<div class="table">
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
													<button class="btn btn-default btn-sm" ng-class="{selectcmd : 14 == s.cmd}" ng-click="selectCMD(14, $index)">정지</button>
													<button class="btn btn-primary btn-sm" ng-class="{selectcmd : 12 == s.cmd}" ng-click="selectCMD(12, $index)">충전</button>
													<button class="btn btn-trace btn-sm" ng-class="{selectcmd : 13 == s.cmd}" ng-click="selectCMD(13, $index)">방전</button>
												</td>
												<td><input type="number" class="form-control" ng-model="s.pkw"></input></td>
											</tr>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-xs-12 scheduleApply">
						<div class="row">
							<div class="dashBox">
								<div class="graphWrap dashBox">
									<p>피크 컷 - PCS명</p>
									<table class="">
										<tr>
											<th>P<br>C<br>S</th>
											<td>
												<table class="">
													<tr>
														<th>최대출력량</th>
														<td>100 kW</td>
													</tr>
													<tr>
														<th>SOC 제한</th>
														<td>일반모드(10%~90%)</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr>
											<th>배<br>터<br>리</th>
											<td>
												<table class="">
													<tr>
														<th>용량</th>
														<td>1.0 MW</td>
													</tr>
													<tr>
														<th>운전가능량</th>
														<td>0.8 MW</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</div>
								<div class="graphWrap dashBox">
									<p>수정 사항</p>
									<div class="aWrap"><a href="#"><i>icon</i></a></div>
									<table class="">
										<tr>
											<th>PCS<br>운전<br>스케줄</th>
											<td>내용1</td>
										</tr>
										<tr>
											<th>월 적용<br>타임<br>스케줄</th>
											<td>내용2</td>
										</tr>
										<tr>
											<th>타임<br>스케줄</th>
											<td>내용3</td>
										</tr>
										<tr>
											<th>타임<br>스케줄<br>(24시간)</th>
											<td>내용4</td>
										</tr>
									</table>
								</div>
								<div>
									<ul class="subFont">
										<li>모든 스케줄이 운전 정지 상태에서만 수정이 가능 합니다.</li>
<!-- 										<li>선택된 PCS 운전 스케줄만 저장 됩니다.</li> -->
										<li>스케줄을 추가, 수정을 하는 경우 스케줄 편집 기능을 이용하세요.</li>
										<li ng-if="!isScheduleName">PCS 운전 스케줄 이름이 비어 있습니다.</li>
										<li ng-if="!isSchedulePCS">PCS 운전 스케줄에 적어도 하나 이상의 PCS가 있어야 합니다.</li>
										<li ng-if="!isScheduleMonthName">월 적용 타임 스케줄이 비어 있습니다.</li>
										<li ng-if="!isScheduleTimeName">타임 스케줄 이름이 비어 있습니다.</li>
										<li ng-if="!isTotalkw">출력량 계획은 0이어야 합니다.</li>


										<!--<li>[ㅇㅇㅇ]에서 [ㅇㅇㅇ]로 변경하시겠습니까?</li>
										<li>[ㅇㅇㅇ]에서 [정지]로 변경 하시겠습니까?</li>
										<li>[ㅇㅇㅇ]에서 [ㅇㅇㅇ]로 변경이 완료되었습니다.</li>-->
									</ul>
								</div>
								<div class="buttonWrap">
									<button class="btn btn-default btn-sm" type="button" ng-click="reset()">초기화</button>
									<button class="btn btn-default btn-sm" type="button" ng-disabled="!isSave" ng-click="saveSchedule()">저장</button>
									<!--<button class="btn btn-default btn-sm" type="button" >아니오</button>
									<button class="btn btn-default btn-sm" type="button" >네</button>-->
<!-- 									<button class="btn btn-trace btn-md form-control" type="submit" ng-click="runSchedule()">운전 적용</button> -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

        </div>
    </section>
    <!-- /.content -->
  </div>
