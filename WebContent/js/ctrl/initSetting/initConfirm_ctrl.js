'use strict';
angular.module('iceApp').controller('initConfirm_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','apiService','DEFINED','Session','$cacheFactory','$timeout', 'MODEL',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,apiService,DEFINED,Session,$cacheFactory,$timeout, MODEL) {

        function confirm (){
            console.log('초기 api 실행')
                apiService.get_isUserModelEmpty()
                    .then(
                        (res)=>{
                            console.log('결과 : '+res)
                            if(res){
                                $rootScope.goURL('initSetting')
                            }else{
                                $rootScope.goURL('login')
                            }
                        },
                        (err)=>{
                            console.log(err)
                            if(err.status == -1){
                				$rootScope.$broadcast(AUTH_EVENTS.disconnected,err);
                			}
                            // $state.go('login')
                        }
                    )
        }
        $scope.init = function() {
//        	$rootScope.spinStart();
//            setTimeout(()=>{
                confirm();
//                getProperties();
//                $rootScope.spinStop();
//            }, 300)
        }


    }
]);