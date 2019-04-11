/*예제*/
app.directive('translate', function ($window) {
    return {
        restrict: 'A',
        replace:true,
        transclude: true,
//        require: 'ngModel',
        compile: function (tElement) {
        	return{
        		pre: function preLink(scope, elem){
        			var input = "";
        			
        			
        			elem.html(input);
        		}
        		
        	}
            
        },
//        link:function(scope, elem){
//        	elem.html("dd");
//        },
        scope: {}
//        template:'<td>{{format}}</td>'
    };
});
app.directive('focusOn', function() {
   return function(scope, elem, attr) {
      scope.$on('focusOn', function(e, name) {
        if(name === attr.focusOn) {
          elem[0].focus();
        }
      });
   };
});
app.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeights = newValue.h;
            scope.windowWidths = newValue.w;

            scope.style = function () {
                return {
                    'height': (newValue.h - 100) + 'px',
                        'width': (newValue.w - 100) + 'px'
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
});
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});