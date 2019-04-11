'use strict';
angular.module('iceApp').controller('settingManagement_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','apiService','DEFINED','Session','$cacheFactory','$timeout','DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,apiService,DEFINED,Session,$cacheFactory,$timeout,DTOptionsBuilder, DTColumnDefBuilder) {

	$scope.dtColumns = [
        DTColumnDefBuilder.newColumnDef(0).notSortable()
     ];
	$scope.dtOptions = DTOptionsBuilder.newOptions()
	.withOption('lengthChange', false) //검색 출력수
	.withOption('searching', true) //검색 기능
	.withOption('order',[1,'asc'])
	.withOption('paging',true)
//	.withOption('scrollY',"700px")
//	.withOption('scrollCollapse',true)
	.withOption('pageLength', 15)
//	$("#translateSearchbox").keyup(function() {
//		$('#translationTable').dataTable().fnFilter(this.value);
//    });
	$scope.isSave = true;
	$scope.selectedrow=0;
	$scope.getSelectrow = function(ind){
		$scope.selectedrow = ind;
	}
	$scope.tsList=[];
	var returnVal = {};
	function getmultiLng(){
		apiService.gets_Language()
    	.then(
    		function(d) {
    			$scope.tsList=[];
    			returnVal = d;
    			var koObj = {};
    			var enObj = {};
    			for(var i in d){
    				if(d[i].data.langtype == 1){
    					koObj = JSON.parse(d[i].data.content);
    				}else if(d[i].data.langtype == 2){
    					enObj = JSON.parse(d[i].data.content);
    				}
    			}
    			//{key:"",ko:"",en:""} List 만들기
    			//중복되는 key는 값을 넣어주고 존재하지않는key는 push
				Object.keys(koObj).forEach(function(val) {
  				  var tempobj = {key:"",ko:"",en:""};
  				  tempobj.key = val;
  				  tempobj.ko = koObj[val];
  				  $scope.tsList.push(tempobj); 
  				});
				Object.keys(enObj).forEach(function(val) {
  				  var tempobj = {key:"",ko:"",en:""};
  				  tempobj.key = val;
  				  tempobj.en = enObj[val];
  				  var isPush = false;
  				  for(var i in $scope.tsList){
  					if($scope.tsList[i].key == val){
  						$scope.tsList[i].en = enObj[val];
  						isPush = false;
  						break;
    				}else{
    					isPush = true;
    				}
  				  }
  				  if(isPush){
  					$scope.tsList.push(tempobj);
  				  }
  				});
    		  },
            function(errResponse){
            	console.log('function getRealtime() \n['+ errResponse.status +'] : ' + errResponse.statusText);
            }
    	);
	}
	$scope.selectAllRow = false;
	$scope.checkAllRow = function (val) {
        if (val) {
            $scope.selectAllRow = true;
        } else {
            $scope.selectAllRow = false;
        }
        angular.forEach($scope.tsList, function (item) {
            item.selected = $scope.selectAllRow;
        });
    };
	
	$scope.addRow = function(){
		$scope.tsList.unshift({key:"",ko:"",en:""});
	}
	$scope.delRows = function(){
		for(var i in $scope.tsList){
			if($scope.tsList[i].selected == true){
				delete $scope.tsList[i];
			}
		}
		$scope.tsList = $scope.tsList.filter(function(e){
			return e != undefined
		});
	}
	$scope.save = function(){
		if($scope.isKeyDupl) {alert("KEY값은 중복될 수 없습니다.");return;}
		if($scope.isKeyEmpty)  {alert("KEY값을 입력해 주세요.");return;}
		var resultList = [];
		var koObj = {};
		var enObj = {};
		for(var i in $scope.tsList){
//			if($scope.tsList[i].ko != ""){
//				koObj[$scope.tsList[i].key] = $scope.tsList[i].ko;
//			}
//			if($scope.tsList[i].en != ""){
//				enObj[$scope.tsList[i].key] = $scope.tsList[i].en;
//			}
			if(!($scope.tsList[i].key == "" && $scope.tsList[i].ko == "" && $scope.tsList[i].en == "")){
				koObj[$scope.tsList[i].key] = $scope.tsList[i].ko;
				enObj[$scope.tsList[i].key] = $scope.tsList[i].en;
			}else{
				console.log("빈값 : "+i);
			}
			
		}
		
		for(var i in returnVal){
			if(returnVal[i].data.langtype == 1){
				returnVal[i].data.content = JSON.stringify(koObj);
			}else if(returnVal[i].data.langtype == 2){
				returnVal[i].data.content = JSON.stringify(enObj);
			}
		}
		
		console.log(returnVal);
		apiService.posts_ConfigESSSchedule(returnVal,21)
    	.then(
    			function(d) {
    				getmultiLng();
    			},
    			function(errResponse){
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
	$scope.temporaryNode = {children:[]};
	$scope.treedata = 
		[
			{ "label" : "레이아웃", "id" : "role1", "children" : [] },
			{ "label" : "대시보드", "id" : "role2", "children" : [] },
			{ "label" : "메뉴구성", "id" : "role3", "children" : [] },
			{ "label" : "다국어", "id" : "role4", "children" : [] }
		];
	
	angular.element(function () {
//		$scope.mytree.currentNode.selected = "selected";
//		$scope.mytree.currentNode.label = "다국어";
		$scope.mytree.selectNodeLabel($scope.treedata[3]);
	});
	$scope.$watch( 'mytree.currentNode', function( newObj, oldObj ) {
	    if( $scope.mytree && angular.isObject($scope.mytree.currentNode) ) {
	        console.log( 'Node Selected!!' );
	        console.log( $scope.mytree.currentNode );
	        if($scope.mytree.currentNode.label == "다국어"){
	        	getmultiLng();
	        }
	    }
	}, false);
	$scope.isKeyDupl = false;
	$scope.isKeyEmpty = false;
	$scope.$watch( 'tsList', function( newObj, oldObj ) {
	    if( $scope.tsList != oldObj) {
	    	$scope.isKeyDupl = false;
	    	$scope.isKeyEmpty = false;
	    	var testObject = {};
	    	var isReturn = false;
	    	$scope.tsList.map(function(item) {
	    	    var itemPropertyName = item['key'];
	    	    if(!(item['ko'] == "" && item['en'] == "")){
	    	    	if(itemPropertyName != ""){
		    	    	if (itemPropertyName in testObject) {
		  	    	      testObject[itemPropertyName].duplicate = true;
		  	    	      item.duplicate = true;
		  	    	      $scope.isKeyDupl = true;
		  	    	      isReturn = true;
		  	    	    }
		  	    	    else {
		  	    	    	if(!isReturn){
		  	    	    		testObject[itemPropertyName] = item;
		  	  	    	      delete item.duplicate;
		  	  	    	      $scope.isKeyDupl = false;
		  	    	    	}
		  	    	      
		  	    	    }
		    	    }else{
		    	    	$scope.isKeyEmpty = true;
		    	    }
	    	    }
	    	    
	    	    
	    	  });
	    }
	}, true);
	
	function getSubMenuItem (subMenuItems, node){
		Array.prototype.remove = function() {
		    var what, a = arguments,
		      L = a.length,
		      ax;
		    while (L && this.length) {
		      what = a[--L];
		      while ((ax = this.indexOf(what)) != -1) {
		        this.splice(ax, 1);
		      }
		    }
		    return this;
		  }
		var current_node = subMenuItems;

	    if (subMenuItems) {
	      for (var i = 0; i < subMenuItems.length; i++) {
	        if (subMenuItems[i].id == node.id) {
	          current_node = current_node.remove(node);
	          console.log('removed')
	         // subMenuItems =current_node
	          return
	          
	        }
	        if(subMenuItems[i].children.length>0){
	        	getSubMenuItem(subMenuItems[i].children,node)
	        }
	      }
	    }
	}
	$scope.mode = "";
	$scope.done = function () {
        /* reset */
    };
    $scope.editChild = function () {
    	$scope.mode = "modify";
    	openEdit($scope.mytree);
    };
    $scope.addChild = function () {
        /* add child */
        if( $scope.temporaryNode.id && $scope.temporaryNode.label ) {
            $scope.mytree.currentNode.children.push( angular.copy($scope.temporaryNode) );
        }
        
        /* reset */
        $scope.temporaryNode.id = "";
        $scope.temporaryNode.label = "";
        $scope.mode = "add";
        openEdit($scope.temporaryNode);
    };
    $scope.deleteChild = function () {
    	getSubMenuItem($scope.treedata, $scope.mytree.currentNode)
    };
    function openEdit (obj){
    	var tempObj = {};
		angular.copy(obj, tempObj);
    	$rootScope.ModalOpen(tempObj, './jsp/modal/edit_setting.jsp','setttingManagement_edit_ctrl');
		$rootScope.modalInstance.result.then(function (val) {
			if($scope.mode == "add"){
				$scope.temporaryNode.id = val.currentNode.id;
	            $scope.temporaryNode.label = val.currentNode.label;
				if( $scope.temporaryNode.id && $scope.temporaryNode.label ) {
		            $scope.mytree.currentNode.children.push( angular.copy($scope.temporaryNode) );
		            $scope.temporaryNode.id = "";
		            $scope.temporaryNode.label = "";
		        }
			}else if($scope.mode == "modify"){
				$scope.mytree.currentNode.label = val.currentNode.label;
			}
			
            
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    }
}]);
app.controller('setttingManagement_edit_ctrl', function($scope, $uibModalInstance, params) {
	$scope.param = params;
    $scope.ok = function() {
    	$uibModalInstance.close($scope.param);
    };
    $scope.cancel = function() {
    	$uibModalInstance.dismiss('cancel');
    };
});