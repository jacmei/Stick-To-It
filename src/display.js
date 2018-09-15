var = bl_tracker = getCookie('bl_tracker')
bl_tracker = JSON.parse(bl_tracker);

var a = bl_tracker["www.reddit.com"]
var b = bl_tracker["www.facebook.com"]
var c = bl_tracker["www.imgur.com"]

document.getElementById("topthree").innerHTML = "www.reddit.com : " + a + "\n" + "www.facebook.com" + b + "\n" + "www.imgur.com" + c;
