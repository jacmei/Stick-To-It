
// Get url of current active tab
var url = null;
var tabID = null;
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    
    url = tabs[0].url;

    tabID = tabs[0].id;
 
});





function resetIdleCookie(){
    
    var idle_data = getCookie('idle');
    idle_data = JSON.parse(idle_data);
    idle_data[1] = 0;

    idle_data = JSON.stringify(idle_data);
    setCookie('idle', idle_data);

}

function setupIdle() {

    var idle_data = ["placeholder", 0];
    idle_data = JSON.stringify(idle_data);
    setCookie('idle', idle_data);
    /*
    window.addEventListener("mousemove", resetIdleCookie);
    window.addEventListener("mousedown", resetIdleCookie);
    window.addEventListener("keypress", resetIdleCookie);
    window.addEventListener("DOMMouseScroll", resetIdleCookie);
    window.addEventListener("mousewheel", resetIdleCookie);
    window.addEventListener("touchmove", resetIdleCookie);
    window.addEventListener("MSPointerMove", resetIdleCookie);
 */
}

function inc(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	console.log(url);
	url = tabs[0].url;

	tabID = tabs[0].id;

    });
    
    var idle = getCookie('idle');
    idle = JSON.parse(idle);
    idle[0] = url;
    idle[1] += 1;
    //console.log(idle[1]);
    idle = JSON.stringify(idle);
    setCookie('idle', idle);
}





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

    console.log(goodhourslist);
    // Convert JSON strings into objects
    blacklist = JSON.parse(blacklist);
    whitelist = JSON.parse(whitelist);
    bl_tracker = JSON.parse(bl_tracker);
    wl_tracker = JSON.parse(wl_tracker);
    badhourslist = JSON.parse(badhourslist);
    goodhourslist = JSON.parse(goodhourslist);
    
    // Update bl_tracker

    for (var i = 0; i < blacklist.length; i++){


	// Reset weekly value on Sunday
	if (now.getDay() == 0 && now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() == 0){
	    bl_tracker[blacklist[i]][WEEKLY] == 0;
	    
	  
	}

	// Reset daily value at 12am
	if (now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() == 0){
	    bl_tracker[blacklist[i]][DAILY] == 0;
	    
	    badhourslist.push([(now.getMonth() + 1) + "/" + now.getDate(), 0]);
	    
	}
	
	if (url.includes(blacklist[i])){
	    badhourslist[badhourslist.length - 1][1] += 1;
	    bl_tracker[blacklist[i]][DAILY] += 1;
	    bl_tracker[blacklist[i]][WEEKLY] += 1;
	    bl_tracker[blacklist[i]][ALL_TIME] += 1;
	}
    }

    // Update wl_tracker

    for (var i = 0; i < whitelist.length; i++){


	// Reset weekly value on Sunday
	if (now.getDay() == 0 && now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() == 0){
	    wl_tracker[whitelist[i]][WEEKLY] == 0; 
	}

	// Reset daily value at 12am
	if (now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() == 0){
	    wl_tracker[whitelist[i]][DAILY] == 0;


	    goodhourslist.push([(now.getMonth() + 1) + "/" + now.getDate(), 0]);
	}
	
	if (url.includes(whitelist[i])){
	    goodhourslist[goodhourslist.length - 1][1] += 1;
	    wl_tracker[whitelist[i]][DAILY] += 1;
	    wl_tracker[whitelist[i]][WEEKLY] += 1;
	    wl_tracker[whitelist[i]][ALL_TIME] += 1;
	}
    }
  
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
setupIdle();
setInterval(update, 500);

setInterval(inc, 500);
