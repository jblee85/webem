<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="userMemberWrap">
	<div class="containor lgConbox">
		<h2>회원가입</h2>
		<div class="conBox">
			<form class="form-horizontal" name="userForm" id="userForm">
				<div class="form-group">
					<label for="userid" class="col-xs-2 col-sm-2 control-label">아이디</label>
					<div class="col-xs-10 col-sm-10">
						<input type="email" class="form-control" ng-model="userid" id="userid" name="userid" ng-keyup="dupChk($event)" ng-pattern="/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/" placeholder="이메일형식으로 입력해주세요" required>
					</div>
				</div>
				<div class="alertBox" ng-if="userForm.userid.$dirty">
				  <p ng-if="userForm.userid.$error.required"><span>아이디를 입력해주세요</span></p>
				  <p ng-if="userForm.userid.$error.pattern"><span>이메일 형식으로 입력해주세요</span></p>
				  <p style="color: green;" ng-if="userForm.userid.$valid && dupValid == true"><span>사용가능한 아이디입니다</span></p>
				  <p ng-if="userForm.userid.$valid && dupValid == false"><span>이미 존재하는 아이디 입니다</span></p>
				</div>
				<div class="form-group">
					<label for="userPw" class="col-xs-2 col-sm-2 control-label">비밀번호</label>
					<div class="col-xs-10 col-sm-10">
						<input type="password" class="form-control" ng-model="userPw" ng-minlength="4" id="userPw" name="userPw"  placeholder="비밀번호를 입력해주세요" required>
					</div>
				</div>
				<div class="alertBox" ng-if="userForm.userPw.$dirty">
					<p ng-if="userForm.userPw.$error.required"><span>비밀번호를 입력해주세요</span></p>
					<p ng-if="userForm.userPw.$error.minlength"><span>비밀번호는 4자 이상 입력해주세요</span></p>
				</div>
				<div class="form-group">
					<label for="checkPw" class="col-xs-2 col-sm-2 control-label">비밀번호 확인</label>
					<div class="col-xs-10 col-sm-10">
						<input type="password" class="form-control" ng-model="checkPw" ng-minlength="4" id="checkPw" name="checkPw" placeholder="비밀번호를 한번 더 입력해주세요" required>
					</div>
				</div>
				 <div class="alertBox" ng-if="userForm.checkPw.$dirty">
					<p ng-if="userForm.checkPw.$error.required"><span>비밀번호를 한번 더 입력해주세요</span></p>
					<p ng-if="userForm.checkPw.$error.minlength"><span>비밀번호는 4자 이상 입력해주세요</span></p>
					<p style="color: green;" ng-if="userPw != null && userPw == checkPw"><span>비밀번호가 일치합니다</span></p>
					<p ng-if="userPw != null && userPw != checkPw"><span>비밀번호가 일치하지 않습니다</span></p>
				</div>
				<div class="form-group">
					<label for="username" class="col-xs-2 col-sm-2 control-label">이름</label>
					<div class="col-xs-10 col-sm-10">
						<input type="text" class="form-control" ng-model="username" id="username" name="username" placeholder="이름을 입력해주세요" required>
					</div>
				</div>
				<div class="alertBox" ng-if="userForm.username.$dirty">
					<p ng-if="userForm.username.$error.required"><span>이름을 입력해주세요</span></p>
				</div>
				<div class="form-group">
					<label for="userPosition" class="col-xs-2 col-sm-2 control-label">직책</label>
					<div class="col-xs-10 col-sm-10">
						<input type="text" class="form-control" ng-model="userPosition" id="userPosition" name="userPosition" placeholder="직책을 입력해주세요" required>
					</div>
				</div>
				<div class="alertBox" ng-if="userForm.userPosition.$dirty">
					<p ng-if="userForm.userPosition.$error.required"><span>직책을 입력해주세요</span></p>
				</div>
				<div class="form-group">
					<label for="userSiteid" class="col-xs-2 col-sm-2 control-label">사이트</label>
					<div class="col-xs-10 col-sm-10">
						<select class="form-control" ng-model="userSiteid" name="userSiteid" ng-options="sl.sid as sl.sname for sl in siteList" required>
						</select>
					</div>
				</div>
				<div class="alertBox" ng-if="userForm.userSiteid.$dirty">
					<p ng-if="userForm.userSiteid.$error.required"><span>사이트를 선택해주세요</span></p>
				</div>
				<div class="form-group">
					<label for="userNum" class="col-xs-2 col-sm-2 control-label">연락처</label>
					<div class="col-xs-10 col-sm-10">
						<div class="leftInput floatFlex">
							<select class="form-control" ng-model="phone1" name="phone1" ng-options="c for c in phoneCode" required>
							</select>
							<p class="rightText">-</p>
							<input ng-model="phone2" name="phone2" type="text" class="form-control" ng-pattern="/^\d+$/" ng-maxlength="4" required>
							<p class="rightText">-</p>
							<input ng-model="phone3" name="phone3" type="text" class="form-control" ng-pattern="/^\d+$/" ng-maxlength="4" required>
						</div>
					</div>
				</div>
				<div class="alertBox" ng-if="(userForm.phone1.$dirty || userForm.phone2.$dirty || userForm.phone3.$dirty) == true">
					<p ng-if="(userForm.phone1.$valid && userForm.phone2.$valid && userForm.phone3.$valid) == false"><span>숫자 형식으로 입력해주세요</span></p>
				</div>

				<div ng-if="currentProperties.data.network" class="form-group">
					<label for="userReginum" class="col-xs-2 col-sm-2 control-label">인증코드</label>
					<div class="col-xs-10 col-sm-10">
						<input ng-model="userReginum" type="text" class="form-control leftInput col-xs-12" id="userReginum" name="userReginum" placeholder="인증코드 5자리를 입력해주세요" ng-pattern="/^\d+$/" ng-maxlength="5" required>
						<button class="btn btn-trace rightBtn col-xs-12" ng-disabled="isSent == false || expired == true" ng-click="confirmSMS(); $event.preventDefault();" ng-hide="smsValid == true">인증번호확인</button>
						<button class="btn btn-trace rightBtn col-xs-12" ng-disabled="smsValid == true" ng-show="smsValid == true">인증완료</button>
					</div>
				</div>
				<div ng-if="currentProperties.data.network" class="alertBox">
					<p ng-if="userForm.userReginum.$dirty && userForm.userReginum.$error.required"><span>인증번호를 입력해주세요</span></p>
					<p ng-if="userForm.userReginum.$dirty && userForm.userReginum.$error.pattern"><span>숫자로 입력해주세요</span></p>
					<p ng-if="userForm.userReginum.$dirty && userForm.userReginum.$error.maxlength"><span>인증번호는 5자리입니다</span></p>
					<p><span ng-bind-html="invalidCode"></span></p>
					<p><span style="color: green;" ng-bind="sentMsg" ng-hide="smsValid == true"></span></p>
					<p ng-if="isSent == true">
						<span ng-hide="expired == true || smsValid == true" ng-bind="min"></span>
						<span ng-hide="expired == true || smsValid == true"  ng-bind="sec"></span>
					</p>
					<p ng-if="expired == true" ng-hide="smsValid == true"><span>시간이 만료되었습니다</span></p>
					<p ng-if="smsValid == true" style="color: green;" ><span>인증되었습니다</span></p>
				</div>
			</form>
			<div class="btnBox">
				<button type="button" class="btn btn-primary btn-lg" ng-disabled="dupValid == false" ng-click="signUp(); $event.preventDefault();">회원가입</button>
				<button ng-if="currentProperties.data.network" type="button" class="btn btn-primary btn-lg" ng-disabled="dupValid == false || smsValid == false" ng-click="signUp(); $event.preventDefault();">회원가입</button>
				<button ui-sref="login" type="button" class="btn btn-trace btn-lg">취소</button>
			</div>
		</div>
	</div>
</div>