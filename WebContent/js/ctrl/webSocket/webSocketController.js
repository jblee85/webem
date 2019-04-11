'use strict';

angular.module('iceApp').controller('webSocketController', ['$scope','$window','webSocketService',function($scope,$window,webSocketService) {
	var self = this;

	self.host = "192.168.1.234";
	self.port = 10101;
	self.clientId = 'clientId-' + randomString(10);
	self.username = "wooam"; //authkey
	self.keepAlive = 60;
	self.cleanSession = true;
	self.ssl = false;
	self.message = "";
	$scope.connected = false;

/*	self.client =  null;
	self.lastMessageId = 1;
	self.lastSubId =  1;
	self.subscriptions = [];
	self.messages = [];
	self.connected = false;*/

	self.topic = "mitsuruog";
	self.qos = "0";
	var messages = document.querySelector('#messEdit');
	var appendMessage, clearMessages;
	var Options = {
			keepalive: self.keepAlive,
			protocolId: 'MQIsdp',
			protocolVersion: 3,
			reconnectPeriod: 1000,
			clean: true,
			encoding: 'utf8',
			username: self.username,
			clientId : self.clientId
	};
	var client;
	try {
		client = mows.createClient(self.port,"ws://"+self.host,Options);

		client.on('error', function(e) {
	    	console.log('ERROR -> '+ e + '\n');
	    	appendMessage('ERROR -> '+ e + '\n');
		});

	    client.on('connect', function() {
	    	$scope.$apply(function(){
		    	$scope.connected = true;
		    });
	        console.log("connected : "+$scope.connected);
	        $("#connectionStatus").css("background-color","#009700");
	        $("#connection").html("connected");
	        appendMessage('CONNECT -> CONNECT \n');
	        $scope.subscribe();
		});

		client.on('message', function (topic, message) {
			// message is Buffer
			appendMessage(message);
		});

	}
	catch(err) {
		//console.log(err);
		console.log(err.name);
		console.log(err.message);
		console.log(err.stack);

		appendMessage(err.name);
		appendMessage(err.message);

	}

	//연결
	$scope.connection = function () {
		client = mows.createClient(self.port,"ws://"+self.host,Options);
		console.log(client);
	}

	//연결 중지
	$scope.disconnection = function () {
		client && client.end();
		appendMessage('connection closed');
	    $scope.connected = false;
		$("#connectionStatus").css("background-color","#bc0000");
	    $("#connection").html("disconnected");
	    alert("disconnected");
	}
	//구독
	$scope.subscribe = function () {
		client && client.subscribe(self.topic);
	    appendMessage('subscribe -> ' + self.topic);
	}
	//구독 중지
	$scope.unsubscribe = function () {
		client && client.unsubscribe(self.topic);
	    appendMessage('unsubscribe -> ' + self.topic);
	}
	//발행
	$scope.publish = function () {
		client && client.publish(self.topic,self.message);
	    appendMessage('publish -> ' + self.topic);
	    appendMessage('message -> ' + self.message);
	}


	$scope.checkConnected = function () {
		console.log(client);
		console.log(client.connected);
	}


	function appendMessage(message){
		 var element = document.createElement('p');
		    var string = document.createTextNode(message);
		    element.appendChild(string);
		    messages.appendChild(element);
	}

	 function randomString(length) {
	        var text = "";
	        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	        for (var i = 0; i < length; i++)
	            text += possible.charAt(Math.floor(Math.random() * possible.length));
	        return text;
	    }

	function clearMessages(){
		var count = messages.childNodes.length;
	    for(var i=0; i<count; i++) {
	      messages.removeChild(messages.firstChild);
	    }
	}
}]);
