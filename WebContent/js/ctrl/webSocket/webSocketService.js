'use strict';

angular.module('iceApp').factory('webSocketService', [
		'$http',
		'$q',
		function($http, $q) {

			var factory = {
					getEvent : getEvent,
					getResource : getResource,
					getEventRes : getEventRes
			};

			return factory;

			 function getEventRes(bizid, authkey){
			    	var deferred = $q.defer();
			    	var config = {
			    			headers : {'Accept' : 'application/json',
			    				'ice-user-auth' : authkey}
			    	};
			    	$http.get(url+"dr/"+bizid+"/dashboard/resource",config)
			    	.then(
			    			function (response) {
			    				deferred.resolve(response.data);
			    			},
			    			function(errResponse){
			    				deferred.reject(errResponse);
			    			}
			    	);
			    	return deferred.promise;
			    }

			 //DR 발령 이벤트
		    function getEvent(authkey,bizid){
		    	var deferred = $q.defer();
		    	var config = {
		    			params: {type:200},
		    			headers : {'Accept' : 'application/json',
		    				'ice-user-auth' : authkey}
		    	};
		    	$http.get(url+"events/"+bizid+"/event",config)
		    	.then(
		    			function (response) {
//		    				console.log("getEvent");
		    				deferred.resolve(response.data);
		    			},
		    			function(errResponse){
		    				deferred.reject(errResponse);
		    			}
		    	);
		    	return deferred.promise;
		    }

		    function getResource(authkey,bizid){
		    	var deferred = $q.defer();
				var config = {
						params : {type : 3},
						headers : {'Accept' : 'application/json',
										'ice-user-auth' : authkey}
				};
				$http.get(url+"configs/"+bizid+"/configs",config)
				.then(
					function (response) {
						deferred.resolve(response.data);
					},
					function(errResponse){
						deferred.reject(errResponse);
					}
		    	);
		    	return deferred.promise;
		    }

		} ]); // ===//App.factory
