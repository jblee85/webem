'use strict';

angular.module('iceApp').controller('initiate_ctrl', ['$scope', '$rootScope','$interval','Auth','AUTH_EVENTS','USER_ROLES','$window','Session','$state','DEFINED','apiService',
function($scope, $rootScope,$interval,Auth,AUTH_EVENTS, USER_ROLES,$window,Session,$state,DEFINED,apiService){

	$scope.showSubMenu=false;
	$rootScope.showRight = false;
    $scope.openRight = function (){
    	$rootScope.showRight = $scope.showRight ? false : true;
    }
	//  ※ 새로고침시 Session 고정
	if($window.sessionStorage["userInfo"]){
		var isSession = JSON.parse($window.sessionStorage["userInfo"]);
		$rootScope.currentUser = isSession;
		Session.create(isSession);
	}

	if($window.sessionStorage["siteInfo"]){
		var isSession = JSON.parse($window.sessionStorage["siteInfo"]);
		$rootScope.currentSite = isSession;
	}
	if($window.sessionStorage["properties"] && $window.sessionStorage["properties"] != "undefined"){
		var isSession = JSON.parse($window.sessionStorage["properties"]);
		$rootScope.currentProperties = isSession;
	}
	if($window.sessionStorage["configInfo"] && $window.sessionStorage["configInfo"] != "undefined"){
		var isSession = JSON.parse($window.sessionStorage["configInfo"]);
		$rootScope.configInfo = isSession;
//		$rootScope.configInfo = DEFINED.configInfo;
	}
	if($window.sessionStorage["leafInfo"]){
		var isSessionLeaf = JSON.parse($window.sessionStorage["leafInfo"]);
		$rootScope.currentLeaf = isSessionLeaf;
	}
	if($window.sessionStorage["rootInfo"]){
		var isSessionRid = JSON.parse($window.sessionStorage["rootInfo"]);
		$rootScope.currentRid = isSessionRid;
	}
	if($window.sessionStorage["siteInfo"]){
		var isSessionSite = JSON.parse($window.sessionStorage["siteInfo"]);
		$rootScope.currentSite = isSessionSite;
	}
	if($window.sessionStorage["version"]){
		var isSessionRid = JSON.parse($window.sessionStorage["version"]);
		$rootScope.version = isSessionRid;
	}
	if($window.sessionStorage["versionHistory"]){
		var isSessionRid = JSON.parse($window.sessionStorage["versionHistory"]);
		$rootScope.versionHistory = isSessionRid;
	}
	if($window.sessionStorage["themeClassName"]){
		var isSessionRid = JSON.parse($window.sessionStorage["themeClassName"]);
		$rootScope.themeClassName = isSessionRid;
	}
	if(!angular.isUndefined(getCookie('themeClassName'))){
		$rootScope.themeClassName = getCookie('themeClassName');
	}
	$scope.toggleRightbar = function(){
		$rootScope.isRight = !$rootScope.isRight;
	}

} ]);