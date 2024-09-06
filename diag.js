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

function drawLine(object,x1,y1,x2,y2,w){
  newLine = document.createElementNS("http://www.w3.org/2000/svg", 'line'); 
  newLine.setAttribute("x1",x1); newLine.setAttribute("y1",y1); 
  newLine.setAttribute("x2",x2); newLine.setAttribute("y2",y2); 
  newLine.setAttribute("stroke-width",w); 
  newLine.setAttribute("stroke","black"); 
  newLine.setAttribute("stroke-linecap","round");
  object.appendChild(newLine);
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
          drawLine(svgObject, x, y, x+blockSize, y+blockSize, lineWidth);
        } else {
          drawLine(svgObject, x, y+blockSize, x+blockSize, y, lineWidth);
        } 
        y += blockSize;
      }
      x += blockSize;
    }
  } else {
    inc = Math.sqrt(2)*blockSize/2;
    n = 0;
    m = 0;
    x = -inc;
    while (x <= maxX + inc){
      n = 0;
      y = -inc;
      while (y <= maxY + inc){
        if ( (n + m) % 2 == 0){
          if (Math.random() < 0.5){
            drawLine(svgObject, x-inc, y, x+inc, y, lineWidth);
          } else {
            drawLine(svgObject, x, y-inc, x, y+inc, lineWidth);
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


