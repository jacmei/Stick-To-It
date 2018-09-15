
// Get url of current active tab
var url = null; 
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	console.log(tabs);
	url = tabs[0].url; 
	
});


// updates bl_tracker and wl_tracker
var update = function updateData(){
    
    
    var now = new Date(); 

    // Get data from cookies
    var blacklist = getCookie('blacklist');
    var whitelist = getCookie('whitelist');
    var bl_tracker = getCookie('bl_tracker');
    var wl_tracker = getCookie('wl_tracker');
    var badhourslist = getCookie('badhourslist');
    var goodhourslist = getCookie('goodhourslist');

    console.log(badhourslist);
    // Convert JSON strings into objects
    blacklist = JSON.parse(blacklist);
    whitelist = JSON.parse(whitelist);
    bl_tracker = JSON.parse(bl_tracker);
    wl_tracker = JSON.parse(wl_tracker);
    badhourslist = JSON.parse(badhourslist);
    goodhourslist = JSON.parse(goodhourslist);
    
    // Update bl_tracker
    var daily_sum = 0;
    for (var i = 0; i < blacklist.length; i++){

	daily_sum += bl_tracker[blacklist[i]][DAILY];
	// Reset weekly value on Sunday
	if (now.getDay() == 0 && now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() == 0){
	    bl_tracker[blacklist[i]][WEEKLY] == 0;
	    
	  
	}

	// Reset daily value at 12am
	if (now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() == 0){
	    bl_tracker[blacklist[i]][DAILY] == 0;
	    badhourslist[badhourslist.length - 1][1] = daily_sum;
	    badhourslist.push([(now.getMonth() + 1) + "/" + now.getDay(), 0]);
	    
	}
	
	if (url.includes(blacklist[i])){
	    bl_tracker[blacklist[i]][DAILY] += 1;
	    bl_tracker[blacklist[i]][WEEKLY] += 1;
	    bl_tracker[blacklist[i]][ALL_TIME] += 1;
	}
    }

    // Update wl_tracker
    var daily_sum = 0;
    for (var i = 0; i < whitelist.length; i++){

	daily_sum += wl_tracker[whitelist[i]][DAILY];
	// Reset weekly value on Sunday
	if (now.getDay() == 0 && now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() == 0){
	    wl_tracker[whitelist[i]][WEEKLY] == 0; 
	}

	// Reset daily value at 12am
	if (now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() == 0){
	    wl_tracker[whitelist[i]][DAILY] == 0;

	    goodhourslist[goodhourslist.length - 1][1] = daily_sum;
	    goodhourslist.push([(now.getMonth() + 1) + "/" + now.getDay(), 0]);
	}
	
	if (url.includes(whitelist[i])){
	    wl_tracker[whitelist[i]][DAILY] += 1;
	    wl_tracker[whitelist[i]][WEEKLY] += 1;
	    wl_tracker[whitelist[i]][ALL_TIME] += 1;
	}
    }
    console.log(badhourslist);
    console.log(badhourslist);

    // Put back the updated bl_tracker and wl_tracker into cookies
    bl_tracker = JSON.stringify(bl_tracker);
    wl_tracker = JSON.stringify(wl_tracker);
    badhourslist = JSON.stringify(badhourslist);
    goodhourslist = JSON.stringify(goodhourslist);
    
    setCookie('bl_tracker', bl_tracker);
    setCookie('wl_tracker', wl_tracker);
    setCookie('badhourslist', badhourslist);
    setCookie('goodhourslist', goodhourslist);
}
//updateData();
setInterval(update, 1000);


