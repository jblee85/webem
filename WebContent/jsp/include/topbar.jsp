<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
	<header class="main-header" ng-class="{'danger-header' : ((capped.pcs.faults != null) || (capped.bms.faults != null))}">
				<a ui-sref="dashboard" href="/dashboard" class="logo"> <span class="logo-mini"><b>EMS</b></span><span class="logo-lg"><i></i><b>Smart ICE</b> EMS</span></a>
				<nav class="navbar navbar-static-top" role="navigation" >
					<a href="javascript:void(0);" class="sidebar-toggle" data-toggle="push-menu" role="button"> <span class="sr-only">Toggle navigation</span></a>
					<div class="navbar-custom-menu">
						<ul class="nav navbar-nav darkNav">
							<!-- <li class="dateTime" style="padding-right: 15px;"> --><li class="dateTime" ><p><span class="miniFont">{{ampm}}&nbsp;</span>{{h}}<span class="blink">:</span>{{m}}</p><p>{{day}}</p></li>
						    <!-- <li ng-if="currentProperties.data.network" class="weather"> --><li class="weather"><i class="icoCloudy2"></i><b class=""><span>28</span>℃</b><i class="icoCloudA">5</i></li>
						    <li class="schedule"><div><p class="textOmit">{{PCScontrol.name}}</p>&nbsp;&nbsp;<span></span>&nbsp;&nbsp;<p ng-class="cmdState()" class="state">{{PCScontrol.cmd  | uppercase}}<!--정지/대기/충전/방전--></p>&nbsp;&nbsp;<span></span>&nbsp;&nbsp;<p class="textOmit"><b>{{PCScontrol.pkw}}</b>&nbsp;kW</p></div></li>
						    <li class="battery navText"><i class="icoBattery"><div><div ng-style="{ 'width' : soc + '%','background' : socColor}"></div><i class="icoThunder"></i></div>{{soc}}%</i><!--<span>502.378</span>kWh--></li>
						    <li class="mqtt"><i class="icoMqtt" ng-class="mqttStatus()"></i></li>
							<li class="dropdown notifications-menu">
								<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">
									  <i class="icoBell"></i>
									  <span class="label">
									  		<span class="label-success" ng-class="{opctHide : dashBoardData.pcs.alrams == null && dashBoardData.bms.alrams == null}">{{(dashBoardData.pcs.alrams == null && dashBoardData.bms.alrams == null) ? 0 : dashBoardData.pcs.alrams.length + dashBoardData.bms.alrams.length}}</span>
											<span class="label-warning" ng-class="{opctHide : dashBoardData.pcs.warnings == null && dashBoardData.bms.warnings == null}">{{(dashBoardData.pcs.warnings == null && dashBoardData.bms.warnings == null) ? 0 : dashBoardData.pcs.warnings.length + dashBoardData.bms.warnings.length}}</span>
											<span class="label-danger" ng-class="{opctHide : dashBoardData.pcs.faults == null && dashBoardData.bms.faults == null}">{{(dashBoardData.pcs.faults == null && dashBoardData.bms.faults == null) ? 0 : dashBoardData.pcs.faults.length + dashBoardData.bms.faults.length}}</span>
<!-- 										<span class="label-success" ng-if="capped.pcs.alrams != null || capped.bms.alrams != null">{{capped.pcs.alrams.length + capped.bms.alrams.length}}</span> -->
<!-- 										<span class="label-warning" ng-if="capped.pcs.warnings != null || capped.bms.warnings != null">{{capped.pcs.warnings.length + capped.bms.warnings.length}}</span> -->
<!-- 										<span class="label-danger" ng-if="capped.pcs.faults != null || capped.bms.faults != null">{{capped.pcs.faults.length + capped.bms.faults.length}}</span> -->
									  </span>
								</a>
								<ul class="dropdown-menu">
<!-- 									<li class="header">읽지않은 알림 <b>10</b>개</li> -->
									<li>
										<ul class="menu">
											<li ng-repeat="pa in capped.pcs.alrams">
												<a ui-sref="pcsDetail" href="/pcsDetail" class="text-green"> <i class="icoBell-gr"></i>PCS : {{pa}}</a>
											</li>
											<li ng-repeat="pw in capped.pcs.warnings">
												<a ui-sref="pcsDetail" href="/pcsDetail" class="text-yellow"> <i class="icoWran"></i>PCS : {{pw}}</a>
											</li>
											<li ng-repeat="pf in capped.pcs.faults">
												<a ui-sref="pcsDetail" href="/pcsDetail" class="text-red"> <i class="icoDanger"></i>PCS : {{pf}}</a>
											</li>
											<li ng-repeat="ba in capped.bms.alrams">
												<a ui-sref="bmsDetail" href="/bmsDetail" class="text-green"> <i class="icoBell-gr"></i>BMS : {{ba}}</a>
											</li>
											<li ng-repeat="bw in capped.bms.warnings">
												<a ui-sref="bmsDetail" href="/bmsDetail" class="text-yellow"> <i class="icoWran"></i>BMS : {{bw}}</a>
											</li>
											<li ng-repeat="bf in capped.bms.faults">
												<a ui-sref="bmsDetail" href="/bmsDetail" class="text-red"> <i class="icoDanger"></i>BMS : {{bf}}</a>
											</li>
										</ul>
									</li>
<!-- 									<li class="footer"><a ui-sref="timeline" href="/timeline">View all</a></li> -->
								</ul>
							</li>
							<li class="controlToggleButton">
				              <a href="javascript:void(0);" ng-click="openRight()"><i class="icoQuestionGear"></i></a>
				            </li>
						</ul>
					</div>
				</nav>
			</header>
<aside id="right-sidebar" class="control-sidebar control-sidebar-dark" ng-class="{'control-sidebar-open' : showRight}" style="height:100%;">
    <div class="tab-content" style="height:100%;">
      <!-- Home tab content -->
		<div class="tab-pane active" id="control-sidebar-home-tab" style="height:84%;">
<!-- 			<h3 class="control-sidebar-heading">{{ts.MULTILANGUAGE | capitalize}}</h3> -->
<!-- 			<ul class="control-sidebar-menu"> -->
<!-- 				<li> -->
<!-- 					<a href="javascript:void(0)" ng-click="multiLng(1)"> -->
<!-- 					  <div class="menu-info"> -->
<!-- 						<h5 class="">{{ts.KOREAN}}</h5> -->
<!-- 					  </div> -->
<!-- 					</a> -->
<!-- 				</li> -->
<!-- 				<li> -->
<!-- 					<a href="javascript:void(0)" ng-click="multiLng(2)"> -->
<!-- 					  <div class="menu-info"> -->
<!-- 						<h5 class="">{{ts.ENGLISH}}</h5> -->
<!-- 					  </div> -->
<!-- 					</a> -->
<!-- 				</li> -->
<!-- 			</ul> -->
			<h3 class="control-sidebar-heading">{{ts.GUIDE}}</h3>
			<ul class="control-sidebar-menu">
				<li>
					<a ng-href="jsp/guide/smart_ice_ems_guide.pdf" target="_black">
					  <i class="menu-icon icoAllpage bg-red"></i>
					  <div class="menu-info">
						<h5 class="">PC {{ts.INSTRUCTIONS}}</h5>
					  </div>
					</a>
				</li>
				<li>
					<a ng-href="jsp/guide/smart_ice_ems_guide_m.pdf" target="_black">
					  <i class="menu-icon icoAllpage bg-red"></i>
					  <div class="menu-info">
						<h5 class="">Mobile {{ts.INSTRUCTIONS}}</h5>
					  </div>
					</a>
				</li>
			</ul>
			<!-- /.control-sidebar-menu -->
			<h3 class="control-sidebar-heading">{{ts.DASHBOARD}} {{ts.THEME}}</h3>
			<ul class="list-unstyled themaList">
				<li>
					<a href="javascript:void(0)" class="full-opacity-hover" ng-click="changeTheme('simple')" style="background: url(./images/img_sprites.png) -1px -753px no-repeat;"></a>
					<p class="text-center no-margin">Simple</p>
				</li>
				<li>
					<a href="javascript:void(0)" class="full-opacity-hover" ng-click="changeTheme('mechanic')" style="background: url(./images/img_sprites.png) -64px -753px no-repeat;"></a>
					<p class="text-center no-margin">Mechanic</p>
				</li>
			</ul>
			<!-- /.control-sidebar-menu -->
		</div>
		<div class="updateBox">
			<div>
				<button class="btn btn-primary btn-md" ng-click="openUpdate()">{{ts.UPDATE}} {{ts.INFO}}</button>
			</div>
			<div>
				<h5>Ver.{{version}}</h3>
			</div>
		</div>
		<!-- /.tab-pane -->
		<!-- Stats tab content -->
		<div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
		<!-- /.tab-pane -->
		<!-- Settings tab content -->
		<div class="tab-pane" id="control-sidebar-settings-tab">
			<form method="post">
				<h3 class="control-sidebar-heading">General Settings</h3>

				<div class="form-group">
					<label class="control-sidebar-subheading">
					  Report panel usage
					  <input type="checkbox" class="pull-right" checked>
					</label>
					<p>
					  Some information about this general settings option
					</p>
				</div>
				<!-- /.form-group -->
			</form>
		</div>
		<!-- /.tab-pane -->
    </div>
  </aside>
  <div class="control-sidebar-bg"></div>
  <section class="content-navWrap">
		<div class="con-navWrap">
			<ul class="row conNav">
			  <li class="schedule col-sm-6 col-xs-12"><span>{{PCScontrol.name}}</span>&nbsp;&nbsp;-&nbsp;&nbsp;<span>{{PCScontrol.cmd}}</span></li>
			  <li class="capa col-sm-3 col-xs-7"><span>{{PCScontrol.pkw}}</span>kWh</li>
			  <!-- <li class="weather col-lg-2 col-xs-5"><i class="icoCloudy2"></i><b class=""><span>28</span>℃</b><i class="icoCloudA">100%</i></li> -->
			  <li class="battery col-sm-3 col-xs-5">
				<div><div ng-style="{ 'width' : soc + '%','background' : socColor}"></div><i class="icoThunder"></i></div>
				<i class="icoBattery"></i>
				<b>{{soc}}%</b>
			  </li>
			</ul>
		</div>
	</section>
  <!-- /.navbar -->