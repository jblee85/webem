'use strict';

angular.module('iceApp').controller('websocket_ctrl', ['$scope', '$rootScope','Auth','AUTH_EVENTS','USER_ROLES','$window','Session','$state','DEFINED',
function($scope, $rootScope,Auth,AUTH_EVENTS, USER_ROLES,$window,Session,$state,DEFINED){
	//////////////////////////////////////////////////////////////////////
	//                     ※ 웹 구동시 최초 한번 처리                          //
	//////////////////////////////////////////////////////////////////////
	var self = this;

	self.port = DEFINED.webSocket_port;

	self.clientId = 'clientId-' + randomString(10);
	self.username = ""; //DEFINED.webSocket_id;//authkey
	self.keepAlive = 80;
	self.cleanSession = true;
	self.ssl = DEFINED.webSocket_ssl;
	self.message = "";
	$rootScope.connected = false;
	$scope.connectedMessage = false;
	$scope.connectedIdx=0;
	$rootScope.connectCount = 0;
	self.topic = "ESSResb";
	var beforeTime = new Date();
	var connectDate = 0;
	$scope.mqttStatus = function(){
		var className = "";
		if($rootScope.connected && $scope.connectedMessage){
			className = "on"+$scope.connectedIdx;
		}else{
			className = "";
		}

		return className;
	}
	var Options = {
//			keepAliveInterval: self.keepAlive,
			useSSL : self.ssl,
			onSuccess : onConnect,
			cleanSession:true,
			userName: ""//self.authkey
	};
	function onConnect (){
		console.log('onConnect')
        $scope.$apply(function(){
			$rootScope.connected = true;
			$scope.connectedIdx=1;
			connectDate = new Date();
			$rootScope.connectCount=0;
		});
		console.log("mqtt 접속 여부: "+$rootScope.connected);
		//구독
		console.log($scope.client.connected);
        $scope.client.subscribe(self.topic)
	}
	//연결
	$scope.connection = function () {
		
		if((Session.authkey == null) || (Session.authkey == "")){
			//로그인 페이지로 이동
//			Auth.logout();
		}else{
			Options.userName = $rootScope.currentUser.authkey//Session.authkey;
//			Options.username = "wooam";
		}

		try {
			$scope.disconnection();
			$scope.client = new Paho.Client($rootScope.webSocket_host, self.port, self.clientId)

			    	$scope.client.onConnectionLost = (res) => {
				      if(res.errorCode !== 0){
				        console.log(`onConnectionLost: ${res.errorMessage}`)
				      }
				    }
			    	$scope.hzList=[];
			    	$scope.client.onMessageArrived = (message) => {
			    		$scope.connectedMessage = true;
						$scope.$apply(function(){

							if($scope.connectedIdx < 4){
								$scope.connectedIdx++;
							}else{
								$scope.connectedIdx = 1;
							}

							$scope.dashBoardData = (JSON.parse(message.payloadString))[0];
							$scope.cappedData = JSON.parse(message.payloadString);
							$rootScope.$broadcast('websocket',$scope.dashBoardData);
							connectInfo($scope);
						});
			    	}
			    	$scope.client.connect(Options)
			    	
//			    	$scope.client.connect({
//			    	onSuccess: () => {
//			            console.log('onConnect')
//			            $scope.$apply(function(){
//							$rootScope.connected = true;
//							$scope.connectedIdx=1;
//							connectDate = new Date();
//							$rootScope.connectCount=0;
//						});
//						console.log("mqtt 접속 여부: "+$rootScope.connected);
//						//구독
//						console.log($scope.client.connected);
//			            $scope.client.subscribe(self.topic)
//			          },
//			    	userName : $rootScope.currentUser.authkey
//			    })
		}catch(err) {
			//console.log(err);
			console.error(err.name);
			console.error(err.message);
			console.error(err.stack);
		}
	};
	setTimeout(function() {
		$scope.connection();
		}, 1000);
	
	//연결 중지
	$scope.disconnection = function () {
		try {
//			$scope.client && $scope.client.end();
			$scope.client && $scope.client.disconnect();
		    $rootScope.connected = false;
		    $scope.connectedIdx=0;
		    $rootScope.connectCount=0;
//		    alert("통신 연결 중지");
		}catch(err) {
			console.error(err.name);
			console.error(err.message);
			console.error(err.stack);
		}
	};

	//접속 상태
	$scope.connectedStatus = function () {
		console.log("접속상태:"+$scope.client.connected);
	}

	// 랜덤 스트링 생성
	function randomString(length) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < length; i++){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
	    return text;
	}
	function connectInfo($scope){
		//수신 주기
		var currentTime = new Date();
		$rootScope.connectPeriod = currentTime.getTime() - beforeTime.getTime();
		beforeTime =currentTime;
		//수신 수

		$rootScope.connectTPS = $rootScope.connectCount/((currentTime - connectDate)/1000);
		$rootScope.connectCount++;
		//최근 수신
		var date = new Date();
		$rootScope.connectLastDate = $scope.yyyymmdd().substring(2,4)+"-"+$scope.yyyymmdd().substring(4,6)+"-"+$scope.yyyymmdd().substring(6,8);
//		$rootScope.connectLastTime = $scope.hhmmss().substring(0,2)+":"+$scope.hhmmss().substring(2,4)+":"+$scope.hhmmss().substring(4,6);
		$rootScope.connectLastTime = $scope.hhmmss().substring(0,2)+":"+$scope.hhmmss().substring(2,4);
	}
	$rootScope.$on('websocketConnect',function(event, data){
		$scope.disconnection();
		setTimeout(function() {
			$scope.connection();
			}, 1000);
	});
	
} ]);
