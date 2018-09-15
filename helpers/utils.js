const DAILY = 0;
const WEEKLY = 1;
const ALL_TIME = 2;

const BL = 3;
const WL = 4;

function setCookie(cname, cvalue) {
   
    document.cookie = cname + "=" + cvalue + ";" + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/*
@param {String} url, {const int} mode
@return boolean

Adds a url to blacklist/tracker or whitelist/tracker depending on the mode. 
Returns True if successful, False otherwise
*/
function addURL(url, mode){

    var l = null;
    var nl_tracker = null;
    var name = null;
    var nl = null;
    switch(mode){
    case BL:
	name = "blacklist";
	nl = "bl_tracker";
	break;
    case WL:
	name = "whitelist";
	nl = "wl_tracker";
	
	break;
    default:
	return false;
    }
    l = getCookie(name);
    nl_tracker = getCookie(nl);
    
    l = JSON.parse(l);
    nl_tracker = JSON.parse(nl_tracker);
    l.push(url);
    nl_tracker[url] = [0,0,0];

    l = JSON.stringify(l);
    nl_tracker = JSON.stringify(nl_tracker)
    setCookie(name, l);
    setCookie(nl, nl_tracker);
    return true;
    
}

/*
@param {String} url, {const int} mode
@return boolean

Adds a url to blacklist or whitelist depending on the mode. 
Returns True if successful, False otherwise
*/
function removeURL(url, mode){

    var l = null;
    var nl_tracker = null;
    var name = null;
    var nl = null;
    switch(mode){
    case BL:
	name = "blacklist";
	nl = "bl_tracker";
	break;
    case WL:
	name = "whitelist";
	nl = "wl_tracker";
	break;
    default:
	return false;
    }
    l = getCookie(name);
    nl_tracker = getCookie(nl);
    l = JSON.parse(l);
    nl_tracker = JSON.parse(nl_tracker);
    var i = 0;
    for (; i < l.length; i++){
	if (l[i].localeCompare(url) == 0){
	    break;
	}
    }
    l.splice(i,1);
    delete nl_tracker[url];
    l = JSON.stringify(l);
    nl_tracker = JSON.stringify(nl_tracker);
    setCookie(name, l);
    setCookie(nl, nl_tracker);
    return true;

    
}
