/*
let changeColor = document.getElementById('changeColor');
console.log(changeColor);
chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    console.log(color);
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
	var url = tabs[0].url;
	chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style.backgroundColor = "' + color + '";' +
	    'document.title.text = "' + url + '";'});
	
    });
};
*/


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

    // Convert JSON strings into objects
    blacklist = JSON.parse(blacklist);
    whitelist = JSON.parse(whitelist);
    bl_tracker = JSON.parse(bl_tracker);
    wl_tracker = JSON.parse(wl_tracker);

    
    // Update bl_tracker
    for (var i = 0; i < blacklist.length; i++){


	// Reset weekly value on Sunday
	if (now.getDay() == 0 && now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() == 0){
	    bl_tracker[blacklist[i]][WEEKLY] == 0; 
	}

	// Reset daily value at 12am
	if (now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() == 0){
	    bl_tracker[blacklist[i]][DAILY] == 0;
	}
	
	if (url.includes(blacklist[i])){
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
	}
	
	if (url.includes(whitelist[i])){
	    wl_tracker[whitelist[i]][DAILY] += 1;
	    wl_tracker[whitelist[i]][WEEKLY] += 1;
	    wl_tracker[whitelist[i]][ALL_TIME] += 1;
	}
    }
    console.log(bl_tracker);
    console.log(wl_tracker);

    // Put back the updated bl_tracker and wl_tracker into cookies
    bl_tracker = JSON.stringify(bl_tracker);
    wl_tracker = JSON.stringify(wl_tracker);
    setCookie('bl_tracker', bl_tracker);
    setCookie('wl_tracker', wl_tracker);
}
//updateData();
setInterval(update, 1000);
