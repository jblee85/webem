'use strict';
angular.module('iceApp').controller('list_ctrl',[ '$scope', '$state' , '$window', '$location','$rootScope','AUTH_EVENTS','DTOptionsBuilder', 'DTColumnDefBuilder','Session',
	function($scope, $state, $window, $location, $rootScope,AUTH_EVENTS,DTOptionsBuilder, DTColumnDefBuilder,Session) {
	console.log("list_ctrl");
	console.log(Session.user);
	var self = this;

	self.data=[
		{
		    "id": 860,
		    "firstName": "Superman",
		    "lastName": "Yoda"
		}, {
		    "id": 870,
		    "firstName": "Foo",
		    "lastName": "Whateveryournameis"
		}, {
		    "id": 590,
		    "firstName": "Toto",
		    "lastName": "Titi"
		}, {
		    "id": 803,
		    "firstName": "Luke",
		    "lastName": "Kyle"
		}, {
		    "id": 870,
		    "firstName": "Foo",
		    "lastName": "Whateveryournameis"
		}, {
		    "id": 590,
		    "firstName": "Toto",
		    "lastName": "Titi"
		}, {
		    "id": 803,
		    "firstName": "Luke",
		    "lastName": "Kyle"
		}, {
		    "id": 870,
		    "firstName": "Foo",
		    "lastName": "Whateveryournameis"
		}, {
		    "id": 590,
		    "firstName": "Toto",
		    "lastName": "Titi"
		}, {
		    "id": 803,
		    "firstName": "Luke",
		    "lastName": "Kyle"
		}, {
		    "id": 870,
		    "firstName": "Foo",
		    "lastName": "Whateveryournameis"
		}, {
		    "id": 590,
		    "firstName": "Toto",
		    "lastName": "Titi"
		}, {
		    "id": 803,
		    "firstName": "Luke",
		    "lastName": "Kyle"
		}
	];

	self.dtColumns = [
        DTColumnDefBuilder.newColumnDef(0).notSortable()
     ];

	self.dtOptions = DTOptionsBuilder.newOptions()
	.withPaginationType('full_numbers')
	.withOption('order', [2, 'asc'])
	.withLanguage(language)

//	$("#sidenavToggler").trigger("click");

}]);