<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<div class="container loginContainer" ng-init="init()">
		<div class="logoWrap"><h2 class="form-signin-heading"><span href="login.jsp" class="logo"><!-- <i></i>&nbsp;Smart ICE <span>EMS</span></span> --></h2></div>
		<div class="langService"><span><i></i><a href="#" class="focus">KO</a><a href="#">EN</a></span></div>
		<form class="form-signin row" name="myForm" role="form" >
			<div class="loginForm" ng-hide="showFindIdResult == true">
				<h4>아이디 찾기</h4>
				<div class="inputIn">
					<div class="form-horizontal radioBtnWrap" name="formByPhone" id="formByPhone">
					    <label for="byPhone">
					    	<input type="radio" name="authNum" value="byPhone" ng-model="radioType" ng-checked="radioType == 'byPhone'" ng-change="resetForm(formByPhone)" class="ng-valid ng-touched ng-dirty ng-valid-parse ng-pristine ng-untouched ng-empty" checked="checked">휴대전화 인증
					    </label>
						<div class="minifont"><span>회원정보에 등록한 휴대전화 번호와 입력한 휴대전화 번호가 같아야,<br>인증번호를 받을 수 있습니다.</span></div>
					</div>
    				<div class="inputList">
						<label for="inputId">이름</label>
						<input type="text" id="inputId" class="form-control" placeholder="이름" name="inputId" ng-model="username" required autofocus>
						<div class="minifont has-error">
				            <span class="dangerFont" ng-if="myForm.inputId.$error.required">이름을 입력해 주세요.</span>
				        </div>
				        <label for="inputCall">휴대전화 인증</label>
						<div class="inputWrap" style="margin-bottom: 10px;">
						    <div class="leftInput floatFlex">
						        <select class="form-control" name="phone1" ng-model="phone1">
						          <option value="010">010</option>
						          <option value="011">011</option>
						          <option value="012">012</option>
						          <option value="017">017</option>
						        </select>
						        <p class="rightText">-</p>
						        <input type="text" class="form-control" placeholder="" name="phone2" ng-model="phone2" ng-pattern="/^\d+$/" ng-maxlength="4">
						        <p class="rightText">-</p>
						        <input type="text" class="form-control" placeholder="" name="phone3" ng-model="phone3" ng-pattern="/^\d+$/" ng-maxlength="4">
						    </div>
						    <button type="submit" class="btn btn-primary rightBtn" ng-if="validChecks.authCodeStatus == 0" ng-click="requestAuthCode($event, 1, 'id')">인증번호받기</button>
							<button type="submit" class="btn btn-primary rightBtn"
						    	ng-if="validChecks.authCodeStatus != 0"
						    	ng-click="requestAuthCode($event, 2, 'id')"
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
       				</div>
			        <div class="inputBtnWrap">
				        <button class="btn btn-lg joinBtn" type="submit" ng-click="findUserInfo($event,'id')" ng-disabled="findBtnDisable('id')">확인</button>
						<button class="btn btn-lg btn-primary" type="button" ui-sref="login" href="#!/login">취소</button>
			        </div>
				</div>
			</div>
			<div class="loginForm" ng-show="showFindIdResult == true">
				<h4>아이디<br>찾기 확인</h4>
				<div class="inputIn">
					<div class="idViewWrap">
						<h6>회원님의 아이디는 아래와 같습니다.</h6>
						<b><span>{{username}}</span>&nbsp;&nbsp;<span>{{foundId}}</span></b><br>
						<p><span>{{regdt | date:'yyyy년 MM월 dd일'}}</span>가입</p>
					</div>
			        <div class="inputBtnWrap">
						<button class="btn btn-lg btn-primary" type="button" ui-sref="login" href="#!/login">로그인</button>
			        </div>
				</div>
			</div>
		</form>
		<div class="loginFooter">Copyright Wooam, INC. ALL right reserved</div>
	</div>
