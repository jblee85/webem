'use strict';

var user=	{
		userid: "",
		password: "",
		bizid: "kpxdr",
		pid: "pkpxdr",
		authcrc : 0,
		namecard : {
			name:"",
			pos:"",
			depart:"",
			phone:"",
			sphone:	"",
			email:"",
			fax:"",
			addr1:"",
			addr2:"",
			comment:""
			
		},
		auth : {
			authlv : 3, 
			siteids : [],
			devlid : "", 
		
		}/*,
		settdreisms : {
			enable : false, 
			preday : 5,
			h : 9 
		},
		settdreiemail : {
			enable : false, 
			preday : 5,
			h : 9
		}*/
	};


var login=	{
		userid: "",
		password: "",
		pid: "pkpxdr",
		tokens : []
	};

var phone={
		phone1 : null, 
		phone2 : null, 
		phone3 : null, 
};


var validation={
		duplicateCheck : null, 
		passwordCheck : null, 
		smsCertification : null
};

var validationTemp={
		repassword : null, 
		confirm : null
};

