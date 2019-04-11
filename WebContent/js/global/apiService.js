    angular.module('iceApp.apiService', []).factory('apiService',['$rootScope','Session','DEFINED','$http','$q',function($rootScope,Session,DEFINED,$http,$q){
//    	function findIP(onNewIP) { //  onNewIp - your listener function for new IPs
//  		  var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //compatibility for firefox and chrome
//  		  var pc = new myPeerConnection({iceServers: []}),
//  		    noop = function() {},
//  		    localIPs = {},
//  		    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
//  		    key;
//
//  		  function ipIterate(ip) {
//  		    if (!localIPs[ip]) onNewIP(ip);
//  		    localIPs[ip] = true;
//  		  }
//  		  pc.createDataChannel(""); //create a bogus data channel
//  		  pc.createOffer(function(sdp) {
//  		    sdp.sdp.split('\n').forEach(function(line) {
//  		      if (line.indexOf('candidate') < 0) return;
//  		      line.match(ipRegex).forEach(ipIterate);
//  		    });
//  		    pc.setLocalDescription(sdp, noop, noop);
//  		  }, noop); // create offer and set local description
//  		  pc.onicecandidate = function(ice) { //listen for candidate events
//  		    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
//  		    ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
//  		  };
////  		  return ip;
//  		}
////  	var ul = document.createElement('ul');
////  	ul.textContent = 'Your IPs are: '
////  	document.body.appendChild(ul);
//
//  	function addIP(ip) {
////  	  console.log('got ip: ', ip);
//  	  DEFINED.server_root_url = "http://"+ip+":8080/ice/v1/";
//  	  DEFINED.webSocket_host = ip;
//  	  url = DEFINED.server_root_url;
//  	}
//
//  	findIP(addIP);
    	var url = $rootScope.url;
//    	var url = DEFINED.server_root_url;
    	var bizid=DEFINED.bizid;
    	var scheduleType = DEFINED.schedule;
    	var scheduleDetailType = DEFINED.scheduleDetail;
    	var timelineList = DEFINED.timelineList;
    	return{
    		get_Language:function(langtype){
    			var deferred = $q.defer();
    	    	var config={
    	    			params:{
    	    					langtype:langtype	
    	    			}
    	    	}
    	    	$http.get($rootScope.url+"configs/languages/",config)
    	    	.then(
    	    			function (response) {
        		        	deferred.resolve(response.data);
        		        },
        		        function(errResponse){
        		          deferred.reject(errResponse);
        		        }
    	    	);
    	    	return deferred.promise;
    		},
    		gets_Language:function(){
    			var deferred = $q.defer();
    	    	
    	    	$http.get($rootScope.url+"configs/languages")
    	    	.then(
    	    			function (response) {
        		        	deferred.resolve(response.data);
        		        },
        		        function(errResponse){
        		          deferred.reject(errResponse);
        		        }
    	    	);
    	    	return deferred.promise;
    		},
			post_SiteLogin:function(sitekey){
				var deferred = $q.defer();
				$http.post($rootScope.url+"sites/"+bizid+"/login", JSON.stringify(sitekey))
				.then(
					function (response) {
						console.info(response)
						deferred.resolve(response.data);
					},
			        function(errResponse){
			        	console.error('Error while login User : ' + errResponse);
			            deferred.reject(errResponse);
			        }
				);
				return deferred.promise;
			},

			post_Login:function(user){
//				var $rootScope.url = DEFINED.server_root_url;
		    	var deferred = $q.defer();

		    	// 캐쉬에 인증정보가 있으면 인증정보 반환
		    	/*if(user){
		    		deferred.resolve(response.data);
		    	}*/

		    	// 캐쉬에 인증정보가 없으면 백엔드에 호출함
		    	delete user.pid;
		    	$http.post($rootScope.url+"users/"+bizid+"/login",user) //{ "userid":"ems@wooam.com", "password":"1111"}
		        .then(
			        function (response) {
			            deferred.resolve(response.data);
			        },
			        function(errResponse){
			        	console.error('Error while login User : ' + errResponse);
			            deferred.reject(errResponse);
			        }
			    );
		    	return deferred.promise;
		    },
		    get_properties: function(type){
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
       						type:type
       					},
    	    			headers: {
    						'Accept':'application/json'
    						,'ice-user-auth':Session.authkey
    					}
    	    	};
    	    	$http.get($rootScope.url+"system",config)
    	    	.then(
    	    			function (response) {
        		        	deferred.resolve(response.data);
        		        },
        		        function(errResponse){
        		          deferred.reject(errResponse);
        		        }
    	    	);
    	    	return deferred.promise;
    	    },
		    //SMS인증 요청(회원가입 시)
		    post_sendSMS: function(smsModel){
		    	var deferred = $q.defer();
       			var config = {
       					headers: {
       						'Accept':'application/json',
       						'ice-user-auth':Session.authkey
       					}
       			};
       			//server : sendingSMSCode
       			$http.post($rootScope.url+"sms/"+bizid+"/auth",smsModel,config)
       			.then(
       				function(response){
       					deferred.resolve(response.data);
       				},
       				function(errResponse){
       					deferred.reject(errResponse);
       				}
       			);
       			return deferred.promise;
		    },
		    //SMS인증 요청()
		    post_sendSMS_reauth: function(smsModel){
		    	var deferred = $q.defer();
       			var config = {
       					headers: {
       						'Accept':'application/json',
       						'ice-user-auth':Session.authkey
       					}
       			};
       			//server : sendingSMSCode
       			$http.post($rootScope.url+"sms/"+bizid+"/reauth",smsModel,config)
       			.then(
       				function(response){
       					deferred.resolve(response.data);
       				},
       				function(errResponse){
       					deferred.reject(errResponse);
       				}
       			);
       			return deferred.promise;
		    },
		    //SMS인증 확인
		    get_confirm:function(model){
       			var deferred = $q.defer();
       			var config = {
       					params: {
       						"userid":model.userid,
       						"smscode":model.smscode,
       						"phone":model.phone
       					},
       					headers: {
       						'Accept':'application/json',
       						'ice-user-auth':Session.authkey
       					}
       			};
       			$http.get($rootScope.url+"users/"+bizid+"/sms/authcode",config)
       			.then(
       				function(response){
       					deferred.resolve(response.data);
       				},
       				function(errResponse){
       					deferred.reject(errResponse);
       				}
       			);
       			return deferred.promise;
       		},
       		//이메일로 인증코드 전송
       		get_sendEcode: function(username,email){
       			var deferred = $q.defer();
       			var config = {
       					params: {
       						"username":username,
       						"email":email,
       					}
       			};
       			$http.get($rootScope.url+"email/"+bizid+"/authcode",config)
       			.then(
       				function(response){
       					deferred.resolve(response.data);
       				},
       				function(errResponse){
       					deferred.reject(errResponse);
       				}
       			);
       			return deferred.promise;
       		},
       		//아이디 찾기
       		get_findId : function(phone,username){
       	    	var deferred = $q.defer();
       	    	var config = {
       					params: {
       						phone:phone,
       						username:username
       					}
       			};
       	    	$http.get($rootScope.url+"users/"+bizid+"/id/guest",config)
       	        .then(
       		        function (response) {
       		            deferred.resolve(response.data.userid);
       		        },
       		        function(errResponse){
       		            deferred.reject(errResponse);
       		        }
       	        );
       	    	return deferred.promise;
       	    },
       	    //사용자 찾기
       	    get_searchUser: function(phone,username,userid){
       	    	var deferred = $q.defer();
       	    	var config = {
       					params: {
       						sphone:phone,
       						username:username,
       						userid:userid
       					}
       			};
       	    	$http.get($rootScope.url+"users/"+bizid+"/check",config)
       	        .then(
       		        function (response) {
       		        	deferred.resolve(response.data);
       		        },
       		        function(errResponse){
       		            deferred.reject(errResponse);
       		        }
       	        );
       	    	return deferred.promise;
       	    },
       	    //비밀번호 재설정
       	    put_resetPw: function(pwModel){
       	    	var deferred = $q.defer();
    	    	var config = {
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	$http.put($rootScope.url+"users/"+bizid+"/password/reset",pwModel,config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
       	    },
       	    //아이디 중복확인
       	    get_BizidAuth: function(userid){
       	    	var deferred = $q.defer();
       	    	var config = {
       					params: {
       						userid:userid
       					}
       			};
       	    	$http.get($rootScope.url+"users/"+bizid+"/auth",config)
       	        .then(
       		        function (response) {
       		        	deferred.resolve(response.data);
       		        },
       		        function(errResponse){
       		            deferred.reject(errResponse);
       		        }
       	        );
       	    	return deferred.promise;
       	    },
       	    //사용자 등록 api
       	    post_userModel: function(userModel){
       	    	var deferred = $q.defer();
       	    	var config = {
       	    			headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       	    	};
       	    	$http.post($rootScope.url+"users/"+bizid+"/user",userModel,config)
       	    	.then(
       	    			function (response) {
           		        	deferred.resolve(response.data);
           		        },
           		        function(errResponse){
           		            deferred.reject(errResponse);
           		        }
       	    	);
       	    	return deferred.promise;
       	    },
       	    //사용자 수정 api
       	    put_userModel: function(userModel){
       	    	var deferred = $q.defer();
       	    	var config = {
       	    			headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       	    	};
       	    	$http.put($rootScope.url+"users/"+bizid+"/user",userModel,config)
       	    	.then(
       	    			function (response) {
           		        	deferred.resolve(response.data);
           		        },
           		        function(errResponse){
           		            deferred.reject(errResponse);
           		        }
       	    	);
       	    	return deferred.promise;
       	    },
       	    //사용자 등록 api
       	    del_userModel: function(userid){
       	    	var deferred = $q.defer();
       	    	var config = {
       	    			params: {
       						userid:userid
       					},
       	    			headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       	    	};
       	    	$http.delete($rootScope.url+"users/"+bizid+"/user",config)
       	    	.then(
       	    			function (response) {
           		        	deferred.resolve(response.data);
           		        },
           		        function(errResponse){
           		            deferred.reject(errResponse);
           		        }
       	    	);
       	    	return deferred.promise;
       	    },
       	    //사용자 등록 api
       	    put_userEnable: function(userid,enable){
       	    	var deferred = $q.defer();
       	    	var config = {
       	    			params: {
       						userid:userid,
       						enable:enable
       					},
       	    			headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       	    	};
       	    	$http.put($rootScope.url+"users/"+bizid+"/enable",{},config)
       	    	.then(
       	    			function (response) {
           		        	deferred.resolve(response.data);
           		        },
           		        function(errResponse){
           		            deferred.reject(errResponse);
           		        }
       	    	);
       	    	return deferred.promise;
       	    },
       	   //사용자 정보 조회 api
       	   get_Bizd_id_User: function(userid){
       	    	var deferred = $q.defer();
       	    	var config = {
       	    			params: {
       						userid:userid
       					},
       	    			headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       	    	};
       	    	$http.get($rootScope.url+"users/"+bizid+"/user",config)
       	    	.then(
       	    			function (response) {
           		        	deferred.resolve(response.data);
           		        },
           		        function(errResponse){
           		          deferred.reject(errResponse);
           		        }
       	    	);
       	    	return deferred.promise;
       	    },
       	    //사용자 정보 조회 api
    	   get_check_password: function(userid,password){
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
    						userid:userid,
    						password:password
    					},
    	    			headers: {
    						'Accept':'application/json'
    						,'ice-user-auth':Session.authkey
    					}
    	    	};
    	    	$http.get($rootScope.url+"users/"+bizid+"/password/check",config)
    	    	.then(
    	    			function (response) {
        		        	deferred.resolve(response.data);
        		        },
        		        function(errResponse){
        		          deferred.reject(errResponse);
        		        }
    	    	);
    	    	return deferred.promise;
    	    },
    	    //로그인 한 유저 패스워드 변경
    	    put_password: function(UserPasswordChangeReqb){
     	    	var deferred = $q.defer();
     	    	var config = {
     	    			headers: {
     						'Accept':'application/json'
     						,'ice-user-auth':Session.authkey
     					}
     	    	};
     	    	$http.put($rootScope.url+"users/"+bizid+"/password",UserPasswordChangeReqb,config)
     	    	.then(
     	    			function (response) {
         		        	deferred.resolve(response.data);
         		        },
         		        function(errResponse){
         		          deferred.reject(errResponse);
         		        }
     	    	);
     	    	return deferred.promise;
     	    },
       	    //사용자 목록 불러오기
    	   get_Users: function(){
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
       						sid:Session.user.siteids[0].toString()
       					},
    	    			headers: {
    						'Accept':'application/json'
    						,'ice-user-auth':Session.authkey
    					}
    	    	};
    	    	$http.get($rootScope.url+"users/"+bizid+"/users",config)
    	    	.then(
    	    			function (response) {
        		        	deferred.resolve(response.data);
        		        },
        		        function(errResponse){
        		          deferred.reject(errResponse);
        		        }
    	    	);
    	    	return deferred.promise;
    	    },
		    /*------------------------------------ DASHBOARD -----------------------------------------*/
       	    //대시보드 마지막 데이터 capped 디비
		    getDashBoard_Capped:function(){
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
       						"sid":Session.user.siteids[0]
       					},
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};

    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"ess/"+bizid+"/latest",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    //대시보드
    	    getDashBoard:function(day){
    	    	var deferred = $q.defer();
    	    	var sid = Session.user.siteids[0];
    	    	var config = {
    	    			params: {
       						"day":day
       					},
    	    			headers : {'Accept' : 'application/json',
    	    				'ice-user-auth' : Session.authkey}
    	    	};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"ess/"+bizid+"/"+sid+"/dashboard",config)
    	    	.then(
    	    			function (response) {
    	    				deferred.resolve(response.data);
    	    			},
    	    			function(errResponse){
    	    				deferred.reject(errResponse);
    	    			}
    	    	);
    	    	return deferred.promise;
    	    },
    	    getPV_day:function(devrid,devlid,startday,endday){
    	    	var deferred = $q.defer();
       	    	var config = {
	    				params: {
	    					startday:startday,
	    					endday:endday
	    					},
	    				headers : {'Accept' : 'application/json',
	    								'ice-user-auth' : Session.authkey}
	    		};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"pv/"+bizid+"/"+devrid+"/"+devlid+"/day",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
       	    //대시보드 15 분 전력 사용 리스트
    	    getIsmart:function(ismartid,day){
    	    	var deferred = $q.defer();
       	    	var config = {
	    				params: {day:day},
	    				headers : {'Accept' : 'application/json',
	    								'ice-user-auth' : Session.authkey}
	    		};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"ami/ismart/"+ismartid+"/ismart",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },

    	    getAMI_summary:function(devrid,devlid,day,month){
    	    	var deferred = $q.defer();
       	    	var config = {
	    				params: {
	    					day:day,
	    					month:month
	    					},
	    				headers : {'Accept' : 'application/json',
	    								'ice-user-auth' : Session.authkey}
	    		};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"ami/"+bizid+"/"+devrid+"/"+devlid+"/summary",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    getAMI_day:function(devrid,devlid,sday,eday){
    	    	var deferred = $q.defer();
       	    	var config = {
	    				params: {
	    					startday:sday,
	    					endday:eday
	    					},
	    				headers : {'Accept' : 'application/json',
	    								'ice-user-auth' : Session.authkey}
	    		};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"ami/"+bizid+"/"+devrid+"/"+devlid+"/day",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    getAMI_month:function(devrid,devlid,startmonth,endmonth){
    	    	var deferred = $q.defer();
       	    	var config = {
	    				params: {
	    					startmonth:startmonth,
	    					endmonth:endmonth
	    					},
	    				headers : {'Accept' : 'application/json',
	    								'ice-user-auth' : Session.authkey}
	    		};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"ami/"+bizid+"/"+devrid+"/"+devlid+"/month",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    //시간별 장비 정보
    	    gets_EnergyESSDayModel_day:function(devrid,day){
    	    	var deferred = $q.defer();
       	    	var config = {
	    				params: {day:day},
	    				headers : {'Accept' : 'application/json',
	    								'ice-user-auth' : Session.authkey}
	    		};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"ess/"+bizid+"/"+devrid+"/day",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	  //시간별 장비 정보
    	    gets_EnergyESSDayModel_latest:function(devrid,devlid,day){
    	    	var deferred = $q.defer();
       	    	var config = {
	    				params: {day:day},
	    				headers : {'Accept' : 'application/json',
	    								'ice-user-auth' : Session.authkey}
	    		};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"ess/"+bizid+"/"+devrid+"/"+devlid+"/day",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	  //월별 장비 정보
    	    gets_EnergyESSModel_month:function(devrid,devlid,month){
    	    	var deferred = $q.defer();
       	    	var config = {
	    				params: {month:month},
	    				headers : {'Accept' : 'application/json',
	    								'ice-user-auth' : Session.authkey}
	    		};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"ess/"+bizid+"/"+devrid+"/"+devlid+"/month",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    /*------------------------------------ device -----------------------------------------*/
    	  //device root
    	    gets_DeviceRoots:function(devrids){
    	    	var deferred = $q.defer();
       	    	var config = {
	    				params: {
	    					enabled:true,
	    					devrids:devrids
	    					},
	    				headers : {'Accept' : 'application/json',
	    								'ice-user-auth' : Session.authkey}
	    		};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"devices/roots",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    puts_DeviceRoots:function(roots){
    	    	var deferred = $q.defer();
       	    	var config = {
	    				headers : {'Accept' : 'application/json',
	    								'ice-user-auth' : Session.authkey}
	    		};
    	    	//server : get_ESSResb_latest
    	    	$http.put($rootScope.url+"devices/roots",roots,config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    //device leaf
    	    gets_DeviceLeafs: function(devrid){

    	    	var deferred = $q.defer();
       	    	var config = {
	    				params: {
	    					"devrid":devrid,
	    					"enabled":true
	    				},
	    				headers : {'Accept' : 'application/json',
	    								'ice-user-auth' : Session.authkey}
	    		};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"devices/leafs",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    //device leaf
    	    puts_DeviceLeafs:function(leafList){
    	    	var tempList=[];
    	    	Array.isArray(leafList.length) ? tempList=leafList : tempList.push(leafList)
    	    	var deferred = $q.defer();
//    	    	var devtype = 5;
       	    	var config = {
       	    			params: {
	    					"devtype":tempList[0].devtype,
	    				},
	    				headers : {'Accept' : 'application/json',
	    								'ice-user-auth' : Session.authkey}
	    		};
    	    	//server : get_ESSResb_latest
    	    	$http.put($rootScope.url+"devices/leafs",tempList,config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    /*------------------------------------ ess -----------------------------------------*/
    	    //충전,방전
    	    put_ESSChargingStatus:function(rid, lid, obj){
    	    	var deferred = $q.defer();
    	    	obj.sid = Session.user.siteids[0];
    	    	var config = {
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	//server : get_ESSResb_latest
    	    	$http.put($rootScope.url+"ess/"+bizid+"/"+rid+"/"+lid+"/command",obj,config)
    	        .then(
    		        function (response) {
    		       	 console.log(response);
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },

    	    /*------------------------------------ site -----------------------------------------*/
    	    //로그인 상태
    	    get_Site:function(){
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
    	    				"sid":Session.user.siteids[0]
       					},
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};

    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"sites/"+bizid+"/site",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    gets_Site:function(){
    	    	var deferred = $q.defer();
    	    	var config = {
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};

    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"sites/guest/"+bizid+"/names",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    post_Site:function(obj){
    	    	var deferred = $q.defer();
    	    	var config = {
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	//server : get_ESSResb_latest
    	    	$http.post($rootScope.url+"sites/"+bizid+"/site",obj,config)
    	        .then(
    		        function (response) {
    		       	 console.log(response);
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    put_Site:function(obj){
    	    	var deferred = $q.defer();
    	    	var config = {
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	$http.put($rootScope.url+"sites/"+bizid+"/site",obj,config)
    	        .then(
    		        function (response) {
    		       	 console.log(response);
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    //비 로그인 상태
    	    post_Site_guest:function(obj){
    	    	var deferred = $q.defer();
    	    	$http.post($rootScope.url+"sites/"+bizid+"/site/guest",obj)
    	        .then(
    		        function (response) {
    		       	 console.log(response);
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    put_Site_guest:function(obj){
    	    	var deferred = $q.defer();
    	    	$http.put($rootScope.url+"sites/"+bizid+"/site/guest",obj)
    	        .then(
    		        function (response) {
    		       	 console.log(response);
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    /*------------------------------------ timeline -----------------------------------------*/
    	    gets_Timeline:function(startday,endday,authlv,taction){

    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
       						"reqb":JSON.stringify(timelineList.tcodes),
       						"startday":startday,
       						"endday":endday,
       						"authlv":authlv,
       						"taction":taction
//    	    				"reqb":"ddd"
       					},
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	if(taction == ""){
    	    		delete config.params.taction;
    	    	}
    	    	if(authlv == ""){
    	    		delete config.params.authlv;
    	    	}
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"timeline/"+bizid+"/"+Session.user.siteids[0]+"/tcodes",config)
    	        .then(
    		        function (response) {
//    		       	 console.log(response);
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
//    	    gets_Timeline_tcode:function(startday,endday,){
//    	    	var deferred = $q.defer();
//    	    	var config = {
//    	    			params: {
//       						"reqb":JSON.stringify(timelineList.tcodes),
//       						"startday":startday,
//       						"endday":endday
////       						"authlv":Session.user.authlv
////    	    				"reqb":"ddd"
//       					},
//       					headers: {
//       						'Accept':'application/json'
//       						,'ice-user-auth':Session.authkey
//       					}
//       				};
//    	    	//server : get_ESSResb_latest
//    	    	$http.get($rootScope.url+"timeline/"+bizid+"/"+Session.user.siteids[0]+"/tcodes",config)
//    	        .then(
//    		        function (response) {
////    		       	 console.log(response);
//    		            deferred.resolve(response.data);
//    		        },
//    		        function(errResponse){
//    		            deferred.reject(errResponse);
//    		        }
//    		    );
//    	    	return deferred.promise;
//    	    },
    	    gets_Timeline_day:function(sday,eday,tcode){
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
    	    				"startday":sday,
    	    				"endday":eday,
    	    				"tcode":tcode,
//    	    				"taction":taction,
//    	    				"authlv":authlv,
    	    				"sid":Session.user.siteids[0]
       					},
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"timeline/"+bizid+"/day",config)
    	        .then(
    		        function (response) {
//    		       	 console.log(response);
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    gets_TimelineStat:function(){
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			headers:{
    	    				'Accept':'application/json'
           					,'ice-user-auth':Session.authkey
    	    			}
    	    	}
    	    	$http.get($rootScope.url+"timeline/"+bizid+"/total/counts", config)
    	    	.then(
    	    			function(response){
    	    				deferred.resolve(response.data);
    	    			},
    	    			function(errResponse){
    	    				deferred.reject(errResponse);
    	    			}
    	    	)
    	    	return deferred.promise;
    	    },
    	    /*------------------------------------ schedule -----------------------------------------*/
    	    
    	    //모든 스케줄 불러오기
    	    gets_ConfigSchedule:function(type){
    	    	type = type==null ? scheduleType : type;
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
       						"type":type
       					},
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"configs/"+bizid+"/configs",config)
    	        .then(
    		        function (response) {
//    		       	 console.log(response);
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	  //사용중인 스케줄 불러오기 //
    	    get_ConfigESSSchedule_enable:function(month){
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
       						"sid":Session.user.siteids[0],
       						"month":month
       					},
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"configs/"+bizid+"/schedule",config)
    	        .then(
    		        function (response) {
    		       	 	console.log(response);
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	  //스케줄 상세 불러오기
    	    get_ConfigESSSchedule:function(id){
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
       						"type":scheduleDetailType,
       						"sid":Session.user.siteids[0]
       					},
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	//server : get_ESSResb_latest
    	    	$http.get($rootScope.url+"configs/"+bizid+"/config",config)
    	        .then(
    		        function (response) {
    		       	 console.log(response);
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    //스케줄 상세 저장
    	    post_ConfigESSSchedule:function(scheduleDetail, type){
    	    	scheduleDetail.sid = Session.user.siteids[0];
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
       						"type":scheduleType
       					},
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	//server : get_ESSResb_latest
    	    	$http.post($rootScope.url+"configs/"+bizid+"/config",scheduleDetail,config)
    	        .then(
    		        function (response) {
    		       	 console.log(response);
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	  //스케줄 상세 저장
    	    posts_ConfigESSSchedule:function(objList, type){
//    	    	scheduleDetail.sid = Session.user.siteids[0];
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
    	    				"sid":Session.user.siteids[0],
       						"type":type
       					},
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	//server : get_ESSResb_latest
    	    	$http.post($rootScope.url+"configs/"+bizid+"/configs",objList,config)
    	        .then(
    		        function (response) {
    		       	 console.log(response);
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    //스케줄 삭제
    	    delete_ConfigESSSchedule:function(id){
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
       						"type":scheduleType,
       						"id":id
       					},
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	//server : get_ESSResb_latest
    	    	$http.delete($rootScope.url+"configs/"+bizid+"/config/id",config)
    	        .then(
    		        function (response) {
    		       	 console.log(response);
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	  //스케줄 적용/비적용
//    	    put_ConfigESSScheduleApply:function(id,status){
//    	    	var deferred = $q.defer();
//    	    	var config = {
//    	    			params: {
//       						"id":id,
//       						"apply":status
//       					},
//       					headers: {
//       						'Accept':'application/json'
//       						,'ice-user-auth':Session.authkey
//       					}
//       				};
//    	    	//server : get_ESSResb_latest
//    	    	$http.put($rootScope.url+"configs/"+bizid+"/schedule/apply",{},config)
//    	        .then(
//    		        function (response) {
//    		       	 console.log(response);
//    		            deferred.resolve(response.data);
//    		        },
//    		        function(errResponse){
//    		            deferred.reject(errResponse);
//    		        }
//    		    );
//    	    	return deferred.promise;
//    	    },
    	  //스케줄 활성화/비활성화
    	    put_ConfigESSScheduleRun:function(scModel, status){
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
       						"id":scModel.id,
       						"run":status
       					},
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	//server : get_ESSResb_latest
    	    	$http.put($rootScope.url+"configs/"+bizid+"/schedule/run",{},config)
    	        .then(
    		        function (response) {
    		       	 console.log(response);
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    /*------------------------------------ holiday -----------------------------------------*/
    	    post_holiday:function(type, obj){
    	    	obj.sid = Session.user.siteids[0];
    	    	obj.type = 2;
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
    	    				"type":type
    	    			},
    	    			headers: {
    	    				'Accept':'application/json'
    	    				,'ice-user-auth':Session.authkey
    	    			}
    	    	};
    	    	$http.post($rootScope.url+"configs/"+bizid+"/config", obj, config)
    	    	.then(
    	    			function(response){
    	    				deferred.resolve(response.data);
    	    			},
    	    			function(errResponse){
    	    				deferred.reject(errResponse);
    	    			}
    	    	);
    	    	return deferred.promise;
    	    },
    	    get_config:function(type){
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params: {
       						"type":type,
       						"sid":Session.user.siteids[0]
       					},
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	$http.get($rootScope.url+"configs/"+bizid+"/config",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    put_holiday:function(obj){
//    	    	obj.sid = Session.user.siteids[0];
//    	    	obj.type = 2;
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			headers: {
    	    				'Accept':'application/json'
    	    				,'ice-user-auth':Session.authkey
    	    			}
    	    	};
    	    	$http.put($rootScope.url+"configs/"+bizid+"/config", obj, config)
    	    	.then(
    	    			function(response){
    	    				deferred.resolve(response.data);
    	    			},
    	    			function(errResponse){
    	    				deferred.reject(errResponse);
    	    			}
    	    	);
    	    	return deferred.promise;
    	    },
    	    gets_logs:function(){
    	    	var deferred = $q.defer();
    	    	var config = {
       					headers: {
       						'Accept':'application/json'
       						,'ice-user-auth':Session.authkey
       					}
       				};
    	    	$http.get($rootScope.url+"logs/files",config)
    	        .then(
    		        function (response) {
    		            deferred.resolve(response.data);
    		        },
    		        function(errResponse){
    		            deferred.reject(errResponse);
    		        }
    		    );
    	    	return deferred.promise;
    	    },
    	    get_log:function(filename){
    	    	var deferred = $q.defer();
    	    	var config = {
    	    			params:{
    	    				"filename":filename
    	    			},
    	    			headers:{
    	    				'Accept':'application/octet-stream'
    	    				,'ice-user-auth':Session.authkey
    	    			}
    	    	};
    	    	$http.get($rootScope.url+"logs/file", config)
    	    	.then(
    	    			function (response) {
	    		            deferred.resolve(response.data);
	    		        },
	    		        function(errResponse){
	    		            deferred.reject(errResponse);
	    		        }
    	    	);
    	    	return deferred.promise;
			},
			put_pluginReflash:function(type){
				var deferred = $q.defer();
				var config = {
					params:{
						"type":type
					},
					headers:{
						'Accept':'application/json'
						,'ice-user-auth':Session.authkey
					}
				}
				$http.put($rootScope.url+"plugins/reflash", {}, config)
				.then(
					function (response) {
						deferred.resolve(response.data);
					},
					function(errResponse){
						deferred.reject(errResponse);
					}
				)
				return deferred.promise;
			},
			get_isUserModelEmpty:function(){
				var deferred = $q.defer();
				$http.get($rootScope.url+"users/"+bizid+"/empty")
					.then(
						function (response) {
							deferred.resolve(response.data);
						},
						function(errResponse){
							deferred.reject(errResponse);
						}
					)
				return deferred.promise;
			},
			get_ping:function(ipaddr,port){
				var deferred = $q.defer();
				var config = {
					params:{
						"ipaddr":ipaddr,
						"port":port
					},
					headers:{
						'Accept':'application/json'
						,'ice-user-auth':Session.authkey
					}
				}
				$http.get($rootScope.url+"ess/"+bizid+"/ping", config)
					.then(
						function (response) {
							deferred.resolve(response.data);
						},
						function(errResponse){
							deferred.reject(errResponse);
						}
					)
				return deferred.promise;
			},
			//version 관리
			get_Version:function(){
				var deferred = $q.defer();
				var config = {
					headers:{
						'Accept':'application/json'
						,'ice-user-auth':Session.authkey
					}
				}
				$http.get($rootScope.url+"system/version", config)
					.then(
						function (response) {
							deferred.resolve(response.data);
						},
						function(errResponse){
							deferred.reject(errResponse);
						}
					)
				return deferred.promise;
			},
			get_SystemCommitsResb:function(){
				var deferred = $q.defer();
				var config = {
//					params:{
//						"page":1,
//						"pagelen":100
//					},
					headers:{
						'Accept':'application/json'
						,'ice-user-auth':Session.authkey
					}
				}
				$http.get($rootScope.url+"system/versions", config)
					.then(
						function (response) {
							deferred.resolve(response.data);
						},
						function(errResponse){
							deferred.reject(errResponse);
						}
					)
				return deferred.promise;
			},
			put_UpdateVersion:function(version,hash){
				var deferred = $q.defer();
				var config = {
					params:{
						"version":version
//						"hash":hash
					},
					headers:{
						'Accept':'application/json'
						,'ice-user-auth':Session.authkey
					}
				}
				$http.put($rootScope.url+"system/update", {}, config)
				.then(
					function (response) {
						deferred.resolve(response.data);
					},
					function(errResponse){
						deferred.reject(errResponse);
					}
				)
				return deferred.promise;
			}
    	};
    }]);