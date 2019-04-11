'use strict';
angular.module('iceApp').controller('dashboard_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','DTOptionsBuilder', 'DTColumnDefBuilder','Session','DEFINED','MODEL','apiService','init','$interval',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,DTOptionsBuilder, DTColumnDefBuilder,Session,DEFINED,MODEL,apiService,init,$interval) {
	var self = this;
	//location info
	$rootScope.main="dashboard";
	$rootScope.parentUrl="dashboard";
	$rootScope.parentName="메인화면";
	$scope.day = $scope.yyyymmdd();
	$scope.dtColumns = [
        DTColumnDefBuilder.newColumnDef(0).notSortable()
     ];

	$scope.dtOptions = DTOptionsBuilder.newOptions()
	.withPaginationType('full_numbers')
	.withOption('bLengthChange',false)
	.withOption('searching', false)
	.withOption('paging', false)
	.withOption('info', false)
	.withLanguage(language)

	$rootScope.intervalDashboard = $interval(intervalF,300000);
	function intervalF(){
		$scope.getDashBoard();
		$scope.getESSMonth();
		$scope.getESSDay($scope.yyyymmdd());
		//콜백 함수
		$scope.getAMI_day(function(result){
			switch(result.devtype) {
			case 3:
				factorial_ami_day(result);
				break;
			case 5:
				factorial_pv_day(result);
				break;
			}
		});
	}
	function pop_view(){
        var id = "";
        for(var j = 1;  j <3; j++){
            id = "divName_"+ j;
            if (document.getElementById(id) == null) {
            	 $interval.cancel(promise);
            	return false;
			}
             var disp = document.getElementById(id).style.display;

             if(disp == "block"){
                  if(j == 1 ) {
                      document.getElementById("divName_1").style.display = "none";
                      document.getElementById("divName_2").style.display = "block";
                      break;
                  }
                   if(j == 2 ) {
                      document.getElementById("divName_1").style.display = "block";
                      document.getElementById("divName_2").style.display = "none";

                      break;
                  }
             }
        }
    }
	$scope.bcodes = MODEL.BCODE;

	 // 정보 조회
    $scope.getDashBoard = function () {
    	apiService.getDashBoard($scope.yyyymmdd())
		.then(
			function(r){
				$scope.dashboard = r[0];
				//amiday
				var amiday = $scope.dashboard.amiday;
				$scope.maxspkwhDay = 0;		//오늘 최대 수요 전력량

				//객체 배열 최대값 구하기
				if(amiday != null){
					$scope.maxspkwhDay = amiday.times.reduce(function(prev, current) {
					    return (prev.apkwh > current.apkwh) ? prev : current
					})
				}else{
					$scope.maxspkwhDay ={};
				}
				if(amiday != null){
					$scope.todaye = $scope.dashboard.amiday.e;
					$scope.ismartSyncTime = $scope.dashboard.amiday.ldt;
					graph(amiday.times);
				}else{
					graph([]);
				}

				//amimonth
				if($scope.dashboard.amimonth != null && $scope.dashboard.amimonth.length !=0){
				var amimonth = $scope.dashboard.amimonth;
				var amimonthX = [];		//amimonth[0]당월,amimonth[1]전월,amimonth[2]전년 동월
				var amimonthY = [];
				$scope.maxspkwh = 0;	//당월 최대 수요 전력량
				$scope.maxTime = 0;		//당월 최대 수요 전력량 사용 시간

				var date = new Date();
				var monthDate = new Date();
				var yearDate = new Date();
				var addMonth = 0;

				if(Number($scope.yyyymmdd().substring(6,8)) < $rootScope.currentSite.rdday){
					addMonth = -1;
				}
				date = new Date(date.setMonth(date.getMonth() + addMonth));
				monthDate = new Date(monthDate.setMonth(monthDate.getMonth() + addMonth));
				yearDate = new Date(yearDate.setMonth(yearDate.getMonth() + addMonth));
				var lastMonthTemp = new Date(monthDate.setMonth(monthDate.getMonth()-1));
				var lastYearTemp = new Date(yearDate.setFullYear(yearDate.getFullYear()-1));
				var nowMonth = $scope.yyyymmdd().substring(0,6);

				nowMonth = $scope.setyyyymmdd(date).substring(0,6);
				var lastMonth = $scope.setyyyymmdd(lastMonthTemp).substring(0,6);
				var lastYear = $scope.setyyyymmdd(lastYearTemp).substring(0,6);

				amimonthX[0] = $rootScope.ts.THIS_MONTH;
				amimonthX[1] = $rootScope.ts.LAST_MONTH;
				amimonthX[2] = $rootScope.ts.LAST_YEAR;
				amimonthY = [0,0,0];

				for(var i in amimonth){
					var amiMonth = amimonth[i].month.toString().substring(0,6);
					if(amiMonth == nowMonth){
						amimonthY[0] = Number((amimonth[i].e/1000).toFixed(2));
						$scope.billkw = amimonth[i].load.billkw;
						$scope.loadMonth = Number(amimonth[i].month.toString().substring(4,6));
						$scope.loadMonthkwh = amimonthY[0];
						$scope.load = amimonth[i].load;
						//TOU 구하기
						var amimonthTOUX = [];
						var amimonthTOUY = [];
						amimonthTOUX[0] = $rootScope.ts.MAXIMUM;
						amimonthTOUX[1] = $rootScope.ts.MEDIUM;
						amimonthTOUX[2] = $rootScope.ts.LIGHT_LOADING;
						amimonthTOUY[0] = Number(($scope.load.toupeakkw/1000).toFixed(2));
						amimonthTOUY[1] = Number(($scope.load.toumidkw/1000).toFixed(2));
						amimonthTOUY[2] = Number(($scope.load.toulowkw/1000).toFixed(2));
						$scope.getmonthTOUChart(amimonthTOUX,amimonthTOUY);
					}else if(amiMonth == lastMonth){
						amimonthY[1] = Number((amimonth[i].e/1000).toFixed(2));
					}else if(amiMonth == lastYear){
						amimonthY[2] = Number((amimonth[i].e/1000).toFixed(2));
					}
				}
				$scope.maxspkwh = 0;
				$scope.maxTime = 0;
				if(amimonth.length != 0){
					$scope.maxspkwh = amimonth[0].load.maxspkwh;
					$scope.maxTime = amimonth[0].load.maxspdt;
				}

				$scope.getmonthPowerChart(amimonthX,amimonthY);

			}
				//sessions
				var todayTimeList = [];		//오늘 현재까지 시간단위 List
				var todayChargeList = [];	//오늘 충방전 값 List
				var todaySOCList = [];		//오늘 SOC 값 List
				$scope.todayCharge = 0;		//오늘 충전 누적값
				$scope.todayDischarge = 0;	//오늘 방전 누적값
				var sessions = $scope.dashboard.sessions==null ? [] : $scope.dashboard.sessions;
				$scope.devlid = sessions.length==0 ? "" : $scope.dashboard.sessions[0].devlid;
				for(var i in sessions){
					for(var j in sessions[i].times){
						if(sessions[i].times[j].dayh.toString().substring(0,8) == $scope.yyyymmdd()){
							if(i != 0){
								if(sessions[i].times[j].dayh.toString() == sessions[i-1].times[sessions[i-1].times.length-1].dayh.toString()){
									todayChargeList[todayChargeList.length-1] = todayChargeList[todayChargeList.length-1] + (sessions[i].times[j].dcckwh - sessions[i].times[j].dcdsckwh)
								}else{
									todayTimeList.push(sessions[i].times[j].dayh.toString().substring(8,10));
									todayChargeList.push(sessions[i].times[j].dcckwh - sessions[i].times[j].dcdsckwh);
								}
							}else{
								todayTimeList.push(sessions[i].times[j].dayh.toString().substring(8,10));
								todayChargeList.push(sessions[i].times[j].dcckwh - sessions[i].times[j].dcdsckwh);
							}

							if(sessions[i].times[j].mins != null && sessions[i].times[j].mins.length != 0){
								var cdt = convertDateStringsToDates(sessions[i].times[j].mins[sessions[i].times[j].mins.length-1].cdt);
								var min = new Date(cdt).getMinutes();
								var minspkw = sessions[i].times[j].mins[sessions[i].times[j].mins.length-1].pkw;
								if(sessions[i].times[j].mins[sessions[i].times[j].mins.length-1].st == 3){
									minspkw = minspkw * -1;
								}
								if(min < 10){
									min = "0"+min;
								}
								todaySOCList.push(sessions[i].times[j].mins[sessions[i].times[j].mins.length-1].soc);
							}
							$scope.todayCharge = $scope.todayCharge + sessions[i].times[j].dcckwh;
							$scope.todayDischarge = $scope.todayDischarge + Math.abs(sessions[i].times[j].dcdsckwh);
						}
					}
				}
				$scope.todayCharge.toFixed(3);
				$scope.todayDischarge.toFixed(3);
				$scope.getSession(todayTimeList,todayChargeList);
				$scope.getSOC(todayTimeList,todaySOCList);
				$scope.getESSMonth();
			},function(errResponse){
				console.error('function getDashBoard - getDashBoard() \n['+ errResponse.status +'] : ' + errResponse.statusText);
			}
		);
	};
	$scope.meterObj = {};
	$scope.pvObj = {};
	var dayInd = 0;
	var monthInd = 0;
	$scope.devtypes = MODEL.DEVSUBTYPE;
	$scope.getAMI_day = function(callback){
		apiService.get_Site()
		.then(
			function(d) {
				$scope.devrids=[];
				$window.sessionStorage["siteInfo"] = JSON.stringify(d);
				setCookie('siteInfo',d);
				for(var i in d.refdevs){
					if(d.refdevs[i].bizid == DEFINED.bizid){
						$scope.devrids.push(d.refdevs[i].devrid);
						$rootScope.currentRid=d.refdevs[i].devrid;
						$window.sessionStorage["rootInfo"] = JSON.stringify($rootScope.currentRid);
						setCookie('rootInfo',JSON.stringify($rootScope.currentRid));
						$rootScope.currentSite=d;
						$window.sessionStorage["siteInfo"] = JSON.stringify($rootScope.currentSite);
						setCookie('siteInfo',JSON.stringify($rootScope.currentSite));
					}
				}
				apiService.gets_DeviceLeafs($scope.devrids)
				.then(
					function(d) {
						try{
							$window.sessionStorage["leafInfo"] = JSON.stringify(d);
							$rootScope.currentLeaf = d;
							setCookie('leafInfo',d);
							for(var i in $rootScope.currentLeaf){
//								if($rootScope.currentLeaf[i].devtype == 3){
									dayInd =0;
									monthInd =0;
									callback($rootScope.currentLeaf[i]);
//								}
							}
						}catch(error){
							console.log(error.message);
						}
					},
					function(errResponse){
						$rootScope.spinStop();
						console.log("errResponse gets_DeviceLeafs status : "+errResponse.status);
					}
				);
			},
			function(errResponse){
				$rootScope.spinStop();
				console.log("errResponse get_Site status : "+errResponse.status);
			}
		);

	}
	$scope.getAMI_day(function(result){
		switch(result.devtype) {
		case 3:
			factorial_ami_day(result);
			break;
		case 5:
			factorial_pv_day(result);
			break;
		case 11:
			$scope.pcsModel = result.devs[0];
			break;
		case 13:
			$scope.designkw = result.devs[0].designkw;
			break;
		}
	});
	//여러개의 ami데이타를 가져오기위한 재귀함수
	function factorial_ami_day(result){
		var temp1 = result.devs[dayInd].devlid;
		apiService.getAMI_day($rootScope.currentRid,result.devs[dayInd].devlid,$scope.yyyymmdd().substring(0,6)+"01",$scope.yyyymmdd())
		.then(
			function(d) {
				var keyName = "";
				for(var i in $scope.devtypes){
					if($scope.devtypes[i].devsubtype == result.devs[dayInd].devsubtype){
						keyName = $scope.devtypes[i].value;
//						$scope.meterObj[keyName] = d;
						break;
					}
				}
				var pv_day_values = [];
				var pv_month_values = [];
				var totalMonthe = 0;
				for(var i in d){
					if(d[i].day == $scope.yyyymmdd()){
						for(var j in d[i].times){
							pv_day_values.push(d[i].times[j].apkwh);
						}
						$scope.meterObj[keyName] = d[i];
					}
					pv_month_values.push(d[i].e);
					totalMonthe += d[i].e;
				}
				var ami = $scope.meterObj[keyName];
				var lastTime = $scope.meterObj[keyName].times[ami.times.length-1];
				var lastmin = lastTime.lps[lastTime.lps.length-1];
				$scope.meterObj[keyName].last = lastmin;
				$scope.meterObj[keyName].month = {e:totalMonthe.toFixed(2)};
				drawSparkline('sparkline_coolingtower_day',pv_day_values);
				drawSparkline('sparkline_coolingtower_month',pv_month_values);
				dayInd++;
				if(dayInd < result.devs.length){
					factorial_ami_day(result);
				}
			  },
	        function(errResponse){
	        	console.log('function getAMI_day() \n['+ errResponse.status +'] : ' + errResponse.statusText);
	        }
		);
	}
	$scope.isPV = false;
	function factorial_pv_day(result){
		var temp1 = result.devs[monthInd].devlid;
		apiService.getPV_day($rootScope.currentRid,result.devs[monthInd].devlid,$scope.yyyymmdd().substring(0,6)+"01",$scope.yyyymmdd())
		.then(
			function(d) {
				var keyName = "";
				for(var i in $scope.devtypes){
					if($scope.devtypes[i].devsubtype == result.devs[monthInd].devsubtype){
						keyName = $scope.devtypes[i].value;
						break;
					}
				}
				var pv_day_values = [];
				var pv_month_values = [];
				var totalMonthe = 0;
				for(var i in d){
					if(d[i].day == $scope.yyyymmdd()){
						for(var j in d[i].times){
							pv_day_values.push(d[i].times[j].hpvkwh);
						}
						$scope.pvObj[keyName] = d[i];
					}
					pv_month_values.push(d[i].e);
					totalMonthe += d[i].e;
				}
				var pv = $scope.pvObj[keyName];
				var lastTime = $scope.pvObj[keyName].times[pv.times.length-1];
				var lastmin = lastTime.mins[lastTime.mins.length-1];
				$scope.pvObj[keyName].last = lastmin;
				$scope.pvObj[keyName].month = {e:totalMonthe};
				drawSparkline('sparkline_pv_day',pv_day_values);
				drawSparkline('sparkline_pv_month',pv_month_values);
				if(lastmin.pvkw == 0){
					$scope.isPV = false;
				}else{
					$scope.isPV = true;
				}
				monthInd++;
				if(monthInd < result.devs.length){
					factorial_pv_day(result);
				}
			  },
	        function(errResponse){
	        	console.log('function getPV_day() \n['+ errResponse.status +'] : ' + errResponse.statusText);
	        }
		);
	}
	$scope.getESSMonth = function(){
		var rddayMonth = $scope.yyyymmdd().substring(0,6);
		if(Number($scope.yyyymmdd().substring(6,8)) < $rootScope.currentSite.rdday){
			var date = new Date();
			var monthDate = new Date();
			var lastMonthTemp = new Date(monthDate.setMonth(monthDate.getMonth()-1));
			$scope.rddayMonth = (lastMonthTemp.getMonth()+1).toString();
			var tempMonth = $scope.rddayMonth;
			if(tempMonth.length < 2){
				tempMonth = "0"+tempMonth;
			}
			var lastMonth = $scope.setyyyymmdd(lastMonthTemp).substring(0,6);
			rddayMonth = lastMonth;
		}
		apiService.gets_EnergyESSModel_month($rootScope.currentRid,$scope.devlid,rddayMonth)
		.then(
			function(d) {
				//search화면에 데이타 주기
				$scope.essMonth=d;
			  },
	        function(errResponse){
	        	console.log('function gets_EnergyESSModel_month() \n['+ errResponse.status +'] : ' + errResponse.statusText);
	        }
		);
	}
	$scope.getSite = function(){
		$rootScope.loadingStart();
		apiService.get_Site()
	  	.then(
	  			function(d) {
	  				try{
	  					$scope.siteModel = d;
	  					$scope.siteModel.addr1 = $scope.siteModel.addr1.replace('|',' ').replace('|',' ');
	  					for(var i in $scope.bcodes){
	  						if($scope.bcodes[i].bcode == $scope.siteModel.bcode){
	  							$scope.siteModel.bcode = $scope.bcodes[i].text.replace('|',' ');
	  						}
	  					}

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
	$scope.getDashBoard();
	$scope.getSite();
	$scope.essDay = {};
	$scope.getESSDay = function(day){
		apiService.gets_EnergyESSDayModel_day($rootScope.currentRid,day)
		.then(
			function(d) {
				//search화면에 데이타 주기
				$scope.essDay=d;
			  },
	        function(errResponse){
	        	console.log('function gets_EnergyESSDayModel_day() \n['+ errResponse.status +'] : ' + errResponse.statusText);
	        }
		);
	}
	$scope.getESSDay($scope.yyyymmdd());
	function setMaga(num){
		var result = 0;
		if(num> 1000 ){
			result =(num / 1000).toFixed(2);
		}else{
			result = num.toFixed(2);
		}
		return result;
	}
	function isMaga(num){
		var result = false;
		if(num > 1000 ){
			result =true
		}
		return result;
	}
	// Draw a sparkline for the #sparkline element
	function drawSparkline(id,x){
		var values = x;
		var chartMin = Math.min.apply(Math, values);
		var chartMax = Math.max.apply(Math, values);
		var chartHeight = '40px';
		var chartWidth = '100%';
		$('#'+id+'').sparkline(x, {
		    type: "line",
		    spotColor: false,
		    height: chartHeight,
		    width: chartWidth,
		    chartRangeMin: chartMin,
		    chartRangeMax: chartMin
		});
	}
	var height = 109;
	// 그래프 생성
	function graph(amiday){
		self.xTime=[]; //시간(분 단위)
		self.spkwDatas=[]; //사용전력량
		for(var i in amiday){
			self.spkwDatas.push(amiday[i].apkwh);
			self.xTime.push(amiday[i].h);
		}
		if(self.spkwDatas[self.spkwDatas.length-1] == 0){
			self.spkwDatas.splice([self.spkwDatas.length-1],1);
		}
		 $('#todayPowerChart').highcharts({
			chart: {
	        	type: 'spline',
	        	backgroundColor:  false ,
	        	animation: true,
	        	zoomType: 'xy',
	        	height:height
		    },
		    title: {
		        text: ''
		    },

		    subtitle: {
		      //  text: 'Source: thesolarfoundation.com'
		    },
		    maxHeight : 300,
		    xAxis: {
		    	/* plotBands: [{ // 구간 설정
		             color: '#F6F6F6',
		             from: Date.UTC(2010, 0, 2),
		             to: Date.UTC(2010, 0, 4)
		         }],*/
		    	labels: {
//		            style: {
//		                color: '#000000'
//		            }
		        },
		        categories: self.xTime,
		        crosshair: true
		    },
		    yAxis: {
		    	title:false,
//		    	labels: {
////		            style: {
////		                color: '#000000'
////		            }
//		        }
//		        title: {
////		        	 text: 'I-SMART  [단위 : kWh]'
//		        	text: 'kWh'
//		        }
		    },
		    legend: {
		    	 enabled: false
		       // layout: 'vertical',
		       // align: 'right',
		        //verticalAlign: 'middle'
		    },
		    plotOptions: {
		    	column: {
		            pointPadding: 0.2,
		            borderWidth: 0
		        }
		    },
		    tooltip: {
					backgroundColor: '#F6F6F6',
				    borderColor: 'black',
				    borderRadius: 10,
				    borderWidth: 3,
				    valueSuffix : " kWh"
	        },
		    series: [
		    {
		    	type: 'spline',//
		        name: 'ISMART',
		        data: self.spkwDatas,
		        color: '#ff3535'
		    }]
		});
	}
	//오늘 ESS 충/방전량
	$scope.getSession = function(x,y){

		Highcharts.chart('essChart',{
			chart: {
				type:'column',
				 height: height ,
				backgroundColor:  false
			},
			title: {
				text:''
			},
			rangeSelector: {
				enabled: false
			},
	    	navigator: {
		        height: 110,
		        backgroundColor:  false,
		        borderColor: '#ff3535'
	    	},
	    	plotOptions: {
	    	      column: {
	    	        negativeColor: 'red',
	    	        threshold: 0,
	    	        dataLabels: {
	    	          enabled: true,
	    	          formatter: function(e) {
	//    	        	  console.log("color param : "+e);
	    	          }
	    	        }
	    	      }
	    	    },
	    	xAxis:{
	    		title:false,
				categories:x
			},
			yAxis:{
	    		title:false
			},
			series:
				[{
					showInLegend: false,
					name: $rootScope.ts.AMOUNT_OUTPUT+'(kW)',
					data: y
//					color: '#ff3535'
				}
			]
		});
	}
	//오늘 SOC
	$scope.getSOC = function(x,y){
		Highcharts.chart('SOCChart',{
			chart: {
				type:'spline',
				height:height,
				backgroundColor:  false
			},
			title: {
				text:''
			},
			rangeSelector: {
				enabled: false
			},
	    	navigator: {
		        height: 110,
		        backgroundColor:  false,
		        borderColor: '#ff3535'
	    	},
	    	xAxis:{
	    		title:false,
				categories:x
			},
			yAxis:{
	    		title:false
			},
			series:
				[{
					showInLegend: false,
					name: '%',
					data: y
				}
			]
		});
	}
	//월 전력 사용량 비교
	$scope.getmonthPowerChart = function(x,y){
	Highcharts.chart('monthPowerChart',{
		chart: {
			type:'bar',
			height:height,
			backgroundColor:  false
		},
		title: {
			text:''
		},
		rangeSelector: {
			enabled: false
		},
    	navigator: {
	        height: 110,
	        backgroundColor:  false,
	        borderColor: '#ff3535'
    	},
    	plotOptions: {
    	      bar: {
    	        negativeColor: 'red',
    	        threshold: 0,
    	        dataLabels: {
    	          enabled: true,
    	          formatter: function(e) {
//    	        	  console.log("color param : "+e);
    	          }
    	        }
    	      },
    	      series: {
    	            dataLabels: {
    	                enabled: true,
    	                align: 'right',
    	                color: '#000000',
    	                x: -10
    	            },
    	            pointPadding: 0.1,
    	            groupPadding: 0
    	        }
    	    },
    	xAxis:{
    		title:false,
			categories:x
		},
		yAxis:{
    		title:false
		},
		series:
			[{
				showInLegend: false,
				name: $rootScope.ts.AMOUNT_OUTPUT+'(MW)',
				data: y
			}
		]
	});
	}
	//월 전력 사용량 비교
	$scope.getmonthTOUChart = function(x,y){
	Highcharts.chart('monthTOUChart',{
		chart: {
			type:'column',
			height:height,
			backgroundColor:  false
		},
		title: {
			text:''
		},
		rangeSelector: {
			enabled: false
		},
    	navigator: {
	        height: 110,
	        backgroundColor:  false,
	        borderColor: '#ff3535'
    	},
    	plotOptions: {
    	      bar: {
    	        negativeColor: 'red',
    	        threshold: 0,
    	        dataLabels: {
    	          enabled: true,
    	          formatter: function(e) {
//    	        	  console.log("color param : "+e);
    	          }
    	        }
    	      },
    	      series: {
    	            dataLabels: {
    	                enabled: false,
    	                align: 'right',
    	                color: '#000000',
    	                x: -10
    	            },
    	            pointPadding: 0.1,
    	            groupPadding: 0
    	        }
    	    },
    	xAxis:{
    		title:false,
			categories:x
		},
		yAxis:{
    		title:false
		},
		series:
			[{
				showInLegend: false,
				name: $rootScope.ts.AMOUNT_OUTPUT+'(MW)',
				data: y
			}
		]
	});
	}

	function gridInfo(grid){
		var gridrst = grid.gridrst;
		var hz = gridrst.hz
		var frq = gridrst.frq
		var dclinkv = grid.dclinkv;

	}

	function modeInfo(mode){
		var result = null
		//제어 모드  (0: CV, 1: CP, 2: CCCV 3: CC 4: CV)
		if(mode ==0){
			result = "CV";
		}else if(mode ==1){
			result = "CP";
		}else if(mode ==2){
			result = "CCCV";
		}else if(mode ==3){
			result = "CC";
		}else if(mode ==4){
			result = "CV";
		}
		return result;
	}

	function pcsInfo(pcs){
		var rst = pcs.rst;
		var hz = rst.hz
		var frq = rst.frq

		var tm = pcs.tm;
		var pkw = pcs.pkw;
		var pf = pcs.pf
		var dcpkw = pcs.dcpkw
		var dca = pcs.dca;
		var dcv = pcs.dcv;

	}

	function batteryInfo(bms){

		var bsc = bms.bsc;
		var dca = bsc.dca;
		var dcv = bsc.dcv;
		var limitca = bsc.limitca;
		var limitdcckw = bsc.limitdcckw;
		var limitdisca = bsc.limitdisca;
		var limitdisckw = bsc.limitdisckw;
		var soc = bsc.soc;
		var soh = bsc.soh;

		var max = bms.max;
		var cellv = max.cellv;
		var moduletm = max.moduletm;
		var moduletmno = max.moduletmno;
		var modulevno = max.modulevno;
		var racktmno = max.racktmno;
		var rackvno = max.rackvno;

		var min = bms.min;
		var cellv = min.cellv; //*System Level Cell Voltage
		var moduletm = min.moduletm;//*system Level Module Temperature
		var moduletmno = min.moduletmno;//Module Number(Location)
		var modulevno = min.modulevno;//Module Number(Location)
		var racktmno = min.racktmno;	//Rack Number(Location)
		var rackvno = min.rackvno;//Rack Number(Location)

		var rackcnt = bms.rackcnt;
	}

	//websocket data 수신부
	$rootScope.$on('websocket',function(event, data){
		$scope.pcs = $scope.dashBoardData.pcs;
		$scope.bms = $scope.dashBoardData.bms;
		$scope.mode = modeInfo($scope.pcs.mode);
		gridInfo($scope.pcs);
		pcsInfo($scope.pcs);
		batteryInfo($scope.bms);
	});
}]);
