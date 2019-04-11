<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="content-wrapper">
	<section class="content container-fluid">
	 	<div class="dashboardWrap">
			<div class="deviceMgmtContentWrap">
				<div class="row">
					<div class="col-lg-9 col-xs-12 deviceMgmtContent">
						<div class="graphWrap dashBox">
							<p>Root List</p>
							<div class="aWrap"><button type="button" ng-click="addRoot()"><i class="icoAdd"></i></button><button type="button" ng-click="delRoot()"><i class="icoDel"></i></button></div>
							<div class="table">
								<table>
									<colgroup>
										<col width="8%">
										<col width="28%">
										<col width="30%">
										<col width="10%">
										<col width="26%">
									</colgroup>
									<thead>
										<tr>
											<th><div class="checkboxWrap"><input type="checkbox" ng-model="selectAllRoot" ng-change="checkAllRoot()"/></div></th>
											<th>RID</th>
											<th>사이트 명</th>
											<th>분류 수</th>
											<th>등록시간</th>
										</tr>
									</thead>
								</table>
							</div>
							<div class="table table-responsive">
								<table class="table-hover tableBody">
									<colgroup>
										<col width="8%">
										<col width="28%">
										<col width="30%">
										<col width="10%">
										<col width="26%">
									</colgroup>
									<tbody>
										<tr ng-if="rl.enabled" ng-class="{active : selectedDevrid == rl.devrid}" ng-repeat="rl in rootList" ng-click="getsLeafList(rl.devrid)">
											<td><input type="checkbox" ng-model="rl.selected"/></td>
											<td>{{rl.devrid}}</td>
											<td><input type="text" class="form-control" ng-model="rl.devrname"/></td>
<!-- 											<td><input type="number" min="1" max="31" step="1"value="1" class="form-control" ng-model="rl.rdday"/></td> -->
											<td>{{rl.depth}}</td>
											<td>{{rl.rdt}}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="graphWrap dashBox">
							<p>장치 분류</p>
							<div class="aWrap"><button type="button" ng-click="addLeaf()"><i class="icoAdd"></i></button><button type="button" ng-click="delLeaf()"><i class="icoDel"></i></button></div>
							<div class="table">
								<table>
									<colgroup>
										<col width="8%">
										<col width="16%">
										<col width="16%">
										<col width="16%">
										<col width="8%">
										<col width="12%">
										<col width="24%">
									</colgroup>
									<thead>
										<tr>
											<th><div class="checkboxWrap"><input type="checkbox" ng-model="selectAllLeaf" ng-change="checkAllLeaf()"/></div></th>
											<th>분류</th>
											<th>제조사</th>
											<th>그룹 ID</th>
											<th>등록 수</th>
											<th>사용여부<!--<div><div>사용여부</div><div class="checkboxWrap"><input type="checkbox"/></div></div>--></th>
											<th>등록시간</th>
										</tr>
									</thead>
								</table>
							</div>
							<div class="table table-responsive">
								<table class="table-hover tableBody">
									<colgroup>
										<col width="8%">
										<col width="16%">
										<col width="16%">
										<col width="16%">
										<col width="8%">
										<col width="12%">
										<col width="24%">
									</colgroup>
									<tbody>
										<tr ng-if="ll.enabled" ng-class="{active : selectedDevtype == ll.devtype}" ng-repeat="ll in leafList" ng-click="getsLeafs(ll.id)">
											<td><input type="checkbox" ng-model="ll.selected"/></td>
<!-- 											<td>{{ll.devtype}}</td> -->
											<td>
												<select class="form-control" data-live-search="true" ng-change="checkDevtype($index)" ng-model="ll.devtype" ng-options="dl.devtype as dl.name for dl in devtypeList">
												</select>
											</td>
											<td><input type="text" class="form-control" ng-model="ll.corp"/></td>
											<td><div class="pcsNameWrap" ng-repeat="lld in ll.devs"><p>{{lld.devgrpid}}</p></div></td>
<!-- 											<td>{{ll.devs.devgrpid}}</td> -->
											<td>{{ll.devs.length}}</td>
											<td><!--<input type="checkbox"/>-->
												<div class="flipSwitch">
													<input type="checkbox" name="flipSwitch" class="flipSwitch-checkbox" id="{{'check_use_1_'+$index}}" ng-model="ll.enabled" ng-checked="ll.enabled" />
													<label class="flipSwitch-label" for="check_use_1">
														<span class="flipSwitch-switch"></span>
														<span class="flipSwitch-inner"></span>
													</label>
												</div>
											</td>
											<td>{{ll.rdt}}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-6 col-xs-12">
								<div class="graphWrap dashBox" id="">
									<p>등록장비 - PCS</p>
									<div class="aWrap">
										<button type="button" ng-click="addLeafs()"><i class="icoAdd"></i></button>
										<button type="button" ng-click="delLeafs()"><i class="icoDel"></i></button>
									</div>
									<div class="table">
										<table class="">
											<colgroup>
												<col width="17%">
												<col width="30%">
												<col width="30%">
												<col width="23%">
											</colgroup>
											<thead>
												<tr>
													<th><div class="checkboxWrap"><input type="checkbox" ng-model="selectAllLeafs" ng-change="checkAllLeafs()"/></div></th>
													<th>LID</th>
													<th>모델명</th>
													<th>그룹 ID</th>
												</tr>
											</thead>
										</table>
									</div>
									<div class="table table-responsive">
										<table class="table-hover">
											<colgroup>
												<col width="17%">
												<col width="30%">
												<col width="30%">
												<col width="23%">
											</colgroup>
											<tbody>
												<tr ng-class="{active : selectedDevlid == lls.id}" ng-repeat="lls in leafs" ng-click="getsLeafsDetail(lls.id)">
													<td><input type="checkbox" ng-model="lls.selected"/></td>
													<td><input type="text" class="form-control" ng-model="lls.devlid"/></td>
													<td><input type="text" class="form-control" ng-model="lls.devlname"/></td>
													<td><input type="text" class="form-control" ng-model="lls.devgrpid"/></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div class="col-lg-6 col-xs-12">
								<div class="graphWrap dashBox" id="deviceInfo">
									<p>PCS 정보 - {{leafsDetail.devlid}}</p>
									<div class="">
										<table class="">
											<colgroup>
												<col width="30%">
												<col width="70%">
											</colgroup>
											<tr ng-if="check('ipaddr')">
	<!-- 											<tr ng-if="leafsDetail.ipaddr[key]"> -->
													<th>IP 주소</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.ipaddr"></td>
												</tr>
												<tr ng-if="check('port')">
													<th>Port</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.port"></td>
												</tr>
												<tr ng-if="check('macaddr')">
													<th>Mac 주소</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.macaddr"></td>
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
													<td><input type="text" class="form-control" ng-model="leafsDetail.socctrmode"></td>
												</tr>
												<tr ng-if="check('devst')">
													<th>장비 상태</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.devst"></td>
												</tr>
												<tr ng-if="check('run')">
													<th>장비 상태</th>
													<td>{{leafsDetail.run}}</td>
												</tr>
												<tr ng-if="check('pcsctr')">
													<th>제어 여부</th>
													<td>{{leafsDetail.pcsctr}}</td>
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
												<tr ng-if="check('connectmode')">
													<th>통신방식</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.connectmode"></td>
												</tr>
												<tr ng-if="check('rdpms')">
													<th>검침 주기</th>
													<td><input type="text" class="form-control" ng-model="leafsDetail.rdpms"></td>
												</tr>
												<tr ng-if="check('rdt')">
													<th>등록시간</th>
													<td>{{leafsDetail.rdt}}</td>
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
								<p>장치관리 안내</p>
								<ol>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
								</ol>
							</div>
							<div class="graphWrap dashBox">
								<p>수정 사항</p>
								<div class="aWrap"><button type="button"><i class="icoPopup"></i></button></div>
								<table class="">
									<tr>
										<th>th1</th>
										<td>내용1</td>
									</tr>
									<tr>
										<th>th2</th>
										<td>내용2</td>
									</tr>
									<tr>
										<th>th3</th>
										<td>내용3</td>
									</tr>
								</table>
							</div>
							<div>
								<ul class="subFont">
									<li>장치 정보를 수정하면 [저장]이 활성화 됩니다.</li>
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
								<button class="btn btn-trace btn-md form-control" type="submit" ng-click="test()">테스트</button>
							</div>
						</div>
					</div>
				</div>
			</div>

	    </div>
	</section>
</div>