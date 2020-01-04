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

var paras = [/*["sura,...","start-end,..."]*/["1,2","0-7,0-141"],["2","141-252"],["2,3","252-286,0-92"],["3,4","92-200,0-23"],["4","23-147"],["4,5","147-176,0-81"],["5,6","81-120,0-110"],["6,7","110-165,0-87"],["7,8","87-206,0-40"],["8,9","40-75,0-92"],["9,10,11","92-129,0-109,0-5"],["11,12","5-123,0-52"],["12,13,14","52-111,0-43,0-52"],["15,16","0-99,0-128"],["17,18","0-111,0-74"],["18,19,20","74-110,0-98,0-135"],["21,22","0-112,0-78"],["23,24,25","0-118,0-64,0-20"],["25,26,27","20-77,0-227,0-55"],["27,28,29","55-93,0-88,0-45"],["29,30,31,32,33","45-69,0-60,0-34,0-30,0-30"],["33,34,35,36","30-73,0-54,0-45,0-27"],["36,37,38,39","27-83,0-182,0-88,0-31"],["39,40,41","31-75,0-85,0-46"],["41,42,43,44,45","46-54,0-53,0-89,0-59,0-37"],["46,47,48,49,50,51","0-35,0-38,0-29,0-18,0-45,0-30"],["51,52,53,54,55,56,57","30-60,0-49,0-62,0-55,0-78,0-96,0-29"],["58,59,60,61,62,63,64,65,66","0-22,0-24,0-13,0-14,0-11,0-11,0-18,0-12,0-12"],["67,68,69,70,71,72,73,74,75,76,77","0-30,0-52,0-52,0-44,0-28,0-28,0-20,0-56,0-40,0-31,0-50"],["78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114","0-40,0-46,0-42,0-29,0-19,0-36,0-25,0-22,0-17,0-19,0-26,0-30,0-20,0-15,0-21,0-11,0-8,0-8,0-19,0-5,0-8,0-8,0-11,0-11,0-8,0-3,0-9,0-5,0-4,0-7,0-3,0-6,0-3,0-5,0-4,0-5,0-6"]];

function turan(){
	myVarone = setInterval(function (){
		
		var url_para = GetUrlValue('para')-1;
		var para = paras[url_para];
		var para_suras = para[0].split(",");
		var para_startend = para[1].split(",");
		for(i=0;i<para_suras.length;i++){
			var nam=names[para_suras[i]-1].replace("[and]","&");
			var para_startend_final = para_startend[i].split("-");
			if(Number(para_startend_final[0])==0){
				var x = document.createElement("div");
				x.setAttribute("id", "sub_header");
				x.innerHTML=('<table><tr><td id="sub_header_left"><div id="sub_header_left_btn"><div id="sub_header_sura_number"></div></div></td><td id="sub_header_center"><p id="sub_header_center_suraname">'+nam+'</p></td><td id="sub_header_right"><div id="sub_header_right_btn"><div id="sub_header_ayas_number"></div></div></td></tr></table>');
				document.getElementById('wrapper').appendChild(x);
				if(para_suras[i]!=1&&para_suras[i]!=9){
					var x = document.createElement("img");
					x.setAttribute("id", "bismillah");
					x.setAttribute("src", "data/icon/bismillah.png");
					x.setAttribute("style", "margin:auto;display:block;width:220px;padding:10px;background-color:white;");
					x.innerHTML=nam+"-"+para_suras[i];
					document.getElementById('wrapper').appendChild(x);
				}
			}
			
		
		var xxx = localStorage.getItem('xxx');
		u = "data/xl/sura"+para_suras[i]+".xml";
		xmlDoc=loadXMLDoc(u);
		a=xmlDoc.getElementsByTagName("parabic");
		b=xmlDoc.getElementsByTagName("pbangla");
		c=xmlDoc.getElementsByTagName("tbangla");
		for (k=Number(para_startend_final[0]);k<Number(para_startend_final[1]);k++){
			parabic = a[k].childNodes[0].nodeValue;
			pbangla = b[k].childNodes[0].nodeValue;
			tbangla = c[k].childNodes[0].nodeValue;
			
			var x = document.createElement("div");
			x.setAttribute("id", "parabic");
			x.setAttribute("class", "parabic");
			var id = para_suras[i]+","+(k-1+2)+","+GetUrlValue('para');
			var parabic = parabic.replace("[sajdah]","<img class='sajdah' src='data/icon/sajdah.png'>");
			x.innerHTML=("<p id='"+id+"' class='add_event'>"+parabic+"</p>");
			document.getElementById('wrapper').appendChild(x);
			
			xxx = localStorage.getItem('xxx');
			if(xxx=='pbangla'||xxx=='all'||xxx==null){
				var x = document.createElement("div");
				x.setAttribute("id", "pbangla");
				x.setAttribute("class", "pbangla");
				for(s=1;s<=30;s++){
					var pbangla=pbangla.replace("[and]","<span style='font-family:kutmj;'>&</span>");
					var pbangla=pbangla.replace("[Ú]","<span style='font-family:kutmj;'>Ú</span>");
					var pbangla=pbangla.replace("Ȥ","<span style='font-family:kutmj;'>Ú</span>");
					var pbangla=pbangla.replace("[Ü]","<span style='font-family:kutmj;'>Ü</span>");
					var pbangla=pbangla.replace("[~]","<span style='font-family:kutmj;'>~</span>");
					var pbangla=pbangla.replace("[˜ ]","<span style='font-family:kutmj;'>˜ </span>");
					var pbangla=pbangla.replace("[˜]","<span style='font-family:kutmj;'>˜ </span>");
				};
				var id = para_suras[i]+","+(k-1+2)+","+GetUrlValue('para');
				x.innerHTML=("<p id='"+id+"' class='add_event'>"+(1+k)+".&nbsp;"+pbangla+"</p>");
				document.getElementById('wrapper').appendChild(x);
			};
			if(xxx=='tbangla'||xxx=='all'||xxx==null){
				var x = document.createElement("div");
				x.setAttribute("id", "tbangla");
				x.setAttribute("class", "tbangla");
				for(s=1;s<=20;s++){
					var tbangla=tbangla.replace("[and]","&");
					var tbangla=tbangla.replace("­","Ā");
				};
				var id = para_suras[i]+","+(k-1+2)+","+GetUrlValue('para');
				x.innerHTML=("<p id='"+id+"' class='add_event'>"+(1+k)+".&nbsp;"+tbangla+"</p>");
				document.getElementById('wrapper').appendChild(x);
			};
		document.getElementById('loading-popup').style.display='none';
		};
		
		if (GetUrlValue('res')>0) {
			var res = ("#"+GetUrlValue('name')+","+GetUrlValue('res')+","+GetUrlValue('para'));
			window.location.assign(res);
		}
		
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
	var doit = this.id;
	var doit = doit.split(",");
	localStorage.setItem('pause_page', "para");
	localStorage.setItem('pause_sura', doit[0]);
	localStorage.setItem('pause_ayas', doit[1]);
	localStorage.setItem('pause_para', doit[2]);
	window.plugins.toast.showShortBottom("Resume Added:"+doit[0]+","+doit[1]+","+doit[2]);
    if(longpress) {
        return false;
    }
    
    
};

function start() {
var doit = this.id;
    longpress = false;
        
    presstimer = setTimeout(function() {
		
		holdmenu();
		
		var doit_ = doit.split(",");
		var _doit = doit_[0]+","+doit_[1];
		document.getElementById('selected_ayas').innerHTML=("{ "+_doit+" }");
		localStorage.setItem("hold", doit_);
		var i=0;
		while(++i){
			var sura = localStorage.getItem("sura"+i);
			if(sura==null){
				break;
			}
			else{
				var tu = sura.split(",");
				var name = doit_[0];
				if (tu[0]==name&&tu[1]==doit_[1]){
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
	var doit_ = localStorage.getItem("hold");
	var doit = doit_.split(",");
	var name = doit[0];
	var last_bookmarked_item = localStorage.getItem('last_bookmarked_item');
	if(last_bookmarked_item==null){
		localStorage.setItem("last_bookmarked_item","1");
		var hold = doit[1];
		var kaisar = (name+","+hold);
		localStorage.setItem("sura1",kaisar);
	}
	else{
		var name=doit[0];
		var hold = doit[1];
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
	else{
		window.location.assign("index.html#lfive_ul_li_div_"+GetUrlValue('para'));
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
		x = xmlDoc.getElementsByTagName("para");
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
