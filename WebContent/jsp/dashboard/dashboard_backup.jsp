<head>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
</head>
<div class="content-wrapper">
    <section class="content-header">
      <h1>
        DashBoard
        <small>Optional description</small>
      </h1>
<!--       <ol class="breadcrumb"> -->
<!--         <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li> -->
<!--         <li class="active">Here</li> -->
<!--       </ol> -->
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
    	<div class="dashboardWrap" >
			<div class="">
				<div class="row">
					<div class="col-lg-8 col-xs-12">
						<div class="svg dashBox" ng-controller="dashboard_svg_ctrl as dsvg"><div ng-include=" ' ./svg/iceEm_dashboard_blue.svg' "></div></div>
						<!-- <div class="svg dashBox"><div ng-include=" ' ./svg/dashboard3.svg' "></div></div> -->
					</div>
					<div class="col-lg-4 col-xs-12">
						<div class="graphWrap dashBox table-responsive">
							<p>전력 요금 정보</p>
							<table class="dashTable1 table-hover">
								<tr>
									<th>요금제명</th>
									<td>산업용(을)고압A 선택(Ⅱ)</td>
								</tr>
								<tr>
									<th>계약전력</th>
									<td>1750 kW</td>
								</tr>
								<tr>
									<th>검침일</th>
									<td>30일</td>
								</tr>
								<tr>
									<th>요금적용전력</th>
									<td>607 kW</td>
								</tr>
							</table>
						</div>
						<div class="graphWrap dashBox">
							<p>7월 전력 0.000MWh 사용</p>
							<div class="graph" id="thisMonthPowerChart" style="width:100%;height:75%;  margin: 0 auto;"></div>
						</div>
						<div class="graphWrap dashBox">
							<p>절감 요금 (단위:천원)</p>
							<table class="dashTable1 table-hover">
								<tr>
									<th>오늘</th>
									<td></td>
								</tr>
								<tr>
									<th>7월</th>
									<td></td>
								</tr>
								<tr>
									<th>18년</th>
									<td></td>
								</tr>
								<tr>
									<th>운영 누적</th>
									<td></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-4 col-xs-12">
						<div class="graphWrap dashBox">
							<p>오늘 전력 사용량</p>
							<div class="graph" id="todayPowerChart" style="width:100%;height:75%;  margin: 0 auto;"></div>
						</div>
					</div>
					<div class="col-lg-4 col-xs-12">
						<div class="graphWrap dashBox">
							<p>오늘 ESS 충/방전량</p>
							<div class="graph" id="essChart" style="width:100%;height:75%;  margin: 0 auto;"></div>
						</div>
					</div>
					<div class="col-lg-4 col-xs-12">
						<div class="graphWrap dashBox">
							<p>오늘 SOC</p>
							<div class="graph" id="SOCChart" style="width:100%;height:75%;  margin: 0 auto;"></div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-2 col-xs-12">
						<div class="graphWrap dashBox">
							<p>월 전력 사용량 비교</p>
							<div class="graph" id="monthPowerChart" style="width:100%;height:70%;  margin: 0 auto;"></div>
						</div>
					</div>
					<div class="col-lg-2 col-xs-12">
						<div class="graphWrap dashBox imgList">
							<p>최대 수요 전력량</p>
							<ol>
								<li class="grayBox"><div>오늘 14:32 <br><b>524.95</b>kWh</div><div><i>image</i></div></li>
								<li class="grayBox"><div>월간 18.07.25 14:32 <b>524.95</b>kWh</div><div><i>image</i></div></li>
							</ol>
						</div>
					</div>
					<div class="col-lg-2 col-xs-12">
						<div class="graphWrap dashBox">
							<p>태양광 발전량</p>
							<ol>
								<li><div>오늘 <br><b>524.95</b>kWh</div><div><img src="resources/images/graph1.png" width="100%" height="100%"></div></li>
								<li><div>월간 <br><b>524.95</b>kWh</div><div><img src="resources/images/graph1.png" width="100%" height="100%"></div></li>
							</ol>
						</div>
					</div>
					<div class="col-lg-2 col-xs-12">
						<div class="graphWrap dashBox">
							<p>ESS 운전통계</p>
							<table class="dashTable1">
								<tr>
									<th>오늘 충전</th>
									<td></td>
								</tr>
								<tr>
									<th>오늘 방전</th>
									<td></td>
								</tr>
								<tr>
									<th>7월 효율</th>
									<td></td>
								</tr>
								<tr>
									<th>7월 사이클</th>
									<td></td>
								</tr>
							</table>
						</div>
					</div>
					<div class="col-lg-4 col-xs-12">
						<div class="graphWrap dashBox" id="pcsTimeline">
							<p>타임라인 - 사용자 제어</p>
							<div>
								<table class="">
									<colgroup>
										<col width="35%">
										<col width="25%">
										<col width="40%">
									</colgroup>
									<thead>
										<tr>
											<th>시간</th>
											<th>구분</th>
											<th>내용</th>
										</tr>
									</thead>
								</table>
							</div>
							<div class="table-responsive tableBody" style="height:85px;">
								<table class="table-hover">
									<colgroup>
										<col width="35%">
										<col width="25%">
										<col width="40%">
									</colgroup>
									<tbody>
										<tr ng-repeat="ehl in essHistoryList">
											<td>{{ehl.cdt}}</td>
											<td>{{ehl.taction}}</td>
											<td>{{ehl.title}}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
<!-- 					<div class="col-lg-2 col-xs-12"> -->
<!-- 						<div class="graphWrap dashBox"> -->
<!-- 							<p>운영 정보</p> -->
<!-- 							<table class="table-hover"> -->
<!-- 								<tr> -->
<!-- 									<th>th1</th> -->
<!-- 									<td></td> -->
<!-- 								</tr> -->
<!-- 								<tr> -->
<!-- 									<th>th2</th> -->
<!-- 									<td></td> -->
<!-- 								</tr> -->
<!-- 								<tr> -->
<!-- 									<th>th3</th> -->
<!-- 									<td></td> -->
<!-- 								</tr> -->
<!-- 								<tr> -->
<!-- 									<th>th4</th> -->
<!-- 									<td></td> -->
<!-- 								</tr> -->
<!-- 								<tr> -->
<!-- 									<th>th5</th> -->
<!-- 									<td></td> -->
<!-- 								</tr> -->
<!-- 							</table> -->
<!-- 						</div> -->
<!-- 					</div> -->
				</div>
			</div>

        </div>
    </section>
    <!-- /.content -->
  </div>



