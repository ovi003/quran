function menu(){
	var bac;
	var mnu;
	bac = document.getElementById("menu").style;
	mnu = document.getElementById("menu_body").style;
	if(bac.display!="block"&&mnu.display!="block"){
		bac.display="block";
		mnu.display="block";
	}
	else{
		bac.display="none";
		mnu.display="none";
	}
}

function sharebtn(){
	menu();
	window.plugins.socialsharing.shareViaFacebook('Arabic Bangla Quran -উচ্চারণসহ', null /* img */, 'https://play.google.com/store/apps/details?id=com.kutblog.arabicbanglaquran' /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)})
}

function rateappbtn(){
	menu();
	window.location.assign('market://details?id=com.kutblog.arabicbanglaquran');
}

function aboutbtn(){
	menu();
	window.location.assign('about.html');
}

function settingbtn(){
	menu();
	window.location.assign('setting.html');
}