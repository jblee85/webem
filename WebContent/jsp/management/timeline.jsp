<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
.dataTables_filter {
   display: none;
}
</style>
<div class="content-wrapper">
    <section class="content-header">
      <h1>
        <b>이력 관리</b>
        <small>- 사용자 활동 이력 조회 및 관리자의 ESS 장치 운전 이력 조회를 할 수 있습니다. </small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>관리</a></li>
        <li class="active">이력</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
    	<div class="dashboardWrap">
			<div class="systemMgmtWrap">
				<div class="row">
					<div class="col-lg-12 tableFilterWrap">
						<div class="form-group dashBox">
							<div class="col-md-3">
								<label for="daySearchBar" class="control-label">날짜 검색</label>
								<div class="">
									<input type="text" class="form-control" id="searchBarStart">
									&nbsp;&nbsp;<span>~</span>&nbsp;&nbsp;
									<input type="text" class="form-control" id="searchBarEnd">
								</div>
							</div>
							<div class="col-md-3">
								<label for="daySearchBar" class="control-label">Action</label>
								<div class="">
									<select class="form-control" ng-model="filter.actionType">
										<option value="">전체</option>
										<option value="0">사용자</option>
										<option value="1">시스템</option>
									</select>
								</div>
							</div>
							<div class="col-md-3">
								<label for="daySearchBar" class="control-label">권한레벨</label>
								<div class="">
									<select class="form-control" ng-model="filter.authType">
										<option value="">전체</option>
										<option value="1">사용자</option>
										<option value="3">관리자</option>
									</select>
								</div>
							</div>


							<div class="col-md-3 buttonWrap">
								<button type="button" class="btn btn-default btn-md" ng-click="search(filter);"><i class="icoUser"></i>검색</button>
							</div>
						</div>
					</div>
					<div class="col-lg-9 col-xs-12">
						<div class="graphWrap dashBox oneRowBox logBox shadowBox">
							<div class="userRegist">
								<input id="timeLineSearchbox" type="text" class="searchBox form-control" placeholder="검색">
							</div>
							<div class="table">
								<table id="timeLineTable" datatable="ng" dt-options="dtOptions" dt-column-defs="dtColumnDefs" class="tbl-type-c" style="width: 100%;">
									<colgroup>
										<col width="5%">
										<col width="15%">
										<col width="5%">
										<col width="15%">
										<col width="5%">
										<col width="5%">
										<col width="45%">
									</colgroup>
									<thead class="ng-scope">
										<tr>
											<th>#</th>
											<th>Time</th>
											<th>Action</th>
											<th>ID</th>
											<th>Level</th>
											<th>code</th>
											<th>내용</th>
										</tr>
									</thead>
									<tbody>
										<tr style="text-align: left;" ng-repeat="ehl in timelineTmp" ng-click="selectHistory($index)">
											<th>{{timelineTmp.length - $index}}</th>
											<td>{{ ehl.cdt | date:'yyyy-MM-dd HH:mm:ss' }}</td>
											<td ng-if="ehl.taction == 0">사용자</td><td ng-if="ehl.taction == 1">시스템</td>
											<td ng-if="ehl.userid != null">{{ehl.userid}}</td><td ng-if="ehl.userid == null">-</td>
											<td>{{ ehl.authlv }}</td>
											<td>{{ ehl.tcode }}</td>
											<td style="text-align:left;">{{ ehl.title }}</td>
									 	</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-xs-12 rightApply">
						<div class="graphWrap dashBox">
							<table class="">
								<caption><b>{{year}} 통계 내역</b></caption>
								<tr>
									<td>
										<table>
											<tr>
												<th></th>
												<th>사용자</th>
												<th>시스템</th>
											</tr>
											<tr ng-repeat="stat in timelineStat | limitTo: 6">
												<th>{{$index+1}}월</th>
												<td ng-if="stat.usercnt != null">{{stat.usercnt}}</td><td ng-if="stat.usercnt == null">-</td>
												<td ng-if="stat.processcnt != null">{{stat.processcnt}}</td><td ng-if="stat.processcnt == null">-</td>
											</tr>
										</table>
									</td>
									<td>
										<table>
											<tr>
												<th></th>
												<th>사용자</th>
												<th>시스템</th>
											</tr>
											<tr ng-repeat="stat in timelineStat| limitTo: -6">
												<th>{{$index+1 + 6}}월</th>
												<td ng-if="stat.usercnt != null">{{stat.usercnt}}</td><td ng-if="stat.usercnt == null">-</td>
												<td ng-if="stat.processcnt != null">{{stat.processcnt}}</td><td ng-if="stat.processcnt == null">-</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</div>
						<div class="graphWrap dashBox alignLeft">
							<table class="">
								<colgroup>
									<col width="25%">
									<col width="75%">
								</colgroup>
								<caption><b>상세 보기</b></caption>
								<tr>
									<th>제목</th>
									<td>{{selectedHistory.title}}</td>
								</tr>
								<tr>
									<th>시간</th>
									<td>{{ selectedHistory.cdt | date:'yyyy-MM-dd HH:mm:ss' }}</td>
								</tr>
								<tr>
									<th>Level</th>
									<td>{{selectedHistory.authlv}}</td>
								</tr>
								<tr>
									<th>상세내역</th>
									<td>
										<div><textarea readonly="readonly">{{selectedHistory.data}}</textarea></div>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>

        </div>
    </section>
    <!-- /.content -->
  </div>