<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="content-wrapper">
    <section class="content-header userMgmtWrap">
      <h1>
        <b>사용자 {{isAdd ? '등록' : '수정'}}</b>
        <small></small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
        <li class="active">Here</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
    	<div class="row userMgmtWrap">
			<div class="col-lg-12 dashBox" ng-class="{shadowBox : themeClassName == 'mechanic'}">
				<div class="subBox"><p>사용자님의 개인정보를 <br>수정 및 관리하실 수 있습니다.</p></div>
				<div class="conBox">
					<div>
						<form class="form-horizontal" name="userForm">
							<div class="form-group">
								<label for="userId" class="col-xs-2 col-sm-2 control-label">아이디</label>
								<div class="col-xs-10 col-sm-10">
									<input type="email" class="form-control" ng-if="isAdd" ng-model="userModel.userid" ng-required="true" id="userid"  name="userid" ng-keyup="dupChk($event)" ng-pattern="/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/" placeholder="이메일형식으로 입력해주세요" >
<!-- 									<input type="text" class="form-control" ng-if="isAdd" ng-required="true" ng-model="userModel.userid" name="userid" placeholder=""> -->
									<p class="" ng-if="!isAdd">{{ userModel.userid }}</p>
								</div>
							</div>
							<div class="alertBox"  ng-if="userForm.userid.$dirty">
							  <p ng-if="userForm.userid.$error.required"><span>아이디를 입력해주세요</span></p>
							  <p ng-if="userForm.userid.$dirty && userForm.userid.$error.pattern"><span>이메일 형식으로 입력해주세요</span></p>
							  <p style="color: green;" ng-if="userForm.userid.$valid && dupValid == true"><span>사용가능한 아이디입니다</span></p>
							  <p ng-if="userForm.userid.$valid && dupValid == false"><span>이미 존재하는 아이디 입니다</span></p>
							</div>
							<div class="form-group" ng-if="isAdd">
								<label for="newpassword" class="col-xs-2 col-sm-2 control-label">비밀번호</label>
								<div class="col-xs-10 col-sm-10">
									<input type="password" class="form-control" ng-model="userModel.newpassword" ng-required="true" ng-minlength="4" id="newpassword"  name="newpassword">
								</div>
							</div>
							<div class="alertBox" ng-if="userForm.newpassword.$dirty">
								<p ng-if="userForm.newpassword.$error.required"><span>비밀번호를 입력해주세요</span></p>
								<p ng-if="userForm.newpassword.$error.minlength"><span>비밀번호는 4자 이상 입력해주세요</span></p>
							</div>
							<!-- 비밀번호변경시 -->
							<div class="form-group" ng-if="!isAdd">
								<label for="userPw" class="col-xs-2 col-sm-2 control-label">비밀번호</label>
								<div class="col-xs-10 col-sm-10">
									<input type="password" class="form-control" ng-model="userModel.repassword" ng-required="true" ng-minlength="4" id="repassword"  name="repassword">
								</div>
							</div>
							<div class="alertBox" ng-if="userForm.repassword.$dirty">
								<p ng-if="userForm.repassword.$error.required"><span>비밀번호를 입력해주세요</span></p>
								<p ng-if="userForm.repassword.$error.minlength"><span>비밀번호는 4자 이상 입력해주세요</span></p>
							</div>
							<div class="form-group">
								<label for="checkPw" class="col-xs-2 col-sm-2 control-label">등급</label>
								 <div class="col-xs-10 col-sm-10">
								 	<select class="form-control" ng-model="userModel.auth.authlv" ng-options="al.lv as al.name for al in auth_list" >
									</select>
								 </div>
							</div>
<!-- 							<div class="form-group"> -->
<!-- 								<label for="checkPw" class="col-xs-2 col-sm-2 control-label">프로그램 아이디</label> -->
<!-- 								 <div class="col-xs-10 col-sm-10"> -->
<!-- 								 <p class="">{{ userModel.programid }}</p> -->
<!-- 								 </div> -->
<!-- 							</div> -->
							<div class="form-group">
								<label for="userName" class="col-xs-2 col-sm-2 control-label">이름</label>
								<div class="col-xs-10 col-sm-10">
									<input type="text" class="form-control" ng-model="userModel.namecard.name" placeholder="">
								</div>
							</div>
							<div class="form-group">
								<label for="userPosition" class="col-xs-2 col-sm-2 control-label">직책</label>
								<div class="col-xs-10 col-sm-10">
									<input type="text" class="form-control" ng-model="userModel.namecard.pos" placeholder="">
								</div>
							</div>
							<div class="form-group">
								<label for="userNum" class="col-xs-2 col-sm-2 control-label">연락처</label>
<!-- 								<div class="col-xs-10 col-sm-10"> -->
<!-- 								  <p class="">{{ userModel.namecard.sphone }}</p> -->
<!-- 								  <button type="submit" class="btn btn-default rightBtn" ng-click="modiPhone()">휴대폰번호 변경</button> -->
<!-- 								 </div> -->
								<div class="col-xs-10 col-sm-10">
									<div class="leftInput floatFlex">
										<select class="form-control"  ng-model="phone[0]" ng-options="p for p in phone_list" >
										</select>
										<p class="rightText">-</p>
										<input type="text" class="form-control" ng-model="phone[1]" placeholder="">
										<p class="rightText">-</p>
										<input type="text" class="form-control" ng-model="phone[2]" placeholder="">
									</div>
								</div>
							</div>
							<div class="form-group">
								<label for="userReginum" class="col-xs-2 col-sm-2 control-label">경보음 설정</label>
								<div class="col-xs-10 col-sm-10">
									 <input type="radio" id="yes" name="warningAlram" placeholder="" ng-model="userModel.data.sendalram" ng-value="true">
									 <label for="yes">예</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									 <input type="radio" id="no" name="warningAlram" placeholder="" ng-model="userModel.data.sendalram" ng-value="false">
									 <label for="no">아니오</label>
								  <span>장애 발생 시 경보음을 발생합니다</span>
								</div>
							</div>
<!-- 								<div class="form-group"> -->
<!-- 								<label for="userReginum" class="col-xs-2 col-sm-2 control-label">SMS 알림 설정</label> -->
<!-- 								<div class="col-xs-10 col-sm-10"> -->
<!-- 									 <input type="radio" id="smsyes" name="smsAlram" placeholder="" ng-model="userModel.data.sendsmsuser" ng-value="true"> -->
<!-- 									 <label for="smsyes">예</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
<!-- 									 <input type="radio" id="smsno" name="smsAlram" placeholder="" ng-model="userModel.data.sendsmsuser" ng-value="false"> -->
<!-- 									 <label for="smsno">아니오</label> -->
<!-- 									사용자 등록, 승인, 삭제 요청 시 문자 알림을 받습니다. -->
<!-- 									</div> -->
<!-- 								</div> -->
								<div class="form-group">
								<label class="col-xs-2 col-sm-2 control-label"></label>
								<div class="col-xs-10 col-sm-10">
									 <input type="radio" id="smsyes2" name="smsAlram2" placeholder="" ng-model="userModel.data.sendsmsdevice" ng-value="true">
									 <label for="smsyes2">예</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									 <input type="radio" id="smsno2" name="smsAlram2" placeholder="" ng-model="userModel.data.sendsmsdevice" ng-value="false">
									 <label for="smsno2">아니오</label>
									 <span>장치 이상 (과충전, 과방전, 시스템 이상 등)관련 문자 알림을 받습니다.</span>
								</div>
							</div>
						</form>
						<div class="buttonWrap">
							<button type="button" class="btn btn-default btn-lg"  ng-disabled="dupValid == false" ng-click="confirm()">{{isAdd ? '저장' : '수정'}}</button>
							<button type="button" class="btn btn-default btn-lg" ng-click="cancel()">취소</button>
						</div>
					</div>
				</div>
			</div>
		</div>
    </section>
    <!-- /.content -->
  </div>
<!-- ./wrapper -->