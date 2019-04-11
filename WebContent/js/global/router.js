angular.module('iceApp').config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES',

	function($stateProvider, $urlRouterProvider, USER_ROLES ) {
		/////////////////////////////////////////////////////////////////////////////
		//                           페이지 route (중계) 처리 기능                          //
		//                         USER_ROLES : 사용자 권한 정보                       //
		//               USER_ROLES의 세부 정보는 constant.js 에서 정의됨       //
		/////////////////////////////////////////////////////////////////////////////

		//default url
		$urlRouterProvider.when('/#').otherwise("/initConfirm");
//		$urlRouterProvider.when('/#').otherwise("/login");
		//url routing
		$stateProvider
		///////////////////////////////[ login ]///////////////////////////////////
		.state('login', {
			url: "/login",
			templateUrl: "./jsp/login/login.jsp",
			controller:'login_ctrl as login',
			title:"로그인",
			reloadOnSearch: false,
			isTop: false,
			isLeft:false,
			isFooter: false,
			isLogin:true,
			parentUrl:"login",
			parentName:"로그인",
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
		.state('header', {
			url: "/header",
			templateUrl: "./jsp/include/topbar.jsp",
			controller:'header_ctrl as hc',
			title:"헤더",
			reloadOnSearch: false,
			isTop: false,
			isLeft:false,
			isFooter: false,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
		///////////////////////////////[ initSetting ]///////////////////////////////////
		.state('initSetting', {
			url: "/initSetting",
			templateUrl: "./jsp/initSetting/initSetting.jsp",
			controller:'initSetting_ctrl as init',
			title:"초기 설정",
			reloadOnSearch: false,
			isTop: false,
			isLeft: false,
			isFooter: false,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
		.state('initConfirm', {
			url: "/initConfirm",
			templateUrl: "./jsp/initSetting/initConfirm.jsp",
			controller:'initConfirm_ctrl as initConfirm',
			title:"서버 설정 확인",
			reloadOnSearch: false,
			isTop: false,
			isLeft: false,
			isFooter: false,
			isLogin:true,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
		.state('changePw', {
			url: "/changePw",
			templateUrl: "./jsp/login/changePw.jsp",
			controller:'findUser_ctrl as findUser',
			title:"비밀번호 변경",
			reloadOnSearch: false,
			isFooter: false,
			isLogin:true,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
		.state('resetPw', {
			url: "/resetPw",
			templateUrl: "./jsp/login/resetPw.jsp",
			controller:'resetPw_ctrl as resetPw',
			title:"비밀번호 재설정",
			reloadOnSearch: false,
			isFooter: false,
			isLogin:true,
			params: {
				pwModel: null,
				userModel: null
			},
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
		.state('confirmId', {
			url: "/confirmId",
			templateUrl: "./jsp/login/confirmId.jsp",
			controller:'findUser_ctrl as findUser',
			title:"아이디 확인",
			reloadOnSearch: false,
			isFooter: false,
			isLogin:true,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
		.state('findId', {
			url: "/findId",
			templateUrl: "./jsp/login/findId.jsp",
			controller:'findUser_ctrl as findUser',
			title:"아이디 찾기",
			reloadOnSearch: false,
			isFooter: false,
			isLogin:true,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
		.state('join', {
			url: "/join",
			templateUrl: "./jsp/login/join.jsp",
			controller:'join_ctrl as join',
			title:"회원 가입",
			reloadOnSearch: false,
			isFooter: false,
			isLogin:true,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
		///////////////////////////////[ dashboard ]///////////////////////////////////
		.state('dashboard', {
			url: "/dashboard",
			templateUrl: "./jsp/dashboard/dashboard.jsp",
			controller:'dashboard_ctrl as dash',
			title:"대시보드",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			isRight:false,
			mainMenu:"대시보드",
			subMenu:"대시보드",
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			},
			//template: '<h1 ng-init="init()"></h1>',
			resolve: {
	            init: function() {
	              return function(res) {
	            	  console.log(res);
	              }
	            }
	          }
		})
		.state('board', {
			url: "/board",
			templateUrl: "./jsp/board/list.jsp",
			controller:'list_ctrl as list',
			title:"게시판",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN]
			}
		})
		.state('board1', {
			url: "/board1",
			templateUrl: "./jsp/board/list.jsp",
			controller:'list_ctrl as list',
			title:"게시판",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN]
			}
		})
		.state('board2', {
			url: "/board2",
			templateUrl: "./jsp/board/list.jsp",
			controller:'list_ctrl as list',
			title:"게시판",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN]
			}
		})
		.state('pcsStats', {
			url: "/pcsStats",
			templateUrl: "./jsp/pcs/pcsStats.jsp",
			controller:'pcsStats_ctrl as ps',
			title:"PCS 전체",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
		.state('pcsDetail', {
			url: "/pcsDetail",
			templateUrl: "./jsp/pcs/pcsDetail.jsp",
			controller:'pcsDetail_ctrl as pd',
			title:"PCS 상세",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			mainMenu:"PCS",
			subMenu:"PCS 상세",
			params:{
	    		  rid:null
	    	},
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
		.state('bmsDetail', {
			url: "/bmsDetail",
			templateUrl: "./jsp/bms/bmsDetail.jsp",
			controller:'bmsDetail_ctrl as ps',
			title:"BMS상세",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
		.state('pvDetail', {
			url: "/pvDetail",
			templateUrl: "./jsp/pv/pvDetail.jsp",
			controller:'pvDetail_ctrl as pv',
			title:"태양광 상세",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
		///////////////////////////////[ Schedule ]///////////////////////////////////
		.state('scheduleManagement', {
			url: "/scheduleManagement",
			templateUrl: "./jsp/schedule/scheduleManagement.jsp",
			controller:'scheduleManagement_ctrl as sm',
			title:"스케줄 관리",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			params:{
	    		  id:null
	    	},
			data: {
				authorizedRoles: [USER_ROLES.ADMIN]
			}
		})
		.state('scheduleEdit', {
			url: "/scheduleEdit",
			templateUrl: "./jsp/schedule/scheduleEdit.jsp",
			controller:'scheduleEdit_ctrl as se',
			title:"스케줄 편집",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			params:{
	    		  id:null
	    	},
			data: {
				authorizedRoles: [USER_ROLES.ADMIN]
			}
		})
		.state('scheduleApply', {
			url: "/scheduleApply",
			templateUrl: "./jsp/schedule/scheduleApply.jsp",
			controller:'scheduleApply_ctrl as sa',
			title:"스케줄 적용",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			params:{
	    		  id:null
	    	},
			data: {
				authorizedRoles: [USER_ROLES.ADMIN]
			}
		})
		.state('holidayManagement', {
			url:"/holidayManagement",
			templateUrl: "./jsp/schedule/holiday.jsp",
			controller: "holiday_ctrl as holiday",
			title:"휴일관리",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			params:{
	    		  id:null
	    	},
			data: {
				authorizedRoles: [USER_ROLES.ADMIN]
			}
		})
		.state('deviceManagement', {
			url: "/deviceManagement",
			templateUrl: "./jsp/management/deviceManagement.jsp",
			controller:'deviceManagement_ctrl as dmc',
			title:"장치 관리",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN]
			}
		})
		///////////////////////////////[ Management ]///////////////////////////////////
		.state('myInfo', {
			url: "/myInfo",
			templateUrl: "./jsp/management/myInfo.jsp",
			controller:'myInfo_ctrl as mc',
			title:"내 정보",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
		.state('userApproval', {
			url: "/userApproval",
			templateUrl: "./jsp/management/userApproval.jsp",
			controller:'userApproval_ctrl as sa',
			title:"사용자 승인",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			params:{
				id:null
			},
			data: {
				authorizedRoles: [USER_ROLES.ADMIN]
			}
		})
		.state('userAddModify', {
			url: "/userAddModify",
			templateUrl: "./jsp/management/userAddModify.jsp",
			controller:'userAddModify_ctrl as uam',
			title:"사용자 등록 수정",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			params:{
				id:null
			},
			data: {
				authorizedRoles: [USER_ROLES.ADMIN]
			}
		})
		.state('timeline', {
			url: "/timeline",
			templateUrl: "./jsp/management/timeline.jsp",
			controller:'timeline_ctrl as tl',
			title:"이력",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			params:{
				id:null
			},
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR]
			}
		})
		.state('logManagement', {
			url: "/logManagement",
			templateUrl: "./jsp/management/logManagement.jsp",
			controller:'logManagement_ctrl as lm',
			title:"로그",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			params:{
				id:null
			},
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR]
			}
		})
		.state('siteManagement', {
			url: "/siteManagement",
			templateUrl: "./jsp/management/siteManagement.jsp",
			controller:'siteManagement_ctrl as sa',
			title:"사이트 관리",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			params:{
				id:null
			},
			data: {
				authorizedRoles: [USER_ROLES.ADMIN]
			}
		})
		.state('settingManagement', {
			url: "/settingManagement",
			templateUrl: "./jsp/management/settingManagement.jsp",
			controller:'settingManagement_ctrl as sa',
			title:"환경설정",
			reloadOnSearch: false,
			isTop: true,
			isLeft:true,
			params:{
				id:null
			},
			data: {
				authorizedRoles: [USER_ROLES.ADMIN]
			}
		})
		.state('webSocket', {
			url: "/webSocket",
			templateUrl: "./jsp/websocketClient/websocketClient.jsp",
			controller:'webSocketController as ws',
			title:"웹소켓테스트",
			reloadOnSearch: false,
			isTop: true,
			isLeft:false,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN]
			}
		})
		///////////////////////////////[ indexSample ]/////////////////////////////////
		.state('indexSample', {
			url: "/indexSample",
			templateUrl: "./index_sample.html",
			title:"샘플인덱스",
			reloadOnSearch: false,
			isTop: true,
			isLeft: true,
			data: {
				authorizedRoles: [USER_ROLES.ADMIN, USER_ROLES.SITEMAJOR, USER_ROLES.SITEJUNIOR, USER_ROLES.USER]
			}
		})
	}
]);
