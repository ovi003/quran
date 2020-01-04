scheduleDaily = function () {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	
	if(dd<10) {
		dd='0'+dd
	} 
	
	if(mm<10) {
		mm='0'+mm
	} 
	
	var date = mm+'/'+dd+'/'+yyyy;

	var alarm = localStorage.getItem("alarm");
	if(alarm!=null||alarm!=""){
		var newonlyTime = alarm.split("-")[0];
		var pmam = alarm.split("-")[1];
		var kkk = newonlyTime.split(":");
		if(pmam=="PM"&&kkk[0]<12){kkk[0]=Number(kkk[0])+12;}
		if(pmam=="AM"&&kkk[0]==12){kkk[0]=Number(kkk[0])-12;}
		var tur = kkk[0]+":"+kkk[1];
		time = tur;
	}

	var schedule_time = new Date((date + " " + time).replace(/-/g, "/")).getTime();
         schedule_time = new Date(schedule_time);

	cordova.plugins.notification.local.schedule({
		id: 1,
		title: 'Arabic Bangla Quran',
		text: 'Read Quran...',
		at: schedule_time,
		every: 'day'
	});
};