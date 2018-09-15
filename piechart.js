var pie = new d3pie("pieChart", {
	"header": {
		"title": {
			"text": "Spousal Resentment",
			"fontSize": 22,
			"font": "verdana"
		},
		"subtitle": {
			"text": "Comments my wife has made when I tell her I'm working on this script instead of doing something \"fun\".",
			"color": "#999999",
			"fontSize": 10,
			"font": "verdana"
		},
		"titleSubtitlePadding": 12
	},
	"footer": {
		"text": "Source: me, my room, the last couple of months.",
		"color": "#999999",
		"fontSize": 11,
		"font": "open sans",
		"location": "bottom-center"
	},
	"size": {
		"canvasHeight": 400,
		"canvasWidth": 590,
		"pieOuterRadius": "88%"
	},
	"data": {
		"content": [
			{
				"label": "When's it going to be done?",
				"value": 8,
				"color": "#7e3838"
			},
			{
				"label": "Bennnnn!",
				"value": 5,
				"color": "#7e6538"
			},
			{
				"label": "Oh, god.",
				"value": 2,
				"color": "#7c7e38"
			},
			{
				"label": "But it's Friday night!",
				"value": 3,
				"color": "#587e38"
			},
			{
				"label": "Again?",
				"value": 2,
				"color": "#387e45"
			},
			{
				"label": "I'm considering an affair.",
				"value": 1,
				"color": "#387e6a"
			},
			{
				"label": "[baleful stare]",
				"value": 3,
				"color": "#386a7e"
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
