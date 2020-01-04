document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
	document.addEventListener("menubutton", onMenuKeyDown, false);
}


function onMenuKeyDown() {
    menu();
}

function onBackKeyDown() {
   turanbackbtn();
}