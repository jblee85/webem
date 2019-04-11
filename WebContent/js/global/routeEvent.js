/**
 * Contains functions that are added to the root AngularJs scope.
 */
angular.module('iceApp').run(function($rootScope, $state,$interval, AUTH_EVENTS, Auth ,USER_ROLES ,USER_EVENTS,DEFINED,$transitions,$uibModalStack) {
	$transitions.onBefore({ to: '*', from: '*' },(trans) => onBefore(trans, trans.$to(), trans.$from()))
	/*$transitions.onSuccess({ to: '*', from: '*' },(trans) => onSuccess(trans, trans.$to(), trans.$from()))*/

	///////////////////////////////////////////////////////////////////////
	//                     ※ 라우트 처리시 이벤트 발생                          //
	//                              로딩 이미치 처리                                //
	//          라우트 이벤트 발생시 미승인 권한시 로그아웃 처리         //
	//       라우트 이벤트 발생시 지정 url이 아니면 lonin으로 이동      //
	//                        페이지 별 top & left  설정                         //
	//////////////////////////////////////////////////////////////////////
$rootScope.uibModalInstance="";
	function onBefore(trans,to,from){
//		$rootScope.isFooter=true;
//		if(to.self.isFooter != undefined){
			$rootScope.isFooter= to.self.isFooter != undefined ? to.self.isFooter : true;
//			angular.element(document.querySelector(".sidebar-mini")).removeClass("sidebar-open");
			$(".sidebar-mini").removeClass("sidebar-open");
//		}
//		if($rootScope.uibModalInstance != ""){
//			$rootScope.uibModalInstance.dismiss('cancel');
//		}
		$uibModalStack.dismissAll('closing');
		$rootScope.selectedMenu = to;
		$rootScope.isLogin = to.self.isLogin;
		$rootScope.isTop = to.self.isTop;
		$rootScope.isLeft = to.self.isLeft;
		$rootScope.isRight = to.self.isRight;
		$rootScope.main = "dashboard";
		$rootScope.parentUrl= to.self.parentUrl;
		$rootScope.parentName = to.self.parentUrl;
		$rootScope.title = to.self.title;
		$rootScope.mainMenu = to.self.mainMenu;
		$rootScope.subMenu = to.self.subMenu;
		$interval.cancel($rootScope.intervalDashboard);
		$interval.cancel($rootScope.intervalDashboard);
		var authorizedRoles = to.data.authorizedRoles;
		if (!Auth.isAuthorized(authorizedRoles)) {
			if (Auth.isAuthenticated()) {
				// user is not allowed
				console.log("미승인 권한 : "+$rootScope.parentUrl);
				alert("미승인 권한");
				Auth.logout();
				event.preventDefault();
			} else {
				// user is not logged in
				if(!$rootScope.showLogin && $rootScope.isLogin==false){
					if(to.name != "login"){
						//$rootScope.showLogin = true;
						console.log("login go : "+$rootScope.parentUrl);
						$state.go('login');
						event.preventDefault();
					}
				}
			}
	    }
	}

	$rootScope.logout = function(){
		Auth.logout();
	};

});