<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="content-wrapper">
    <section class="content-header userMgmtWrap">
      <h1>
        <b>내 정보 관리</b>
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
				<div class="subBox"><p>사용자님의 개인정보를 <br>수정 및 관리하실 수 있습니다.</p><i class="clip-user"></i></div>
				<div class="conBox">
					<div>
						<form class="form-horizontal">
							<div class="form-group">
								<label for="userId" class="col-xs-2 col-sm-2 control-label">아이디</label>
								<div class="col-xs-10 col-sm-10">
									<p class="">{{ userModel.userid  }}</p>
								</div>
							</div>
							<div class="form-group">
								<label for="userPw" class="col-xs-2 col-sm-2 control-label">비밀번호</label>
								<div class="col-xs-10 col-sm-10">
<!-- 									 <p class="">{{ userModel.password  }}</p> -->
									 <button type="submit" class="btn btn-default" ng-click="modiPassword()">비밀번호 변경</button>
								</div>
							</div>
							<div class="form-group">
								<label for="checkPw" class="col-xs-2 col-sm-2 control-label">등급</label>
								 <div class="col-xs-10 col-sm-10">
								  <p class="">{{ authName }}</p>
								 </div>
							</div>
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
								<div class="col-xs-10 col-sm-10">
									<div class="leftInput floatFlex">
										<select class="form-control" id=""  ng-model="phone[0]" ng-options="p for p in phone_list" >
										</select>
										<p class="rightText">-</p>
										<input type="text" class="form-control" id="" ng-model="phone[1]" placeholder="">
										<p class="rightText">-</p>
										<input type="text" class="form-control" id="" ng-model="phone[2]" placeholder="">
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
							<button type="button" class="btn btn-default btn-lg" ng-click="confirm()">저장</button>
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