//Creates a pie chart

var badhourslist = getCookie("badhourslist");
badhourslist = JSON.parse(badhourslist);

var goodhourslist = getCookie("goodhourslist");
goodhourslist = JSON.parse(goodhourslist);

var uptime = getCookie("uptime");
uptime = JSON.parse(uptime);

var s = badhourslist[badhourslist.length -1][0];
var a = badhourslist[badhourslist.length -1][1];
var b = goodhourslist[goodhourslist.length -1][1];
var c = uptime[uptime.length -1][1];
var pie = new d3pie("pieChart", {
    "header": {
	"title": {
	    "text": s,
	    "fontSize": 22,
	    "font": "verdana"
	},
	"subtitle": {
	    "text": "",
	    "color": "#999999",
	    "fontSize": 10,
	    "font": "verdana"
	},
	"titleSubtitlePadding": 12
    },
    "footer": {
	"text": "",
	"color": "#999999",
	"fontSize": 11,
	"font": "open sans",
	"location": "bottom-center"
    },
    "size": {
	"canvasHeight": 500,
	"canvasWidth": 690,
	"pieOuterRadius": "88%"
    },
    "data": {
	"content": [
	    {
		"label": "Nonproductive",
		"value": a,
		"color": "#7e3838"
	    },
	    {
		"label": "Productive",
		"value": b,
		"color": "#7e6538"
	    },
	    {
		"label": "Other",
		"value": c,
		"color": "#7c7e38"
	    }
	]
    },
    "labels": {
	"outer": {
	    "pieDistance": 32
	},
	"inner": {
	    "format": "value"
	},
	"mainLabel": {
	    "font": "verdana"
	},
	"percentage": {
	    "color": "#e1e1e1",
	    "font": "verdana",
	    "decimalPlaces": 0
	},
	"value": {
	    "color": "#e1e1e1",
	    "font": "verdana"
	},
	"lines": {
	    "enabled": true,
	    "color": "#cccccc"
	},
	"truncation": {
	    "enabled": true
	}
    },
    "effects": {
	"pullOutSegmentOnClick": {
	    "effect": "linear",
	    "speed": 400,
	    "size": 8
	}
    }
});
