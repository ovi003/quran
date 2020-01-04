document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("online", onOnline, false);
function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
	document.addEventListener("menubutton", onMenuKeyDown, false);
    window.plugins.insomnia.keepAwake();
	
	var notificationOpenedCallback = function(jsonData) {console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));};
	window.plugins.OneSignal.init("a3a5ffc0-7c54-45b5-9099-afb1c8cf8589",{googleProjectNumber: "433345548057"},notificationOpenedCallback);
	window.plugins.OneSignal.enableInAppAlertNotification(false);
	if(localStorage.getItem("alarm")==null||localStorage.getItem("alarm")==""||localStorage.getItem("alarm")=="undefined"){
		localStorage.setItem("alarm", "6:30");
	}
	if(localStorage.getItem("alarm2")==null||localStorage.getItem("alarm2")==""||localStorage.getItem("alarm2")=="undefined"||localStorage.getItem("alarm2")=="true"){
		scheduleDaily();
		localStorage.setItem("alarm2", "false");
	}
}


function onMenuKeyDown() {
    menu();
}

function onBackKeyDown() {
   turanbackbtn();
}

function onOnline(){
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			myFunction(xhttp);
		}
	};
	xhttp.open("GET", "https://rawgit.com/kutblog/arabicbanglaquran/master/ad.xml", true);
	xhttp.send();
	function myFunction(xml) {
		var x, xmlDoc, txt; 
		xmlDoc = xml.responseXML;
		x = xmlDoc.getElementsByTagName("home");
		txt = x[0].childNodes[0].nodeValue;
		if(txt=="true"){
			initApp();
		}
	}
}


var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
	admobid = { // for Android
		banner: 'ca-app-pub-8830348509321532/2355250407',
		interstitial: 'ca-app-pub-8830348509321532/5308716803'
	};
}
function initApp() {
	if (AdMob) {
		AdMob.createBanner(
		{
			adId : admobid.banner,
			position : AdMob.AD_POSITION.BOTTOM_CENTER,
			autoShow : true
		}
		);
		AdMob.prepareInterstitial(
		{
			adId: admobid.interstitial,
			autoShow: true,
			isTesting: false
		}
		);
	}
}