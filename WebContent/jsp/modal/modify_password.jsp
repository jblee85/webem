<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
		<div class="modal-header">
			<h4 class="modal-title">비밀번호 변경</h4>
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
									<td>기존 비밀번호</td>
									<td><input type="password" ng-model="UserPasswordChangeReqb.password"></td>
								</tr>
								<tr>
									<td>새 비밀번호</td>
									<td><input type="password" ng-model="UserPasswordChangeReqb.newpassword"></td>
								</tr>
								<tr>
									<td>비밀번호 확인</td>
									<td><input type="password" ng-model="UserPasswordChangeReqb.newpassword1"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</form>
		</div>
		<div class="modal-footer">
			<button class="btn btn-primary" ng-click="ok()">변경</button>
			<button class="btn btn-default" ng-click="cancel()">취소</button>
		</div>


