myCanvas = document.getElementById("myCanvas");
ctx = myCanvas.getContext('2d');

/*	Setting the height of the two canvases	*/


var canvasHeight = 350;
var canvasWidth = document.getElementById("firstCanvas").offsetWidth - 12;

// variable values to canvas values


myCanvas.height = canvasHeight;
myCanvas.width = canvasWidth;


// canvas values to variable values

/*
canvasHeight = myCanvas.height;
canvasWidth = myCanvas.width;

canvasHeight2 = myCanvas2.height;
canvasWidth2 = myCanvas2.width;
*/

/**********************************************/


/*	Which Algo stores which sorting algorithm is being used

		1 --> Bubble Sort
		2 --> Insertion Sort
		3 --> Selection Sort
		4 --> Merge Sort
		5 --> Quick Sort

*/
var whichAlgo = document.getElementById("select_sort").selectedIndex + 1;

var horizMargin = 25;
var bottomMargin = 20;

var numOfBars = document.getElementById("myRange").value;
var barMinLength = 1;
var barMaxLenght = 99;
var startBarX = horizMargin;
var startBarY = canvasHeight - bottomMargin;

var barGap = (canvasWidth - ( 2 * horizMargin )) / (2 * numOfBars - 1);
var barWidth = barGap;

var output = document.getElementById("output1");

output.value = document.getElementById("myRange").value;

//var barWidth = (canvasWidth - ((numOfBars + 1) * barGap)) / numOfBars;

var bars;
var sort;
var done;
var onlyOnce;
var upArrowImg = null;
var index;
var finishSpeed = 2;
var finish;
var finishInc; 

var animating = false;

createArray(1);

/*
	Setting the event listener for the button that moves the animation forward frame by frame.
*/

function myFunction()
{
	if (isFrameByFrame)
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
			sort.draw(ctx);
		}
		else if (onlyOnce)
		{
			finish++;

			if (finish >= finishSpeed)
			{
				if (finishInc == 1)
				{
					bars[index].finishColor = true;
					bars[index].finishColor2 = false;
				}
				else
				{
					console.log(index);
					bars[index].finishColor = false;
					bars[index].finishColor2 = true;
				}
				
				sort.onlyDraw(ctx);
				index += finishInc;

				if (index == bars.length)
				{
					finishInc = -1;
					index = bars.length - 1;
				}

				if (index == -1)
				{
					onlyOnce = false;
					finishInc = 1;
					index = 0;
				}

				finish = 0;
			}
		}
	}
	requestAnimationFrame(animationLoop);
}


/* Finction to create the new Array with random values

		The mode parameter tells weather to generate random values ( for mode = 1 )
		or only to create the new sorting object and keeping the previous values as they are. (for mode = 0)
	
*/

function createArray(mode)
{
	var oldBars;

	if (mode == 0)
		oldBars = bars;

	bars = new Array(numOfBars);

	var x = startBarX;
	var y = startBarY;


	for (var i = 0; i < numOfBars; i++)
	{
		var length;

		if (mode == 1)
		{
			length = Math.floor(Math.random() * (barMaxLenght - barMinLength + 1)) + barMinLength;
		}
		else
			length = oldBars[i].len;

		bars[i] = new Bar(x, y, barWidth, length, "#e65c00", '#f00', '#b3b300', '#0f0', "#352", "#ff9900");
		
		bars[i].index = i;

		x += barWidth + barGap;
	}

	if (whichAlgo ==1)
		sort = new BubbleSort(bars, canvasWidth, canvasHeight, whichAlgo);
	else if (whichAlgo == 2)
		sort = new InsertionSort(bars, canvasWidth, canvasHeight, whichAlgo);
	else if (whichAlgo == 3)
		sort = new SelectionSort(bars, canvasWidth, canvasHeight, whichAlgo);
	else
		sort = new MergeSort(bars, canvasWidth, canvasHeight, whichAlgo);

	done = false;		// variable for checking if the sorting is completed or not
	onlyOnce = true;
	index = 0;
	finish = finishSpeed;
	finishInc = 1;

	sort.onlyDraw(ctx);

	animating = false;
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
	createArray(1);

	output.value = changedValue;
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


function changeArrayElement()
{
	if (changingValue)
	{
		var index = document.getElementById("index");
		var selection = document.getElementById("numbers");

		bars[index.selectedIndex].len = eval(selection.value);

		sort.onlyDraw(ctx);
	}
}

/*

	This function is for the value change mode

*/
function changeValues(checkValue)
{
	changingValue = checkValue;
	animating = false;
	sort.onlyDraw(ctx, ctx2);

	if (checkValue)
	{
		createArray(0);
	}
}


//Loads the up arrow image
function loadImage()
{
	upArrowImg = document.getElementById("upArrow");
}


//Changes the algorithm used for sorting
function changeAlgo()
{
	whichAlgo = document.getElementById("select_sort").selectedIndex + 1;
	createArray(0);
}

elem1 = $("#firstCanvas")[0]; 
  
        let resizeObserver1 = new ResizeObserver(() => { 
            canvasWidth = document.getElementById("firstCanvas").offsetWidth - 12; 
            myCanvas.width = canvasWidth;

            changePosAndWidth();

            sort.onlyDraw(ctx);
    }); 
  
resizeObserver1.observe(elem1);


function changePosAndWidth()
{

	startBarY = canvasHeight - bottomMargin;

	barGap = (canvasWidth - ( 2 * horizMargin )) / (2 * numOfBars - 1);
	barWidth = barGap;

	var x = startBarX;
	var y = startBarY;


	for (var i = 0; i < numOfBars; i++)
	{
		bars[i].xPos = x;
		bars[i].yPos = y;
		bars[i].width = barWidth;

		bars[i].targetX = x;

		x += barWidth + barGap;
	}

	sort.canvasWidth = canvasWidth;

	sort.startX = bars[0].xPos + bars[0].width / 2;
	sort.increment = 2 * bars[0].width;

}

function recreateBars2()
{
	recreateBars(document.getElementById("myRange").value);
}