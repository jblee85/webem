<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<div class="container loginContainer">
		<div class="logoWrap"><h2 class="form-signin-heading"><span href="login.jsp" class="logo"><!-- <i></i>&nbsp;Smart ICE <span>EMS</span></span> --></h2></div>
		<div class="langService"><span><i></i><a href="#" class="focus">KO</a><a href="#">EN</a></span></div>
		<form class="form-signin row" name="myForm" role="form" >
			<div class="loginForm" ng-show="showPwChangeResult == false">
				<h4>비밀번호<br>재설정</h4>
				<div class="inputIn">
					<div class="idViewWrap">
						<b><span>{{userModel.username}}</span>&nbsp;&nbsp;<span>{{userModel.userid}}</span></b><br>
						<p>회원님의 새로운 비밀번호를 입력해 주세요.</p>
					</div>
    				<div class="inputList">
						<label for="inputPassword">비밀번호</label>
				        <input type="password" id="inputPassword" name="inputPassword" ng-model="password" class="form-control" placeholder="패스워드" ng-keyup="setIsPasswordMatch()" ng-minlength="4" required>
				        <div class="minifont has-error">
				        	<span class="dangerFont" ng-if="myForm.inputPassword.$error.required">비밀번호를 입력하지 않았습니다.</span>
							<span class="dangerFont" ng-if="myForm.inputPassword.$error.minlength">비밀번호는 4자 이상 입력해 주세요.</span>
				        </div>
						<label for="inputPassword2">비밀번호 확인</label>
				        <input type="password" id="inputPassword2" name="inputPassword2" ng-model="password2" class="form-control" placeholder="패스워드재입력" ng-keyup="setIsPasswordMatch()" ng-minlength="4" required>
						<div class="minifont has-error">
				        	<span class="dangerFont" ng-if="myForm.inputPassword2.$error.required">비밀번호를 입력하지 않았습니다.</span>
							<span class="dangerFont" ng-if="myForm.inputPassword2.$error.minlength">비밀번호는 4자 이상 입력해 주세요.</span>
							<span class="primaryFont" ng-hide="validChecks.isPwMatch == null" ng-if="validChecks.isPwMatch == true">비밀번호가 일치합니다.</span>
							<span class="dangerFont" ng-hide="validChecks.isPwMatch == null" ng-if="validChecks.isPwMatch == false">비밀번호가 일치하지 않습니다.</span>
				        </div>
       				</div>
			        <div class="inputBtnWrap">
				        <button class="btn btn-lg joinBtn" type="submit" ng-click="resetPassword($event)" ng-disabled="validChecks.isPwMatch != true">확인</button>
						<button class="btn btn-lg btn-primary" type="button" ui-sref="login" href="#!/login">취소</button>
			        </div>
				</div>
			</div>
			<div class="loginForm" ng-show="showPwChangeResult == true">
				<h4>비밀번호<br>변경 확인</h4>
				<div class="inputIn">
					<div class="idViewWrap">
						<h6>회원님의 비밀번호가 변경되었습니다.</h6>
						<b><span>{{userModel.username}}</span>&nbsp;&nbsp;<span>{{userModel.userid}}</span></b><br>
						<p><span>{{userModel.udt | date:'yyyy-MM-dd HH:mm:ss' }}</span> 변경 승인</p>
					</div>
			        <div class="inputBtnWrap">
						<button class="btn btn-lg btn-primary" type="button" ui-sref="login" href="#!/login">로그인</button>
			        </div>
				</div>
			</div>
		</form>
		<div class="loginFooter">Copyright Wooam, INC. ALL right reserved</div>
	</div>
