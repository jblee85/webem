'use strict';

/*
 * In this service the user data is defined for the current session. Within
 * angular current session is until the page is refreshed. When the page is
 * refreshed the user is reinitialized through $window.sessionStorage at the
 * login.js file.
 */

angular.module('iceApp').service('Session', function($rootScope, USER_ROLES) {

	$rootScope.showLogin = true;

	this.create = function(user) {
		this.user = user;
		this.userRole = user.authlv;
		this.authkey = user.authkey;
	};

	this.destroy = function() {
		this.user = null;
		this.userRole = null;
		this.authkey = null;
	};
	return this;
});