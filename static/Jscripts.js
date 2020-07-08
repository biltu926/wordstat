var resultObjs = {};
var opPane = document.getElementById("output");

var btn = document.getElementById("btn");
btn.onclick = function(){
  //set loading animation on button
  var initialBtnState = btn.innerHTML;
  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i>Loading';

  var content = document.querySelector('textarea').value;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://127.0.0.1:5000/text_input');
  xhr.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    }
  
    //set loading spinner on the output area (right-pane)
  opPane.innerHTML = '<div class="d-flex justify-content-center"> <div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div><h2 class="text-muted">Processing in the backend</h2></div>';
}
xhr.onload = function(){
    btn.innerHTML = initialBtnState;
}
  xhr.send(content);
}

function reqListener () {
    //stop the loading spinner on the output area (right-pane). Output has come.
    opPane.innerHTML = '<div><h2 class="text-muted">Output is ready. Click the cards below.</h2></div>';
    var opDisplay = document.getElementById("output");
    resultObjs["ctext"] = JSON.parse(this.responseText).cleaned_text;
    resultObjs["wc"] = JSON.parse(this.responseText).wc;
}

var getWC = document.getElementById("wc");
getWC.addEventListener("click",  function(){
 opPane.innerHTML = resultObjs["wc"]
 opPane.style.fontSize = "xx-large";
});


var cText = document.getElementById("cText");
cText.addEventListener("click", function(){
    opPane.innerHTML = resultObjs["ctext"];
})

setTimeout(function() {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "http://127.0.0.1:5000/output");
    oReq.send();
}, 5000);