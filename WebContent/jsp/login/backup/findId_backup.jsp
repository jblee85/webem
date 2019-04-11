<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="userMemberWrap">
	<div class="containor lgConbox">
		<h2>아이디 찾기</h2>
		<div class="conBox">
			<form class="form-horizontal" name="formByPhone" id="formByPhone">
				<input type="radio" name="authNum" value="byPhone" ng-model="radioType" ng-checked="radioType == byPhone" ng-change="resetForm(formByPhone)">가입시 등록한 휴대전화로 인증
				<p class="miniFont">· 회원정보에 등록한 휴대전화 번호와 입력한 휴대전화 번호가 같아야, 인증번호를 받을 수 있습니다.</p>
				<div class="joinBox" ng-hide="radioType == 'byEmail'" >
					<div class="form-group">
						<label for="userName" class="col-xs-2 col-sm-2 control-label">이름</label>
						<div class="col-xs-10 col-sm-10">
							<input type="text" class="form-control" id="userName" placeholder="이름을 입력해주세요" ng-model="userName" name="userName" ng-required="true">
						</div>
					</div>
					<div class="alertBox" ng-show="formByPhone.userName.$dirty">
						<p ng-if="formByPhone.userName.$error.required"><span>이름을 입력해주세요</span></p>
					</div>
					<div class="form-group">
						<label for="userNum" class="col-xs-2 col-sm-2 control-label">연락처</label>
						<div class="col-xs-10 col-sm-10">
							<div class="leftInput floatFlex">
								<select class="form-control" ng-model="phone1" name="phone1" ng-required="true" ng-options="c for c in phoneCode">
								</select>
								<p class="rightText">-</p>
								<input type="text" class="form-control" ng-model="phone2" name="phone2" ng-pattern="/^\d+$/" ng-required="true" ng-maxlength="4">
								<p class="rightText">-</p>
								<input type="text" class="form-control" ng-model="phone3" name="phone3" ng-pattern="/^\d+$/" ng-required="true" ng-maxlength="4">
							</div>
							<button type="submit" class="btn btn-trace rightBtn" ng-click="sendSMS(false)" ng-hide="isSent == true">인증번호요청</button>
							<button type="submit" class="btn btn-trace rightBtn" ng-click="sendSMS(true)" ng-show="isSent == true" ng-disabled="smsValid == true">인증번호재전송</button>
						</div>
					</div>
					<div class="alertBox" ng-show="formByPhone.phone2.$dirty || formByPhone.phone3.$dirty">
						<p ng-if="formByPhone.phone2.$error.required || formByPhone.phone3.$error.required"><span>필수입력입니다</span></p>
						<p ng-if="formByPhone.phone2.$error.pattern || formByPhone.phone3.$error.pattern"><span>숫자로 입력해주세요</span></p>
					</div>
					<div class="form-group">
						<label for="userReginum" class="col-xs-2 col-sm-2 control-label">인증코드</label>
						<div class="col-xs-10 col-sm-10">
							<input type="text" class="form-control leftInput col-xs-12" id="userReginum" name="userReginum" placeholder="인증코드 5자리를 입력해주세요" ng-model="userReginum" ng-pattern="/^\d+$/" ng-maxlength="5">
							<button type="submit" class="btn btn-trace rightBtn col-xs-12" ng-disabled="isSent == false || expired == true" ng-click="confirmSMS()" ng-hide="smsValid == true">인증번호확인</button>
							<button type="submit" class="btn btn-trace rightBtn col-xs-12" ng-disabled="smsValid == true" ng-show="smsValid == true">인증완료</button>
						</div>
					</div>
					<div class="alertBox">
						<p ng-if="formByPhone.userReginum.$dirty && formByPhone.userReginum.$error.pattern"><span>숫자로 입력해주세요</span></p>
						<p ng-if="formByPhone.userReginum.$dirty && formByPhone.userReginum.$error.maxlength"><span>인증번호는 5자리입니다</span></p>
						<p><span style="color: green;" ng-bind="sentMsg" ng-hide="isSent == true || smsValid == true"></span></p>
						<p ng-if="isSent == true">
							<span ng-hide="expired == true || smsValid == true" ng-bind="min"></span>
							<span ng-hide="expired == true || smsValid == true"  ng-bind="sec"></span>
						</p>
						<p ng-if="expired == true" ng-hide="smsValid == true"><span>시간이 만료되었습니다</span></p>
						<p ng-if="smsValid == true" style="color: green;" ><span>인증되었습니다</span></p>
					</div>
				</div>
			</form>
			<form class="form-horizontal" id="formByEmail" name="formByEmail">
				<input type="radio" name="authNum" value="byEmail" ng-model="radioType" ng-change="resetForm(formByEmail)">가입시 등록한 이메일로 인증
				<p class="miniFont">· 회원정보에 등록한 메일과 입력한 메일이 같아야 인증번호를 받을 수 있습니다.</p>
				<div class="joinBox" ng-show="radioType == 'byEmail'">
					<div class="form-group">
						<label for="userName" class="col-xs-2 col-sm-2 control-label">이름</label>
						<div class="col-xs-10 col-sm-10">
							<input type="text" class="form-control" id="userName" name="userName" placeholder="이름을 입력해주세요" ng-model="userName" ng-required="true">
						</div>
					</div>
					<div class="alertBox" ng-show="formByEmail.userName.$dirty">
						<p ng-if="formByEmail.userName.$error.required"><span>필수입력입니다</span></p>
					</div>
					<div class="form-group">
						<label for="userMail" class="col-xs-2 col-sm-2 control-label">이메일</label>
						<div class="col-xs-10 col-sm-10">
							<input type="mail" class="form-control leftInput col-xs-12" id="userMail" name="userId" placeholder="이메일형식으로 입력해주세요" ng-model="userId" ng-required="true" ng-pattern="/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/">
							<button type="submit" class="btn btn-trace rightBtn" ng-click="sendEcode(false,userName,userId)" ng-hide="isSent == true">인증번호요청</button>
							<button type="submit" class="btn btn-trace rightBtn" ng-click="sendEcode(true,userName,userId)" ng-show="isSent == true" ng-disabled="ecodeValid == true">인증번호재전송</button>
						</div>
					</div>
					<div class="alertBox" ng-show="formByEmail.userId.$dirty">
						<p ng-if="formByEmail.userId.$error.required"><span>필수입력입니다</span></p>
						<p ng-if="formByEmail.userId.$error.pattern"><span>이메일 형식으로 입력해주세요</span></p>
					</div>
					<div class="form-group">
						<label for="userReginum" class="col-xs-2 col-sm-2 control-label" ng-model="userReginum" name="userReginum">인증코드</label>
						<div class="col-xs-10 col-sm-10">
							<input type="text" class="form-control leftInput col-xs-12" id="userReginum" placeholder="인증코드 5자리를 입력해주세요" ng-pattern="/^\d+$/" ng-maxlength="5">
							<button type="submit" class="btn btn-trace rightBtn col-xs-12" ng-disabled="isSent == false || expired == true" ng-click="confirmEcode(userName,userId,userReginum)" ng-hide="ecodeValid == true">인증번호확인</button>
							<button type="submit" class="btn btn-trace rightBtn col-xs-12" ng-disabled="ecodeValid == true" ng-show="ecodeValid == true">인증번호확인</button>
						</div>
					</div>
					<div class="alertBox">
						<p ng-if="formByEmail.userReginum.$dirty && formByEmail.userReginum.$error.pattern"><span>숫자로 입력해주세요</span></p>
						<p ng-if="formByEmail.userReginum.$dirty && formByEmail.userReginum.$error.maxlength"><span>인증번호는 5자리입니다</span></p>
						<p ng-if="isSent == true" style="color: green;" ng-hide="isSent == true && ecodeValid == true"><span>인증코드가 전송되었습니다</span></p>
						<p ng-if="ecodeValid == true" style="color: green;" ><span>인증되었습니다</span></p>
					</div>
				</div>
			</form>
			<div class="btnBox">
			<button class="btn btn-lg btn-primary" type="submit" ng-disabled="smsValid == false && ecodeValid == false" ng-click="findId()">확인</button>
			<button ui-sref="login" class="btn btn-lg btn-trace" type="button">취소</button>
			</div>
			</div>
		</div>
	</div>