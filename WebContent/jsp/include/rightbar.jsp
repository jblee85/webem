<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<style>
.showRight {
display:block;
}
</style>
<aside id="right-sidebar" class="control-sidebar control-sidebar-dark" ng-class="{showRight : showRight}">
    <div class="tab-content">
      <!-- Home tab content -->
		<div class="tab-pane active" id="control-sidebar-home-tab">
			<h3 class="control-sidebar-heading">도우미</h3>
			<ul class="control-sidebar-menu">
				<li>
					<a href="/guide/Invoice-294080.pdf">
					  <i class="menu-icon icoAllpage bg-red"></i>
					  <div class="menu-info">
						<h5 class="">든 화면에 대해 실행</h5>
					  </div>
					</a>
				</li>
				<li>
					<a href="javascript:;">
					  <i class="menu-icon icoNowpage bg-red"></i>
					  <div class="menu-info">
						<h5 class="">현재 화면에서 실행</h5>
					  </div>
					</a>
				</li>
			</ul>
			<!-- /.control-sidebar-menu -->

			<h3 class="control-sidebar-heading">대시보드 테마</h3>
			<ul class="list-unstyled clearfix">
				<li style="float:left; width: 33.33333%; padding: 5px;">
					<a href="javascript:void(0)" ng-click="changeTheme('simple')" data-skin="skin-blue" style="display: block; width: 100%; float: left; height: 27px;box-shadow: 0 0 3px rgba(0,0,0,0.4)" class="clearfix full-opacity-hover bg-white">
					</a>
					<p class="text-center no-margin">Simple</p>
				</li>
				<li style="float:left; width: 33.33333%; padding: 5px;">
					<a href="javascript:void(0)" ng-click="changeTheme('mechanic')" data-skin="skin-blue" style="display: block; width: 100%; float: left; height: 27px;box-shadow: 0 0 3px rgba(0,0,0,0.4)" class="clearfix full-opacity-hover bg-black">
					</a>
					<p class="text-center no-margin">Mechanic</p>
				</li>
			</ul>
			<!-- /.control-sidebar-menu -->
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