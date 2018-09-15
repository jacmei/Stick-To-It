
// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {    
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
	chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
		pageUrl: {hostContains: ''},
            })
			],
            actions: [new chrome.declarativeContent.ShowPageAction()]
	}]);
    });
    
});


var blacklist = ['facebook.com','reddit.com','imgur.com']; //default unproductive sites
var whitelist = ['wikipedia.com', 'stackoverflow.com', 'google.com']; //default productive sites
var bl_tracker = {}; // {<String unproductive url>: [<int daily>, <int weekly>, <int all_time>]}
var wl_tracker = {}; // {<String productive url>: [<int daily>, <int weekly>, <int all_time>]}
var masterlist;


// init bl_tracker
for (var i = 0; i < blacklist.length; i++){
    
    bl_tracker[blacklist[i]] = [0,0,0];
}

// init wl_tracker
for (var i = 0; i < whitelist.length; i++){
    
    wl_tracker[whitelist[i]] = [0,0,0];
}

// stringify to store in cookies
bl_tracker = JSON.stringify(bl_tracker);
wl_tracker = JSON.stringify(wl_tracker);
blacklist = JSON.stringify(blacklist);
whitelist = JSON.stringify(whitelist);
masterlist = JSON.stringify(masterlist);


// make cookies
setCookie('bl_tracker', bl_tracker);
setCookie('wl_tracker', wl_tracker);
setCookie('blacklist', blacklist);
setCookie('whitelist', whitelist);
setCookie('masterlist', masterlist);

function resetIdleCookie(){
    console.log("hello");
    var url = null; 
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	console.log(tabs);
	url = tabs[0].url; 
	
    });
    
    var idle_data = getCookie('idle');
    idle_data = JSON.parse(idle_data);
    idle_data[0] = 0;

    idle_data = JSON.stringify(idle_data);
    setCookie('idle', idle_data);

}

function setupIdle() {

    var idle_data = ["placeholder", 0];
    idle_data = JSON.stringify(idle_data);
    setCookie('idle', idle_data);
    
    window.addEventListener("mousemove", resetIdleCookie);
    window.addEventListener("mousedown", resetIdleCookie);
    window.addEventListener("keypress", resetIdleCookie);
    window.addEventListener("DOMMouseScroll", resetIdleCookie);
    window.addEventListener("mousewheel", resetIdleCookie);
    window.addEventListener("touchmove", resetIdleCookie);
    window.addEventListener("MSPointerMove", resetIdleCookie);
 
}
setupIdle();


