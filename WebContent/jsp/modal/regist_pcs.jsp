<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
		<div class="modal-header">
			<h4 class="modal-title">장치를 선택해주세요</h4>
		</div>
		<div class="modal-body">
			<form >
				<div class="modal-tableWrap" id="modal-AddPcs">

					<div class="table">
						<table class="">
							<colgroup>
								<col width="20%">
								<col width="50%">
								<col width="30%">
							</colgroup>
							<thead>
								<tr>
									<th><input type="checkbox" ng-model="selectAll" ng-click="checkAll()"></th>
									<th>사이트명</th>
									<th>장치ID</th>
								</tr>
							</thead>
						</table>
					</div>
					<div class="table table-responsive">
						<table class="table-hover">
							<colgroup>
								<col width="20%">
								<col width="50%">
								<col width="30%">
							</colgroup>
							<tbody>
								<tr ng-repeat="item in params.devs">
									<td><input type="checkbox" ng-model="item.selected"></td>
									<td>{{item.devlname}}</td>
									<td>{{item.devlid}}</td>
								</tr>
								<tr ng-if="params.devs.length == 0">
									<td>등록된 PCS가 없습니다.{{params.devs.length}} <a ui-sref="deviceManagement" href="/deviceManagement">장치등록</a></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</form>
		</div>
		<div class="modal-footer">
			<button class="btn btn-primary" ng-click="ok()">확인</button>
			<button class="btn btn-default" ng-click="cancel()">취소</button>
		</div>


