<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="userMemberWrap">
	<div class="containor lgConbox">
		<h2>비밀번호 변경</h2>
		<div class="conBox">
			<form class="form-horizontal" name="resetForm">
				<p class="subFont">· &nbsp;&nbsp;안전한 비밀번호로 내정보를 보호하세요<br>· &nbsp;&nbsp;다른 아이디/사이트에서 사용한 적 없는 비밀번호<br>· &nbsp;&nbsp;이전에 사용한 적 없는 비밀번호가 안전합니다.</p>
<!-- 				<div class="form-group"> -->
<!-- 					<label for="password" class="col-xs-2 col-sm-2 control-label">현재 비밀번호</label> -->
<!-- 					<div class="col-xs-10 col-sm-10"> -->
<!-- 						<input type="text" class="form-control leftInput col-xs-12" id="password" placeholder=""><button type="submit" class="btn btn-trace rightBtn col-xs-12">확인</button> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 				<div class="alertBox"> -->
<!-- 					<p><span>숫자로 입력해주세요</span></p> -->
<!-- 				</div> -->
				<div class="form-group">
					<label for="newPassword" class="col-xs-2 col-sm-2 control-label">새 비밀번호</label>
					<div class="col-xs-10 col-sm-10">
						<input type="password" class="form-control" id="newPassword" name="newPw" ng-model="newPw" ng-required="true" ng-minlength="4" placeholder="새 비밀번호를 입력해주세요">
					</div>
				</div>
				<div class="alertBox" ng-if="resetForm.newPw.$dirty">
					<p ng-if="resetForm.newPw.$error.required"><span>새 비밀번호를 입력해주세요</span></p>
					<p ng-if="resetForm.newPw.$error.minlength"><span>새 비밀번호는 4자 이상 입력해주세요</span></p>
				</div>
				<div class="form-group">
					<label for="newPassword2" class="col-xs-2 col-sm-2 control-label">새 비밀번호 확인</label>
					<div class="col-xs-10 col-sm-10">
						<input type="password" ng-model="checkNewPw" name="checkNewPw" class="form-control leftInput col-xs-12" id="newPassword2" ng-required="true" ng-minlength="4" placeholder="새 비밀번호를 한번 더 입력해주세요">
<!-- 						<button type="submit" class="btn btn-trace rightBtn col-xs-12">확인</button> -->
					</div>
				</div>
				<div class="alertBox" ng-if="resetForm.checkNewPw.$dirty">
					<p ng-if="resetForm.checkNewPw.$error.required"><span>비밀번호를 한번 더 입력해주세요</span></p>
					<p ng-if="resetForm.checkNewPw.$error.minlength"><span>비밀번호는 4자 이상 입력해주세요</span></p>
					<p style="color: green;" ng-if="checkNewPw != null && checkNewPw == checkPw"><span>비밀번호가 일치합니다</span></p>
					<p ng-if="newPw != null && newPw != checkNewPw"><span>비밀번호가 일치하지 않습니다</span></p>
				</div>
			</form>
			<div class="btnBox">
				<button class="btn btn-lg btn-primary" type="button" ng-click="resetPassword(newPw);">완료</button>
				<button class="btn btn-lg btn-default" type="submit" ui-sref="login">다음에 변경하기</button>
			</div>
		</div>
<!-- 		<div class="changeAlert"> -->
<!-- 			<ul> -->
<!-- 				<li> -->
<!-- 					변경된 비밀번호는 <span>a12345</span> 입니다. -->
<!-- 				</li> -->
<!-- 			</ul> -->
		</div>
	</div>
</div>