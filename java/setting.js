document.addEventListener("online", onOnline, false);
if(localStorage.getItem("alarm")==null||localStorage.getItem("alarm")==""||localStorage.getItem("alarm")=="undefined"){
		localStorage.setItem("alarm", "6:30");
}
window.onload = function(){
	document.getElementById("c1").onclick = changetranslation;
	document.getElementById("c2").onclick = changetranslation;
	document.getElementById("c3").onclick = dataclearstatus;
	document.getElementById("c4").onclick = dataclearstatus;
	document.getElementById("c5").onclick = dataclearstatus;
	document.getElementById("c6").onclick = dataclearstatus;
	document.getElementById("data_clear_btn").onclick = clear;
	document.getElementById("back_btn").addEventListener("click", turanbackbtn, false);
	document.getElementById("dialog_overlay").addEventListener("click", function() {clear(0);}, false);
	document.getElementById("cyes").addEventListener("click", function() {clear(1);}, false);
	document.getElementById("cno").addEventListener("click", function() {clear(0);}, false);
	document.getElementById("share_btn").onclick = sharebtn;
	document.getElementById("rateapp_btn").onclick = rateappbtn;
	document.getElementById("about_btn").onclick = aboutbtn;
	document.getElementById("setting_btn").onclick = settingbtn;
	
};

document.addEventListener("DOMContentLoaded", translationload);
document.addEventListener("DOMContentLoaded", timeinputupdate);

function clear(z){
	var doverlay = document.getElementById("dialog_overlay").style;
	var dconfirm = document.getElementById("dialog_confirm").style;
	if(z==1){
		dataclear();
		location.reload();
	}
	else if(z==0){
		doverlay.display = "none";
		dconfirm.display = "none";
	}
	else{
		doverlay.display = "block";
		dconfirm.display = "block";
	}
}


function translationload(){
	var xxx = localStorage.getItem('xxx');
	var c1 = document.getElementById("c1");
	var c2 = document.getElementById("c2");
	if(xxx=="pbangla"){
		c1.checked = true;
		c2.checked = false;
	}
	if(xxx=="tbangla"){
		c1.checked = false;
		c2.checked = true;
	}
	if(xxx=="all"||xxx==null){
		c1.checked = true;
		c2.checked = true;
	}
}

function changetranslation(){
	var c1 = document.getElementById("c1").checked;
	var c2 = document.getElementById("c2").checked;
	if(c1==true&&c2==false){
		localStorage.setItem("xxx", "pbangla");
	}
	if(c1==false&&c2==true){
		localStorage.setItem("xxx", "tbangla");
	}
	if(c1==true&&c2==true){
		localStorage.setItem("xxx", "all");
	}
	if(c1==false&&c2==false){
		document.getElementById(this.id).checked = true;
	}
}

function dataclearstatus(){
	var c3 = document.getElementById("c3").checked;
	var c4 = document.getElementById("c4").checked;
	var c5 = document.getElementById("c5").checked;
	var c6 = document.getElementById("c6").checked;
	if(c3==false&&c4==false&&c5==false&&c6==false){
		document.getElementById(this.id).checked = true;
	}
}
function dataclear(){
	var c3 = document.getElementById("c3").checked;
	var c4 = document.getElementById("c4").checked;
	var c5 = document.getElementById("c5").checked;
	var c6 = document.getElementById("c6").checked;
	if(c3==true){
		for(i=1;i<=114;i++){
			localStorage.setItem("fav"+i, "0");
			localStorage.removeItem("fav"+i);
		}
	}
	if(c4==true){
		var i = 0;
		while(++i){
			if(localStorage.getItem("sura"+i)!=null){
				localStorage.removeItem("sura"+i);
			}
			else{
				break;
			}
		}
		localStorage.removeItem("last_bookmarked_item");
	}
	if(c5==true){
		localStorage.removeItem("pause_page");
	}
	if(c6==true){
		localStorage.removeItem("xxx");
	}
}

function turanbackbtn(){
	var doverlay = document.getElementById("dialog_overlay").style;
	if(doverlay.display=="block"){
		clear(0);
	}else{
		navigator.app.backHistory();
	}
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
		x = xmlDoc.getElementsByTagName("setting");
		txt = x[0].childNodes[0].nodeValue;
		if(txt=="true"){
			initApp();
		}
	}
}

var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        interstitial: 'ca-app-pub-8830348509321532/5308716803'
    };
}
function initApp() {
    if (AdMob) {
		AdMob.prepareInterstitial(
		{
			adId: admobid.interstitial,
			autoShow: true,
			isTesting: false
		}
		);
    }
}

function timeinputupdate(){
	var time = document.getElementById("time");
	var alarm = localStorage.getItem("alarm");
	if(alarm!=null||alarm!=""){
		var newonlyTime = alarm.split("-")[0];
		var pmam = alarm.split("-")[1];
		var kkk = newonlyTime.split(":");
		if(pmam=="PM"&&kkk[0]<12){kkk[0]=Number(kkk[0])+12;}
		if(pmam=="AM"&&kkk[0]==12){kkk[0]=Number(kkk[0])-12;}
		if(kkk[0]<=9&&kkk[0]>=0){var tur = "0"+kkk[0]+":"+kkk[1];}
		else{var tur = kkk[0]+":"+kkk[1];}
		time.value = tur;
	}
}

function showTime() {
	var time = document.getElementById("time");
	var hrs = time.value.split(":")[0];
    var mins = time.value.split(":")[1];
    var newTime = ampm(hrs, mins);
	localStorage.setItem("alarm", newTime);
	cordova.plugins.notification.local.clearAll(function() {}, this);
	scheduleDaily();
	window.plugins.toast.showShortBottom("Reminder set successfully");
}

function ampm(hrs, mins) {
   return ( hrs % 12 || 12 ) + ":" + mins + (( hrs >= 12 ) ? "-PM" : "-AM" );
}

