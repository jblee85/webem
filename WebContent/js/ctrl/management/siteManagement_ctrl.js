'use strict';
angular.module('iceApp').controller('siteManagement_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','apiService','DEFINED','MODEL','Session','$cacheFactory','$timeout',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,apiService,DEFINED,MODEL,Session,$cacheFactory,$timeout) {
	$rootScope.loadingStart();
	$scope.siteModel = {
			devid : "pcs-1",
			sid : "s139271",
			addr1 : "경기|성남시|분당구 판교역로 255-15",
			addr2 : "",
			data : {
				kepcockw : 500
			},
			rdday : 16,
	}
	$scope.rddayList = [];
	var index = 1;
	while(index < 31){
		$scope.rddayList.push(index);
		index++;
	}
	// 다음 우편번호 검색 API
    $scope.consumer={};
    $scope.getPostCode = function(){
        openPostcode(function(){
            $scope.$apply(function(){
        	    $scope.siteModel.zipcode1 = postVal.zonecode.slice(0,3);
                $scope.siteModel.zipcode2 = postVal.zonecode.slice(3,5);
                $scope.siteModel.addr1 = postVal.address;
            });
        });
    }
    $scope.bcodes = MODEL.BCODE;

	$scope.getSite = function(){
		$rootScope.loadingStart();
		apiService.get_Site()
	  	.then(
	  			function(d) {
	  				try{
	  					$scope.siteModel = d;
	  					$scope.siteModel.addr1 = $scope.siteModel.addr1.replace('|',' ').replace('|',' ');
	  					$rootScope.loadingStop();
	  				}catch(e){
	  					$rootScope.loadingStop();
	  				}

	  			},
	  			function(errResponse){
	  				$rootScope.loadingStop();
	  				if(errResponse.data != null){
	  					if(JSON.parse(errResponse.data).errcode == '15'){
	  						//alert("에러 발생");
	  					}else if(JSON.parse(errResponse.data).errcode == '13'){
	  					//	alert("에러 발생");
	  					}
	  				}else{
	  					alert("서버와 연결되어 있지 않습니다.");
	  				}
	  			}
	  	);
	}
	$scope.getSite();
	$scope.confirm = function() {
		 $scope.siteModel.cdt = convertDateStringsToDates($scope.siteModel.cdt);
		 $scope.siteModel.addr1 = $scope.siteModel.addr1.replace(' ','|').replace(' ','|');
		 delete $scope.siteModel.mdt;
		 delete $scope.siteModel.required;
		 delete $scope.siteModel.data.manager.required;
		 for(var i in $scope.siteModel.refdevs){
			 $scope.siteModel.refdevs[i].cdt = convertDateStringsToDates($scope.siteModel.refdevs[i].cdt);
		 }
		 console.log($scope.siteModel);
		 $rootScope.loadingStart();
		 delete $scope.siteModel.id

	  	apiService.put_Site_guest(JSON.stringify($scope.siteModel))
	  	.then(
	  			function(d) {
	  				try{
	  					$scope.getSite();
	  					$rootScope.loadingStop();
	  				}catch(e){
	  					$rootScope.loadingStop();
	  				}

	  			},
	  			function(errResponse){
	  				$rootScope.loadingStop();
	  				if(errResponse.data != null){
	  					if(JSON.parse(errResponse.data).errcode == '15'){
	  						//alert("에러 발생");
	  					}else if(JSON.parse(errResponse.data).errcode == '13'){
	  					//	alert("에러 발생");
	  					}
	  				}else{
	  					alert("서버와 연결되어 있지 않습니다.");
	  				}
	  			}
	  	);
	}
	$scope.cancel = function() {
		$scope.userModel = null;
		$state.go('dashboard');
	}
}]);
