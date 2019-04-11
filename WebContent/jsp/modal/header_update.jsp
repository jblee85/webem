<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="modal-header updateModaltitle">
	<h3 class="modal-title">버전 정보 &nbsp;<small> -&nbsp;&nbsp;최신버전으로 업데이트 및 원하는 버전으로 선택 사용하실 수 있습니다.</small></h3>
</div>
<div class="modal-body versionView">
	<h3>Ver.{{version}}</h3>
	<h5>{{versionHistory[0].name == version ? '최신 버전 입니다.' : '최신 버전이 아닙니다.'}}</h5>
	<a ng-href="jsp/guide/opensource.jsp" target="_black">오픈소스 저작권 정보</a>
</div>

<div class="modal-footer updateHistory">
	<div class="row">
		<div class="col-lg-10 col-xs-12">히스토리</div>
		<div class="col-lg-2 col-xs-12">
			<button class="btn btn-primary" ng-click="update()">적용</button>
		</div>
	</div>
	<div>
		<div ng-repeat="v in versionHistory" class="updateDiv" ng-class="{selectDiv : $index == selectIndex}" ng-click="selectVersion($index)">
			<p>Ver.{{v.uri}}<p>
			<ul>
<!-- 				<li ng-repeat="d in v.children">{{d}}</li> -->
			</ul>
		</div>
	</div>
</div>
