<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
		<div class="modal-header">
			<h4 class="modal-title">휴대폰 번호 변경</h4>
		</div>
		<div class="modal-body">
			<form >
				<div class="modal-tableWrap" id="modal-AddPcs">
					<div class="table table-responsive">
						<table class="table-hover">
							<colgroup>
								<col width="20%">
								<col width="50%">
								<col width="30%">
							</colgroup>
							<tbody>
								<tr>
									<td>연락처</td>
									<td>
										<select class="col-xs-3 col-sm-3" id=""  ng-model="phone[0]" ng-options="p for p in phone_list" >
										</select>
										<p class="rightText">-</p>
										<input type="text" class="col-xs-3 col-sm-3" id="" ng-model="phone[1]" placeholder="">
										<p class="rightText">-</p>
										<input type="text" class="col-xs-3 col-sm-3" id="" ng-model="phone[2]" placeholder="">
									</td>
									<td><button class="btn btn-default rightBtn" ng-click="requestSMS()">인증번호 전송</button></td>
								</tr>
								<tr>
									<td>인증코드</td>
									<td><input type="text" ng-model="smsCode"></td>
									<td><button class="btn btn-default rightBtn" ng-click="confirmSMS()">확인</button></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</form>
		</div>
		<div class="modal-footer">
			<button class="btn btn-primary" ng-disabled="!isSave" ng-click="ok()">확인</button>
			<button class="btn btn-default" ng-click="cancel()">취소</button>
		</div>


