<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
.dataTables_filter {
   display: none;
}
div.dataTables_paginate ul.pagination{
	float:left !important;
}
</style>
<div class="content-wrapper">
    <section class="content-header">
      <h1>
        <b>사용자 승인 관리</b>
        <small></small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
        <li class="active">Here</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
    	<div class="userMgmtWrap">
			<div class="row">
				<div class="col-lg-12">
					<div class="graphWrap dashBox oneRowBox">
						<div class="userRegist">
							<input type="text" id="userListserachbox" class="searchBox form-control" placeholder="검색"/>
							<div class="buttonWrap">
								<button type="button" class="btn btn-primary btn-lg" ng-click="addUser()"><i class="icoUser"></i>사용자 등록</button>
								<button type="button" class="btn btn-default btn-lg" ng-click="delUser()"><i class="icoDel"></i>삭제</button>
							</div>
						</div>
						<div class="table">
							<table datatable="ng" dt-options="dtOptions" dt-column-defs="dtColumns" class="tbl-type-c" id="userListTable" style="width: 100%;">
								<colgroup>
									<col width="8%">
									<col width="20%">
									<col width="10%">
									<col width="12%">
									<col width="10%">
									<col width="12%">
									<col width="12%">
									<col width="16%">
								</colgroup>
								<thead>
									<tr>
										<td><input type="checkbox" ng-model="selectAllUsers" ng-checked="selectAllUsers" ng-change="checkAllUsers(selectAllUsers)"></td>
										<td>아이디</td>
										<td>이름</td>
										<td>등급</td>
										<td>연락처</td>
										<td>가입일</td>
										<td>승인여부</td>
										<td> </td>
									</tr>
								</thead>
								<tbody>
									<tr style="text-align: left;" ng-repeat="u in userList">
										<td><input type="checkbox" ng-model="u.selected"></td>
										<td>{{ u.userid }}</td>
										<td>{{ u.namecard.name }}</td>
										<td>{{ u.auth.authlv }}</td>
										<td>{{ u.namecard.sphone }}</td>
										<td>{{u.rdt | date:'yyyy-MM-dd HH:mm:ss'}}</td>
										<td><span ng-class="{primaryFont : u.enable, dangerFont : !u.enable}">{{u.enable ? 'O' : 'X'}}</span></td>
										<td>
											<div class="buttonWrap">
												<button type="button" class="btn btn-md" ng-class="{'btn-trace' : u.enable, 'btn-primary' : !u.enable}" ng-click="userEnable(u.userid,u.enable)">{{u.enable ? '미 승인' : '승인'}}</button>
<!-- 												<button type="button" class="btn btn-trace btn-md">승인 취소</button> -->
												<button type="button" class="btn btn-default btn-md" ng-click="modifyUser(u.userid)">수정</button>
											</div>
										</td>
									  </tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
    </section>
    <!-- /.content -->
  </div>