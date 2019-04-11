<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<title>공지사항</title>
	</head>
	<body>
		<div class="content-wrapper" id="developMode">
			<div class="">
			<h3>리스트</h3>
			<div class="location">
				<a href="#"><img src="<c:url value='/images/ico_home.gif' />" alt="홈"></a>
				<a href="#">고객 지원</a>
				<span class="current">공지사항</span>
			</div>
			<div class="fullWrap">
				<div class="bgBox">
					<div class="width_100per" style="height:50px;">
						<div class="col-md-2 height_100per">
							<div class="width_100per" style="height:10px;">Battery</div>
							<div class="col-md-6 bd">충전</div>
							<div class="col-md-6 bd">방전</div>
						</div>
						<div class="col-md-2">
						</div>
						<div class="col-md-2">
						</div>
						<div class="col-md-2">
						</div>
						<div class="col-md-3">
						</div>
						<div class="col-md-1">
						</div>
					</div>
					<div class="bgBoxBtn">
						<button class="btnStyle lgBtn" type="button" ng-click="write()" ng-show="boards.session.authlv == 3">글쓰기</button>
						<button class="btnStyle lgBtn" type="button" ng-click="delBoard()" ng-show="boards.session.authlv == 3">삭제</button>
						<button class="btnStyle lgBtn" type="button" ng-click="goBoardList()">목록으로</button>
					</div>
					<div class="">
						<table class="table" datatable="ng" dt-options="dtOptions" dt-column-defs="dtColumns">
							<thead>
								<tr>
									<th>id</th>
									<th>firstName</th>
									<th>lastName</th>
								</tr>
							</thead>
							<tr ng-repeat="b in list.data">
								<td>{{b.id}}</td>
								<td>{{b.firstName}}</td>
								<td>{{b.lastName}}</td>
							</tr>
						</table>
					</div>
				</div><!-- //bgBox -->
			</div><!-- //fullWrap -->
		</div><!--/.container-fluid  /dashboardController -->
	</body> <!-- /body -->
	<script src="<c:url value='/lib/bootstrap-3.3.7-dist/js/sb-admin.js' />"></script>
</html> <!-- /html -->

