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

document.addEventListener("DOMContentLoaded", loadbookmarks);

function loadbookmarks(){
	var x = document.createElement("div");
	x.setAttribute("id","turan");
	document.getElementById("wrapper").appendChild(x);
	
	var x = document.createElement("ul");
	x.setAttribute("id","ul");
	document.getElementById("turan").appendChild(x);
	
	for(i=1;i<=114;i++){
		var x = document.createElement("li");
		x.setAttribute("id","li_"+i);
		x.setAttribute("class","list");
		document.getElementById("ul").appendChild(x);
		
		var x = document.createElement("ul");
		x.setAttribute("id","sura"+i);
		document.getElementById("li_"+i).appendChild(x);
	
		var x = document.createElement("li");
		x.setAttribute("id","sura"+i+"_li");
		x.setAttribute("class","sura_title");
		document.getElementById("sura"+i).appendChild(x);
		
		var x = document.createElement("div");
		x.setAttribute("class","lone");
		document.getElementById("sura"+i+"_li").appendChild(x);
		
		var x = document.createElement("div");
		x.setAttribute("class","ltwo");
		var name=names[i-1].replace("[and]","&");
		name = i+"&nbsp;&nbsp;"+name;
		x.innerHTML = (name);
		document.getElementById("sura"+i+"_li").appendChild(x);
	}
	
	var i = 0;
	while(++i){
		var sura = localStorage.getItem("sura"+i);
		if(sura==null){
			break;
		}
		else{
			var tu = sura.split(",");
			for(k=1;k<=114;k++){
				if (tu[0]==k){
					var turan = tu;
					u = "data/xl/sura"+turan[0]+".xml";
					xmlDoc=loadXMLDoc(u);
					a=xmlDoc.getElementsByTagName("tbangla");
					var lol = turan[1]-1;
					for(r=lol;r<turan[1];r++){
						tbangla = a[r].childNodes[0].nodeValue;
						var tbangla=tbangla.replace("[and]","&");
						var tbangla=tbangla.replace("­","Ā");
						var x = document.createElement("li");
						x.setAttribute("class","sura_shortdetails");
						x.setAttribute("id","item_"+i);
						var go = turan[0]+","+turan[1];
						x.innerHTML= ('<div class="lone"><div class="left_ayas"><p class="left_ayas_number">'+turan[1]+'</p></div></div><div class="ltwo"><p onclick="window.location.assign('+"'sura.html?name="+turan[0]+"&res="+turan[1]+"&back=bookmark'"+');">'+tbangla+'</p></div><div class="lthree"><div class="delete_btn" onclick="removebookmark('+i+');"></div></div>');
						document.getElementById('sura'+k).appendChild(x);
						document.getElementById('li_'+k).style.display='block';
					}
				}
			}
		}
	}
}

function favclear(z){
	var doverlay = document.getElementById("dialog_overlay").style;
	var dconfirm = document.getElementById("dialog_confirm").style;
	if(z==1){
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
		location.reload();
	}
	else if(z==0){
		doverlay.display = "none";
		dconfirm.display = "none";
	}
	else{
		var i = 0;
		while(++i){
			if(localStorage.getItem("sura"+i)!=null){
				doverlay.display = "block";
				dconfirm.display = "block";
				break;
			}
			else{break;}
		}
	}
}

function removebookmark(z){
	var kk = ("sura"+z);
	localStorage.setItem(kk,"0,0");
	document.getElementById("item_"+z).style.display = "none";
}

function turanbackbtn(){
	var bac = document.getElementById("menu").style;
	var doverlay = document.getElementById("dialog_overlay").style;
	if(bac.display=="block"){
		menu();
	}else if(doverlay.display=="block"){
		favclear(0);
	}else{
		window.location.assign("index.html");
	}
}


function onOnline(){
	initApp();
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
		x = xmlDoc.getElementsByTagName("bookmark");
		txt = x[0].childNodes[0].nodeValue;
		if(txt=="true"){
			AdMob.showInterstitial();
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
