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
		<title>ICE </title>
	</head>

	<style>
	#connectionStatus {
	    margin-top: 26px;
	    width: 16px;
	    height: 16px;
	    border-radius: 8px;
	    background-color: #bc0000;
	}
	#connection {
	    margin-top: 22px;
	    margin-left: 11px;
	}
	.panel-group {
    	margin-top: 1px !important;
	}
	</style>
	<body ng-app="myApp">
		<div class="container row joinWrap" >
		<!-- <h1 class="col-md-4 col-sm-12"><i class="joinImg"></i><b>WEBSOCKET TEST</b></h1> -->
		<div class="panel-group col-md-4 col-sm-12" id="accordion" role="tablist" aria-multiselectable="false">
				<div class="panel panel-default">
					<div class="panel-heading" role="tab" id="headingOne" data-toggle="collapse" data-parent="#accordion" href="#collapse1" aria-expanded="false" aria-controls="collapse1">
						<h4 class="panel-title">
							<a>
								<span class="panelTitle">Messages</span>
								<b>Subscriptions</b>
							</a>
						</h4>
					</div>
					<div id="collapse1" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading1">
						<div class="panel-body" id="messEdit">
						Messages
						</div>
					</div>
				</div>
			</div>
		<form class="form-joinin col-md-8  col-sm-12" >
			<h2 class="form-signin-heading">CONNECTION</h2>
			<div class="joinIn">
				<div class="joinBox row">
					<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Host</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="text" class="form-control"  placeholder="Host"  ng-model = "ws.host" name="urlInput" >
							</div>
						</li>
					</ul>
					<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Port</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="number" class="form-control"    placeholder="Port" ng-model = "ws.port"  name="portInput"  >
							</div>
						</li>
					</ul>
					<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Client ID</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="text" class="form-control"    placeholder="Client ID" ng-model = "ws.clientId"  name="clientIdInput"  >
							</div>
						</li>
					</ul>
					<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Username</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="text" class="form-control"    placeholder="Username" ng-model = "ws.username"  name="userInput"  value="">
							</div>
						</li>
					</ul>
				<!-- 	<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Password</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="text" class="form-control"    placeholder="Password" ng-model = "ws.password"  name="pwInput"  value="">
							</div>
						</li>
					</ul> -->
					<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Keep Alive</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="number" class="form-control"    placeholder="Keep Alive" ng-model = "ws.keepAlive"  name="keepAliveInput"  >
							</div>
						</li>
					</ul>
					<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>SSL</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="text" class="form-control"    placeholder="SSL" ng-model = "ws.ssl"  name="sslInput"  >
							</div>
						</li>
					</ul>
					<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Clean Session</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="text" class="form-control"    placeholder="Clean Session" ng-model = "ws.cleanSession"  name="cleanSessionInput"  >
							</div>
						</li>
					</ul>
					<!-- <h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Last-Will Topic</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="text" class="form-control"    placeholder="Last-Will Topic" ng-model = "ws.lwTopic"  name="lwTopic"  >
							</div>
						</li>
					</ul>
					<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Last-Will QoS</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="text" class="form-control"    placeholder="Last-Will QoS" ng-model = "ws.lwQos"  name="lwQos"  >
							</div>
						</li>
					</ul>
					<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Last-Will Retain</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="text" class="form-control"    placeholder="Last-Will Retain" ng-model = "ws.lwRetain"  name="lwRetain"  >
							</div>
						</li>
					</ul>
					<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Last-Will Messsage</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="text" class="form-control"    placeholder="Last-Will Messsage" ng-model = "ws.lwMessage"  name="lwMessage"  >
							</div>
						</li>
					</ul> -->
				</div>
			</div>
			<div class="joinFooter">
				<button class="btn btn-lg" type="button" ng-click="checkConnected()" >Connect status</button>
				<!-- <a id="connectButton" class="small button" onclick="websocketclient.connect();">Connect</a> -->
				<!-- <a class="small button" id="subscribeButton" onclick="websocketclient.subscribe('testtopic/#','1','3a2124')">Subscribe</a> -->
			</div>
			<div class="joinFooter">
				<button class="btn btn-lg" type="button" ng-click="connection()" ng-if="connected==false">Connect</button>
				<button class="btn btn-lg" type="button" ng-click="disconnection()" ng-if="connected==true">Disconnect</button>
				<div id="connectionStatus"></div>
				<div id="connection">disconnected</div>
				<!-- <a id="connectButton" class="small button" onclick="websocketclient.connect();">Connect</a> -->
				<!-- <a class="small button" id="subscribeButton" onclick="websocketclient.subscribe('testtopic/#','1','3a2124')">Subscribe</a> -->
			</div>
			<h2 class="form-signin-heading">SUBSCRIBE</h2>
			<div class="joinIn">
				<div class="joinBox row">
					<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Topic</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="text" class="form-control" id="topicInput" placeholder="topic"  ng-model = "ws.topic" name="subscribe Topic"   >
							</div>
						</li>
					</ul>
					<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Qos</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="text" class="form-control" id="QoSInput"   placeholder="Qos"  ng-model = "ws.qos" name="qosInput"  >
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="joinFooter">
				<button class="btn btn-lg" type="button" ng-click="subscribe()">Subscriptions</button>
				<button class="btn btn-lg" type="button" ng-click="unsubscribe()">Unsubscriptions</button>
			</div>
			<h2 class="form-signin-heading">PUBLISH</h2>
			<div class="joinIn">
				<div class="joinBox row">
					<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Topic</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="text" class="form-control"  placeholder="topic"  ng-model = "ws.topic" name="subscribe Topic"   >
							</div>
						</li>
					</ul>
					<h3 class="col-md-3 col-sm-3 col-xs-12"><i class="redF">*</i>Message</h3>
					<ul class="col-md-9 col-sm-9 col-xs-12 joinTableWrap">
						<li>
							<div class="inputWrap">
								<input type="text" class="form-control" id="MessageInput"   placeholder="test Publish"  ng-model = "ws.message" name=""  >
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="joinFooter">
				<button class="btn btn-lg" type="button" ng-click="subscribe()">Publish</button>
			</div>
		</form>
	</div>
	</body> <!-- /body -->
</html> <!-- /html -->
