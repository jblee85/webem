<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
		<div class="content-wrapper ng-scope" id="devdiv">
			<div class="container-fluid content">
				<h3>장치 관리</h3>
				<div class="location">
					<a ui-sref="{{main}}" ><img src="<c:url value='/images/ico_home.gif' />" alt="홈"></a>
					<a href="#">관리</a>
					<span class="current">장치</span>
				</div>
				<div class="fullWrap">
					<div class="row">
						<div class="col-lg-10 col-md-10 col-sm-20">
							<div class="col-lg-12 col-md-12 col-sm-24">
								<div class="graphWrap dashBox" id="pcsTimeline" style="height:160px;">
									<p>Root List</p>
<!-- 									<div class="aWrap"><a><i>icon</i></a><a><i>icon</i></a></div> -->
									<div>
										<table class="">
											<colgroup>
												<col width="20%">
												<col width="40%">
												<col width="10%">
												<col width="10%">
												<col width="20%">
											</colgroup>
											<thead>
												<tr>
													<th>RID</th>
													<th>사이트 명</th>
													<th>검침일</th>
													<th>분류 수</th>
													<th>등록 시간</th>
												</tr>
											</thead>
										</table>
									</div>
									<div class="table-responsive tableBody">
										<table class="table-hover">
											<colgroup>
												<col width="20%">
												<col width="40%">
												<col width="10%">
												<col width="10%">
												<col width="20%">
											</colgroup>
											<tbody>
												<tr ng-repeat="rl in rootList" ng-click="getsLeafList(rl.devrid)">
													<td>{{rl.devrid}}</td>
													<td>{{rl.devrname}}</td>
													<td>{{rl.rdday}}</td>
													<td>{{rl.depth}}</td>
													<td>{{rl.rdt}}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="graphWrap dashBox" id="pcsTimeline" style="height:280px;">
									<p>Leaf List</p>
<!-- 									<div class="aWrap"><a><i>icon</i></a><a><i>icon</i></a></div> -->
									<div>
										<table class="">
											<colgroup>
												<col width="20%">
												<col width="20%">
												<col width="20%">
												<col width="10%">
												<col width="10%">
												<col width="20%">
											</colgroup>
											<thead>
												<tr>
													<th>분류</th>
													<th>제조사</th>
													<th>그룹</th>
													<th>등록 수</th>
													<th>사용여부</th>
													<th>등록시간</th>
												</tr>
											</thead>
										</table>
									</div>
									<div class="table-responsive tableBody">
										<table class="table-hover">
											<colgroup>
												<col width="20%">
												<col width="20%">
												<col width="20%">
												<col width="10%">
												<col width="10%">
												<col width="20%">
											</colgroup>
											<tbody>
												<tr ng-repeat="ll in leafList" ng-click="getsLeafs(ll.devtype)">
													<td>{{ll.devtype}}</td>
													<td><input type="text" ng-model="ll.corp"></td>
													<td>{{ll.devs.devgrpid}}</td>
													<td>{{ll.devs.length}}</td>
													<td>{{ll.enabled}}</td>
													<td>{{ll.rdt}}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="col-lg-6 col-md-6 col-sm-12">
									<div class="graphWrap dashBox" id="pcsTimeline" style="height:280px;">
										<p>Leafs</p>
										<div class="aWrap" ng-click="addLeafs()"><a><i>추가</i></a></div>
										<div>
											<table class="">
												<colgroup>
													<col width="30%">
													<col width="30%">
													<col width="20%">
													<col width="20%">
												</colgroup>
												<thead>
													<tr>
														<th>LID</th>
														<th>모델명</th>
														<th>그룹</th>
														<th>삭제</th>
													</tr>
												</thead>
											</table>
										</div>
										<div class="table-responsive tableBody">
											<table class="table-hover">
												<colgroup>
													<col width="30%">
													<col width="30%">
													<col width="20%">
													<col width="20%">
												</colgroup>
												<tbody>
													<tr ng-repeat="lls in leafs" ng-click="getsLeafsDetail(lls.devlid)">
														<td><input type="text" ng-model="lls.devlid"></td>
														<td><input type="text" ng-model="lls.devlname"></td>
														<td><input type="text" ng-model="lls.devgrpid"></td>
														<td><button ng-click="delLeafs($index)">삭제</button></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="col-lg-6 col-md-6 col-sm-12">
									<div class="graphWrap dashBox table-responsive"  style="height:280px;">
										<p>{{leafsDetail.devlid}} 상세</p>
										<table class="dashTable1 table-hover">
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
						<div class="col-lg-2 col-md-2 col-sm-4">

							<div class="tableWrap" style="height:430px;">
								<div>
									<div style="float:left;width:200px;"><span>수정 사항</span></div>
								</div>
								<table width="100%" border="0" cellspacing="0" cellpadding="0" class="basicTable">
									<colgroup>
										<col width="20">
										<col width="100">
									</colgroup>
									<tbody>
										<tr>
											<td>PCS<br>운전<br>스케줄</td>
											<td>추가/삭제/수정 사항 없음</td>
										</tr>
										<tr>
											<td>월 적용<br>타임<br>스케줄</td>
											<td>추가/삭제/수정 사항 없음</td>
										</tr>
										<tr>
											<td>타임<br>스케줄</td>
											<td>추가 1건<br>삭제 1건</td>
										</tr>
										<tr>
											<td>타임<br>스케줄<br>(24시간)</td>
											<td>수정 - 겨울 24건</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="tableWrap" style="height:270px;">
								<div class="tableWrap" style="height:240px;"><span>수정 사항</span></div>
								<div style="height:80px;">
									<div class="tableWrap">
										<button class="col-lg-6 col-md-6 col-sm-12" ng-click="reset()" style="float:left;">초기화</button>
										<button class="col-lg-6 col-md-6 col-sm-12" ng-click="save()" style="float:right;">저장</button>
									</div>
									<div class="tableWrap">
										<button class="col-lg-12 col-md-12 col-sm-24" ng-click="apply()">운전 적용</button>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
				<!-- //fullWrap -->
			</div>
		</div>
