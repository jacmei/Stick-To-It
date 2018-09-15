//Allows blacklisting and whitelisting websites for unproductivity/productivity categorization

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("click-this").addEventListener("click", getSubmit
)});

function getSubmit() {
  var nameValue = document.getElementById("unproductive").elements[0].value;
  document.getElementById("unproductive").elements[0].value = "";
  addURL(nameValue, BL);
  populationTextArea();
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("del-this").addEventListener("click", delSubmit
)});

function delSubmit() {
  var nameValue = document.getElementById("unproductive").elements[2].value;
  document.getElementById("unproductive").elements[2].value = "";
  removeURL(nameValue, BL);
  populationTextArea();
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("click-this-2").addEventListener("click", getSubmit2
)});

function getSubmit2() {
  var nameValue = document.getElementById("productive").elements[0].value;
  document.getElementById("productive").elements[0].value = "";
  addURL(nameValue, WL);
  populationTextArea();
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("del-this-2").addEventListener("click", delSubmit2
)});

function delSubmit2() {
  var nameValue = document.getElementById("productive").elements[2].value;
  document.getElementById("productive").elements[2].value = "";
  removeURL(nameValue, WL);
  populationTextArea();
}

function populationTextArea() {
  document.getElementById("unproductive_ta").value = "";
  document.getElementById("productive_ta").value = "";
  var blacklist = getCookie('blacklist');
  blacklist = JSON.parse(blacklist);
  var whitelist = getCookie('whitelist');
  whitelist = JSON.parse(whitelist);
  for (i in blacklist) {
    document.getElementById("unproductive_ta").value += blacklist[i] + "\n";
  }
  for (i in whitelist) {
    document.getElementById("productive_ta").value += whitelist[i] + "\n";
  }
}
populationTextArea();
