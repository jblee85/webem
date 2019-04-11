<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<style>
	.overflowY {
		height:100%;overflow-y:auto;
	}
</style>
<aside class="main-sidebar" ng-class="changeSidebar()">
	<section class="sidebar">
		<div class="user-panel">
			<div class="pull-left image">
				<a href="javascript:void(0);" data-toggle="push-menu" class="icoUser"><i></i></a>
			</div>
			<div class="pull-left info">
				<p>{{currentUser.namecard.name == "" ? "---" : currentUser.namecard.name}} <span class="miniFont">LEVEL<b>{{currentUser.authlv}}</b></span></p>
				<p class="subFont">{{currentUser.namecard.pos == "" ? "---" : currentUser.namecard.pos}}</p>
				<p class="subFont">{{currentSite.sname == "" ? "---" : currentSite.sname}}</p>
				<div>
					<a class="btn infoBt" ui-sref="myInfo" href="/myInfo" role="button"><i class="icoEdit"></i></a>
					<a class="btn infoBt" href="" ng-click="logout();" role="button"><i class="icoSignOut"></i></a>
				</div>
			</div>
		</div>
		<ul class="sidebar-menu" data-widget="tree">
			<li class="" ng-class="{active : selectedMenu == 'dashboard'}">
				<span class="label">
					<span class="label-success" ng-class="{opctHide : dashBoardData.pcs.alrams == null && dashBoardData.bms.alrams == null}">{{(dashBoardData.pcs.alrams == null && dashBoardData.bms.alrams == null) ? 0 : dashBoardData.pcs.alrams.length + dashBoardData.bms.alrams.length}}</span>
					<span class="label-warning" ng-class="{opctHide : dashBoardData.pcs.warnings == null && dashBoardData.bms.warnings == null}">{{(dashBoardData.pcs.warnings == null && dashBoardData.bms.warnings == null) ? 0 : dashBoardData.pcs.warnings.length + dashBoardData.bms.warnings.length}}</span>
					<span class="label-danger" ng-class="{opctHide : dashBoardData.pcs.faults == null && dashBoardData.bms.faults == null}">{{(dashBoardData.pcs.faults == null && dashBoardData.bms.faults == null) ? 0 : dashBoardData.pcs.faults.length + dashBoardData.bms.faults.length}}</span>
<!-- 					<span class="label-danger" ng-if="dashBoardData.pcs.faults != null || dashBoardData.bms.faults != null">{{dashBoardData.pcs.faults.length + dashBoardData.bms.faults.length}}</span> -->
				</span>
				<a ui-sref="dashboard" href="/dashboard"><i class="icoDash"></i> <span>{{ts.DASHBOARD | uppercase}}</span></a>
			</li>
			<li class="pcs" ng-if="configInfo.pcs.length != 0" ng-class="{active : selectedMenu == 'pcsDetail'}">
				<span class="label">
					<span class="label-success" ng-class="{opctHide : dashBoardData.pcs.alrams == null}">{{dashBoardData.pcs.alrams == null ? 0 : dashBoardData.pcs.alrams.length}}</span>
					<span class="label-warning" ng-class="{opctHide : dashBoardData.pcs.warnings == null}">{{dashBoardData.pcs.warnings == null ? 0 : dashBoardData.pcs.warnings.length}}</span>
					<span class="label-danger" ng-class="{opctHide : dashBoardData.pcs.faults == null}">{{dashBoardData.pcs.faults == null ? 0 : dashBoardData.pcs.faults.length}}</span>
				</span>
				<a ui-sref="pcsDetail" href="/pcsDetail" class="treeview-head"><i class="icoPcs"></i><span>PCS</span></a>
			</li>
			<li class="bms" ng-if="configInfo.pcs.length != 0" ng-class="{active : selectedMenu == 'bmsDetail'}">
				<span class="label">
					<span class="label-success" ng-class="{opctHide : dashBoardData.bms.alrams == null}">{{dashBoardData.bms.alrams == null ? 0 : dashBoardData.bms.alrams.length}}</span>
					<span class="label-warning" ng-class="{opctHide : dashBoardData.bms.warnings == null}">{{dashBoardData.bms.warnings == null ? 0 : dashBoardData.bms.warnings.length}}</span>
					<span class="label-danger" ng-class="{opctHide : dashBoardData.bms.faults == null}">{{dashBoardData.bms.faults == null ? 0 : dashBoardData.bms.faults.length}}</span>
				</span>
				<a ui-sref="bmsDetail" href="/bmsDetail"><i class="icoBattery"></i> <span>{{ts.BATTERY | uppercase}}</span></a>
			</li>
			<li class="pv" ng-if="configInfo.pv.length != 0" ng-class="{active : selectedMenu == 'pvDetail'}">
				<a ui-sref="pvDetail" href="/pvDetail" class="treeview-head"><i class="icoPcs"></i><span>{{ts.PV | uppercase}}</span></a>
			</li>
			<li ng-if="currentUser.authlv == 3 && isPC" class="bms" ng-class="{active : (selectedMenu == 'scheduleManagement') || (selectedMenu == 'holidayManagement')}">
				<a href="javascript:void(0);" ng-click="menuToggle($event)">
					<i class="fa icoSchedule"></i><!--<b class="miniFont">BMS</b>-->
					<span><b class="">PCS</b> {{ts.DRIVING}} {{ts.CONTROL}}</span>
					<span class="pull-right-container">
						<i class="fa fa-angle-left pull-right"></i>
					</span>
				</a>
				<ul class="treeview-menu">
					<li ng-class="{active : selectedMenu == 'scheduleManagement'}">
						<a ui-sref="scheduleManagement" href="/scheduleManagement"><i class="fa fa-circle-o"></i>{{ts.SCHEDULE | uppercase}}</a>
					</li>
					<li ng-class="{active : selectedMenu == 'holidayManagement'}">
						<a ui-sref="holidayManagement" href="/holidayManagement"><i class="fa fa-circle-o"></i>{{ts.HOLIDAY | uppercase}}</a>
					</li>
				</ul>
			</li>
			<li class="bms" ng-class="{active : (selectedMenu == 'deviceManagement')}">
				<a href="javascript:void(0);" class="treeview-head" ng-click="menuToggle($event)">
					<i class="icoGears"></i><!--<b class="miniFont">BMS</b>-->
					<span>{{ts.MANAGEMENT | uppercase}}</span>
					<span class="pull-right-container">
						<i class="fa fa-angle-left pull-right"></i>
					</span>
				</a>
				<ul class="treeview-menu">
					<li>
						<a ui-sref="myInfo" href="/myInfo">{{ts.MY_INFO | uppercase}}</a>
					</li>
					<li ng-if="currentUser.authlv == 3 && isPC">
						<a ui-sref="userApproval" href="/userApproval">{{ts.USER | uppercase}} {{ts.APPROVAL | uppercase}}</a>
					</li>
					<li ng-if="currentUser.authlv == 3">
						<a ui-sref="siteManagement" href="/siteManagement">{{ts.SITE | uppercase}}</a>
					</li>
					<li ng-if="currentUser.authlv == 3 && isPC" ng-class="{active : selectedMenu == 'deviceManagement'}">
						<a ui-sref="deviceManagement" href="/deviceManagement">{{ts.DEVICE | uppercase}}</a>
					</li>

					<li ng-if="currentUser.authlv == 3" ng-class="{active : selectedMenu == 'timeline'}">
						<a ui-sref="timeline" href="/timeline">{{ts.HISTORY | uppercase}}</a>
					</li>
					<li ng-if="currentUser.authlv == 3" ng-class="{active : selectedMenu == 'logManagement'}">
						<a ui-sref="logManagement" href="/logManagement">{{ts.LOG | uppercase}}</a>
					</li>
					<li ng-if="currentUser.authlv == 3" ng-class="{active : selectedMenu == 'logManagement'}">
						<a ui-sref="settingManagement" href="/settingManagement">{{ts.SETTING | uppercase}}</a>
					</li>
				</ul>
			</li>
		</ul>
	</section>
	<div class="deco"></div>
<!-- 				<footer class="mainFooter"> -->
<!-- 					<strong>Copyright &copy; 2018<br><a href="javascript:void(0);">Wooam coperation</a>.</strong><br>All rights reserved. -->
<!-- 					<div class="subFont"> -->
<!-- 					  개인정보처리방침 -->
<!-- 					</div> -->
<!-- 				</footer> -->
</aside>
