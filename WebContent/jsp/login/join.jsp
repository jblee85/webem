<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<div class="container loginContainer">
		<div class="logoWrap"><h2 class="form-signin-heading"><span href="login.jsp" class="logo"><!-- <i></i>&nbsp;Smart ICE <span>EMS</span></span> --></h2></div>
		<div class="langService"><span><i></i><a href="#" class="focus">KO</a><a href="#">EN</a></span></div>
		<form class="form-signin row" name="myForm" role="form" >
			<div class="loginForm">
				<h4>회원가입</h4>
				<div class="inputIn">
					<label for="inputId">아이디</label>
					<div class="inputWrap">
					    <input type="email" id="inputId" class="form-control" placeholder="아이디" name="inputId" ng-model="userid" ng-keyup="setIsDuplicateToNull($event)" ng-pattern="/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/" required autofocus>
						<button type="submit" class="btn btn-primary rightBtn" ng-click="dupChk($event)">중복확인</button>
					</div>
					<div class="minifont has-error">
						<span class="dangerFont" ng-if="myForm.inputId.$error.required">아이디를 입력해 주세요.</span>
						<span class="dangerFont" ng-if="myForm.inputId.$error.pattern">Email 형식으로 입력해 주세요.</span>
						<span class="dangerFont" ng-if="validChecks.isDuplicate == true" ng-hide="validChecks.isDuplicate == null">이미 존재하는 아이디 입니다.</span>
						<span class="primaryFont" ng-if="validChecks.isDuplicate == false" ng-hide="validChecks.isDuplicate == null">사용가능한 아이디 입니다.</span>
			        </div>
			        <label for="inputPassword">비밀번호</label>
			        <input type="password" id="inputPassword" name="inputPassword" ng-model="password" class="form-control" placeholder="패스워드" ng-minlength="4" ng-keyup="setIsPasswordMatch()" required>
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
			        <label for="inputName">이름</label>
					<input type="text" id="inputName" name="inputName" ng-model="name" class="form-control" placeholder="이름" required>
					<div class="minifont has-error">
			            <span class="dangerFont" ng-if="myForm.inputName.$error.required">필수 정보입니다.</span>
			        </div>
			        <label for="inputRank">직책</label>
					<input type="text" id="inputRank" name="inputRank" ng-model="pos" class="form-control" placeholder="직책" required>
					<div class="minifont has-error">
			            <span class="dangerFont" ng-if="myForm.inputRank.$error.required">필수 정보입니다.</span>
			        </div>
			        <label for="inputSite">사이트</label>
					<input type="text" id="inputSite" name="inputSite" ng-model="site" class="form-control" placeholder="사이트" required disabled>
					<div class="minifont has-error">
			            <span class="dangerFont" ng-if="myForm.inputSite.$error.required">필수 정보입니다.</span>
			        </div>
			        <label for="inputCall">휴대전화 인증</label>
					<div class="inputWrap" style="margin-bottom: 10px;">
					    <div class="leftInput floatFlex">
					        <select class="form-control" name="phone1" ng-model="phone1">
					          <option>010</option>
					          <option>011</option>
					          <option>012</option>
					          <option>017</option>
					        </select>
					        <p class="rightText">-</p>
					        <input type="text" class="form-control" placeholder="" name="phone2" ng-model="phone2" ng-pattern="/^\d+$/" ng-maxlength="4">
					        <p class="rightText">-</p>
					        <input type="text" class="form-control" placeholder="" name="phone3" ng-model="phone3" ng-pattern="/^\d+$/" ng-maxlength="4">
					    </div>
					    <button type="submit" class="btn btn-primary rightBtn" ng-if="validChecks.authCodeStatus == 0" ng-click="requestAuthCode($event, 1)">인증번호받기</button>
					    <button type="submit" class="btn btn-primary rightBtn"
					    	ng-if="validChecks.authCodeStatus != 0"
					    	ng-click="requestAuthCode($event, 2)"
					    	ng-disabled="validChecks.isAuthCodeValid == true"
					    	>인증번호재전송
					    </button>
					</div>
					<label for=""></label>
					<div class="inputWrap">
					    <div class="leftInput floatFlex">
						    <b class="primaryFont">{{min}}:{{sec}}</b>
					        <input type="text" class="form-control" name="authCode" ng-model="authCode" placeholder="인증코드 입력">
					    </div>
					    <button type="submit" class="btn btn-primary rightBtn" ng-click="confirmAuthCode($event)" ng-disabled="validChecks.isAuthCodeValid == true">인증확인</button>
					</div>
					<div class="minifont has-error">
						<span class="dangerFont" ng-if="validChecks.isSMSTimeExpired == true">시간이 만료되었습니다.</span>
						<span class="primaryFont"
							ng-if="validChecks.isReqSMSSucceed == true"
							ng-hide="validChecks.isSMSTimeExpired != null || validChecks.isAuthCodeValid != null"
							>인증번호가 문자로 전송되었습니다.
						</span>
						<span class="primaryFont"
							ng-if="validChecks.isReqSMSSucceed == true && validChecks.isSMSTimeExpired == false"
							ng-hide="validChecks.isSMSTimeExpired == true || validChecks.isAuthCodeValid != null"
							>인증번호가 다시 전송되었습니다.
						</span>
			            <span class="primaryFont" ng-if="validChecks.isAuthCodeValid == true">휴대전화 인증 확인되었습니다.</span>
			            <span class="dangerFont"
				            ng-if="validChecks.isAuthCodeValid == false"
				            ng-hide="validChecks.isSMSTimeExpired == false"
				        	>인증코드가 일치하지 않습니다.
				        </span>
			        </div>
			        <div class="inputBtnWrap">
				        <button class="btn btn-lg joinBtn" type="submit" ng-click="signUp($event)" ng-disabled="signUpBtnDisable()">회원등록</button>
						<button class="btn btn-lg btn-primary" type="button" ui-sref="login">취소</button>
			        </div>
				</div>
			</div>
		</form>
		<div class="loginFooter">Copyright Wooam, INC. ALL right reserved</div>
	</div>