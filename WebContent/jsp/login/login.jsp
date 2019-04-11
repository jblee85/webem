<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
		<div class="bg"></div>
		<div class="container loginContainer">
			<div class="logoWrap"><h2 class="form-signin-heading"><span href="login.jsp" class="logo"><!-- <i></i>&nbsp;Smart ICE <span>EMS</span></span> --></h2></div>
			<div class="langService"><span><i></i><a href="#" class="focus">KO</a><a href="#">EN</a></span></div>
			<form class="form-signin row" name="myForm" role="form" >
				<div class="loginForm">
					<h4>환영합니다!</h4>
					<div class="inputIn">
						<label for="inputEmail">아이디</label>
						<input type="email" id="inputEmail" class="form-control" placeholder="아이디" ng-model="login.loginModel.userid" name="userid" ng-pattern="/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/" required autofocus>
						<div class="minifont has-error">
				            <span ng-if="myForm.userid.$error.required" class="dangerFont">아이디를 입력해 주세요.</span>
				            <span ng-if="myForm.userid.$error.pattern" class="dangerFont">Email 형식으로 입력해 주세요.</span>
				        </div>
				        <label for="inputPassword">비밀번호</label>
				        <input type="password" id="inputPassword" name="inputPassword" class="form-control" ng-keydown="enterEventFnc($event)" placeholder="패스워드" ng-model="login.loginModel.password" required>
				        <div class="minifont has-error">
				        	<span ng-if="myForm.inputPassword.$error.required" class="dangerFont">비밀번호를 입력해 주세요.</span>
				        </div>
						<div class="checkbox">
							<label for="saveid">
								<input id="saveid" type="checkbox" value="remember-me"> 아이디 저장
							</label>
						</div>
						<button class="btn btn-lg btn-primary btn-block" type="submit" ng-click="loginFnc()" ng-disabled='((login.loginModel.userid == "" || login.loginModel.userid == null ) || (login.loginModel.password == "" ||login.loginModel.password == null ))'>로그인</button>
						<button class="btn btn-lg btn-block joinBtn" type="button" ui-sref="join" ng-disabled="((login.validation.duplicateCheck == false ) || (login.validation.passwordCheck == false) || (login.validation.smsCertification == false) ) ">회원가입</button>
<!-- 						<ul ng-if="currentProperties.data.network" class="searchId"> -->
						<ul class="searchId">
							<li><a ui-sref="findId" ui-sref-active="">아이디 찾기</a></li>
			    			<li><a ui-sref="changePw" ui-sref-active="">비밀번호 찾기</a></li>
						</ul>
<!-- 					<button class="btn btn-lg btn-primary btn-block" type="button" ng-click="goURL('initSetting')">초기설정</button> -->
					</div>
				</div>
			</form>
			<div class="loginFooter">Copyright Wooam, INC. ALL right reserved</div>
		</div>
