myCanvas = document.getElementById("myCanvas");
ctx = myCanvas.getContext('2d');

myCanvas2 = document.getElementById("myCanvas2");
ctx2 = myCanvas2.getContext('2d');


/*	Setting the height of the two canvases	*/

const canvasHeight = 400;
const canvasWidth = 500;

const canvasHeight2 = 200;
const canvasWidth2 = 500;

myCanvas.height = canvasHeight;
myCanvas.width = canvasWidth;

myCanvas2.height = canvasHeight2;
myCanvas2.width = canvasWidth2;

/**********************************************/



var horizMargin = 25;
var bottomMargin = 20;

var numOfBars = 15;
var barMinLength = 10;
var barMaxLenght = 300;
var startBarX = horizMargin;
var startBarY = canvasHeight - bottomMargin;

var barGap = (canvasWidth - ( 2 * horizMargin )) / (2 * numOfBars - 1);
var barWidth = barGap;
//var barWidth = (canvasWidth - ((numOfBars + 1) * barGap)) / numOfBars;

var bars = new Array(numOfBars);

var x = startBarX;
var y = startBarY;
for (var i = 0; i < numOfBars; i++)
{
	var length = Math.trunc(Math.random() * (barMaxLenght - barMinLength) + barMinLength);
	bars[i] = new Bar(x, y, barWidth, length, "#456533", '#f00', ' #b3b300');

	x += barWidth + barGap;
}

var sort = new BubbleSort(bars, canvasWidth, canvasHeight);

var done = false;		// variable for checking if the sorting is completed or not

/*
	Setting the event listener for the button that moves the animation forward frame by frame.
*/
document.getElementById('next').addEventListener("click", myFunction); 

function myFunction()
{
	sort.nextFrame();
}

requestAnimationFrame(animationLoop);

function animationLoop(timeStamp)
{
	if (!done)
	{
		done = sort.update(timeStamp);
		sort.draw(ctx);
	}

	requestAnimationFrame(animationLoop);

}

// Variabled for drawing the array box :- 

var horizMargin2 = 0;
var boxWidth = 50;
var boxStartY = ( canvasHeight2 / 2 ) - ( boxWidth / 2 );
var boxStartX = horizMargin2;

var boxLen = canvasWidth2 - ( 2 * horizMargin2 );

//For divider lines inside the box for array elements
var lineOffset = canvasWidth / numOfBars;


//drawing the box

ctx2.fillStyle = "#000";
drawRect(ctx2, boxStartX, boxStartY, boxLen, boxWidth);


// drawing the divider lines

var startX = lineOffset;	// start drawing lines for the offset 

for (var i = 1; i <= numOfBars - 1; i++)
{
	drawLine(ctx2, startX, boxStartY, startX, boxStartY + boxWidth);
	startX += lineOffset;
}	
