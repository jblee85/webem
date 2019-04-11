    angular.module('iceApp.translation', []).factory('translation',['$rootScope','$http','$q',function($rootScope,$http,$q){
    	
//    	this.getLanguage = function($scope, $cookies) {
//
//    		var lang = $cookies.get('lang') || 'ko';
//    		var ko = {
//    			"langselect" : "언어 선택"	
//    		};
//    		var us = {
//    			"langselect" : "language Select"	
//    		};
//    		if(lang == 'ko'){
//    			$rootScope.translation = ko;
//    		}else if(lang == 'us'){
//    			$rootScope.translation = us;
//    		}
//		    $rootScope.lang = lang;  
//		    
//    	};
    	
    	return{
    		getLanguage:function($scope){
//    			var lang = $cookies.get('lang') || 'ko';
    			var lang = getCookie('lang') || 'ko';
//    			var lang = 'ko';
        		var ko = {
        			"langselect" : "언어 선택"	
        		};
        		var us = {
        			"langselect" : "Language Select"	
        		};
        		if(lang == 'ko'){
        			$rootScope.translation = ko;
        		}else if(lang == 'us'){
        			$rootScope.translation = us;
        		}
    		    $rootScope.lang = lang;  
    		}
    	}
    	
    
    	
    }]);
