'use strict';
angular.module('iceApp').controller('settingManagement_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','apiService','DEFINED','Session','$cacheFactory','$timeout','DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,apiService,DEFINED,Session,$cacheFactory,$timeout,DTOptionsBuilder, DTColumnDefBuilder) {

//	$scope.dtColumns = [
//        DTColumnDefBuilder.newColumnDef(0).notSortable()
//     ];
//	$scope.dtOptions = DTOptionsBuilder.newOptions()
//	.withOption('lengthChange', false) //검색 출력수
//	.withOption('searching', true) //검색 기능
//	.withOption('order',[2,'desc'])
//	.withOption('pageLength', 15)
//	$("#logSearchbox").keyup(function() {
//		$('#logTable').dataTable().fnFilter(this.value);
//    });
	$scope.temporaryNode = {children:[]}
//	$scope.treedata = 
//		[
//			{ "label" : "User", "id" : "role1", "children" : [
//				{ "label" : "subUser1", "id" : "role11", "children" : [] },
//				{ "label" : "subUser2", "id" : "role12", "children" : [
//					{ "label" : "subUser2-1", "id" : "role121", "children" : [
//						{ "label" : "subUser2-1-1", "id" : "role1211", "children" : [] },
//						{ "label" : "subUser2-1-2", "id" : "role1212", "children" : [] }
//					]}
//				]}
//			]},
//			{ "label" : "Admin", "id" : "role2", "children" : [] },
//			{ "label" : "Guest", "id" : "role3", "children" : [] }
//		];	 
	$scope.treedata = 
		[
			{ "label" : "레이아웃", "id" : "role1", "children" : []},
			{ "label" : "대시보드", "id" : "role2", "children" : [] },
			{ "label" : "메뉴구성", "id" : "role3", "children" : [] }
		];	 
	$scope.$watch( 'abc.currentNode', function( newObj, oldObj ) {
	    if( $scope.abc && angular.isObject($scope.abc.currentNode) ) {
	        console.log( 'Node Selected!!' );
	        console.log( $scope.abc.currentNode );
	    }
	}, false);
	
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
	function getSubMenuItem (subMenuItems, node){
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