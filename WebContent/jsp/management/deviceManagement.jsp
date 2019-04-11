<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
.NameWrap {
       border: 1px solid white;
    background-color: #007eff;
    width: 50px;
    float: left;
    margin-right: 5px;
}
.NameWrap .empty {
background-color: gray;
}
</style>
<div class="content-wrapper">
	<section class="content-header">
      <h1>
        <b>장치 관리</b>
        <small></small>
      </h1>
<!--       <ol class="breadcrumb"> -->
<!--         <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li> -->
<!--         <li class="active">Here</li> -->
<!--       </ol> -->
    </section>
	<section class="content container-fluid">
	 	<div class="dashboardWrap">
			<div class="deviceMgmtContentWrap">
				<div class="row">
					<div class="col-lg-9 col-xs-12 deviceMgmtContent">
						<div class="row">
							<div class="col-lg-4 col-xs-12">
								<div class="graphWrap dashBox">
									<p>장치</p>
									<div class="aWrap"><button type="button" ng-click="addRoot()"><i class="icoAdd"></i></button><button type="button" ng-click="delRoot()"><i class="icoDel"></i></button></div>
									<div class="table">
										<table>
											<colgroup>
												<col width="8%">
												<col width="40%">
												<col width="50%">
<%-- 												<col width="20%"> --%>
<%-- 												<col width="26%"> --%>
											</colgroup>
											<thead>
												<tr>
													<th><input type="checkbox" ng-model="selectAllRoot" ng-change="checkAllRoot()"/></div></th>
													<th>RID</th>
													<th>사이트 명</th>
<!-- 													<th>분류 수</th> -->
<!-- 													<th>등록시간</th> -->
												</tr>
											</thead>
										</table>
									</div>
									<div class="table table-responsive">
										<table class="table-hover tableBody">
											<colgroup>
												<col width="8%">
												<col width="40%">
												<col width="50%">
<%-- 												<col width="20%"> --%>
<%-- 												<col width="26%"> --%>
											</colgroup>
											<tbody>
												<tr ng-if="rl.enabled" ng-class="{active : selectedDevrid == rl.devrid}" ng-repeat="rl in rootList" ng-click="getsLeafList(rl.devrid)">
													<td><input type="checkbox" ng-model="rl.selected"/></td>
													<td>{{rl.devrid}}</td>
													<td><input type="text" class="form-control" ng-model="rl.devrname"/></td>
		<!-- 											<td><input type="number" min="1" max="31" step="1"value="1" class="form-control" ng-model="rl.rdday"/></td> -->
<!-- 													<td>{{rl.depth}}</td> -->
<!-- 													<td>{{rl.rdt}}</td> -->
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div class="col-lg-8 col-xs-12">
								<div class="graphWrap dashBox idGroupWrap">
									<p>그룹</p>
									<div class="aWrap"><button type="button" ng-click="addGroup()"><i class="icoAdd"></i></button><button type="button" ng-click="delGroup()"><i class="icoDel"></i></button></div>
									<div class="table">
										<table>
											<colgroup>
												<col width="5%">
												<col width="15%">
												<col width="15%">
												<col width="13%">
												<col width="13%">
												<col width="13%">
												<col width="13%">
												<col width="13%">
											</colgroup>
											<thead>
												<tr>
													<th><input type="checkbox" ng-model="selectAllGroup" ng-change="checkAllGroup()"/></div></th>
													<th>ID</th>
													<th>그룹 명</th>
<!-- 													<th>장치</th> -->
													<th>PCS</th>
													<th>BMS</th>
													<th>BAT</th>
													<th>METER</th>
													<th>PV</th>
		<!-- 											<th>등록시간</th> -->
												</tr>
											</thead>
										</table>
									</div>
									<div class="table table-responsive">
										<table class="table-hover tableBody">
											<colgroup>
												<col width="5%">
												<col width="15%">
												<col width="15%">
												<col width="13%">
												<col width="13%">
												<col width="13%">
												<col width="13%">
												<col width="13%">
											</colgroup>
											<tbody>
												<tr ng-repeat="gl in groupList">
													<td><input type="checkbox" ng-model="gl.selected"/></td>
													<td>{{gl.grpid}}</td>
													<td><input type="text" class="form-control" ng-model="gl.grpname" ng-change="changeGroupname(gl)"/></td>
													<td>
														<select class="form-control" data-live-search="true" ng-click="getTypeList('pcs',gl.leafsObj.pcs.devlid)" ng-model="gl.leafsObj.pcs.devlid" ng-options="tlp.devlid as tlp.devlid for tlp in typeList.pcs">
															<option value=""></option>
														</select>
													</td>
													<td>
														<select class="form-control" data-live-search="true" ng-model="gl.leafsObj.bms.devlid" ng-options="tlp.devlid as tlp.devlid for tlp in typeList.bms">
															<option value=""></option>
														</select>
													</td>
													<td>
														<select class="form-control" data-live-search="true" ng-model="gl.leafsObj.battery.devlid" ng-options="tlp.devlid as tlp.devlid for tlp in typeList.battery">
															<option value=""></option>
														</select>
													</td>
<!-- 													<td> -->
<!-- 														<select class="form-control" data-live-search="true" ng-model="gl.leafsObj.ismart.devlid" ng-options="tlp.devlid as tlp.devlid for tlp in typeList.ismart"> -->
<!-- 															<option value=""></option> -->
<!-- 														</select> -->
<!-- 													</td> -->
													<td>
														<select class="form-control" data-live-search="true" ng-model="gl.leafsObj.meter.devlid" ng-options="tlp.devlid as tlp.devlid for tlp in typeList.meter">
															<option value=""></option>
														</select>
													</td>
													<td>
														<select class="form-control" data-live-search="true" ng-model="gl.leafsObj.pv.devlid" ng-options="tlp.devlid as tlp.devlid for tlp in typeList.pv">
															<option value=""></option>
														</select>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div class="graphWrap dashBox">
							<p>장치 분류</p>
<!-- 							<div class="aWrap"><button type="button" ng-click="addLeaf()"><i class="icoAdd"></i></button><button type="button" ng-click="delLeaf()"><i class="icoDel"></i></button></div> -->
							<div class="table">
								<table>
									<colgroup>
<%-- 										<col width="8%"> --%>
										<col width="16%">
										<col width="16%">
<%-- 										<col width="16%"> --%>
										<col width="8%">
										<col width="24%">
									</colgroup>
									<thead>
										<tr>
<!-- 											<th><div class="checkboxWrap"><input type="checkbox" ng-model="selectAllLeaf" ng-change="checkAllLeaf()"/></div></th> -->
											<th>분류</th>
											<th>제조사</th>
<!-- 											<th>그룹 ID</th> -->
											<th>등록 수</th>
											<th>등록시간</th>
										</tr>
									</thead>
								</table>
							</div>
							<div class="table table-responsive">
								<table class="table-hover tableBody">
									<colgroup>
<%-- 										<col width="8%"> --%>
										<col width="16%">
										<col width="16%">
<%-- 										<col width="16%"> --%>
										<col width="8%">
										<col width="24%">
									</colgroup>
									<tbody>
										<tr ng-if="ll.enabled" ng-class="{active : selectedDevtype == ll.devtype}" ng-repeat="ll in leafList" ng-click="getsLeafs(ll.id)">
<!-- 											<td><input type="checkbox" ng-model="ll.selected"/></td> -->
											<td ng-if="ll.devtype==11">PCS</td><td ng-if="ll.devtype==12">BMS</td><td ng-if="ll.devtype==13">배터리</td><td ng-if="ll.devtype==5">태양광</td><td ng-if="ll.devtype==4">계량기</td><td ng-if="ll.devtype==3">미터기</td>
<!-- 											<td> -->
<!-- 												<select class="form-control" data-live-search="true" ng-change="checkDevtype($index)" ng-model="ll.devtype" ng-options="dl.devtype as dl.name for dl in devtypeList"> -->
<!-- 												</select> -->
<!-- 											</td> -->
											<td><input type="text" class="form-control" ng-model="ll.corp"/></td>
											<td>{{ll.devs.length}}</td>
											<td>{{ll.rdt | date:'yyyy-MM-dd HH:mm:ss'}}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div class="row">
							<div class="col-lg-7 col-xs-16">
								<div class="graphWrap dashBox" id="">
									<p>등록장비 - <span ng-if="selectedDevtype==11">PCS</span><span ng-if="selectedDevtype==12">BMS</span><span ng-if="selectedDevtype==13">배터리</span><span ng-if="selectedDevtype==5">태양광</span><span ng-if="selectedDevtype==3">미터기</span><span ng-if="selectedDevtype==4">계량기</span></span>
									<div class="aWrap">
										<button type="button" ng-click="addLeafs()"><i class="icoAdd"></i></button>
										<button type="button" ng-click="delLeafs()"><i class="icoDel"></i></button>
									</div>
									<div class="table">
										<table class="">
											<colgroup>
												<col width="7%">
												<col width="20%">
												<col width="25%">
												<col width="28%">
												<col width="20%">
											</colgroup>
											<thead>
												<tr>
													<th><div class="checkboxWrap"><input type="checkbox" ng-model="selectAllLeafs" ng-change="checkAllLeafs()"/></div></th>
													<th>LID</th>
													<th>모델명</th>
													<th ng-if="selectedDevtype==3">타입</th>
													<th>그룹 ID</th>
												</tr>
											</thead>
										</table>
									</div>
									<div class="table table-responsive">
										<table class="table-hover">
											<colgroup>
												<col width="7%">
												<col width="20%">
												<col width="25%">
												<col width="28%">
												<col width="20%">
											</colgroup>
											<tbody>
												<tr ng-class="{active : selectedDevlid == lls.id}" ng-repeat="lls in leafs" ng-click="getsLeafsDetail(lls.id)">
													<td><input type="checkbox" ng-model="lls.selected"/></td>
													<td>{{lls.devlid}}</td>
													<td><input type="text" class="form-control" ng-model="lls.devlname" ng-change="changeDevlname(lls)"/></td>
													<td ng-if="selectedDevtype==3">
														<select class="form-control" data-live-search="true" ng-model="lls.devsubtype" ng-options="dstl.devsubtype as dstl.name for dstl in devsubtypeList">
															<option value=""></option>
														</select>
													</td>
													<td>{{lls.grpname}}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div class="col-lg-5 col-xs-12">
								<div class="graphWrap dashBox" id="deviceInfo">
									<p>상세 정보 - {{leafsDetail.devlid}}</p>
									<div class="table">
										<table class="">
											<colgroup>
												<col width="32%">
												<col width="78%">
											</colgroup>
											<tr ng-if="check('ipaddr')">
	<!-- 											<tr ng-if="leafsDetail.ipaddr[key]"> -->
													<th>IP 주소</th>
													<td>
														<input type="text" class="form-control" ng-model="leafsDetail.ipaddr" style="width:60%;float:left;">
														<button class="btn btn-default" ng-click="pingTest(leafsDetail.ipaddr, leafsDetail.port)" style="width:40%;float:left;">테스트</button>
													</td>
												</tr>
												<tr ng-if="check('port')">
													<th>Port</th>
													<td><input type="number" class="form-control" ng-model="leafsDetail.port"></td>
												</tr>
												<tr ng-if="check('usbport')">
													<th>USB port</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.usbport"></td>
												</tr>
												<tr ng-if="check('macaddr')">
													<th>Mac 주소</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.macaddr"></td>
												</tr>
												<tr ng-if="check('slaveid')">
													<th>종속장치 ID</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.slaveid"></td>
												</tr>
												<tr ng-if="check('maxpkw')">
													<th>최대 출력량</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.maxpkw"></td>
												</tr>
												<tr ng-if="check('maxpkwp')">
													<th>최대 출력량</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.maxpkwp"></td>
												</tr>
												<tr ng-if="check('socctrmode')">
													<th>SOC 제어모드</th>
													<td>
														<select class="form-control" data-live-search="true" ng-model="leafsDetail.socctrmode" ng-options="sl.soc as sl.text for sl in socList"></select>
													</td>
												</tr>
												<tr ng-if="check('efcper')">
													<th>효율(%)</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.efcper"></td>
												</tr>
												<tr ng-if="check('aiopcs')">
													<th>All in one</th>
													<td>
														<input type="radio" id="yes" name="aiopcs" placeholder="" ng-model="leafsDetail.aiopcs" ng-value="true">
														 <label for="yes">예</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
														 <input type="radio" id="no" name="aiopcs" placeholder="" ng-model="leafsDetail.aiopcs" ng-value="false">
														 <label for="no">아니오</label>
													</td>
												</tr>
												<tr ng-if="check('devst')">
													<th>장비 상태</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.devst"></td>
												</tr>
												<tr ng-if="check('rackcnt')">
													<th>rack 개수</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.rackcnt"></td>
												</tr>
												<tr ng-if="check('designkw')">
													<th>설계 용량</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.designkw"></td>
												</tr>
												<tr ng-if="check('safecycle')">
													<th>보장 사이클</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.safecycle"></td>
												</tr>
												<tr ng-if="check('rdpms')">
													<th>검침 주기(ms)</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.rdpms"></td>
												</tr>
<!-- 												<tr ng-if="check('run')"> -->
<!-- 													<th>작동 여부</th> -->
<!-- 													<td>{{leafsDetail.run ? '작동' : '미작동'}}</td> -->
<!-- 												</tr> -->
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-xs-12 rightApply alignLeft">
						<div class="graphWrap dashBox">
							<div class="graphWrap dashBox">
								<p>장치관리 안내</p>
								<ol>
									<li>그룹에 장치들이 등록되어야 작동 합니다.</li>
									<li>장치 정보 수정으로 인해 ESS 시스템이 중단될 수 있습니다. 반드시 장치정보를 정확히 확인 후 [저장]하세요.</li>
									<li>[저장]후 수정 된 내용이 있으면 [재가동]해 주시기 바랍니다.</li>
								</ol>
							</div>
<!-- 							<div class="graphWrap dashBox"> -->
<!-- 								<p>수정 사항</p> -->
<!-- 								<div class="aWrap"><button type="button"><i class="icoPopup"></i></button></div> -->
<!-- 								<div class="table" style="overflow-y: auto;height: fit-content;max-height: 235px;"> -->
<!-- 									<table class=""> -->
<!-- 										<tr ng-repeat="eh in essHistoryList"> -->
<!-- 											<th>{{eh.cdt}}</th> -->
<!-- 											<td>{{title}}</td> -->
<!-- 										</tr> -->
<!-- 									</table> -->
<!-- 								</div> -->
<!-- 							</div> -->
							<div>
								<ul class="subFont">
									<li>[저장]후 수정 된 내용이 있으면 [재가동]해 주시기 바랍니다.</li>
									<li ng-if="dupleGroupID">그룹에 같은 값이 존재 합니다.</li>
									<!--<li>[ㅇㅇㅇ]에서 [ㅇㅇㅇ]로 변경하시겠습니까?</li>
									<li>[ㅇㅇㅇ]에서 [정지]로 변경 하시겠습니까?</li>
									<li>[ㅇㅇㅇ]에서 [ㅇㅇㅇ]로 변경이 완료되었습니다.</li>-->
								</ul>
							</div>
							<div class="buttonWrap">
								<button class="btn btn-default btn-sm" type="button" ng-click="reset()">초기화</button>
								<button class="btn btn-default btn-sm" type="button" ng-click="save()">저장</button>
								<!--<button class="btn btn-default btn-sm" type="button" >아니오</button>
								<button class="btn btn-default btn-sm" type="button" >네</button>-->
								<button class="btn btn-trace btn-md form-control" type="submit" ng-click="Reflash()">재가동</button>
							</div>
						</div>
					</div>
				</div>
			</div>

	    </div>
	</section>
</div>