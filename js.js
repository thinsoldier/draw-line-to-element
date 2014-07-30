var myLines = [],
	svg = null;
	

$(document).ready(function () {
  
  // initialize & setup everything
  initialize();  

});

function initialize() {  
    // set up the drawing area from Body of the document
    $('body').prepend('<div id="svgcanvas">');
    $("#svgcanvas")
        .css("height", $("#body").height())
        .css("width", $("#body").width());

    svg = Raphael("svgcanvas", $("#svgcanvas").width(), $("#svgcanvas").height());

    svgDrawLine( $('#rightPanel'), $('#leftPanel'));
    
	 svgDrawLine( $('#getMappings'), $('strong'));
	 
	 svgDrawLine( $('#menu'), $('#getMappings') );
}

function svgClear() {
    svg.clear();
}
function svgDrawLine(eTarget, eSource) {

    // wait 1 sec before draw the lines, so we can get the position of the draggable
    setTimeout(function () {

        var $source = eSource; console.log($source[0]);
        var $target = eTarget;

        // origin -> ending ... from left to right
        // 10 + 10 (padding left + padding right) + 2 + 2 (border left + border right)
        var originX = $source.offset().left + $source.width() + 20 + 10;
        var originY = $source.offset().top  + (($source.height() + 20 + 4) / 2);

        var endingX = $target.offset().left - 10;
        var endingY = $target.offset().top + (($target.height() + 20 + 4) / 2);

        var space = 20;
        var color = "navy";

        // draw lines
        // http://raphaeljs.com/reference.html#path			
        var a = "M" + originX + " " + originY + " L" + (originX + space) + " " + originY; // beginning
        var b = "M" + (originX + space) + " " + originY + " L" + (endingX - space) + " " + endingY; // diagonal line
        var c = "M" + (endingX - space) + " " + endingY + " L" + endingX + " " + endingY; // ending
        var all = a + " " + b + " " + c;

        /**/
        // log (to show in FF (with FireBug), Chrome and Safari)			
        console.log("New Line ----------------------------");
        console.log("originX: " + originX + " | originY: " + originY + " | endingX: " + endingX + " | endingY: " + endingY + " | space: " + space + " | color: " + color );				
        console.log(all); 
        /**/

        // write line
        myLines[myLines.length] = svg
				.path(all)
				.attr({
                   "stroke": color,
                   "stroke-width": 2,
                   "stroke-dasharray": "-"
				});

    }, 1000);

}

function random(range) {
    return Math.floor(Math.random() * range);
}


