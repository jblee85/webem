'use strict';
/**
 * This interceptor will make sure that, after each $http request
 * if the user doesn't have access to something runs the according
 * event, given the response status codes from the server.
 */
angular.module('iceApp')
.factory('AuthInterceptor', [ '$rootScope', '$q', 'Session', 'AUTH_EVENTS',
function($rootScope, $q, Session, AUTH_EVENTS) {
	return {
		responseError : function(response) {
//			try{
				if(response.status == -1){
					$rootScope.$broadcast(AUTH_EVENTS.disconnected,response);
				}else{
					console.log("authinterceptor : "+$rootScope.parentUrl);
					$rootScope.$broadcast({
						401 : AUTH_EVENTS.notAuthenticated,
						403 : AUTH_EVENTS.notAuthorized,
						419 : AUTH_EVENTS.sessionTimeout,
						440 : AUTH_EVENTS.sessionTimeout
					}[response.status], response);
				}
//				throw new Error("Something went badly wrong!");
				return $q.reject(response);
//			}catch(e){
//				throw new Error("Something went badly wrong!");
//			}

		}
	};
}
]);
