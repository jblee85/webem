'use strict';

function display_c(){
	var refresh=1000; // Refresh rate in milli seconds
	var mytime=setTimeout('display_ct()',refresh)
}

function display_ct() {
	var monthNames = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ];
	var dayEngNames= ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
	var dayKorNames= ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]
	var strcount
	var x = new Date()
	var x1= x.getFullYear()+"."+monthNames[x.getMonth()] + "." + x.getDate()+" "+dayKorNames[x.getDay()];
	var x2 = x.getHours( )+ ":"+ ( x.getMinutes() < 10 ? "0" : "" )+ x.getMinutes()+ ":" + ( x.getSeconds() < 10 ? "0" : "" ) + x.getSeconds();

	document.getElementById('ct').innerHTML = x1;
	document.getElementById('ct1').innerHTML = x.getHours( );
	document.getElementById('ct2').innerHTML = ( x.getMinutes() < 10 ? "0" : "" )+ x.getMinutes();
	document.getElementById('ct3').innerHTML = ( x.getSeconds() < 10 ? "0" : "" ) + x.getSeconds();
	var tt=display_c();
}