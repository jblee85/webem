'use strict';
angular.module('iceApp').controller('webSocket_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','Session','DEFINED',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,Session,DEFINED) {
	console.log("webSocket_ctrl");
	var self = this;

	self.host = DEFINED.webSocket_host;
	self.port = DEFINED.webSocket_port;
	self.clientId = DEFINED.webSocket_id;
	self.username = "wooam";
	self.keepAlive = 60;
	self.cleanSession = true;
	self.ssl = false;
	self.message = "";
	$scope.connected = false;
	self.topic = "mitsuruog";

	var Options = {
			keepalive: self.keepAlive,
			protocolId: 'MQIsdp',
			protocolVersion: 3,
			reconnectPeriod: 10000, //10초 마다 재접속
			clean: true,
			encoding: 'utf8',
			username: self.username
	};

	//연결
	$scope.connection = function () {
		try {
			$scope.client = mows.createClient(self.port,"ws://"+self.host,Options);

			//에러
			client.on('error', function(e) {
				console.log('ERROR -> '+ e + '\n');
			});

			//접속
			client.on('connect', function() {

				// 추후 필요 여부에 따라 삭제
				$scope.$apply(function(){
					$scope.connected = true;
				});
				console.log($scope.connected);

				//구독
				$scope.subscribe();
			});

			//구독 메세지
			client.on('message', function (topic, message) {
				// message is Buffer
				console.log(message);
			});

		}catch(err) {
			//console.log(err);
			console.error(err.name);
			console.error(err.message);
			console.error(err.stack);
		}
	};

	//연결 중지
	$scope.disconnection = function () {
		try {
			$scope.client && $scope.client.end();
		    $scope.connected = false;
		    alert("disconnected");
		}catch(err) {
			console.error(err.name);
			console.error(err.message);
			console.error(err.stack);
		}
	};

	//구독
	$scope.subscribe = function () {
		$scope.client && $scope.client.subscribe(self.topic);
	    appendMessage('subscribe -> ' + self.topic);
	};

	//구독 중지
	$scope.unsubscribe = function () {
		$scope.client && $scope.client.unsubscribe(self.topic);
	    appendMessage('unsubscribe -> ' + self.topic);
	};

	//발행
	$scope.publish = function () {
		$scope.client && $scope.client.publish(self.topic,self.message);
	    appendMessage('publish -> ' + self.topic);
	    appendMessage('message -> ' + self.message);
	};

	//접속 상태
	$scope.connectedStatus = function () {
		console.log($scope.client.connected);
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

}]);