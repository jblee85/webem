'use strict';
angular.module('iceApp').controller('dashboard_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','DTOptionsBuilder', 'DTColumnDefBuilder','Session','DEFINED','MODEL','apiService','init','$interval',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,DTOptionsBuilder, DTColumnDefBuilder,Session,DEFINED,MODEL,apiService,init,$interval) {
	var self = this;
	//location info
	$rootScope.main="dashboard";
	$rootScope.parentUrl="dashboard";
	$rootScope.parentName="메인화면";
//	$scope.connection();
	//TODO contract불러와서 ismartid 매핑해주기.
	$scope.ismartid = "0237893446";
	$scope.day = $scope.yyyymmdd();
	$scope.dtColumns = [
        //DTColumnBuilder.newColumn(0).notSortable()
        DTColumnDefBuilder.newColumnDef(0).notSortable()
     ];

	$scope.dtOptions = DTOptionsBuilder.newOptions()
	.withPaginationType('full_numbers')
	.withOption('bLengthChange',false)
	.withOption('searching', false)
	.withOption('paging', false)
	.withOption('info', false)
	.withLanguage(language)

	$rootScope.intervalDashboard = $interval(intervalF,900000);
	function intervalF(){
		$scope.getDashBoard();
		$scope.getESSMonth();
		$scope.getESSDay($scope.yyyymmdd());
		$scope.getAMI_day();
//		console.log("인터벌");
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
//				console.log(r[0]);
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
					graph(amiday.times);
				}else{
					graph([]);
				}

				//amimonth
				var amimonth = $scope.dashboard.amimonth==null ? [] : $scope.dashboard.amimonth;
				var amimonthX = [];		//amimonth[0]당월,amimonth[1]전월,amimonth[2]전년 동월
				var amimonthY = [];
				$scope.maxspkwh = 0;	//당월 최대 수요 전력량
				$scope.maxTime = 0;		//당월 최대 수요 전력량 사용 시간

				var date = new Date();
				var monthDate = new Date();
				var yearDate = new Date();
				var lastMonthTemp = new Date(monthDate.setMonth(monthDate.getMonth()-1));
				var lastMonth = lastMonthTemp.getFullYear().toString()+(lastMonthTemp.getMonth()+1).toString();
				var lastYearTemp = new Date(yearDate.setFullYear(yearDate.getFullYear()-1));
				var lastYear = lastYearTemp.getFullYear().toString()+(lastYearTemp.getMonth()+1).toString();
//				amimonthX[0] = date.getFullYear().toString().substring(2,4)+"년"+(date.getMonth()+1).toString()+"월";
//				amimonthX[1] = lastMonth.substring(2,4)+"년"+lastMonth.substring(4,6)+"월";
//				amimonthX[2] = lastYear.substring(2,4)+"년"+lastYear.substring(4,6)+"월";
				amimonthX[0] = $rootScope.ts.THIS_MONTH;
				amimonthX[1] = $rootScope.ts.LAST_MONTH;
				amimonthX[2] = $rootScope.ts.LAST_YEAR;
				amimonthY = [0,0,0];

				for(var i in amimonth){
					var amiMonth = amimonth[i].month.toString().substring(0,6);
					if(amiMonth == $scope.yyyymmdd().substring(0,6)){
//						amimonthX[0] = amimonth[i].month.toString().substring(2,4)+"년"+amimonth[i].month.toString().substring(4,6)+"월";
						amimonthY[0] = Number((amimonth[i].e/1000).toFixed(2));
						$scope.billkw = amimonth[i].load.billkw;
					}else if(amiMonth == lastMonth){
						amimonthY[1] = Number((amimonth[i].e/1000).toFixed(2));
					}else if(amiMonth == lastYear){
						amimonthY[2] = Number((amimonth[i].e/1000).toFixed(2));
					}
//					$scope.maxTime = amimonth[0].load.maxspdt.substring(11,16);
				}
				$scope.maxspkwh = 0;
				$scope.maxTime = 0;
				if(amimonth.length != 0){
					$scope.maxspkwh = amimonth[0].load.maxspkwh;
					$scope.maxTime = amimonth[0].load.maxspdt;
				}

				$scope.getmonthPowerChart(amimonthX,amimonthY);
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
	var tempMeter = {};
	var tempMeterList = [];
	$scope.meterDevice = {};
	$scope.devtypes = MODEL.DEVSUBTYPE;
	$scope.getAMI_day = function(){
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
							var ind = 0;
							for(var i in $rootScope.currentLeaf){
								if($rootScope.currentLeaf[i].devtype == 3){
									ind = i;
									$scope.meterDevice =$rootScope.currentLeaf[i];
									for(var j in $rootScope.currentLeaf[i].devs){
										var temp1 = $rootScope.currentLeaf[i].devs[j].devlid;
										console.log("devlid : "+temp1);
										apiService.getAMI_day($rootScope.currentRid,$rootScope.currentLeaf[i].devs[j].devlid,$scope.yyyymmdd(),$scope.yyyymmdd())
										.then(
											function(d) {
												//search화면에 데이타 주기
												tempMeter = d;
												tempMeterList.push(d[0]);
												console.log(tempMeterList);
											  },
									        function(errResponse){
									        	console.log('function getRealtime() \n['+ errResponse.status +'] : ' + errResponse.statusText);
									        }
										);
									}
								}
							}
						}catch(error){
							console.log(error.message);
						}
					},
					function(errResponse){
						$rootScope.spinStop();
						console.log("errResponse get_schedule status : "+errResponse.status);
					}
				);
			},
			function(errResponse){
				$rootScope.spinStop();
				console.log("errResponse get_schedule status : "+errResponse.status);
			}
		);
		setTimeout(function() {
			for(var i in $scope.meterDevice.devs){
				for(var j in tempMeterList){
					if($scope.meterDevice.devs[i].devlid == tempMeterList[j].devlid){
						for(var z in $scope.devtypes){
							if($scope.devtypes[z].devsubtype == $scope.meterDevice.devs[i].devsubtype){
								var keyName = $scope.devtypes[z].value;
								$scope.meterObj[keyName] = tempMeterList[j];
								break;
							}
						}
						break;
					}
				}
			}
			console.log($scope.meterObj);
			}, 1000);
	}
	$scope.getAMI_day();
	$scope.getESSMonth = function(){
		apiService.gets_EnergyESSModel_month($rootScope.currentRid,$scope.devlid,$scope.yyyymmdd().substring(0,6))
		.then(
			function(d) {
				//search화면에 데이타 주기
				$scope.essMonth=d;
			  },
	        function(errResponse){
	        	console.log('function getRealtime() \n['+ errResponse.status +'] : ' + errResponse.statusText);
	        }
		).then(
			function() {
//				graph(self.lpdata);
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
	        	console.log('function getRealtime() \n['+ errResponse.status +'] : ' + errResponse.statusText);
	        }
		).then(
			function() {
//				graph(self.lpdata);
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

	//15분 데이터 조회
	$scope.getRealtime = function () {
	var ismartid = $scope.ismartid;
	var day = $scope.yyyymmdd();
	var type = $scope.type;

		self.xTime=[]; //시간(분 단위)
		self.spkwDatas=[]; //사용전력량 List

		apiService.getIsmart(ismartid,day)
		.then(
			function(d) {
				//search화면에 데이타 주기
				self.lpdata=d;
				for(var i in d){
						self.spkwDatas.push(d[i].spkw);
						self.xTime.push(d[i].cdt.substring(11,16));
				}
				if(self.lpdata[self.lpdata.length].spkw == 0){
					self.lpdata.splice([self.lpdata.length],1);
				}
				graph(self.lpdata)
			  },
	        function(errResponse){
	        	console.log('function getRealtime() \n['+ errResponse.status +'] : ' + errResponse.statusText);
	        }
		).then(
			function() {
				graph(self.lpdata);
			}
		);
	}
//	$scope.getRealtime();
	// 그래프 생성
	function graph(amiday){
		self.xTime=[]; //시간(분 단위)
		self.spkwDatas=[]; //사용전력량 Lis
		for(var i in amiday){
			self.spkwDatas.push(amiday[i].apkwh);
			self.xTime.push(amiday[i].h);
		}
		if(self.spkwDatas[self.spkwDatas.length-1] == 0){
			self.spkwDatas.splice([self.spkwDatas.length-1],1);
		}
		var height= $("#todayPowerChart").height();
		var width= $("#todayPowerChart").width();
		 $('#todayPowerChart').highcharts({
			chart: {
	        	type: 'spline',
	        	backgroundColor:  false ,
	        	animation: true,
	        	zoomType: 'xy',
	        	//width:width,
	        	//height:height
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
					name: '출력량(kW)',
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
				name: '출력량(kW)',
				data: y
			}
		]
	});
	}
	//스케줄 조회
//	$scope.get_chedule = function () {
//
//		apiService.get_ConfigESSSchedule_enable(3)
//		.then(
//			function(d) {
//				cheduleList(d.schedule.data.times);
//			  },
//	        function(errResponse){
//	        	console.log('function get_chedule() \n['+ errResponse.status +'] : ' + errResponse.statusText);
//	        }
//		).then(
//			function() {
//			}
//		);
//	}
//	$scope.get_chedule();
	function cheduleList(chedule){
		var line = "";
		if (chedule != null) {

			var times = chedule.data.times;


			var hhmmss = $scope.hhmmss();
			var yyyymmdd = $scope.yyyymmdd();
			var yyyy = yyyymmdd.substring(0,4);
			var MM = yyyymmdd.substring(4,6);
			var dd = yyyymmdd.substring(6,8);
			var hh = hhmmss.substring(0,2);
			var mm = hhmmss.substring(2,4);
			var date = MM+"/"+dd+"/"+yyyy
			var date1 =date +" "+hh+":"+mm

			var length =  times.length;
			$.each(times, function( i, v ) {
				var now = "before";

				var v1=times[i-1];
				if (typeof v1 == 'undefined') {
					v1 = times[length-1];
				}
				var v2=times[i+1];
				if (typeof v2 == 'undefined') {
					v2 = times[0];
				}
				var date2 = date +" "+v.hour+":"+v.min
				var date3 = date +" "+v2.hour+":"+v2.min
/*				if((Date.parse(date2) < Date.parse(date1))){
					if((Date.parse(date1) < Date.parse(date3))){
						now = "now blink";
						//이전
						line += '<tr class="before">';
						line += '	<td>'+ ((v1.hour) < 10 ? "0":"") + (v1.hour)+':'+((v1.min) < 10 ? "0":"") + (v1.min)+'</td>';
						//line += '	<td>'+ v1.hour+':'+v1.min+'</td>';
						line += '	<td>'+$scope.configCodeSign(v1.cmd)+'</td>';
						line += '	<td>'+v1.kw+'</td>';
						line += '	<td>kWh</td>';
						line += '</tr>';

						//현재
						line += '<tr class="'+now+'">';
						line += '	<td>'+ ((v.hour) < 10 ? "0":"") + (v.hour)+':'+((v.min) < 10 ? "0":"") + (v.min)+'</td>';
						//line += '	<td>'+ v.hour+':'+v.min+'</td>';
						line += '	<td>'+$scope.configCodeSign(v.cmd)+'</td>';
						line += '	<td>'+v.kw+'</td>';
						line += '	<td>kWh</td>';
						line += '</tr>';

						//다음
						line += '<tr class="after">';
						line += '	<td>'+ ((v2.hour) < 10 ? "0":"") + (v2.hour)+':'+((v2.min) < 10 ? "0":"") + (v2.min)+'</td>';
						//line += '	<td>'+ ((v.hour+1) < 10 ? "0":"") + (v.hour+1)+':'+((v.min+1) < 10 ? "0":"") + (v.min+1)+' ~ '+((v2.hour+1) < 10 ? "0":"") + (v2.hour+1)+':'+((v2.min+1) < 10 ? "0":"") + (v2.min+1)+'</td>';
						//line += '	<td>'+ v2.hour+':'+v2.min+'</td>';
						line += '	<td>'+$scope.configCodeSign(v2.cmd)+'</td>';
						line += '	<td>'+v2.kw+'</td>';
						line += '	<td>kWh</td>';
						line += '</tr>';
					}
				}*/


				line += '<tr class="">';
				line += '	<td style="text-align: center;">'+ ((v.hour) < 10 ? "0":"") + (v.hour)+':'+((v.min) < 10 ? "0":"") + (v.min)+'</td>';
				//line += '	<td>'+ v.hour+':'+v.min+'</td>';
				line += '	<td>'+$scope.configCodeString(v.kw)+'</td>';
				line += '	<td>'+Math.abs(v.kw)+'</td>';
				line += '	<td>kW</td>';
				line += '</tr>';

			});
		}else{
			line += '<tr class="now blink">';
			line += '	<td colspan="4"  style="text-align: center;">There is no schedule.</td>';
			line += '</tr>';
		}
		$("#tbody_ched").html(line);
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

		//var mode = bms.mode;
		//var a = mode.a;
		//var kw = mode.kw;
		//var st = mode.st;

		var rackcnt = bms.rackcnt;
	}

	//운전 제어 이력 가져오기
	function getControlHistory(){
		apiService.gets_Timeline()
		.then(
			function(d) {
				$scope.essHistoryList = [];
				$scope.essHistoryList = d;

				for(var i in d){
					$scope.essHistoryList[i].data = JSON.parse(d[i].data);
				}

//				console.log($scope.essHistoryList);
			},
			function(errResponse){
				console.log("errResponse gets_timeline status : "+errResponse.status);
			}
		);
	}
	getControlHistory();
	//websocket data 수신부
	$rootScope.$on('websocket',function(event, data){
		$scope.ismartid = "0237893446";
		$scope.pcs = $scope.dashBoardData.pcs;
		$scope.bms = $scope.dashBoardData.bms;
		$scope.mode = modeInfo($scope.pcs.mode);
		gridInfo($scope.pcs);
		pcsInfo($scope.pcs);
		batteryInfo($scope.bms);
	});
}]);
