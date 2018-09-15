
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

// make cookies
setCookie('bl_tracker', bl_tracker);
setCookie('wl_tracker', wl_tracker);
setCookie('blacklist', blacklist);
setCookie('whitelist', whitelist);

