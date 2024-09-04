function show(id) {
  document.getElementById(id).style.visibility = "visible";
}

function hide(id) {
  document.getElementById(id).style.visibility = "hidden";
}

function init(){
  if (getQueryVariable("blockSize")){
    document.forms["choice"]["blockSize"].value = getQueryVariable("blockSize");
  } 
  if (getQueryVariable("lineWidth")){
    document.forms["choice"]["lineWidth"].value = getQueryVariable("lineWidth");
  } 
  submitChoice();
}

function submitChoice(inp){
  var blockSize=parseInt(document.forms["choice"]["blockSize"].value);
  var lineWidth=parseFloat(document.forms["choice"]["lineWidth"].value);
  var ratio = window.devicePixelRatio || 1;
  if (navigator.platform == "Win32") ratio=Math.max((1/ratio),ratio);
  if (navigator.platform == "Linux x86_64") ratio=Math.max((1/ratio),ratio);
  var maxX=screen.width*ratio;
  var maxY=screen.height*ratio;
  var svgObject=document.getElementById("svg");
  var x = 0;
  var y = 0;
  var diagBox = document.getElementById("angle");
  while (svgObject.firstChild) {
    svgObject.removeChild(svgObject.firstChild);
  }
  while (x <= maxX){
    y = 0;
    while (y <= maxY){
      if (Math.random() < 0.5){
        newLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        newLine.setAttribute("x1",x);
        newLine.setAttribute("y1",y);
        newLine.setAttribute("x2",x+blockSize);
        if (diagBox.checked == true) {
	  newLine.setAttribute("y2",y+blockSize);
	} else {
	  newLine.setAttribute("y2",y);
	} 
        newLine.setAttribute("stroke-width",lineWidth);
        newLine.setAttribute("stroke","black");
        newLine.setAttribute("stroke-linecap","round");
        svgObject.appendChild(newLine);
      } else {
        newLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        newLine.setAttribute("x1",x);
        newLine.setAttribute("y1",y+blockSize);
        if (diagBox.checked == true) {
          newLine.setAttribute("x2",x+blockSize);
	} else {
	  newLine.setAttribute("x2",x);
	} 
        newLine.setAttribute("y2",y);
        newLine.setAttribute("stroke-width",lineWidth);
        newLine.setAttribute("stroke","black");
        newLine.setAttribute("stroke-linecap","round");
        svgObject.appendChild(newLine);
      } 
      y += blockSize;
	    console.log(angle);
    }
    x += blockSize;
  }
  return(false);
}

function getQueryVariable(variable)
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

