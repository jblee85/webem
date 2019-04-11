<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
.dataTables_filter {
   display: none;
}
</style>
<div class="content-wrapper">
    <section class="content-header">
      <h1>
        <b>로그 관리</b>
        <small>- 시스템 로그의 검색, 조회 및 로그 파일을 다운로드 할 수 있습니다.</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>관리</a></li>
        <li class="active">로그</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
    	<div class="systemMgmtWrap">
			<div class="row">
				<div class="col-lg-12 tableFilterWrap">
					<div class="form-group dashBox">
						<div class="col-md-3">
							<label for="daySearchBar" class="control-label">로그 생성일</label>
							<div class="">
								<input type="text" class="form-control" id="searchBarStart">
								&nbsp;&nbsp;<span>~</span>&nbsp;&nbsp;
								<input type="text" class="form-control" id="searchBarEnd">
							</div>
						</div>
						<div class="col-md-3 buttonWrap">
							<button type="button" class="btn btn-default btn-md" ng-click="search(startVal,endVal);"><i class="icoUser"></i>검색</button>
						</div>
					</div>
				</div>
				<div class="col-lg-12">
					<div class="graphWrap dashBox oneRowBox logBox shadowBox">
						<div class="userRegist">
							<input id="logSearchbox"type="text" class="searchBox form-control" placeholder="검색">
						</div>
						<div class="table">
							<table id="logTable" datatable="ng" dt-options="dtOptions" dt-column-defs="dtColumnDefs" class="tbl-type-c" style="width: 100%;">
								<colgroup>
									<col width="8%">
									<col width="20%">
									<col width="10%">
									<col width="12%">
									<col width="10%">
								</colgroup>
								<thead>
									<tr>
										<td>no.</td>
										<td>파일명</td>
										<td>로그 생성일</td>
										<td>크기</td>
										<td>다운로드</td>
									</tr>
								</thead>
								<tbody>
									<tr ng-repeat="log in logListsTmp">
										<td>{{logListsTmp.length -$index}}</td>
										<td><b>{{log.name}}</b></td>
										<td><b>{{log.cdt | date:'yyyy-MM-dd HH:mm:ss' }}</b></td>

										<td>
											<span ng-switch="log.capacity > 1024*1024">
												<span ng-switch-when="true">{{log.capacity / 1024 / 1024 | number:2}} MB</span>
							                	<span ng-switch-default>{{log.capacity / 1024 | number:2}} kB</span>
						            		</span>
						            	</td>
										<td>
											<div class="buttonWrap">
												<button type="button" class="btn btn-trace btn-md" ng-click="downloadFile(log.name)"><b>DOWNLOAD</b></button>
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