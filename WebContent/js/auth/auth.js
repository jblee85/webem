'use strict';
angular.module('iceApp')
.factory('Auth', [ '$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS', 'apiService','USER_ROLES','$state','$uibModalStack',
function($http, $rootScope, $window, Session, AUTH_EVENTS, apiService, USER_ROLES,$state,$uidModalStack) {
	var authService = {};

	authService.isAuthenticated = function() {
		return Session.user;
	};

	authService.isAuthorized = function(authorizedRoles) {
		if (!angular.isArray(authorizedRoles)) {
	      authorizedRoles = [authorizedRoles];
	    }
	    return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.user.authlv) !== -1);
	};

	authService.logout = function(){
		$uidModalStack.dismissAll("cancel");
		Session.destroy();
		$window.sessionStorage.removeItem("userInfo");
		//$rootScope.isLogin = false;
		//$rootScope.showLogin = true;
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
		$state.go('login');
	}

	return authService;
}]);