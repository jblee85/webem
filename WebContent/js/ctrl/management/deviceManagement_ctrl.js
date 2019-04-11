'use strict';
angular.module('iceApp').controller('deviceManagement_ctrl',[ '$scope','$state','$rootScope', '$window','$timeout','apiService','DEFINED','MODEL','DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $state, $rootScope,$window,$timeout,apiService,DEFINED,MODEL, DTOptionsBuilder, DTColumnDefBuilder) {
	var self = this;
	$scope.scheduleID = $window.sessionStorage["scheduleid"];
	$scope.devtypeList=[{devtype:null,name:""},{devtype:11,name:"PCS"},{devtype:12,name:"BMS"},{devtype:13,name:"Battery"},{devtype:3,name:"미터기"},{devtype:4,name:"계량기"},{devtype:5,name:"PV"}];
	$scope.hourList=[];
	$scope.hourChart=[];
	$scope.socList = MODEL.SOCMODE;
	$scope.selectedDevrid="";
	$scope.selectedDevtype="";
	$scope.selectedDevlid="";
	$scope.devrids=[];
	$scope.rootList=[];
	$scope.devsubtypeList=MODEL.DEVSUBTYPE;
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
								$scope.getsLeafList($scope.selectedDevrid,true);
//								$scope.getsGroupList($scope.selectedDevrid,true);
							}else{
								if($scope.rootList[0].devrid == undefined) return;
								$scope.getsLeafList($scope.rootList[0].devrid);
//								$scope.getsGroupList($scope.selectedDevrid,true);
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
//					if($scope.groupList.length == 0) return;
//					for(var j in $scope.groupList){
//
//					}

				}
			}
		}
		$scope.isSave=false;
	}
	$scope.getsRoots();
	$scope.leafList = [];
	$scope.leafs = [];
	$scope.leafsDetail={};
	$scope.typeList = {};
	var leafList = [];
	$scope.getsLeafList = function(devrid,isSave){
		if($scope.isSave){
			if(confirm("변경 된 내용을 저장 하시겠습니까?")==true){
				$scope.save();
			}else{
				$scope.isSave=false;
			}
		}else{
			$scope.selectedDevrid = devrid;
			apiService.gets_DeviceLeafs(devrid)
			.then(
				function(d) {
					try{
						$scope.leafList = [];
						$scope.leafsDetail={};
						$scope.typeList = {};
						$scope.leafs = [];
						$scope.groupList = [];
						$scope.leafList = d;
						if(d.length != 0) {
							//TODO 충전/방전을 위해 임시로 세션에 rid를 저장(나중에 삭제)
							for(var i in d){
								for(var j in d[i].devs){
									$scope.leafList[i].devs[j].id=newID();
								}
						    	switch($scope.leafList[i].devtype){
						    	case 11 :
						    		$scope.typeList.pcs = $scope.leafList[i].devs;
						    		break;
						    	case 12 :
						    		$scope.typeList.bms = $scope.leafList[i].devs;
						    		break;
						    	case 13 :
						    		$scope.typeList.battery = $scope.leafList[i].devs;
						    		break;
						    	case 3 :
						    		$scope.typeList.meter = $scope.leafList[i].devs;
						    		break;
						    	case 4 :
						    		$scope.typeList.ismart = $scope.leafList[i].devs;
						    		break;
						    	case 5 :
						    		$scope.typeList.pv = $scope.leafList[i].devs;
						    		break;
						    	}
							}
							//그룹과 leaf 대조하여 새로운 그룹객체 만들기
							for(var i in $scope.rootList){
								if(devrid == $scope.rootList[i].devrid){
									$scope.groupList = $scope.rootList[i].grps;
									if($scope.groupList.length != 0){
										for(var k in $scope.groupList){
											var ii = 0;
											while(ii < 5){
												if(ii > $scope.groupList[k].leafs.length-1){
													$scope.groupList[k].leafs.push({devlid:"",devlname:"",devtype:0});
												}else{
														$scope.groupList[k].leafs[ii].devtype = 0;
												}
												ii++;
											}
										}
									}

								}
							}

							if($scope.groupList.length != 0){
								for(var i in $scope.groupList){
									$scope.groupList[i].leafsObj={pcs:{devtype:0,devlid:null},bms:{devtype:0,devlid:null},battery:{devtype:0,devlid:null},meter:{devtype:0,devlid:null},ismart:{devtype:0,devlid:null},pv:{devtype:0,devlid:null}};
									for(var j in $scope.groupList[i].leafs){
										for(var k in $scope.leafList){
											var exist = false;
											for(var z in $scope.leafList[k].devs){
												if($scope.groupList[i].leafs[j].devlid == $scope.leafList[k].devs[z].devlid){
													$scope.groupList[i].leafs[j].devlid = $scope.leafList[k].devs[z].devlid;
													switch($scope.leafList[k].devtype){
											    	case 11 :
											    		$scope.groupList[i].leafsObj.pcs.devlid = $scope.groupList[i].leafs[j].devlid;
											    		$scope.groupList[i].leafsObj.pcs.devlname = $scope.groupList[i].leafs[j].devlname;
											    		$scope.groupList[i].leafsObj.pcs.devtype = $scope.leafList[k].devtype;
											    		break;
											    	case 12 :
											    		$scope.groupList[i].leafsObj.bms.devlid = $scope.groupList[i].leafs[j].devlid;
											    		$scope.groupList[i].leafsObj.bms.devlname = $scope.groupList[i].leafs[j].devlname;
											    		$scope.groupList[i].leafsObj.bms.devtype = $scope.leafList[k].devtype;
											    		break;
											    	case 13 :
											    		$scope.groupList[i].leafsObj.battery.devlid = $scope.groupList[i].leafs[j].devlid;
											    		$scope.groupList[i].leafsObj.battery.devlname = $scope.groupList[i].leafs[j].devlname;
											    		$scope.groupList[i].leafsObj.battery.devtype = $scope.leafList[k].devtype;
											    		break;
											    	case 3 :
											    		$scope.groupList[i].leafsObj.meter.devlid = $scope.groupList[i].leafs[j].devlid;
											    		$scope.groupList[i].leafsObj.meter.devlname = $scope.groupList[i].leafs[j].devlname;
											    		$scope.groupList[i].leafsObj.meter.devtype = $scope.leafList[k].devtype;
											    		break;
											    	case 4 :
											    		$scope.groupList[i].leafsObj.ismart.devlid = $scope.groupList[i].leafs[j].devlid;
											    		$scope.groupList[i].leafsObj.ismart.devlname = $scope.groupList[i].leafs[j].devlname;
											    		$scope.groupList[i].leafsObj.ismart.devtype = $scope.leafList[k].devtype;
											    		break;
											    	case 5 :
											    		$scope.groupList[i].leafsObj.pv.devlid = $scope.groupList[i].leafs[j].devlid;
											    		$scope.groupList[i].leafsObj.pv.devlname = $scope.groupList[i].leafs[j].devlname;
											    		$scope.groupList[i].leafsObj.pv.devtype = $scope.leafList[k].devtype;
											    		break;
											    	}
													$scope.leafList[k].devs[z].grpname = $scope.groupList[i].grpname;
													$scope.leafList[k].devs[z].grpid = $scope.groupList[i].grpid;
													$scope.groupList[i].leafs[j].devtype = $scope.leafList[k].devtype;

													exist = true
													break;
												}
											}
											if(exist)
												break
										}
									}
								}
							}
						}
						$scope.isSave=false;
						angular.copy($scope.leafList, leafList);
						if(isSave){
							$scope.getsLeafs($scope.selectedID,true);
						}else{
							if($scope.leafList[0] == undefined){
								return;
							}
							$scope.getsLeafs($scope.leafList[0].id);
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
		$scope.isSave=false;

	}
	$scope.getLeafs_type = function(index,type){
		var result = "";
		if($scope.groupList[index].leafs.filter(leaf=>leaf.devtype == type).length != 0){
			result = $scope.groupList[index].leafs.filter(leaf=>leaf.devtype == type)[0].devlid;
		}

		return result;
	}
	$scope.getdevs_type = function(index,type){
		var result = "";
		if($scope.leafList.filter(leaf=>leaf.devtype == type).length != 0){
			result = $scope.leafList.filter(leaf=>leaf.devtype == type).devs;
		}

		return result;
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
		$scope.isSave=false;
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
		$scope.getsLeafList(tempObj.devrid,$scope.isSave);
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
		$scope.getsLeafList($scope.rootList[0].devrid,$scope.isSave);
	}

	$scope.addGroup = function(){
		var tempObj = {};
		var tempInt = 1;
		var tempGroupId = "g"+$scope.yyyymmdd().substring(2,10).toString()+tempInt.toString();
		var rootIndex = 0;
		angular.copy(MODEL.DEVICE.DEVICE_ROOT.grps[0], tempObj);
		tempObj.grpid = "g00000000";
		for(var i in $scope.rootList){
			if($scope.rootList[i].devrid == $scope.selectedDevrid){
				rootIndex = i;
			}
			for(var j in $scope.rootList[i].grps){
				if(tempInt < 10){
					tempGroupId = "g"+$scope.yyyymmdd().substring(2,10).toString()+"0"+tempInt.toString();
				}
				if($scope.rootList[i].grps[j].grpid == tempGroupId){
					tempInt++;
				}
				tempObj.grpid = "g"+$scope.yyyymmdd().substring(2,10).toString()+"0"+tempInt.toString();
			}

		}
		tempObj.leafs = [];
		var templeafsObj = {};
		angular.copy(MODEL.DEVICE.DEVICE_LEAF_DEVTYPE, templeafsObj);
		tempObj.leafsObj = templeafsObj;
		for(var i in MODEL.DEVICE.DEVICE_LEAF_DEVTYPE){
			tempObj.leafs.push({devlid:"",devlname:"",devtype:MODEL.DEVICE.DEVICE_LEAF_DEVTYPE[i].type});
			tempObj.leafsObj[i]={devlid:"",devlname:"",devtype:MODEL.DEVICE.DEVICE_LEAF_DEVTYPE[i].type};
		}
		$scope.groupList.push(tempObj);
//		$scope.rootList[rootIndex].grps.push(tempObj);
		console.log("");
//		$scope.getsLeafList(tempObj,$scope.isSave);
	}
	$scope.addGroupLeaf = function(index,devs,type){
		var tempobj = {};
		tempobj.devs = devs;
		tempobj.type = type;
		tempobj.bizid = DEFINED.bizid;
		tempobj.apiService = apiService;
		$rootScope.ModalOpen(tempobj, './jsp/modal/regist_leaf_group.jsp','deviceManagement_registPCS_ctrl');
		$rootScope.modalInstance.result.then(function (val) {
            //products = selectedItems;
			console.log("dd");
			$scope.scheduleList[index].data.devs = val;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
		console.log("dd");

	}
//	$scope.getTypeList = function(type,devlid){
//		$scope.types = [];
//		for(var i in $scope.typeList[type]){
//			for(var j in $scope.groupList){
//				if(($scope.typeList[type][i].devlid == $scope.groupList[j].leafsObj[type].devlid) && ($scope.typeList[type][i].devlid != devlid)){
//					delete $scope.typeList[type][i];
//					break;
//				}
//			}
//
//		}
//		if($scope.typeList[type].length != 0){
//			$scope.typeList[type] = $scope.typeList[type].filter(function(e){
//				return e != undefined
//			});
//		}
//		console.log("");
//	}
	$scope.delGroup = function(){
		for(var i in $scope.groupList){
			if($scope.groupList[i].selected == true){
				delete $scope.groupList[i];
			}
		}
		$scope.groupList = $scope.groupList.filter(function(e){
			return e != undefined
		});
		var rootIndex = 0;
		$scope.rootList.find(function(e, index){
			if(e.devrid == $scope.selectedDevrid){
				rootIndex = index;
			}
		});
		$scope.rootList[rootIndex].grps = $scope.groupList;
//		for(var i in $scope.rootList[index].grps){
//			if($scope.groupList[i].selected == true){
//				delete $scope.groupList[i];
//			}
//		}
//		if($scope.rootList[rootIndex].grps.length != 0){
//			$scope.rootList[rootIndex].grps = $scope.rootList[rootIndex].grps.filter(function(e){
//				return e != undefined
//			});
//		}

//		if($scope.groupList[0].devrid == undefined) return;
		$scope.selectAllGroup = false;
//		$scope.getsLeafList($scope.groupList[0],$scope.isSave);
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
		$scope.devs={};
		var tempID = newID();
		var tempDevlid = "l00000000";
		var tempObj = {};
		var tempInt = 1;
		var tempLeafId = "l"+$scope.yyyymmdd().substring(2,10).toString()+tempInt.toString();
		angular.copy(MODEL.DEVICE.DEVICE_LEAF_DEVS, $scope.devs);
		for(var i in $scope.leafList){
			for(var j in $scope.leafList[i].devs){
				if(tempInt < 10){
					tempLeafId = "l"+$scope.yyyymmdd().substring(2,10).toString()+"0"+tempInt.toString();
				}
				if($scope.leafList[i].devs[j].devlid == tempLeafId){
					tempInt++;
				}
				tempDevlid = "l"+$scope.yyyymmdd().substring(2,10).toString()+"0"+tempInt.toString();
			}
		}
		//pcs
		if($scope.selectedDevtype == 11){
			$scope.devs.pcs.id = tempID;
			$scope.devs.pcs.devlid = tempDevlid;
			$scope.leafs.push($scope.devs.pcs);
		//bms
		}else if($scope.selectedDevtype == 12){
			$scope.devs.bms.id = tempID;
			$scope.devs.bms.devlid = tempDevlid;
			$scope.leafs.push($scope.devs.bms);
		//battery
		}else if($scope.selectedDevtype == 13){
			$scope.devs.battery.id = tempID;
			$scope.devs.battery.devlid = tempDevlid;
			$scope.leafs.push($scope.devs.battery);
		//전력검침기
		}else if($scope.selectedDevtype == 3){
			$scope.devs.meter.id = tempID;
			$scope.devs.meter.devlid = tempDevlid;
			$scope.leafs.push($scope.devs.meter);
		}else if($scope.selectedDevtype == 4){
			$scope.devs.ismart.id = tempID;
			$scope.devs.ismart.devlid = tempDevlid;
			$scope.leafs.push($scope.devs.ismart);
		//pv
		}else if($scope.selectedDevtype == 5){
			$scope.devs.pv.id = tempID;
			$scope.devs.pv.devlid = tempDevlid;
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
		var leafIndex = 0;
		$scope.leafList.find(function(e, index){
			if(e.id == $scope.selectedID){
				leafIndex = index;
			}
		});
		if($scope.leafList[leafIndex].devs.length != 0){
			$scope.leafList[leafIndex].devs = $scope.leafList[leafIndex].devs.filter(function(e){
				return e != undefined
			});
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
		$state.reload();
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
		        if ($scope.leafsDetail[val] === undefined || $scope.leafsDetail[val] == null) {
		            return false;
		        }
		    }
		}else{
			 return false;
		}

	    return true;
	}

	$scope.pingTest = function(ip,port){
		if(ip == null || ip == ""){
			alert("IP 를 입력해 주세요.");
			return;
		}
		$rootScope.spinStart();
		apiService.get_ping(ip,port)
		.then(
			function(d) {
				try{
					$rootScope.spinStop();
					if(d.result){
						alert("IP 연결 성공");
					}else{
						alert("실패");
					}
				}catch(error){
					console.log(error.message);
					$rootScope.spinStop();
				}
			},
			function(errResponse){
				console.log("errResponse get_schedule status : "+errResponse.status);
				$rootScope.spinStop();
			}
		)
	}
	$scope.dupleGroupID = false;
	$scope.$watch('groupList',function(newVal, oldVal){
		//devlid 중복 체크
		$scope.dupleGroupID = false;
		for(var i in newVal){
			for(var l in newVal[i].leafsObj){
				for(var j in newVal){
					if(i != j){
						for(var z in newVal[j].leafsObj){
							if(j != z){
								if((newVal[i].leafsObj[l].devlid != null) && (newVal[i].leafsObj[l].devlid != "")){
									if((newVal[j].leafsObj[z].devlid != null) && (newVal[j].leafsObj[z].devlid != "")){
										if(newVal[i].leafsObj[l].devlid == newVal[j].leafsObj[z].devlid){
											$scope.dupleGroupID = true;
											return;
										}
									}

								}
							}

						}
					}
				}
			}
		}

	},true);
	$scope.isSave = false;
	$scope.$watch('leafList',function(newVal, oldVal){
		console.log("wahtch : leafList");
		//수정 사항 없을 시 저장 버튼 disable
		if(!angular.equals(leafList, newVal) && $scope.leafList.length != 0 && newVal != undefined){
			$scope.isSave = true;
		}else{
			$scope.isSave = false;
		}


	},true);
	//leaf devlname 바뀔 때 root에 devlname 넣어주기
	$scope.changeDevlname = function(leafs){
		for(var i in $scope.rootList){
			for(var j in $scope.rootList[i].grps){
				if($scope.rootList[i].grps[j].grpid == leafs.grpid){
					for(var z in $scope.rootList[i].grps[j].leafs){
						if($scope.rootList[i].grps[j].leafs[z].devlid == leafs.devlid){
							$scope.rootList[i].grps[j].leafs[z].devlname = leafs.devlname;
						}
					}
				}
			}
		}
	}
	//groupList grpname 바뀔 때 leaf에 group
	$scope.changeGroupname = function(group){
		for(var i in $scope.leafList){
			for(var j in $scope.leafList[i].devs){
				if($scope.leafList[i].devs[j].grpid == group.grpid){
					$scope.leafList[i].devs[j].grpname = group.grpname;
				}
			}
		}
	}
	//저장
	$scope.save = function(){
		try{
		$scope.rootList = JSON.parse(angular.toJson($scope.rootList));
		$scope.leafList = JSON.parse(angular.toJson($scope.leafList));
		if($scope.dupleGroupID) {alert("그룹에 같은 값이 존재 합니다.");return;}
		//웹에서 root row삭제시 enabled=false로 보내기
		var resultRoot = [];
//		return;
		for(var i in $scope.rootList){
			//$$hashKey 삭제
			$scope.rootList = JSON.parse(angular.toJson($scope.rootList));
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
				for(var z in $scope.rootList[i].grps){
					for(var ii in $scope.rootList[i].grps[z].leafs){
						switch($scope.rootList[i].grps[z].leafs[ii].devtype){
				    	case 11 :
				    		$scope.rootList[i].grps[z].leafs[ii] = $scope.rootList[i].grps[z].leafsObj.pcs;
				    		break;
				    	case 12 :
				    		$scope.rootList[i].grps[z].leafs[ii] = $scope.rootList[i].grps[z].leafsObj.bms;
				    		break;
				    	case 13 :
				    		$scope.rootList[i].grps[z].leafs[ii] = $scope.rootList[i].grps[z].leafsObj.battery;
				    		break;
				    	case 3 :
				    		$scope.rootList[i].grps[z].leafs[ii] = $scope.rootList[i].grps[z].leafsObj.meter;
				    		break;
				    	case 4 :
				    		$scope.rootList[i].grps[z].leafs[ii] = $scope.rootList[i].grps[z].leafsObj.ismart;
				    		break;
				    	case 5 :
				    		$scope.rootList[i].grps[z].leafs[ii] = $scope.rootList[i].grps[z].leafsObj.pv;
				    		break;
				    	}
						delete $scope.rootList[i].grps[z].leafs[ii].devtype;
						if($scope.rootList[i].grps[z].leafs[ii].devlid == ""){
							delete $scope.rootList[i].grps[z].leafs[ii];
						}

					}
					if($scope.rootList[i].grps[z].leafs.length != 0){
						$scope.rootList[i].grps[z].leafs = $scope.rootList[i].grps[z].leafs.filter(function(e){
							return e != undefined
						});
					}
					delete $scope.rootList[i].grps[z].leafsObj;
				}

				delete $scope.rootList[i].id;
				delete $scope.rootList[i].selected;
				$scope.rootList[i].rdt = convertDateStringsToDates($scope.rootList[i].rdt);
				resultRoot.push($scope.rootList[i]);
			}
		}
		console.log(resultRoot);
		var resultLeaf = [];
		for(var i in $scope.leafList){
			//$$hashKey 삭제
			$scope.leafList = JSON.parse(angular.toJson($scope.leafList));
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
					delete $scope.leafList[i].devs[j].grpname;
					delete $scope.leafList[i].devs[j].grpid;
					delete $scope.leafList[i].devs[j].selected;
					$scope.leafList[i].devs[j].rdt = convertDateStringsToDates($scope.leafList[i].devs[j].rdt);
				}
				resultLeaf.push($scope.leafList[i]);
			}
			apiService.puts_DeviceLeafs($scope.leafList[i])
			.then(
				function(d) {
					try{
						//저장시 현재 보고있는 기억해서 보여주기 위해 true파라메터를 보낸다.

					}catch(error){
						console.log(error.message);
					}
				},
				function(errResponse){
					console.log("errResponse get_schedule status : "+errResponse.status);
				}
			);
		}
		console.log(resultLeaf);
		apiService.puts_DeviceRoots(resultRoot)
		.then(
			function(d) {
				try{
					console.log(d);
				}catch(error){
					console.log(error.message);
				}
			},
			function(errResponse){
				console.log("errResponse get_schedule status : "+errResponse.status);
			}
		);
		$timeout(function(){
			$scope.isSave = false;
//			$scope.getsRoots(true);
			$scope.getsRoots();
			$rootScope.spinStop();
		},1000);
//			$scope.getsRoots(true);
		}catch(error){
			console.log(error);
			alert("error: "+error);
		}
	}
	$scope.Reflash = function(){
		$rootScope.spinStart();
		apiService.put_pluginReflash(31)
	 	.then(
	 			function(d) {
					try{
						console.log(d);
					}catch(error){
						console.log(error.message);
					}
				},
				function(errResponse){
					console.log("errResponse get_schedule status : "+errResponse.status);
				}
	 	)
	 	//TODO 재가동 완료시 spinstop
	 	$timeout(function(){
			$rootScope.spinStop();
		},1000);
	}
	//timeline불러오기
	function getsTimeline(){
		apiService.gets_Timeline_day($scope.yyyymmdd()-3,$scope.yyyymmdd(),112)
		.then(
			function(d) {
				$scope.essHistoryList = [];
				$scope.essHistoryList = d;
				for(var i in d){
					$scope.essHistoryList[i].data = JSON.parse(d[i].data);
				}
				console.log($scope.essHistoryList);
			},
			function(errResponse){
				console.log("errResponse gets_timeline status : "+errResponse.status);
			}
		);
	}
	getsTimeline();

}]);
app.controller('deviceManagement_registPCS_ctrl', function($scope, $uibModalInstance, params) {
	$scope.params = [];
	$scope.returnVal =[];
	$scope.selectAll=false;
//	$rootScope.uibModalInstance = $uibModalInstance;

	params.apiService.get_Site()
	.then(
		function(d) {
			$scope.devrids=[];
			for(var i in d.refdevs){
				if(d.refdevs[i].bizid == params.bizid){
					$scope.devrids.push(d.refdevs[i].devrid);
				}
			}
			params.apiService.gets_DeviceLeafs($scope.devrids)
			.then(
				function(d) {
					try{
						//TODO 충전/방전을 위해 임시로 세션에 rid를 저장(나중에 삭제)
						$scope.params=[];
						if(d.length != 0){
							for(var i in d){
								if(d[i].devtype == params.type){
									$scope.params=d[i];
//									$scope.params[i].selected = false;
									for(var j in params.devs){
										if($scope.params.devs[j].devlid == params.devs){
											$scope.params.devs[j].selected = true;
										}
									}
								}
							}
						}else{
							$scope.params.devs=[];
						}

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

	$scope.checkAll = function () {
        if ($scope.selectAll) {
            $scope.selectAll = true;
        } else {
            $scope.selectAll = false;
        }
        angular.forEach($scope.params, function (item) {
            item.selected = $scope.selectAll;
        });
    };
    $scope.checkSelectPCS = function(index){
//    	$scope.params[index].selected = $scope.params[index].selected ? false:true;
    	$scope.PCSList.push($scope.params.devs[index].selected);
    }
    $scope.ok = function() {
    	for(var i in $scope.params.devs){
			if($scope.params.devs[i].selected == true){
				$scope.returnVal.push({devlname:$scope.params.devs[i].devlname,devrid:$scope.params.devrid,devlid:$scope.params.devs[i].devlid});
			}
		}
    	$uibModalInstance.close($scope.returnVal);
    };

    $scope.cancel = function() {
    	$uibModalInstance.dismiss('cancel');
    };
});