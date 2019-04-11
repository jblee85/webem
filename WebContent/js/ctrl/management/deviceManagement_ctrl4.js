'use strict';
angular.module('iceApp').controller('deviceManagement_ctrl',[ '$scope','$state','$rootScope', '$window','apiService','MODEL','DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $state, $rootScope,$window,apiService,MODEL, DTOptionsBuilder, DTColumnDefBuilder) {
	var self = this;
	$scope.scheduleID = $window.sessionStorage["scheduleid"];
	$scope.devtypeList=[{devtype:null,name:""},{devtype:11,name:"PCS"},{devtype:12,name:"BMS"},{devtype:13,name:"Battery"},{devtype:4,name:"검침기"},{devtype:14,name:"PV"}];
	$scope.hourList=[];
	$scope.hourChart=[];

	$scope.test = function(){
//		$rootScope.loadingStart();
	}
	$scope.selectedDevrid="";
	$scope.selectedGroupid="";
	$scope.selectedDevtype="";
	$scope.selectedDevlid="";
	$scope.devrids=[];
	$scope.rootList=[];
//	$scope.devrids=[];
	var rootList = [];
	$scope.getsRoots = function(isSave){
		apiService.get_Site()
		.then(
			function(d) {
				$scope.devrids=[];
				for(var i in d.refdevs){
					$scope.devrids.push(d.refdevs[i].devrid);
				}
				apiService.gets_DeviceRoots($scope.devrids)
				.then(
					function(d) {
						try{
							//TODO 충전/방전을 위해 임시로 세션에 rid를 저장(나중에 삭제)
							$scope.rootList=[];
							$scope.rootList = d;
							angular.copy($scope.rootList, rootList);
							if(isSave){
								$scope.getsGroupList($scope.selectedDevrid,true);
							}else{
								if($scope.rootList[0].devrid == undefined) return;
								$scope.getsGroupList($scope.rootList[0].devrid);
							}

//							$window.sessionStorage["rid"] = d[0].devrid;
						}catch(error){
							console.log(error.message);
						}
					},
					function(errResponse){
						console.log("errResponse get_schedule status : "+errResponse.status);
					}
				);
			},
			function(errResponse){
				console.log("errResponse get_schedule status : "+errResponse.status);
			}
		);

	}
	$scope.groupList = [];
	$scope.getsGroupList = function(devrid,isSave){
		$scope.selectedDevrid = devrid;
		if($scope.isSave){
			if(confirm("변경 된 내용을 저장 하시겠습니까?")==true){
				$scope.save();
			}
		}else{
			for(var i in $scope.rootList){
				if(devrid == $scope.rootList[i].devrid){
					$scope.groupList = $scope.rootList[i].grps;

				}
			}
		}
	}

	$scope.getsRoots();
	$scope.leafList = [];
	$scope.leafs = [];
	$scope.leafsDetail={};
	var leafList = [];
	$scope.groupLeafList = [];
	$scope.getsLeafList = function(group,isSave){
		if($scope.isSave){
			if(confirm("변경 된 내용을 저장 하시겠습니까?")==true){
				$scope.save();
			}
		}else{
			apiService.gets_DeviceLeafs($scope.selectedDevrid)
			.then(
				function(d) {
					try{
						if(d.length != 0) {
							//TODO 충전/방전을 위해 임시로 세션에 rid를 저장(나중에 삭제)
							$scope.leafList = [];
							$scope.leafList = d;

							for(var i in d){
								for(var j in d[i].devs){
									$scope.leafList[i].devs[j].id=newID();
									for(var z in group.leafs){
										if(group.leafs[z].devlid == $scope.leafList[i].devs[j].devlid){
											$scope.groupLeafList.push($scope.leafList[i]);
										}
									}

								}
							}
//							angular.copy($scope.leafList, $scope.groupLeafList);
							if(isSave){
//								$scope.getsLeafs($scope.selectedDevtype,true);
								$scope.getsLeafs($scope.selectedID,true);
							}else{
//								$scope.getsLeafs($scope.leafList[0].devtype);
								if($scope.leafList[0].id == undefined) return;
								$scope.getsLeafs($scope.groupLeafList[0].id);
							}
						}else{
							$scope.leafList = [];
							$scope.leafs = [];
							$scope.leafsDetail={};
						}

					}catch(error){
						console.log(error.message);
					}
				},
				function(errResponse){
					console.log("errResponse get_schedule status : "+errResponse.status);
				}
			);
		}

	}
	$scope.getsLeafs = function(id,isSave){
		$scope.leafs=[];
		$scope.selectedID = id;
		for(var i in $scope.leafList){
			if($scope.leafList[i].id == id){
				if($scope.leafList[i].devs == ""){
					$scope.leafList[i].devs = [];
				}
				$scope.selectedDevtype = $scope.leafList[i].devtype;
				$scope.leafs = $scope.leafList[i].devs;
			}
		}
		if(isSave){
			$scope.getsLeafsDetail($scope.selectedDevlid);
		}else{
			if($scope.leafs.length == 0) return;
			$scope.getsLeafsDetail($scope.leafs[0].id);

		}
	}

	$scope.getsLeafsDetail = function(id){
		$scope.leafsDetail={};
		$scope.selectedDevlid = id;
		for(var i in $scope.leafList){
			for(var j in $scope.leafList[i].devs){
				if($scope.leafList[i].devs[j].id == id){
					$scope.leafsDetail = $scope.leafList[i].devs[j];
				}
			}

		}
	}
	$scope.addRoot = function(){
		var tempObj = {};
		var tempInt = 1;
		var tempRid = "r"+$scope.yyyymmdd().substring(2,10).toString()+tempInt.toString();

		angular.copy(MODEL.DEVICE.DEVICE_ROOT, tempObj);
		tempObj.devrid = "r00000000";
		for(var i in $scope.rootList){
			if(tempInt < 10){
				tempRid = "r"+$scope.yyyymmdd().substring(2,10).toString()+"0"+tempInt.toString();
			}
			if($scope.rootList[i].devrid == tempRid){
				tempInt++;
			}
			tempObj.devrid = "r"+$scope.yyyymmdd().substring(2,10).toString()+"0"+tempInt.toString();
		}

		$scope.rootList.push(tempObj);
		$scope.getsGroupList(tempObj.devrid,$scope.isSave);
	}
	$scope.delRoot = function(){
//		for(var i in $scope.rootList){
//			if($scope.rootList[i].selected == true){
//				delete $scope.rootList[i];
//			}
//		}
//		$scope.rootList = $scope.rootList.filter(function(e){
//			return e != undefined
//		});
		for(var i in $scope.rootList){
			if($scope.rootList[i].selected == true){
				$scope.rootList[i].enabled = false;
			}
		}
		if($scope.rootList[0].devrid == undefined) return;
		$scope.selectAllRoot = false;
		$scope.getsGroupList($scope.rootList[0].devrid,$scope.isSave);
	}

	$scope.addGroup = function(){
		var tempObj = {};
		var tempInt = 1;
		var tempGroupId = "g"+$scope.yyyymmdd().substring(2,10).toString()+tempInt.toString();

		angular.copy(MODEL.DEVICE.DEVICE_ROOT.grps[0], tempObj);
		tempObj.grpid = "g00000000";
		for(var i in $scope.rootList){
			if(tempInt < 10){
				tempGroupId = "g"+$scope.yyyymmdd().substring(2,10).toString()+"0"+tempInt.toString();
			}
			if($scope.rootList[i].devrid == tempGroupId){
				tempInt++;
			}
			tempObj.grpid = "g"+$scope.yyyymmdd().substring(2,10).toString()+"0"+tempInt.toString();
		}

		$scope.groupList.push(tempObj);
		console.log("");
		$scope.getsLeafList(tempObj,$scope.isSave);
	}
	$scope.delGroup = function(){
		for(var i in $scope.groupList){
			if($scope.groupList[i].selected == true){
				delete $scope.groupList[i];
			}
		}
		$scope.groupList = $scope.groupList.filter(function(e){
			return e != undefined
		});
		if($scope.groupList[0].devrid == undefined) return;
		$scope.selectAllGroup = false;
		$scope.getsLeafList($scope.groupList[0],$scope.isSave);
	}

	$scope.addLeaf = function(){
		var tempObj = {};
		angular.copy(MODEL.DEVICE.DEVICE_LEAF, tempObj);
		tempObj.id = newID();
		$scope.leafList.push(tempObj);
		$scope.getsLeafs(tempObj.id);
	}
	$scope.delLeaf = function(index){
//		for(var i in $scope.leafList){
//			if($scope.leafList[i].selected == true){
//				delete $scope.leafList[i];
//			}
//		}
//		$scope.leafList = $scope.leafList.filter(function(e){
//			return e != undefined
//		});
		for(var i in $scope.leafList){
			if($scope.leafList[i].selected == true){
				$scope.leafList[i].enabled = false;
			}
		}
		if($scope.leafList[0].id == undefined) return;
		$scope.selectAllLeaf = false;
		$scope.getsLeafs($scope.leafList[0].id);
	}
	$scope.addLeafs = function(){
		var tempID = newID();
		$scope.devs = [];
		angular.copy(MODEL.DEVICE.DEVICE_LEAF_DEVS, $scope.devs);
		//pcs
		if($scope.selectedDevtype == 11){
			$scope.devs.pcs.id = tempID;
			$scope.leafs.push($scope.devs.pcs);
		//bms
		}else if($scope.selectedDevtype == 12){
			$scope.devs.bms.id = tempID;
			$scope.leafs.push($scope.devs.bms);
		//battery
		}else if($scope.selectedDevtype == 13){
			$scope.devs.battery.id = tempID;
			$scope.leafs.push($scope.devs.battery);
		//전력검침기
		}else if($scope.selectedDevtype == 4){
			$scope.devs.ismart.id = tempID;
			$scope.leafs.push($scope.devs.ismart);
		//pv
		}else if($scope.selectedDevtype == 21){
			$scope.devs.pv.id = tempID;
			$scope.leafs.push($scope.devs.pv);
		}
		$scope.getsLeafsDetail(tempID);
	}
	$scope.delLeafs = function(index){
		for(var i in $scope.leafs){
			if($scope.leafs[i].selected == true){
				delete $scope.leafs[i];
			}
		}
		if($scope.leafs.length != 0){
			$scope.leafs = $scope.leafs.filter(function(e){
				return e != undefined
			});
		}
		$scope.selectAllLeafs = false;
		console.log("delLeafs : ");
	}
	//초기화
	$scope.reset = function(){
		$scope.getsRoots();
	}
	$scope.checkAllRoot = function () {
        if ($scope.selectAllRoot) {
            $scope.selectAllRoot = true;
        } else {
            $scope.selectAllRoot = false;
        }
        angular.forEach($scope.rootList, function (item) {
            item.selected = $scope.selectAllRoot;
        });
    };
    $scope.checkAllGroup = function () {
        if ($scope.selectAllGroup) {
            $scope.selectAllGroup = true;
        } else {
            $scope.selectAllGroup = false;
        }
        angular.forEach($scope.groupList, function (item) {
            item.selected = $scope.selectAllGroup;
        });
    };
    $scope.checkAllLeaf = function () {
        if ($scope.selectAllLeaf) {
            $scope.selectAllLeaf = true;
        } else {
            $scope.selectAllLeaf = false;
        }
        angular.forEach($scope.leafList, function (item) {
            item.selected = $scope.selectAllLeaf;
        });
    };
    $scope.checkAllLeafs = function () {
        if ($scope.selectAllLeafs) {
            $scope.selectAllLeafs = true;
        } else {
            $scope.selectAllLeafs = false;
        }
        angular.forEach($scope.leafs, function (item) {
            item.selected = $scope.selectAllLeafs;
        });
    };
	$scope.check = function(val){
		if(Object.keys($scope.leafsDetail).length != 0){
			for (var key in $scope.leafsDetail) {
		        if ($scope.leafsDetail[val] === undefined) {
		            return false;
		        }
		    }
		}else{
			 return false;
		}

	    return true;
	}

	$scope.isSave = false;
	$scope.$watch('leafList',function(newVal, oldVal){
		console.log("wahtch : leafList");
		//수정 사항 없을 시 저장 버튼 disable
//		if(!angular.equals(leafList, newVal) && $scope.leafList.length != 0 && newVal != undefined){
//			$scope.isSave = true;
//		}else{
//			$scope.isSave = false;
//		}


	},true);
	//저장
	$scope.save = function(){
		try{
		$scope.rootList = JSON.parse(angular.toJson($scope.rootList));
		$scope.leafList = JSON.parse(angular.toJson($scope.leafList));

//		for(var i in $scope.rootList){
//			var exist = false;
//			for(var j in rootList){
//				if($scope.rootList[i].id == rootList[j].id){
//					rootList[j].enabled = false;
//				}
//			}
//			if(!exist){
//				delete $scope.rootList[i];
//			}
//			delete $scope.rootList[i].id;
//			delete $scope.rootList[i].selected;
//			$scope.rootList[i].rdt = convertDateStringsToDates($scope.rootList[i].rdt);
//		}
		//웹에서 root row삭제시 enabled=false로 보내기
		var resultRoot = [];
		for(var i in $scope.rootList){
			var exist = false;
			for(var j in rootList){
				if($scope.rootList[i].id == rootList[j].id){
					exist = true;
					break;
				}else{
					if(!$scope.rootList[i].enabled){
						exist = false;
					}else{
						exist = true;
					}
				}
			}
			if(exist){
				delete $scope.rootList[i].id;
				delete $scope.rootList[i].selected;
				$scope.rootList[i].rdt = convertDateStringsToDates($scope.rootList[i].rdt);
				resultRoot.push($scope.rootList[i]);
			}
		}
		console.log(resultRoot);
		var resultLeaf = [];
		for(var i in $scope.leafList){
			var exist = false;
			for(var j in leafList){
				if($scope.leafList[i].id == leafList[j].id){
					exist = true;
					break;
				}else{
					if(!$scope.leafList[i].enabled){
						exist = false;
					}else{
						exist = true;
					}
				}
			}
			if(exist){
				delete $scope.leafList[i].id;
				delete $scope.leafList[i].selected;
				$scope.leafList[i].rdt = convertDateStringsToDates($scope.leafList[i].rdt);
				for(var j in $scope.leafList[i].devs){
					delete $scope.leafList[i].devs[j].id;
					delete $scope.leafList[i].devs[j].selected;
					$scope.leafList[i].devs[j].rdt = convertDateStringsToDates($scope.leafList[i].devs[j].rdt);
				}
				resultLeaf.push($scope.leafList[i]);
			}
		}
		console.log(resultLeaf);
//		apiService.puts_DeviceRoots($scope.rootList)
//		.then(
//			function(d) {
//				try{
////					$scope.getsRoots(true);
//					console.log(d);
//				}catch(error){
//					console.log(error.message);
//				}
//			},
//			function(errResponse){
//				console.log("errResponse get_schedule status : "+errResponse.status);
//			}
//		);

//			apiService.puts_DeviceLeafs($scope.leafList[i])
//			.then(
//				function(d) {
//					try{
//						//저장시 현재 보고있는 기억해서 보여주기 위해 true파라메터를 보낸다.
//						$scope.getsRoots(true);
//					}catch(error){
//						console.log(error.message);
//					}
//				},
//				function(errResponse){
//					console.log("errResponse get_schedule status : "+errResponse.status);
//				}
//			);
			$scope.getsRoots(true);
		}catch(error){
			console.log(error);
			alert("error: "+error);
		}
	}

}]);
