<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
		<div class="modal-header">
			<h4 class="modal-title">수정</h4>
		</div>
		<div class="modal-body">
			<form >
				<div class="modal-tableWrap" id="modal-AddPcs">
					<div class="input_panel">
				        <h4>edit Node</h4>
				        <label>ID</label>
				        <input data-ng-model="param.currentNode.id"/>
				        <br />
				        <label>Label</label>
				        <input data-ng-model="param.currentNode.label" />
				        <br />
				    </div>
					
				</div>
			</form>
		</div>
		<div class="modal-footer">
			<button class="btn btn-primary" ng-click="ok()">확인</button>
			<button class="btn btn-default" ng-click="cancel()">취소</button>
		</div>


