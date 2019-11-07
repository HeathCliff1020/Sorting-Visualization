myCanvas = document.getElementById("myCanvas");
ctx = myCanvas.getContext('2d');

myCanvas2 = document.getElementById("myCanvas2");
ctx2 = myCanvas2.getContext('2d');


/*	Setting the height of the two canvases	*/


var canvasHeight = 400;
var canvasWidth = 600;

var canvasHeight2 = 200;
var canvasWidth2 = 500;


// variable values to canvas values


myCanvas.height = canvasHeight;
myCanvas.width = canvasWidth;

myCanvas2.height = canvasHeight2;
myCanvas2.width = canvasWidth2;



// canvas values to variable values

/*
canvasHeight = myCanvas.height;
canvasWidth = myCanvas.width;

canvasHeight2 = myCanvas2.height;
canvasWidth2 = myCanvas2.width;
*/

/**********************************************/



var horizMargin = 25;
var bottomMargin = 20;

var numOfBars = document.getElementById("myRange").value;
var barMinLength = 1;
var barMaxLenght = 100;
var startBarX = horizMargin;
var startBarY = canvasHeight - bottomMargin;

var barGap = (canvasWidth - ( 2 * horizMargin )) / (2 * numOfBars - 1);
var barWidth = barGap;

//var barWidth = (canvasWidth - ((numOfBars + 1) * barGap)) / numOfBars;

var bars;
var sort;
var done;

var animating = false;

createArray();

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
	if (animating)
	{
		if (!done)
		{
			done = sort.update(timeStamp);
			sort.draw(ctx, ctx2);
		}
	}

	requestAnimationFrame(animationLoop);
}


// Finction to create the new Array with random values

function createArray()
{
	bars = new Array(numOfBars);

	var x = startBarX;
	var y = startBarY;
	for (var i = 0; i < numOfBars; i++)
	{
		var length = Math.floor(Math.random() * (barMaxLenght - barMinLength + 1)) + barMinLength;
		bars[i] = new Bar(x, y, barWidth, length, "#e65c00", '#f00', ' #b3b300');

		bars[i].index = i;

		x += barWidth + barGap;
	}

	sort = new BubbleSort(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2);

	done = false;		// variable for checking if the sorting is completed or not


	//Settirg the values for the positions of array element in the box (container)
	var startX = (sort.lineOffset / 2) + sort.horizMargin;
	for (var i = 0; i < bars.length; i++)
	{
		bars[i].numberYPos = sort.boxStartY + (sort.boxWidth / 2);
		bars[i].numberXPos = startX;
		startX += sort.lineOffset;
	}

	sort.draw(ctx, ctx2);

}


/* Function to change the number of bars that are being sorted.

	  It does 3 things:
	  	
	  	1. Stops the animation.
	  	2. Creates the new array with the updated value of numberOfBars.
*/

function recreateBars(changedValue)
{
	// 1.
	animating = false;		

	//2.
	numOfBars = changedValue;
	barGap = (canvasWidth - ( 2 * horizMargin )) / (2 * numOfBars - 1);
	barWidth = barGap;
	createArray();
}

/*Starts the animating*/
function startAnimation()
{
	animating = true;
}

/*Pauses the animation*/
function pauseAnimation()
{
	animating = false;
}