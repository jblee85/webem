<head>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
</head>
<div class="content-wrapper">
    <section class="content-header">
      <h1>
        <b>{{ts.DASHBOARD | uppercase}}</b>
        <small>{{ts.POWER }} {{ts.SYSTEM }} {{ts.SITUATION }}, {{ts.POWER }} {{ts.BILL }} {{ts.INFO }}</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
        <li ng-if class="active">Here</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
    	<div class="dashboardWrap" >
			<div class="indexWrap">
				<div class="row">
					<div class="col-lg-12">
						<div class="svg dashBox" ng-controller="dashboard_svg_ctrl as dsvg" resize>
							<div ng-show="windowWidths > 1420" ng-include="changeSVG_dashboard('dashboard')" style="width:99%;"></div>
							<div ng-show="windowWidths <= 1420" class="appDashWrap">
								<div class="dashBox appSvgBox">
									<div>
										<i class="eCost"></i>
										<h4>{{ts.TODAY_USE_POWER}}&nbsp;&nbsp;</h4>
										<ul>
											<li><b>{{todayPkw}}</b> kWh</li>
										</ul>
									</div>
								</div>
								<div id="pcsData" class="dashBox appSvgBox dataBoxList">
									<h4>PCS</h4>
									<div class="">
										<div class="">
											<p><b>{{ pcsStatusKR | uppercase }}</b></p>
											<ul>
												<li><b>{{pcs_data.pkw}}</b></li>
												<li>kW</li>
											</ul>
										</div>
										<div>
											<p><b>{{ts.FREQUENCY}}</b></p>
											<ul>
												<li><b>{{pcs_data.hz}}</b></li>
												<li>Hz</li>
											</ul>
										</div>
										<div>
											<p><b>{{ts.SURFACE}} {{ts.TEMP}}</b></p>
											<ul>
												<li><b>{{pcs_data.tm}}</b></li>
												<li>℃</li>
											</ul>
										</div>
										<div>
											<p><b>{{ts.POWER_FACTOR}}</b></p>
											<ul>
												<li><b>{{pcs_data.pf}}</b></li>
												<li>PF</li>
											</ul>
										</div>
										<div>
											<p><b>DC {{ts.VOLTAGE}}</b></p>
											<ul>
												<li><b>{{pcs_data.dcv}}</b></li>
												<li>V</li>
											</ul>
										</div>
										<div>
											<p><b>{{ts.CONTROL}} {{ts.MODE}}</b></p>
											<ul>
												<li><b>{{pcs_data.mode}}</b></li>
												<li>mode</li>
											</ul>
										</div>
									</div>
									<div class="tableWrap">
										<table>
											<colgroup>
												<col width="20%">
												<col width="40%">
												<col width="40%">
											</colgroup>
											<tr>
												<th>R</th>
												<td><b>{{pcs_data.rst_rv}}</b>V</td>
												<td><b>{{pcs_data.rst_ra}}</b>A</td>
											</tr>
											<tr>
												<th>S</th>
												<td><b>{{pcs_data.rst_sv}}</b>V</td>
												<td><b>{{pcs_data.rst_sa}}</b>A</td>
											</tr>
											<tr>
												<th>T</th>
												<td><b>{{pcs_data.rst_tv}}</b>V</td>
												<td><b>{{pcs_data.rst_ta}}</b>A</td>
											</tr>
										</table>
									</div>
								</div>
								<div id="batteryData" class="dashBox appSvgBox dataBoxList">
									<h4>Battery</h4>
									<div>
										<div>
											<p><b>{{ts.AVAILABILITY}}</b></p>
											<ul>
												<li><b>{{bms_data.bsc.soc}}</b></li>
												<li>kWh</li>
											</ul>
										</div>
										<div>
											<p><b>{{ts.CURRENT}}</b></p>
											<ul>
												<li><b>{{bms_data.bsc.dca}}</b></li>
												<li>A</li>
											</ul>
										</div>
										<div>
											<p><b>{{ts.VOLTAGE}}</b></p>
											<ul>
												<li><b>{{bms_data.bsc.dcv}}</b></li>
												<li>V</li>
											</ul>
										</div>
										<div>
											<p><b>{{ts.STATUS}}</b></p>
											<ul>
												<li><b>{{bms_data.strMode}}</b></li>
												<li></li>
											</ul>
										</div>
									</div>
									<div class="tableWrap">
										<table>
											<colgroup>
												<col width="10%">
												<col width="50%">
												<col width="40%">
											</colgroup>
											<tr>
												<th rowspan="4">최<br>대<br>값</th>
												<td>{{ts.CELL}} {{ts.VOLTAGE}}</td>
												<td><b>{{ bms_data.max.cellv }}</b>V</td>
											</tr>
											<tr>
												<td>{{ts.LOCATION}} ({{ts.RACK}}-{{ts.MODULE}})</td>
												<td><b>{{bms_data.max.rackvno}}</b> - <b>{{bms_data.max.modulevno}}</b></td>
											</tr>
											<tr>
												<td>{{ts.MODULE}} {{TEMP}}</td>
												<td><b>{{bms_data.max.moduletm}}</b>℃</td>
											</tr>
											<tr>
												<td>{{ts.LOCATION}} ({{ts.RACK}}-{{ts.MODULE}})</td>
												<td><b>{{bms_data.max.racktmno}}</b> - <b>{{bms_data.max.moduletmno}}</b></td>
											</tr>
										</table>
									</div>
								</div>
								<div id="pvData" class="dashBox appSvgBox dataBoxList">
									<h4>PV</h4>
									<div>
										<div>
											<p><b>{{ts.ELECTRICITY_GENERATION_AMOUNT}}</b></p>
											<ul>
												<li><b>{{pvObj.MAIN.last.pvkw}}</b></li>
												<li>kW</li>
											</ul>
										</div>
										<div>
											<p><b>{{ts.CURRENT}}전류</b></p>
											<ul>
												<li><b>{{pvObj.MAIN.last.pva}}</b></li>
												<li>A</li>
											</ul>
										</div>
										<div>
											<p><b>{{ts.POWER}}전압</b></p>
											<ul>
												<li><b>{{pvObj.MAIN.last.pvv}}</b></li>
												<li>V</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-4 col-xs-12">
						<div class="graphWrap dashBox highChartWrap">
							<p>{{ts.TODAY_USE_POWER}}</p>
							<div class="graph" id="todayPowerChart" style="width:100%;height:75%;  margin: 0 auto;"></div>
						</div>
					</div>
					<div class="col-lg-4 col-xs-12">
						<div class="graphWrap dashBox highChartWrap">
							<p>{{ts.TODAY}} ESS {{ts.CHARGE_DISCHARGE}} {{AMOUNT}}</p>
							<div class="graph" id="essChart" style="width:100%;height:75%;  margin: 0 auto;"></div>
						</div>
					</div>
					<div class="col-lg-4 col-xs-12">
						<div class="graphWrap dashBox highChartWrap">
							<p>{{ts.TODAY}} SOC</p>
							<div class="graph" id="SOCChart" style="width:100%;height:75%;  margin: 0 auto;"></div>
						</div>
					</div>
				</div>
				<div class="row">
					<!-- <div class="col-lg-2 col-xs-12">
						<div class="graphWrap dashBox highChartWrap">
							<p>{{ts.COMPARATIVE_POWER_USAGE_PER_MONTH}}</p>
							<div class="graph" id="monthPowerChart" style="width:100%;height:70%;  margin: 0 auto;"></div>
						</div>
					</div>
					<div class="col-lg-2 col-xs-12">
						<div class="graphWrap dashBox highChartWrap">
							<p>월 발전량 비교</p>
							<div class="graph" id="monthDevelopChart" style="width:100%;height:70%;  margin: 0 auto;"></div>
						</div>
					</div> -->

					<div class="col-lg-2 col-sm-2 col-xs-12">
						<div class="graphWrap dashBox">
							<p>시스템 운영 정보</p>
							<div class="table-responsive">
								<table class="dashTable1 table-hover">
									<colgroup>
										<col width="40%">
										<col width="60%">
									</colgroup>
									<tr>
										<th>디스크</th>
										<td>---G / -TB</td>
									</tr>
									<tr>
										<th>타임라인</th>
										<td>-,---개</td>
									</tr>
									<tr>
										<th>최근 결함</th>
										<td>2019-04-26 15:00</td>
									</tr>
									<tr>
										<th>무결함</th>
										<td>--일</td>
									</tr>
								</table>
							</div>
						</div>
					</div>

					<div class="col-lg-2 col-xs-12">
						<div class="graphWrap dashBox highChartWrap">
<!-- 							<p>{{loadMonth}}월 전력<br>{{loadMonthkwh}} MWh 사용</p> -->
							<p>{{ts.LOAD}} {{ts.power}} {{ts.USAGE}}</p>
							<div class="graph" id="monthTOUChart" style="width:100%;height:70%;  margin: 0 auto;"></div>
						</div>
					</div>

					<!-- <div class="col-lg-2 col-sm-6 col-xs-12">
						<div class="graphWrap dashBox boxTextOverflow e-maxCapa boxList">
							<p>{{ts.ENERGE_PEAK_DEMAND}}</p>
							<ol>
								<li class=""><div>{{ts.TODAY}} {{maxspkwhDay.h}}{{ts.HOUR}} </div><div><b class="primaryFont">{{maxspkwhDay.apkwh}}</b><br><span>kWh</span></div></li>
								<li class=""><div>{{maxTime | date:'yyyy-MM-dd HH:mm:ss'}} <br><b>{{maxspkwh}}</b>kWh</div><div><i></i></div></li>
							</ol>
						</div>
					</div> -->

					<!-- <div class="col-lg-2 col-sm-6 col-xs-12">
						<div class="graphWrap dashBox boxTextOverflow e-maxCapa boxList">
							<p>{{ts.ENERGE_PEAK_DEMAND}}</p>
							<ol>
								<li class=""><div>{{ts.TODAY}} {{maxspkwhDay.h}}{{ts.HOUR}} </div><div><b class="primaryFont">{{maxspkwhDay.apkwh}}</b><br><span>kWh</span></div></li>
								<li class=""><div>이번 달 사용량 </div><div><b>{{maxspkwh}}</b><br><span>kWh</span></div></li>
							</ol>
						</div>
					</div> -->

					<div class="col-lg-2 col-sm-6 col-xs-12">
						<div class="graphWrap dashBox boxTextOverflow e-maxCapa boxList">
							<p>태양광 최대 발전량</p>
							<ol>
								<li class=""><div>{{ts.TODAY}} {{maxspkwhDay.h}}{{ts.HOUR}} </div><div><b class="primaryFont">----</b><br><span>kWh</span></div></li>
								<li class=""><div>이번 달 사용량 </div><div><b>----</b><br><span>kWh</span></div></li>
							</ol>
						</div>
					</div>

					<div class="col-lg-2 col-sm-6 col-xs-12" ng-if="configInfo.svgname == 'coolingtower'">
						<div class="graphWrap dashBox boxTextOverflow">
							<p>{{ts.COOLING_TOWER}} {{ELECTRIC_ENERGE}}</p>
							<ol>
								<li><div>{{ts.TODAY}} <br><b class="primaryFont">{{meterObj.METER_5M_COOLING_TOWER.e}}</b>kWh</div><div>
									<span id="sparkline_coolingtower_day" style="width:100%;"></span>
								</div></li>
								<li><div>{{ts.THIS_MONTH}} <br><b class="primaryFont">{{meterObj.METER_5M_COOLING_TOWER.month.e}}</b>kWh</div><div>
									<span id="sparkline_coolingtower_month" style="width:100%;"></span>
								</div></li>
							</ol>
						</div>
					</div>

					<!-- <div class="col-lg-2 col-sm-6 col-xs-12" ng-if="configInfo.svgname == 'ems_pv'">
						<div class="graphWrap dashBox boxTextOverflow">
							<p>{{ts.PV}} {{ts.ELECTRICITY_GENERATION_AMOUNT}}</p>
							<ol>
								<li><div>{{ts.TODAY}} <br><b class="primaryFont">{{pvObj.MAIN.e}}</b> kWh</div><div>
									<span id="sparkline_pv_day" style="width:100%;"></span>
								</div></li>
								<li><div>{{ts.THIS_MONTH}} <br><b class="primaryFont">{{pvObj.MAIN.month.e}}</b> kWh</div><div>
									<span id="sparkline_pv_month" style="width:100%;"></span>
								</div></li>
							</ol>
						</div>
					</div> -->

					<div class="col-lg-2 col-sm-6 col-xs-12" ng-if="configInfo.svgname == 'ems_pv'">
						<div class="graphWrap dashBox boxTextOverflow">
							<p>XX 전력 사용량</p>
							<ol>
								<li><div>{{ts.TODAY}} <br><b class="primaryFont">------</b> kWh</div><div>
									<span id="" style="width:100%;">chart</span>
								</div></li>
								<li><div>{{ts.THIS_MONTH}} <br><b class="primaryFont">------</b> kWh</div><div>
									<span id="" style="width:100%;">chart</span>
								</div></li>
							</ol>
						</div>
					</div>

					<!-- <div class="col-lg-2 col-sm-4 col-xs-12">
						<div class="graphWrap dashBox boxList">
							<p>ESS {{ts.DRIVING}} {{ts.STATS}}</p>
							<div class="table-responsive">
								<table class="dashTable1  table-hover">
									<tr>
										<th>{{ts.TODAY}} {{ts.CHARGE}}</th>
										<td>{{todayCharge | number: 2}} kW</td>
									</tr>
									<tr>
										<th>{{ts.TODAY}} {{ts.DISCHARGE}}</th>
										<td>{{todayDischarge | number: 2}} kW</td>
									</tr>
									<tr>
										<th>{{ts.THIS_MONETH}} {{ts.EFFICIENCY}}</th>
										<td>{{pcsModel.efcper}}%</td>
									</tr>
									<tr>
										<th>{{ts.THIS_MONTH}} {{ts.CYCLE}}</th>
										<td>{{essMonth.e}}</td>
									</tr>
								</table>
							</div>
						</div>
					</div> -->

					<!-- <div class="col-lg-2 col-sm-4 col-xs-12">
						<div class="graphWrap dashBox boxList">
							<p>ESS {{ts.DRIVING}} {{ts.STATS}}</p>
							<ol>
								<li>
									<div>오늘 (단위 kWh)</div>
									<div>
										{{ts.CHARGE}}
										<b class="alertFont">{{todayCharge | number: 2}}</b>
									</div>
									<div>
										{{ts.DISCHARGE}}
										<b class="dangerFont">{{todayDischarge | number: 2}}</b>
									</div>
								</li>
								<li>
									<div>이번 달</div>
									<div>
										{{ts.EFFICIENCY}}
										<b>{{pcsModel.efcper}}%</b>
									</div>
									<div>
										{{ts.CYCLE}}
										<b>{{essMonth.e}}</b>
									</div>
								</li>
							</ol>
						</div>
					</div> -->

					<!-- <div class="col-lg-2 col-sm-4 col-xs-12">
						<div class="graphWrap dashBox boxList">
							<p>ESS 장치 정보</p>
							<ol class="deviceBox">
								<li>PCS <b class="primaryFont">1</b></li>
								<li>배터리 <b class="primaryFont">1</b></li>
							</ol>
							<div class="table-responsive">
								<table class="">
									<tr>
										<th>설계용량</th>
										<th>최대출력</th>
									</tr>
									<tr>
										<td><b>1.1</b>mW</td>
										<td><b>111</b>kW</td>
									</tr>
								</table>
							</div>
						</div>
					</div>-->

					<div class="col-lg-2 col-sm-4 col-xs-12">
						<div class="graphWrap dashBox boxList">
							<p>태양광 장치 정보</p>
							<ol class="deviceBox">
								<li>태양광 <b class="primaryFont">1</b></li>
								<li>인버터 <b class="primaryFont">1</b></li>
							</ol>
							<div class="table-responsive">
								<table class="">
									<tr>
										<th>모듈 수</th>
										<th>최대출력</th>
										<th>정격출력</th>
									</tr>
									<tr>
										<td><b>11</b>장</td>
										<td><b>1.1</b>kWp</td>
										<td><b>11</b>kW</td>
									</tr>
								</table>
							</div>
						</div>
					</div>

					<!-- <div class="col-lg-2 col-sm-2 col-xs-12">
						<div class="graphWrap dashBox">
							<p>{{ts.POWER}} {{ts.BILL}} {{ts.INFO}}</p>
							<h4 class="primaryFont importFont">{{siteModel.bcode}}</h4>
							<ul>
								<li>
									<div>
										{{ts.CONTRACT}} {{ts.POWER}}
										<b>{{siteModel.data.kepcockw}} kW</b>
									</div>
								</li>
								<li>
									<div>
										{{ts.METER_DAY}}
										<b>{{siteModel.rdday}} {{ts.DAY}}</b>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-lg-2 col-sm-2 col-xs-12">
						<div class="graphWrap dashBox">
							<p>{{ts.POWER}} {{ts.BILL}} {{ts.INFO}}</p>
							<div class="table-responsive">
								<table class="dashTable1 table-hover">
									<colgroup>
										<col width="40%">
										<col width="60%">
									</colgroup>
									<tr>
										<th>{{ts.BILL}} {{ts.NAME_MONTHLY_PLAN}}</th>
										<td>{{siteModel.bcode}}</td>
									</tr>
									<tr>
										<th>{{ts.CONTRACT}} {{ts.POWER}}</th>
										<td>{{siteModel.data.kepcockw}} kW</td>
									</tr>
									<tr>
										<th>{{ts.METER_DAY}}</th>
										<td>{{siteModel.rdday}} {{ts.DAY}}</td>
									</tr>
									<tr>
										<th>{{ts.RATES_POWER}}</th>
										<td>{{billkw}} kW</td>
									</tr>
								</table>
							</div>
						</div>
					</div>-->
					<!-- <div class="col-lg-2 col-sm-2 col-xs-12">
						<div class="graphWrap dashBox">
							<p>태양광 계약 정보</p>
							<h4 class="primaryFont importFont">이승연 태양광 발전소</h4>
							<ul>
								<li>
									<div>
										용량
										<b>-- kW</b>
									</div>
								</li>
								<li>
									<div>
										REC 가중치
										<b>--</b>
									</div>
								</li>
								<li>
									<div>
										계약 형태
										<b>고정가격</b>
									</div>
								</li>
							</ul>
						</div>
					</div> -->
					<div class="col-lg-2 col-sm-2 col-xs-12">
						<div class="graphWrap dashBox">
							<p>태양광 발전 수익 (예상)</p>
							<b class="importFont calculate"><span class="">SMP 201천원</span> + <span class="">REC 201천원</span></b>
							<div class="importFont">
    							<h3 style="margin: 20px auto;"><span style="font-size: 0.7em;">Total</span> <b class="dangerFont">402천원</b></h3>
								<span class="miniFont">*단가 SMP 80원 / REC 100원 기준</span>
							</div>
						</div>
					</div>
				</div>
			</div>

        </div>
    </section>
    <!-- /.content -->
  </div>



