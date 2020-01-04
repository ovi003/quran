document.addEventListener("online", onOnline, false);
window.onload = function(){
	
	document.getElementById("menu_btn").onclick = menu;
	document.getElementById("menu").onclick = menu;
	document.getElementById("favclear").onclick = favclear;
	document.getElementById("back_btn").addEventListener("click", turanbackbtn, false);
	document.getElementById("dialog_overlay").addEventListener("click", function() {favclear(0);}, false);
	document.getElementById("cyes").addEventListener("click", function() {favclear(1);}, false);
	document.getElementById("cno").addEventListener("click", function() {favclear(0);}, false);
	document.getElementById("share_btn").onclick = sharebtn;
	document.getElementById("rateapp_btn").onclick = rateappbtn;
	document.getElementById("about_btn").onclick = aboutbtn;
	document.getElementById("setting_btn").onclick = settingbtn;
};

document.addEventListener("DOMContentLoaded", loadsura);



function loadsura(){
	var x = document.createElement("ul");
	x.setAttribute("id","vfour_ul");
	document.getElementById('vfour').appendChild(x);
	
	for(i=1;i<=114;i++){
		if(localStorage.getItem("fav"+i)=="1"){
			var x = document.createElement("li");
			x.setAttribute("id","vfour_ul_li"+i);
			document.getElementById("vfour_ul").appendChild(x);
			
			var x = document.createElement("div");
			x.setAttribute("id","vfour_ul_li_div"+i);
			x.setAttribute("class","list");
			document.getElementById("vfour_ul_li"+i).appendChild(x);
			
			var x = document.createElement("div");
			x.setAttribute("id","vfour_ul_li_div_lone"+i);
			x.setAttribute("class","lone");
			document.getElementById("vfour_ul_li_div"+i).appendChild(x);
			
			var x = document.createElement("div");
			x.setAttribute("class","arrow");
			document.getElementById("vfour_ul_li_div_lone"+i).appendChild(x);
			
			var x = document.createElement("div");
			x.setAttribute("id","vfour_ul_li_div_ltwo"+i);
			x.setAttribute("class","ltwo");
			document.getElementById("vfour_ul_li_div"+i).appendChild(x);
			
			var x = document.createElement("a");
			x.setAttribute("href","sura.html?name="+i+"&&back=fav");
			x.setAttribute("class","font_style_name");
			var name=names[i-1].replace("[and]","&");
			name = i+"&nbsp;&nbsp;"+name;
			x.innerHTML = (name);
			document.getElementById("vfour_ul_li_div_ltwo"+i).appendChild(x);
			
			var x = document.createElement("div");
			x.setAttribute("id","vfour_ul_li_div_lfour"+i);
			x.setAttribute("class","lfour");
			document.getElementById("vfour_ul_li_div"+i).appendChild(x);
			
			var x = document.createElement("a");
			x.setAttribute("href","info.html?sura="+i);
			x.innerHTML = ("i")
			document.getElementById("vfour_ul_li_div_lfour"+i).appendChild(x);
			
			var x = document.createElement("div");
			x.setAttribute("id","vfour_ul_li_div_lthree"+i);
			x.setAttribute("class","lthree");
			document.getElementById("vfour_ul_li_div"+i).appendChild(x);
			
			var x = document.createElement("div");
			x.setAttribute("class","fav_added");
			x.setAttribute("id",i);
			x.setAttribute("onclick","fav(this.id);");
			document.getElementById("vfour_ul_li_div_lthree"+i).appendChild(x);
			
		}
	}
}

function fav(z){
	var el = document.getElementById("vfour_ul_li"+z);
	localStorage.setItem("fav"+z, "0");
	localStorage.removeItem("fav"+z);
	el.style.display = "none";
}

function favclear(z){
	var doverlay = document.getElementById("dialog_overlay").style;
	var dconfirm = document.getElementById("dialog_confirm").style;
	if(z==1){
		for(i=1;i<=114;i++){
			localStorage.setItem("fav"+i, "0");
			localStorage.removeItem("fav"+i);
		}
		location.reload();
	}
	else if(z==0){
		doverlay.display = "none";
		dconfirm.display = "none";
	}
	else{
		for(i=1;i<=114;i++){
			if(localStorage.getItem("fav"+i)=="1"){
				doverlay.display = "block";
				dconfirm.display = "block";
				break;
			}
		}
	}
}

function turanbackbtn(){
	var bac = document.getElementById("menu").style;
	var doverlay = document.getElementById("dialog_overlay").style;
	if(bac.display=="block"){
		menu();
	}else if(doverlay.display=="block"){
		favclear(0);
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
		x = xmlDoc.getElementsByTagName("fav");
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
