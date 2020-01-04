window.onload = function(){
	document.getElementById("menu_btn").onclick = menu;
	document.getElementById("menu").onclick = menu;
	document.getElementById("bookmarks_btn").addEventListener("click", function() {window.location.assign("bookmark.html");}, false);
	document.getElementById("fav_btn").addEventListener("click", function() {window.location.assign("fav.html");}, false);
	document.getElementById("res_btn").onclick = turani;
	document.getElementById("share_btn").onclick = sharebtn;
	document.getElementById("rateapp_btn").onclick = rateappbtn;
	document.getElementById("about_btn").onclick = aboutbtn;
	document.getElementById("setting_btn").onclick = settingbtn;
};

document.addEventListener("DOMContentLoaded", loadpara);
document.addEventListener("DOMContentLoaded", loadsura);



function loadsura(){
	var x = document.createElement("ul");
	x.setAttribute("id","vfour_ul");
	document.getElementById('vfour').appendChild(x);
	
	for(i=1;i<=114;i++){
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
		x.setAttribute("href","sura.html?name="+i);
		x.setAttribute("class","font_style_name");
		var name=names[i-1].replace("[and]","&");
		name = i+"&nbsp;&nbsp;"+name;
		x.innerHTML = (name);
		document.getElementById("vfour_ul_li_div_ltwo"+i).appendChild(x);
		
		var x = document.createElement("div");
		x.setAttribute("id","vfour_ul_li_div_lthree"+i);
		x.setAttribute("class","lthree");
		document.getElementById("vfour_ul_li_div"+i).appendChild(x);
		
		// var x = document.createElement("div");
		// if(localStorage.getItem("fav"+i)!="1"){
		// 	x.setAttribute("class","fav");
		// }
		// else{x.setAttribute("class","fav_added");}
		// x.setAttribute("id",i);
		// x.setAttribute("onclick","fav(this.id);");
		// document.getElementById("vfour_ul_li_div_lthree"+i).appendChild(x);
		
		// var x = document.createElement("div");
		// x.setAttribute("id","vfour_ul_li_div_lfour"+i);
		// x.setAttribute("class","lfour");
		// document.getElementById("vfour_ul_li_div"+i).appendChild(x);
		
		// var x = document.createElement("a");
		// x.setAttribute("href","info.html?sura="+i);
		// x.innerHTML = ("i")
		// document.getElementById("vfour_ul_li_div_lfour"+i).appendChild(x);
	}
}

function fav(z){
	var el = document.getElementById(z)
	if(localStorage.getItem("fav"+z)!="1"){
		localStorage.setItem("fav"+z, "1");
		el.classList.remove("fav");
		el.classList.add("fav_added");
	}
	else{
		localStorage.setItem("fav"+z, "0");
		localStorage.removeItem("fav"+z);
		el.classList.remove("fav_added");
		el.classList.add("fav");
	}
}

function loadpara(){
	var x = document.createElement("ul");
	x.setAttribute("id", "lfive_ul");
	document.getElementById('lfive').appendChild(x);
	
	for(i=1;i<=30;i++){
		var x = document.createElement("li");
		x.setAttribute("id", "lfive_ul_li");
		document.getElementById("lfive_ul").appendChild(x);
		
		var x = document.createElement("div");
		x.setAttribute("id", "lfive_ul_li_div_"+i);
		x.setAttribute("class", "list lpara");
		document.getElementById("lfive_ul_li").appendChild(x);
		
		var x = document.createElement("a");
		x.setAttribute("href", "para.html?para="+i);
		x.setAttribute("class","font_style_para");
		x.innerHTML = (i);
		document.getElementById("lfive_ul_li_div_"+i).appendChild(x);
	}
	
}

function turani(){
	if(localStorage.getItem('pause_page')!=null){
		if(localStorage.getItem('pause_page')=='sura'){
			var resume = ("sura.html?name="+localStorage.getItem('pause_sura')+"&res="+localStorage.getItem('pause_ayas'));
		}
		else{
			var resume = ("para.html?para="+localStorage.getItem('pause_para')+"&name="+localStorage.getItem('pause_sura')+"&res="+localStorage.getItem('pause_ayas'));
		}
		window.location.assign(resume);
	}
}

function turanbackbtn(){
	var bac = document.getElementById("menu").style;
	if(bac.display=="block"){
		menu();
	}else{
		if(localStorage.getItem("backbutton")=="0"||localStorage.getItem("backbutton")==0||localStorage.getItem("backbutton")==null){
			localStorage.setItem("backbutton", "1");
			window.plugins.toast.showShortBottom("Press again to exit");
			setTimeout(function(){ localStorage.setItem("backbutton", "0"); }, 3000);
		}else{
			localStorage.setItem("backbutton", "0");
			navigator.app.exitApp();
		}
	}
}