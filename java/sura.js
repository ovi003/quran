document.addEventListener("online", onOnline, false);
window.onload = function(){
	
	document.getElementById("back_btn").onclick = turanbackbtn;
	document.getElementById("menu_btn").onclick = menu;
	document.getElementById("menu").onclick = menu;
	document.getElementById("hold_overlay").onclick = holdmenu;
	document.getElementById("share_btn").onclick = sharebtn;
	document.getElementById("rateapp_btn").onclick = rateappbtn;
	document.getElementById("about_btn").onclick = aboutbtn;
	document.getElementById("setting_btn").onclick = settingbtn;
};

document.addEventListener("DOMContentLoaded", turan);
document.addEventListener("DOMContentLoaded", details);

function GetUrlValue(VarSearch){
	var SearchString = window.location.search.substring(1);
	var VariableArray = SearchString.split('&');
	for(var i = 0; i < VariableArray.length; i++){
		var KeyValuePair = VariableArray[i].split('=');
		if(KeyValuePair[0] == VarSearch){
			return KeyValuePair[1];
		}
	}
};
	
function turan(){
	myVarone = setInterval(function (){
	if(GetUrlValue('name')==1||GetUrlValue('name')==9){document.getElementById('bismillah').style.display='none';}
	u = "data/xl/sura"+GetUrlValue('name')+".xml";
	xmlDoc=loadXMLDoc(u);
	a=xmlDoc.getElementsByTagName("parabic");
	b=xmlDoc.getElementsByTagName("pbangla");
	c=xmlDoc.getElementsByTagName("tbangla");
	for (i=0;i<a.length;i++){
		parabic = a[i].childNodes[0].nodeValue;
		pbangla = b[i].childNodes[0].nodeValue;
		tbangla = c[i].childNodes[0].nodeValue;
		
		var x = document.createElement("div");
		x.setAttribute("id", "parabic");
		x.setAttribute("class", "parabic");
		var id = 1 + i;
		var parabic = parabic.replace("[sajdah]","<img class='sajdah' src='data/icon/sajdah.png'>");
		x.innerHTML=("<p id='"+id+"' class='add_event'>"+parabic+"</p>");
		document.getElementById('wrapper').appendChild(x);
		
		xxx = localStorage.getItem('xxx');
		if(xxx=='pbangla'||xxx=='all'||xxx==null){
			var x = document.createElement("div");
			x.setAttribute("id", "pbangla");
			x.setAttribute("class", "pbangla");
			for(k=1;k<=30;k++){
				var pbangla=pbangla.replace("[and]","<span style='font-family:kutmj;'>&</span>");
				var pbangla=pbangla.replace("[Ú]","<span style='font-family:kutmj;'>Ú</span>");
				var pbangla=pbangla.replace("Ȥ","<span style='font-family:kutmj;'>Ú</span>");
				var pbangla=pbangla.replace("[Ü]","<span style='font-family:kutmj;'>Ü</span>");
				var pbangla=pbangla.replace("[~]","<span style='font-family:kutmj;'>~</span>");
				var pbangla=pbangla.replace("[˜ ]","<span style='font-family:kutmj;'>˜ </span>");
				var pbangla=pbangla.replace("[˜]","<span style='font-family:kutmj;'>˜ </span>");
			};
			var id = 1 + i;
			x.innerHTML=("<p id='"+id+"' class='add_event'>"+id+".&nbsp;"+pbangla+"</p>");
			document.getElementById('wrapper').appendChild(x);
		};
		if(xxx=='tbangla'||xxx=='all'||xxx==null){
			var x = document.createElement("div");
			x.setAttribute("id", "tbangla");
			x.setAttribute("class", "tbangla");
			for(k=1;k<=20;k++){
				var tbangla=tbangla.replace("[and]","&");
				var tbangla=tbangla.replace("­","Ā");
			};
			var id = 1 + i;
			x.innerHTML=("<p id='"+id+"' class='add_event'>"+id+".&nbsp;"+tbangla+"</p>");
			document.getElementById('wrapper').appendChild(x);
		};
	document.getElementById('loading-popup').style.display='none';
	};
	
	document.getElementById('sub_header_ayas_number').innerHTML=id;
	if (GetUrlValue('res')>0) {
		window.location.assign("#"+GetUrlValue('res'));
	};
	
	var buttons = document.getElementsByClassName('add_event');
	for (var k = 0; k < buttons.length; k++){
	buttons[k].addEventListener("mousedown", start, false);
	buttons[k].addEventListener("touchstart", start, false);
	buttons[k].addEventListener("click", click, false);
	buttons[k].addEventListener("mouseout", cancel, false);
	buttons[k].addEventListener("touchend", cancel, false);
	buttons[k].addEventListener("touchleave", cancel, false);
	buttons[k].addEventListener("touchcancel", cancel, false);
	};
	clearInterval(myVarone);
	}, 1000);
};

var longpress = false;
var presstimer = null;

function cancel() {
    if(presstimer !== null) {
        clearTimeout(presstimer);
    }
};

function click() {
    if(presstimer !== null) {
        clearTimeout(presstimer);
    }
	var name = GetUrlValue('name');
	var doit = this.id;
	localStorage.setItem('pause_page', "sura");
	localStorage.setItem('pause_sura', name);
	localStorage.setItem('pause_ayas', doit);
	window.plugins.toast.showShortBottom("Resume Added:"+name+","+doit);
    if(longpress) {
        return false;
    }
    
    
};

function start() {
var doit = this.id;
    longpress = false;
        
    presstimer = setTimeout(function() {
		
		holdmenu();
		
		document.getElementById("selected_ayas").innerHTML=("{ "+doit+" }");
		localStorage.setItem("hold", doit);
		var i=0;
		while(++i){
			var sura = localStorage.getItem("sura"+i);
			if(sura==null){
				break;
			}
			else{
				var suraayas = sura.split(",");
				var name = GetUrlValue('name');
				if(suraayas[0]==name&&suraayas[1]==doit){
					document.getElementById("b_add").style.display='none';
					document.getElementById("b_remove").style.display='block';
					localStorage.setItem("global", i);
					break;
				}
			}
		}
		
        longpress = true;
    }, 800);
    
    return false;
};

function details(){
	var name = GetUrlValue('name');
	document.getElementById("sub_header_sura_number").innerHTML = name;
	document.getElementById("sub_header_center_suraname").innerHTML = names[name-1].replace("[and]","&");
}
function holdmenu(){
	var bac;
	var mnu;
	bac = document.getElementById("hold_overlay").style;
	mnu = document.getElementById("hold_menu").style;
	if(bac.display!="block"&&mnu.display!="block"){
		bac.display="block";
		mnu.display="block";
	}
	else{
		bac.display="none";
		mnu.display="none";
		bookmarkreset();
	}
}
function addbookmarks(){
	var name=GetUrlValue('name');
	var last_bookmarked_item = localStorage.getItem('last_bookmarked_item');
	if(last_bookmarked_item==null){
		localStorage.setItem("last_bookmarked_item","1");
		var hold = localStorage.getItem('hold');
		var kaisar = (name+","+hold);
		localStorage.setItem("sura1",kaisar);
	}
	else{
		var name=GetUrlValue('name');
		var hold = localStorage.getItem('hold');
		var last_bookmarked_item = localStorage.getItem('last_bookmarked_item');
		var last_bookmarked_item = (last_bookmarked_item-1)+2;
		localStorage.setItem("last_bookmarked_item",last_bookmarked_item);
		var kaisar = (name+","+hold);
		var kaisar2 = ("sura"+last_bookmarked_item);
		localStorage.setItem(kaisar2,kaisar);
	}
	document.getElementById('hold_overlay').style.display='none';
	document.getElementById('hold_menu').style.display='none';
}
function removebookmarks(){
	var kk = localStorage.getItem("global");
	var kk = ("sura"+kk);
	localStorage.setItem(kk,"0,0");
	document.getElementById('hold_overlay').style.display='none';
	document.getElementById('hold_menu').style.display='none';
	bookmarkreset();
}

function bookmarkreset(){
	document.getElementById("b_add").style.display='block';
	document.getElementById("b_remove").style.display='none';
}

function turanbackbtn(){
	if((document.getElementById("menu").style.display)=="block"){
		menu();
	}
	else if((document.getElementById("hold_overlay").style.display)=="block"){
		holdmenu();
	}
	else if(GetUrlValue('back')=="fav"){
		navigator.app.backHistory();
	}
	else if(GetUrlValue('back')=="bookmark"){
		window.location.assign("bookmark.html");
	}
	else{
		window.location.assign("index.html#vfour_ul_li"+GetUrlValue('name'));
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
		x = xmlDoc.getElementsByTagName("sura");
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
