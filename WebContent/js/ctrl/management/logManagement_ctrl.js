'use strict';
angular.module('iceApp').controller('logManagement_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','apiService','DEFINED','Session','$cacheFactory','$timeout','DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,apiService,DEFINED,Session,$cacheFactory,$timeout,DTOptionsBuilder, DTColumnDefBuilder) {

//	$scope.label1 = "super";
//	$scope.label2 = "man";
//	$scope.Sum = function(){
//		$scope.sumText = $scope.label1+$scope.label2;
//	}

	$scope.dtColumns = [
        DTColumnDefBuilder.newColumnDef(0).notSortable()
     ];
	$scope.dtOptions = DTOptionsBuilder.newOptions()
	.withOption('lengthChange', false) //검색 출력수
	.withOption('searching', true) //검색 기능
	.withOption('order',[2,'desc'])
	.withOption('pageLength', 15)
	$("#logSearchbox").keyup(function() {
		$('#logTable').dataTable().fnFilter(this.value);
    });

	var startDate = addMonth_yyyyMMddhhmmss(-1);
	$("#searchBarStart").val(startDate.substring(0,4)+"-"+startDate.substring(4,6)+"-"+startDate.substring(6,8));
	$scope.startVal = startDate.substring(0,8);
	var scheduleObj = new dhtmlXCalendarObject("searchBarStart");
	scheduleObj.loadUserLanguage('kr');
	scheduleObj.setSkin("dhx_terrace");
	scheduleObj.setWeekStartDay(7); //일요일부터 시작
	scheduleObj.hideTime();
	$("#searchBarStart").click(function(){
		scheduleObj.show();
		scheduleObj.attachEvent("onClick", function(side,d){
			$scope.startVal = side.toISOString().slice(0,10).replace(/-/g,"");
			scheduleObj.setDateFormat("%Y-%m-%d");
			scheduleObj.hide();
		});
	});

	var endDate = get_yyyyMMddhhmmssSSS();
	$("#searchBarEnd").val(endDate.substring(0,4)+"-"+endDate.substring(4,6)+"-"+endDate.substring(6,8));
	$scope.endVal = endDate.substring(0,8);
	var scheduleObjENd = new dhtmlXCalendarObject("searchBarEnd");
	scheduleObjENd.setDate(new Date(endDate.substring(0,4),Number(endDate.substring(4,6))-1,1));
	scheduleObjENd.loadUserLanguage('kr');
	scheduleObjENd.setSkin("dhx_terrace");
	scheduleObjENd.setWeekStartDay(7); //일요일부터 시작
	scheduleObjENd.hideTime();
	$("#searchBarEnd").click(function(){
		scheduleObjENd.show();
		scheduleObjENd.attachEvent("onClick", function(side,d){
			$scope.endVal = side.toISOString().slice(0,10).replace(/-/g,"");
			scheduleObjENd.setDateFormat("%Y-%m-%d");
			scheduleObjENd.hide();
		});
	});
	getLogLists();

	$scope.logListsTmp = [];
	function getLogLists(){
		$rootScope.loadingStart();
		apiService.gets_logs()
		.then(
				function(data){
					$scope.logLists = data;
					angular.copy($scope.logLists, $scope.logListsTmp);
					filterLogList($("#searchBarStart").val(), $("#searchBarEnd").val());
					$rootScope.loadingStop();
				},
				function(errResponse){
					$rootScope.loadingStop();
					console.log("errResponse gets_logs status : " + errResponse.status);
				}
		);
	}

	$scope.search = function(startVal, endVal){
		filterLogList(startVal, endVal);
	}

	//로그 날짜 별로 담기
	function filterLogList(startVal, endVal){
		var numStartVal = Number(startVal.replace(/-/gi,''));
		var numEndVal = Number(endVal.replace(/-/gi,''));
		$scope.logListsTmp = [];
		for(var i = 0; i<$scope.logLists.length; i++){
			var strCdtTemp = convertDateStringsToDates($scope.logLists[i].cdt);
			var strCdt = strCdtTemp.substring(0,4)+strCdtTemp.substring(5,7)+strCdtTemp.substring(8,10);
			var numCdt = Number(strCdt);
			if(numCdt >= numStartVal && numCdt <= numEndVal){
				$scope.logListsTmp.push($scope.logLists[i]);
			}
		}
		$scope.logLists = $scope.logListsTmp;
	}

	$scope.downloadFile = function(filename){
//		alert(filename);
		apiService.get_log(filename)
		.then(
				function(result){
//					var file = base64ToArrayBuffer(result);
					saveByteArray(filename, result);
				},
				function(errResponse){
					console.log("errResponse get_log status : " + errResponse.status);
				}
		)
	}

	function base64ToArrayBuffer(fileObj){
		var binaryString = $window.atob(fileObj); //decodes a base-64 ecoded string
		var binaryLen = binaryString.length;
	    var bytes = new Uint8Array(binaryLen);
	    for (var i = 0; i < binaryLen; i++) {
	       var ascii = binaryString.charCodeAt(i);
	       bytes[i] = ascii;
	    }
	    return bytes;
	}

	function saveByteArray(reportName, byte) {
	    var blob = new Blob([byte], {type: "text/plain"});
	    var link = document.createElement('a');
	    link.href = window.URL.createObjectURL(blob);
	    var fileName = reportName;
	    link.download = fileName;
	    link.click();
	};


}]);
