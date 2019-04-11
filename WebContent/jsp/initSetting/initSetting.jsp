<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>ICE EM | start</title>
</head>

<!-- panel 0 - 처음 인사말 -->
  <div class="containorWrapper greetingContainor" ng-if="panel==0" >
		<h1 class="center-headFont primaryFont introFont">SmartICE EMS에 오신 것을 환영합니다!</h1>
		<div class="brandIntroWrap">
			<h1 class="" style="font-size: 5.5em;font-weight: 600;color: #fff;text-shadow: 0px 0px 15px #00294f;">SmartICE EMS</h1>
			<h2>우암과 함께하는 EMS의 혁신</h2>
			<div class="btnBox" style="margin: 110px auto 80px auto;">
		      	<button type="button" style="width: 150px;box-shadow: 0px 0px 15px #194368;font-size: 1.8em;animation-name: intro_brand;animation-duration: 5s;animation-delay: 0s;animation-iteration-count: 1;"ng-show="skipButton" class="btn btn-primary btn-lg" ng-class="{ 'skipOff' : !skipButton , 'skipOn'  : skipButton  }" ng-click="nextPanel()">SKIP ></button>
		    </div>
		</div>
		<div id="introBg" style="width: 100%;height: 800px;overflow: hidden;position: absolute;top: 12%;z-index: -1;overflow-y: hidden;">
	    	<img src="./images/initsetting_bg.png">
	    </div>
	</div>

<!-- panel 1 - 관리자 인증키 입력 -->
	<div class="containorWrapper" ng-if="panel==1" >
		<div class="containor smConbox">
			<h1 class="center-headFont">관리자 인증키 입력</h1>
			<div class="conBoxWrap">
				<button type="button" class="btn btn-trace btn-lg" ng-click="backPanel()" ><div class="triangle-left"></div></button>
				<div class="conBox">
					<form class="form-horizontal" name="adminForm">
						<div class="form-group">
							<label for="key" class="col-sm-2 control-label">KEY</label>
							<div class="col-sm-10">
								<input type="text"  class="form-control" name="key" ng-model="$parent.adminKey"  ng-required="true" ng-pattern="" placeholder="인증키를 입력해주세요."><button type="button" class="btn btn-default rightBtn" ng-click="loginSite()">인증 확인</button>
							</div>
						</div>
						<!-- <div class="alertBox" ng-if="adminForm.key.$dirty">
							<p><span>인증키 형식이 유효하지 않습니다.</span></p>
						</div> -->
					</form>
					<div class="">
						<p>
							인증키를 잊어버리신 경우 우암 고객센터로 연락주세요.<br><span>02-3461-5100(210)</span>
						</p>
					</div>
				</div>
				<!-- ng-disabled="adminForm.key.$invalid" -- ng-disabled="keyValid == false"-->
				<button type="submit" class="btn btn-primary btn-lg" ng-click="nextPanel()" ng-disabled="$parent.keyValid || adminForm.key.$invalid"><div class="triangle-right"></div></button>
				<!-- <button type="submit" class="btn btn-default btn-lg" ng-click="nextPanel()"  >다음</button> -->
			</div>
		</div>
	</div>

<!-- panel 2 - 사이트 등록 -->
	<div class="containorWrapper" ng-if="panel==2" >
   	<div class="containor smConbox">
			<h1 class="center-headFont">사이트 등록</h1>
			<div class="conBoxWrap">
		     	<button type="button" class="btn btn-trace btn-lg"  ng-click="backPanel()"><div class="triangle-left"></div></button>
				<div class="conBox">
					<form class="form-horizontal"  name="siteForm" ng-submit="siteRegist()">
						<div class="form-group">
							<label for="deviceId" class="col-xs-2 col-sm-2 control-label">장치 아이디</label>
							<div class="col-xs-10 col-sm-10">
								<input type="text" class="form-control"  ng-model="$parent.deviceId"  ng-required="true"  id="deviceId" name="deviceId" placeholder="장치 ID 형식" disabled>
							</div>
						</div>
						<div class="alertBox"  ng-if="siteForm.deviceId.$dirty">
							<span class="primaryFont"  ng-if="!siteForm.deviceId.$error.required">장치아이디는 수정이 불가능하니 신중히 입력해주세요</span>
							<span ng-if="siteForm.deviceId.$error.required">장치아이디를 입력 해주세요</span>
						</div>
						<div class="form-group">
							<label for="siteName" class="col-xs-2 col-sm-2 control-label">사이트 명</label>
							<div class="col-xs-10 col-sm-10">
								<input type="text" class="form-control"  ng-model="$parent.siteName"  ng-required="true"  id="siteName" name="siteName" placeholder="사이트 명을 입력해주세요" >
							</div>
						</div>
						<div class="alertBox"  ng-if="siteForm.siteName.$dirty">
						</div>
						<div class="form-group">
							<label for="addrs" class="col-xs-2 col-sm-2 control-label">주소</label>
							<div class="col-xs-10 col-sm-10">
								<input type="text" class="form-control leftInput"  ng-model="$parent.addrs" ng-required="true" id="addrs" name="addrs" placeholder="주소를 입력해주세요" disabled><button type="button" class="btn btn-default rightBtn" ng-click="getPostCode()">주소 찾기</button>
							</div>
						</div>
						<div class="alertBox" ng-if="siteForm.addrs.$dirty">
						</div>
						<div class="form-group">
							<label for="detailAddrs" class="col-xs-2 col-sm-2 control-label">상세주소</label>
							<div class="col-xs-10 col-sm-10">
								<input type="text" class="form-control" ng-model="$parent.detailAddrs" ng-required="true"  id="detailAddrs" name="detailAddrs" placeholder="상세주소를 입력해주세요">
							</div>
						</div>
						<div class="alertBox" ng-if="siteForm.detailAddrs.$dirty">
						</div>
						<div class="form-group">
							<label for="payType" class="col-xs-2 col-sm-2 control-label" >나의 요금제</label>
							<div class="col-xs-10 col-sm-10">
								<select class="form-control" id="payType" ng-model="$parent.payType" ng-required="true"  name="payType" ng-options="pay.text for pay in payTypes">
		               <option value="">요금제 선택</option>
								</select>
							</div>
						</div>
						<div class="alertBox"  ng-if="siteForm.payType.$dirty">
				  		<span ng-if="siteForm.payType.$error.required">요금제를 선택해주세요</span>
					  </div>
						<div class="form-group">
							<label for="ePower" class="col-xs-2 col-sm-2 control-label">계약 전력</label>
							<div class="col-sm-4 floatFlex">
								<input type="number" class="form-control col-xs-12" ng-model="$parent.ePower" ng-required="true" id="ePower" name="ePower" placeholder="숫자로만 입력해주세요"><p class="rightText">kW</p>
							</div>
						</div>
						<div class="alertBox" ng-if="siteForm.ePower.$dirty">
					  </div>
					 <div class="form-group" >
							<label for="meteringDay" class="col-xs-2 col-sm-2 control-label">검침일</label>
							<div class="col-sm-4 floatFlex">
								<select class="form-control" id="meteringDay"  ng-model="$parent.meteringDay" ng-required="true"  name="meteringDay"  ng-options="md.day for md in meteringDays">
								  <option value="">검침일 선택</option>
								</select>
								<p class="rightText">일</p>
							</div>
					 </div>
					 <div class="alertBox"  ng-if="siteForm.meteringDay.$dirty">
				  		<span ng-if="siteForm.meteringDay.$error.required">검침일을 선택해주세요</span>
					  </div>
					</form>
				</div>
				<button type="submit" class="btn btn-primary btn-lg" ng-click="nextPanel()"><div class="triangle-right"></div></button>
				<!-- <button type="submit" class="btn btn-default btn-lg"   ng-click="nextPanel()">다음</button> -->
			</div>
		</div>
	</div>

<!-- panel 3 - 사용자 등록 -->
	<div class="containorWrapper"  ng-if="panel==3" >
		<div class="containor smConbox">
			<h1  class="center-headFont">사용자 등록</h1>
			<div class="conBoxWrap">
				<button type="button" class="btn btn-trace btn-lg" ng-click="backPanel()"><div class="triangle-left"></div></button>
				<div class="conBox">
					<form class="form-horizontal" name="userForm">
						<div class="form-group">
							<label for="userid" class="col-xs-2 col-sm-2 control-label">아이디</label>
							<div class="col-xs-10 col-sm-10">
								<input type="email" class="form-control" ng-model="$parent.userid" ng-required="true"   id="userid"  name="userid"  placeholder="이메일형식으로 입력해주세요" >
								<button type="button"  class="btn btn-default rightBtn" ng-click="sendUserid()">중복 확인</button>
							</div>
						</div>
						<div class="alertBox"  ng-if="userForm.userid.$dirty">
							<p class="primaryFont" ng-if="userForm.userid.$valid"><span>사용 가능한 아이디 입니다</span></p>
						  <p ng-if="userForm.userid.$error.required"><span>아이디를 입력해주세요</span></p>
						  <p ng-if="userForm.userid.$invalid && !userForm.userid.$error.required"><span>이메일 형식으로 입력해주세요</span></p>
						</div>
						<div class="form-group">
							<label for="userPw" class="col-xs-2 col-sm-2 control-label">비밀번호</label>
							<div class="col-xs-10 col-sm-10">
								<input type="password" class="form-control" ng-model="$parent.userPw" ng-required="true" ng-minlength="4" id="userPw"  name="userPw"  placeholder="">
							</div>
						</div>
						<div class="alertBox" ng-if="userForm.userPw.$dirty">
							<p ng-if="userForm.userPw.$error.required"><span>비밀번호를 입력해주세요</span></p>
							<p ng-if="userForm.userPw.$error.minlength"><span>비밀번호는 4자 이상 입력해주세요</span></p>
						</div>
						<div class="form-group">
							<label for="checkPw" class="col-xs-2 col-sm-2 control-label">비밀번호 확인</label>
							<div class="col-xs-10 col-sm-10">
								<input type="password" class="form-control" ng-model="$parent.checkPw"  ng-required="true" ng-minlength="4" id="checkPw" name="checkPw" placeholder="">
							</div>
						</div>
						 <div class="alertBox" ng-if="userForm.checkPw.$dirty">
							<p ng-if="userForm.checkPw.$error.required"><span>비밀번호를 한번 더 입력해주세요</span></p>
							<p ng-if="userForm.checkPw.$error.minlength"><span>비밀번호는 4자 이상 입력해주세요</span></p>
							<p class="primaryFont" ng-if="userPw != null && userPw == checkPw"><span>비밀번호가 일치합니다</span></p>
							<p ng-if="userPw != null && userPw != checkPw"><span>비밀번호가 일치하지 않습니다</span></p>
						</div>
						<div class="form-group">
							<label for="username" class="col-xs-2 col-sm-2 control-label">이름</label>
							<div class="col-xs-10 col-sm-10">
								<input type="text" class="form-control" ng-model="$parent.username"  ng-required="true" id="username"  name="username" placeholder="">
							</div>
						</div>
						<div class="alertBox" ng-if="userForm.username.$dirty">
							<p ng-if="userForm.username.$error.required"><span>이름을 입력해주세요</span></p>
						</div>
						<div class="form-group">
							<label for="userPosition" class="col-xs-2 col-sm-2 control-label">직책</label>
							<div class="col-xs-10 col-sm-10">
								<input type="text" class="form-control" ng-model="$parent.userPosition"  ng-required="true" id="userPosition"  name="userPosition" placeholder="">
							</div>
						</div>
						<div class="alertBox" ng-if="userForm.userPosition.$dirty">
							<p ng-if="userForm.userPosition.$error.required"><span>직책을 입력해주세요</span></p>
						</div>
						<div class="form-group">
							<label for="userNum" class="col-xs-2 col-sm-2 control-label">연락처</label>
							<div class="col-xs-10 col-sm-10">
								<div class="leftInput floatFlex">
									<select class="form-control" id="phone1"  name="phone1"  ng-model="$parent.phone1"  ng-required="true" ng-options="p for p in phone_list">
									</select>
									<p class="rightText">-</p>
									<input type="text" class="form-control"  ng-model="$parent.phone2"  ng-required="true" id="phone2" name="phone2"  ng-maxlength="4" placeholder=""  ng-pattern="/^\d+$/">
									<p class="rightText">-</p>
									<input type="text"class="form-control" ng-model="$parent.phone3"  ng-required="true" id="phone3"  name="phone3" ng-maxlength="4"  placeholder="" ng-pattern="/^\d+$/">
								</div>
								<button type="button"  class="btn btn-default rightBtn" ng-show="isSent==false"  ng-click="sendSMS(false)">인증번호요청</button>
								<button type="button"  class="btn btn-default rightBtn"  ng-click="sendSMS(true)" ng-show="isSent==true">인증번호재전송</button>
							</div>
						</div>
						<div class="alertBox" ng-if="(userForm.phone1.$dirty || userForm.phone2.$dirty || userForm.phone3.$dirty) == true">
							<p ng-if="(userForm.phone2.$error.pattern || userForm.phone3.$error.pattern) == true"><span>숫자 형식으로 입력해주세요</span></p>
							<p ng-if="(userForm.phone2.$error.maxlength || userForm.phone3.$error.maxlength) == true"><span>4자리 이하로 입력해주세요.</span></p>
						</div>
						<div class="form-group">
							<label for="smscode" class="col-xs-2 col-sm-2 control-label">인증코드</label>
							<div class="col-xs-10 col-sm-10">
								<input type="text" class="form-control leftInput col-xs-12"  focus-on="smscode" ng-model="$parent.smscode"  ng-required="true" id="smscode" name="smscode" ng-maxlength="5"  onkeypress='return event.charCode >= 48 && event.charCode <= 57'  placeholder="">
								<button type="button" class="btn btn-default rightBtn col-xs-12" ng-click="confirmSMS()" ng-hide="smsValid==true">인증번호확인</button>
								<button class="btn btn-default rightBtn col-xs-12" ng-show="smsValid == true">인증완료</button>
							</div>
						</div>
						<div class="alertBox">
							<p ng-if="userForm.smscode.$dirty && userForm.smscode.$error.pattern"><span>숫자로 입력해주세요</span></p>
							<p ng-if="userForm.smscode.$dirty && userForm.smscode.$error.maxlength"><span>인증번호는 5자리입니다</span></p>
							<p><span style="color: green;" ng-bind="sentMsg" ng-hide="isSent == true || smsValid == true"></span></p>
							<p ng-if="isSent == true">
								<span ng-hide="expired == true || smsValid == true" ng-bind="$parent.min"></span>
								<span ng-hide="expired == true || smsValid == true"  ng-bind="$parent.sec"></span>
							</p>
							<p ng-if="expired == true" ng-hide="smsValid == true"><span>시간이 만료되었습니다</span></p>
							<p ng-if="smsValid == true" style="color: green;" ><span>인증되었습니다</span></p>
						</div>
					</form>
				</div>

	<!-- 			<button type="submit" class="btn btn-default btn-lg" ng-click="nextPanel()" >다음</button> -->
<!-- 				<button type="submit" class="btn btn-primary btn-lg" ng-click="nextPanel()" ng-disabled="(smsValid != true) || userForm.$invalid"><div class="triangle-right"></div></button> -->
				<button type="submit" class="btn btn-primary btn-lg" ng-click="nextPanel()"><div class="triangle-right"></div></button>
				<!-- ng-disabled="smsValid==false" -->
			</div>
		</div>
	</div>

<!-- panel 4 - 장치 등록  -->
<div class="containorWrapper" ng-if="panel==4" >
	<div class="containor lgConbox">
		<h1 class="center-headFont">장치 등록</h1>
		<div class="conBoxWrap">
			<button type="button" class="btn btn-trace btn-lg"  ng-click="backPanel()"><div class="triangle-left"></div></button>
			<div class="conBox">
				<div class="stepwizard">
					<div class="stepwizard-row setup-panel">
						<div class="stepwizard-step">
							<button  type="button" ng-class="classBtn1"  ng-click="selectPanel(1)">1</button>
							<p>설정 확인</p>
						</div>
						<div class="stepwizard-step">
							<button  type="button" ng-class="classBtn2" ng-click="selectPanel(2)">2</button>
							<p>데이터 확인</p>
						</div>
						<div class="stepwizard-step">
							<button  type="button" ng-class="classBtn3" ng-click="selectPanel(3)">3</button>
							<p>장치 제어</p>
						</div>
						<div class="stepwizard-step">
							<button  type="button" ng-class="classBtn4" ng-click="selectPanel(4)">4</button>
							<p>완료</p>
						</div>
					</div>
				</div>

				<!-- devpanel 1 - 설정확인 -->

				<div ng-if="devpanel==1">
					<div class="row setup-content" id="step-1">
						<div>
							<h3>설정확인</h3>
							<p class="subFont">장치 IP, 포트 번호가 맞게 입력되었는지 확인해주세요.<br>장치 정보가 다르면 수정이 가능합니다.</p>
							<!-- <button class="btn btn-default btn-xs" type="button"  ng-click="rowAdd()">장치 추가 +</button> -->
						</div>
						<div class="xScroll">
						<form role="form" name="dForm">
						<div class="table-responsive">
							<table class="table table-hover introTable">
								<colgroup>
										<col width="20%"><!-- 장치명 -->

										<col width="20%"><!-- 장치 IP -->
										<col width="10%"><!-- port -->

										<col width="20%"><!-- 등록시간 -->
										<col width="10%"><!-- 통신 -->
										<col width="20%"><!-- buttons -->
								</colgroup>
								<thead>
									<tr role="row">
										<th>장치명</th>
										<th>장치IP</th>
										<th>port</th>
										<th>등록시간</th>
										<th>통신</th>
										<th></th>
									</tr>
								</thead>
								</table>
								</div>
								<div class="table-responsive tableBody">
								<table class="table table-hover introTable">
									<colgroup>
										<col width="20%"><!-- 장치명 -->

										<col width="20%"><!-- 장치 IP -->
										<col width="10%"><!-- port -->

										<col width="20%"><!-- 등록시간 -->
										<col width="10%"><!-- 통신 -->
										<col width="20%"><!-- buttons -->
									</colgroup>
								<tbody class="">
									<tr ng-repeat="leafData in leaf.devs">
										<td>
											<label for="dName">{{ leafData.devlid }}</label>
											<!-- <input type="text" ng-class = "{ 'form-control' : $index == selectedRow , 'showOut form-control'  : $index != selectedRow  } " data-ng-model="d.deviceName" name="dName"  id="dName" ng-required="true" placeholder="deviceName" > -->
										</td>
										<td>
											<label for="dIp" ng-class = "{ 'showOut control-label' : $index == selectedRow , 'control-label'  : $index != selectedRow  } ">{{ leafData.ipaddr }} </label>
											<input type="text" ng-class="{ 'form-control' : $index == selectedRow , 'showOut form-control'  : $index != selectedRow  } " data-ng-model="leafData.ipaddr"  name="dIp" id="dIp" ng-required="true"  placeholder="deviceIp">
										</td>
										<td>
											<label for="dPort" ng-class = "{ 'showOut control-label' : $index == selectedRow , 'control-label'  : $index != selectedRow  } ">{{ leafData.port }}</label>
											<input type="text" ng-class="{ 'form-control' : $index == selectedRow , 'showOut form-control'  : $index != selectedRow  } " data-ng-model="leafData.port"  name="dPort" id="dPort" ng-required="true"  placeholder="n">
										</td>
										<td>{{ leaf.rdt | date:'yyyy-MM-dd HH:mm:ss'}}</td>
										<td>
											 <i ng-class="{'showOut' : $index == selectedRow, ''  : $index != selectedRow }" >{{ leafData.deviceNetwork ? '연결' : '끊김' }}</i>
											<!-- <button ng-class="{'btn btn-success btn-xs'  : $index == selectedRow, 'showOut btn btn-success btn-xs'  : $index != selectedRow }" ng-disabled="dForm.dName.$error.required || dForm.dIp.$error.required || dForm.dPort.$error.required" type="submit" >연결</button> -->
										</td>
										<td>
											<button ng-class= "{ 'btn btn-primary btn-xs' : $index == selectedRow , 'showOut btn btn-primary btn-xs'  : $index != selectedRow  } "  type="button" ng-click="setDeviceLeafModel($index)"> 확인 </button>
											<button ng-class=" { 'showOut btn btn-default btn-xs' : $index == selectedRow , 'btn btn-default btn-xs'  : $index != selectedRow  } " type="button" ng-click="clickedIndex($index)" >수정</button>
											<!-- {{'수정' : leafData.devlid == "",'등록' : test==false}} -->
											<!-- <button ng-class=" { 'btn btn-default btn-xs' : $index == selectedRow , 'showOut btn btn-default btn-xs'  : $index != selectedRow  } "  type="button"  ng-click="cancelIndex($index)">취소</button> -->
											<!-- <button ng-class=" { 'showOut btn btn-default btn-xs' : $index == selectedRow , 'btn btn-default btn-xs'  : $index != selectedRow  } "  type="button"  ng-click="deviceDelete($index)" > 삭제</button> -->
										</td>
									</tr>
									<!-- <tr role="row" ng-repeat="d in devicesReq">
										<td>
											<label for="dName" class="showOut control-label">deviceName</label>
											<input type="text" class="form-control" data-ng-model="dName" id="dName"  name="dName2"  maxlength="10" focus-on="deviceName" ng-required="true" placeholder="deviceName">
										</td>
										<td>
											<label for="dIp" class="showOut control-label">deviceIp</label>
											<input type="text" class="form-control" data-ng-model="dIp" id="dIp"  name="dIp2" maxlength="15" ng-required="true" placeholder="deviceIp">
										</td>
										<td>
											<label for="dPort" class="showOut control-label">00</label>
											<input type="text" class="form-control" data-ng-model="dPort"  id="dPort" name="dPort2" maxlength="4" ng-required="true" placeholder="n">
										</td>!-- <tr role="row" ng-repeat="d in devicesReq">
										<td>
											<label for="dName" class="showOut control-label">deviceName</label>
											<input type="text" class="form-control" data-ng-model="dName" id="dName"  name="dName2"  maxlength="10" focus-on="deviceName" ng-required="true" placeholder="deviceName">
										</td>
										<td>
											<label for="dIp" class="showOut control-label">deviceIp</label>
											<input type="text" class="form-control" data-ng-model="dIp" id="dIp"  name="dIp2" maxlength="15" ng-required="true" placeholder="deviceIp">
										</td>
										<td>
											<label for="dPort" class="showOut control-label">00</label>
											<input type="text" class="form-control" data-ng-model="dPort"  id="dPort" name="dPort2" maxlength="4" ng-required="true" placeholder="n">
										</td>
										<td>2018-07-10 11:47</td>
										<td>
											<i class="showOut">icon</i>
											<button class="btn btn-success btn-xs" name="connection" ng-disabled="dForm.dName2.$error.required || dForm.dIp2.$error.required || dForm.dPort2.$error.required" type="submit" >연결</button>
										</td>
										<td>
											<button class="btn btn-primary btn-xs" type="button"   ng-click="deviceAdd($index, dName, dIp, dPort)" ng-disabled="!dForm.$valid">등록</button>
											<button class="btn btn-default btn-xs" type="button"  ng-click="deviceCancel($index)">취소</button>
										</td>
									</tr> -->
								</tbody>
							</table>
						</div>
					   </form>
						</div>
					</div>
				</div>

			<!-- devpanel 2 - 데이터 확인 -->
			  <div  ng-if="devpanel==2">
			  		 <div class="row setup-content" id="step-2">
					 	  <div>
									<h3>데이터 확인</h3>
									<p class="subFont">PCS에서 가져온 전력데이터 상태를 확인합니다.<br>위험이나 결함이 발생하면 장치 등록이 불가합니다.</p>
								</div>
								<div class="panel-group" role="tablist">
									<div class="panel panel-default">
										<div class="panel-heading" role="tab" id="collapseListGroupHeading">
											<p>장치</p>
											<p>알림</p>
											<p>위험</p>
											<p>결함</p>
											<p></p>
										</div>
									</div>
								</div>
								<div class="panel-group panel-Wrap" role="tablist">
									<div class="panel panel-default" ng-repeat="leafData in leaf.devs">
										<div class="panel-heading" role="tab" id="collapseListGroupHeading1">
											<p>{{ leafData.devlid }}</p>
											<span class="label"><span class="label-success" ng-if="leafData.alarms != null">{{ leafData.alarms.length }}</span></span>
											<span class="label"><span class="label-warning" ng-if="leafData.warnings != null">{{ leafData.warnings.length }}</span></span>
											<span class="label"><span class="label-danger" ng-if="leafData.faults != null">{{ leafData.faults.length }}</span></span>
											<span><a class="btn btn-default btn-xs" data-ng-click="openClose($event, leafData.devlid)" ng-if="leafData.warnings.length != 0 && leafData.faults.length != 0 && leafData.alarms.length != 0">자세히</a></span>
											<!-- <p class="panel-title" id="-collapsible-list-group-1">
												<a class="btn btn-default btn-xs"  data-ng-attr-id="btnId{{$index}}" data-toggle="collapse"  data-target="#"  ng-href="#collapseListGroup{{$index}}"  aria-expanded="true" aria-controls="collapseListGroup1" data-ng-click="openClose($event)">열기</a>
												<a class="anchorjs-link" href="#-collapsible-list-group-1"><span class="anchorjs-icon"></span></a>
											</p> -->
										</div>
										<div class="panel-collapse collapse">
											<ul class="list-group">
												<div ng-if="leafData.faults.length == 0 && leafData.warnings.length == 0 && leafData.alarms.length == 0">
													<li class="list-group-item dangerFont">없습니다.</li>
												</div>
												<div ng-if="leafData.alarms.length != 0" ng-repeat="alarm in leafData.alarms">
													<li class="list-group-item dangerFont">{{alarm}}</li>
												</div>
												<div ng-if="leafData.warnings.length != 0" ng-repeat="warning in leafData.warnings">
													<li class="list-group-item warningFont">{{warning}}</li>
												</div>
												<div ng-if="leafData.faults.length != 0" ng-repeat="fault in leafData.faults">
													<li class="list-group-item dangerFont">{{fault}}</li>
												</div>

												<!-- <div ng-if="leafData.faults.length == 0">
														<li class="list-group-item warningFont">없습니다.</li>
												</div> -->

												<!-- <div ng-if="leafData.faults.length == 0" ng-repeat="alarm in leafData.alarms">
														<li class="list-group-item dangerFont">없습니다.</li>
												</div> -->
											  <!-- <li class="list-group-item dangerFont">fault Message</li>
											  <li class="list-group-item dangerFont">fault Message</li>
											  <li class="list-group-item warningFont">warning Message</li>
											  <li class="list-group-item dangerFont">fault Message</li>
											  <li class="list-group-item warningFont">warning Message</li>
											  <li class="list-group-item warningFont">warning Message</li> -->
											</ul>
										</div>
									</div>
								</div>
								<div class="alertBox">
									<p class="primaryFont" ng-show="!isDeviceMsg()">{{deviceMsg}}</p>
									<p class="" ng-show="isDeviceMsg()">{{deviceMsg}}</p>
									<!-- <p class="" >{{ deviceMsg() }}</p> -->
									<button class="btn btn-danger btn-sm" ng-click="deviceReset()" type="submit" ng-if="existFault">다시시도</button>
								</div>
							</div>
					</div>
			<!-- devpanel 3 - 장치 제어 -->
				<div  ng-if="devpanel==3">
								 <!-- <div class="row setup-content" id="step-3">
					 	  	<div>
									<h3>장치제어</h3>
									<p class="subFont">실제로 충,방전 운전을 하여 장치 제어가 되는지 확인합니다. 이 과정은 건너뛸 수 있습니다.<br>경고: 직접 제어하는 것이므로 위험할 수 있습니다.</p>
							</div>
								<div class="panel panel-default deviceControler" ng-repeat="d in devicesRep">
									<span class="col-md-2 col-xs-12">{{ d.deviceName }}</span>
									<ul type="none" class="col-md-10 col-xs-12">
										<li>
											<p class="subFont">시험 충전 출력량</p>
											<div class="">
												<input type="text" class="form-control" id="" placeholder="" value="10" ng-disabled="true"><span>kW</span>
												<button ng-if="testMode == $index" class="btn btn-danger btn-xs"  data-ng-click="toggleTest($index)">재시도</button>
												<button ng-if="testMode != $index" class="btn btn-default btn-xs"   data-ng-click="toggleTest($index)">테스트</button>
											</div>
										</li>
										<li>
											<p class="subFont">시험 충전 방전량</p>
											<div>
												<input type="text" class="form-control" id="" placeholder="" value="10" ng-disabled="true"><span>kW</span>
												<button class="showOut btn btn-danger btn-xs"  ng-click="dischargeStart()">재시도</button>
												<button class="btn btn-default btn-xs" ng-click="dischargeStart()">테스트</button>
											</div>
										</li>
									</ul> -->
						<div class="row setup-content" id="step-3">
								<div>
									<h3>장치제어</h3>
									<p class="subFont">실제로 충,방전 운전을 하여 장치 제어가 되는지 확인합니다. 이 과정은 건너뛸 수 있습니다.<br>경고: 직접 제어하는 것이므로 위험할 수 있습니다.</p>
								</div>
								<div class="tableWrap table-responsive">
									<div class="table introTableWrap" ng-repeat="leafData in leaf.devs">
										<table class="table table-hover introTable">
											<colgroup>
												<col width="30%"><!-- 장치명 -->

												<col width="15%"><!-- 시험 충전 출력량 -->
												<col width="35%"><!-- 용량 -->

												<col width="20%"><!-- button -->
											</colgroup>
											<tbody class="" >
												<tr role="row">
													<td rowspan="2" class="rowspanTd">
														<span>{{ leafData.devlid }}</span>
													</td>
													<td>
														<p class="subFont">시험 충전 출력량</p>
													</td>
													<td>
														<input type="text" class="powerCapa form-control" id="" placeholder="0" ng-model="leafData.chargepkw">kW
													</td>
													<td class="leftAlign">
														<button ng-if="testMode == 0" class="btn btn-danger btn-xs"  data-ng-click="toggleTest($index, leafData.devlid, 12)">재시도</button>
														<button ng-if="testMode != 0" class="btn btn-default btn-xs"   data-ng-click="toggleTest($index, leafData.devlid, 12)">테스트</button>
													</td>
												</tr>
												<tr role="row">
													<td>
														<p class="subFont">시험 방전 출력량</p>
													</td>
													<td>
														<input type="text" class="powerCapa form-control" id="" placeholder="0" ng-model="leafData.dischargepkw">kW
													</td>
													<td class="leftAlign">
														<button ng-if="testMode == 1" class="btn btn-danger btn-xs"  data-ng-click="toggleTest($index, leafData.devlid, 13)">재시도</button>
														<button ng-if="testMode != 1" class="btn btn-default btn-xs"   data-ng-click="toggleTest($index, leafData.devlid, 13)">테스트</button>
													</td>
												</tr>
											</tbody>
										</table>
										<div class="alertBox">
											<!--<p class="primaryFont">※ 발생한 위험이나 결함이 없습니다.</p>-->
											<p ng-class="{primaryFont : leafData.isSuccess, dangerFont : !leafData.isSuccess}">{{ leafData.msg }}</p>
									<!-- 		<p ng-if="(testMode == $index) && isSucess"  class="primaryFont">{{ successMsg }}</p> -->
										 </div>
									</div>
							</div>
						 </div>
						</div>
					<!-- devpanel 4 - 완료 -->
						<div  ng-if="devpanel==4">
								 <div class="row setup-content" id="step-4">
							 	  <h3>완료 버튼을 눌러주세요.</h3>
										<!--<h3>장치 등록이 완료 되었습니다.</h3>-->
								 </div>
						</div>
			</div>
		<!--    		<button type="button" class="btn btn-default nextBtn btn-lg" ng-click="nextPanel()" ng-disabled="deviceValidate()" ng-if="!((devpanel==4) &&(panel==4))">다음</button> -->
	   		<button type="button" class="btn btn-primary nextBtn btn-lg" ng-click="nextPanel()" ng-if="!((devpanel==4) &&(panel==4))"><div class="triangle-right"></div></button>
	   		<button type="button" class="btn btn-red nextBtn btn-lg" ng-click="nextPanel()" ng-if="(devpanel==4) &&(panel==4)"><span>완료</span></button>
		</div>
	</div>
</div>

</html>