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
  if (diagBox.checked == true) {
    while (x <= maxX){
      y = 0;
      while (y <= maxY){
        if (Math.random() < 0.5){
          newLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
          newLine.setAttribute("x1",x);
          newLine.setAttribute("y1",y);
          newLine.setAttribute("x2",x+blockSize);
	  newLine.setAttribute("y2",y+blockSize);
          newLine.setAttribute("stroke-width",lineWidth);
          newLine.setAttribute("stroke","black");
          newLine.setAttribute("stroke-linecap","round");
          svgObject.appendChild(newLine);
        } else {
          newLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
          newLine.setAttribute("x1",x);
          newLine.setAttribute("y1",y+blockSize);
          newLine.setAttribute("x2",x+blockSize);
          newLine.setAttribute("y2",y);
          newLine.setAttribute("stroke-width",lineWidth);
          newLine.setAttribute("stroke","black");
          newLine.setAttribute("stroke-linecap","round");
          svgObject.appendChild(newLine);
        } 
        y += blockSize;
      }
      x += blockSize;
    }
  } else {
    inc = Math.sqrt(2)*blockSize/2;
    console.log(inc);
    n = 0;
    m = 0;
    x = -inc;
    while (x <= maxX + inc){
      n = 0;
      y = -inc;
      while (y <= maxY + inc){
        console.log("fdsfdsdfsdfs  ");
        console.log(n + "  " + m);
        if ( (n + m) % 2 == 0){
          if (Math.random() < 0.5){
            newLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
            newLine.setAttribute("x1",x-inc);
            newLine.setAttribute("y1",y);
            newLine.setAttribute("x2",x+inc);
            newLine.setAttribute("y2",y);
            newLine.setAttribute("stroke-width",lineWidth);
            newLine.setAttribute("stroke","black");
            newLine.setAttribute("stroke-linecap","round");
            svgObject.appendChild(newLine);
          } else {
            newLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
            newLine.setAttribute("x1",x);
            newLine.setAttribute("y1",y-inc);
            newLine.setAttribute("x2",x);
            newLine.setAttribute("y2",y+inc);
            newLine.setAttribute("stroke-width",lineWidth);
            newLine.setAttribute("stroke","black");
            newLine.setAttribute("stroke-linecap","round");
            svgObject.appendChild(newLine);
          } 
        } 
        y += inc;
        n += 1;
      }
      x += inc;
      m += 1;
    }
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


