<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="content-wrapper">
  <section class="content-header">
    <h1>
          이력
    </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> 홈</a></li>
      <li class="active">관리</li>
      <li class="active">이력</li>
    </ol>
  </section>


	<section class="content container-fluid">
	 <div class="dashboardWrap">
	  <div class="conBox" style="width: 95%;">
		 <div class="dataTables_wrapper form-inline dt-bootstrap no-footer"  style="text-align: center;">
<!-- 		 	<div id="mapp_filter" class="dataTables_filter"><label>검색:<input type="search" class="form-control input-sm" placeholder="예시) 101 101" aria-controls="mapp"></label></div> -->
			  <table datatable="ng" dt-options="dtOptions" dt-column-defs="dtColumnDefs" class="tbl-type-c">
				<colgroup>
					<col width="25%">
					<col width="5%">
					<col width="5%">
					<col width="10%">
					<col width="5%">
					<col width="5%">
					<col width="30%">
					<col width="15%">
				</colgroup>
				<thead class="ng-scope">
					<tr>
						<th>Time</th>
						<th>#</th>
						<th>Action</th>
						<th>ID</th>
						<th>Level</th>
						<th>code</th>
						<th>내용</th>
						<th>Data</th>
					</tr>
				</thead>
				<tbody class="ng-scope">
					<tr style="text-align: left;" ng-repeat="ehl in essHistoryList">
						<td>{{ ehl.cdt }}</td>
						<th>{{essHistoryList.length - $index -1}}</th>
						<td>{{ ehl.taction }}</td>
						<td>{{ ehl.userid }}</td>
						<td>{{ ehl.authlv }}</td>
						<td>{{ ehl.tcode }}</td>
						<td>{{ ehl.title }}</td>
						<td>{{ ehl.data }}</td>
				 	</tr>
				</tbody>
			</table>
		 	</div>
		 </div>
  	</div>
	</section>
</div>