myCanvas = document.getElementById("myCanvas");
ctx = myCanvas.getContext('2d');

myCanvas2 = document.getElementById("myCanvas2");
ctx2 = myCanvas2.getContext('2d');


/*	Setting the height of the two canvases	*/


var canvasHeight = 400;
var canvasWidth = 600;

var canvasHeight2 = 400;
var canvasWidth2 = 600;


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
var barMaxLenght = 100;
var startBarX = horizMargin;
var startBarY = canvasHeight - bottomMargin;

var barGap = (canvasWidth - ( 2 * horizMargin )) / (2 * numOfBars - 1);
var barWidth = barGap;

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
var changingValue = document.getElementById("changeNumber").checked;
var isFrameByFrame = document.getElementById("frameByFrame").checked;

fillIndexSelection();

createArray(1);

/*
	Setting the event listener for the button that moves the animation forward frame by frame.
*/
document.getElementById('next').addEventListener("click", myFunction); 

function myFunction()
{
	if (isFrameByFrame)
		sort.nextFrame();
}

requestAnimationFrame(animationLoop);

function animationLoop(timeStamp)
{
	if (!changingValue)
	{

		if (animating || isFrameByFrame)
		{
			if (!done)
			{
				done = sort.update(timeStamp);
				sort.draw(ctx, ctx2);
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
					
					sort.onlyDraw(ctx, ctx2);
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
	}
	else
	{
		/*
		if (upArrowImg != null)
		{
			var index = document.getElementById("index").selectedIndex;
			var x = bars[index].numberXPos - (sort.lineOffset / 4);
			ctx2.drawImage(upArrowImg, x - 10, canvasHeight2 - 70, sort.lineOffset - 5, 70);
			console.log(x);
		}
		*/
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
		sort = new BubbleSort(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2);
	else if (whichAlgo == 2)
		sort = new InsertionSort(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2);
	else if (whichAlgo == 3)
		sort = new SelectionSort(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2);
	else
		sort = new MergeSort(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2);

	done = false;		// variable for checking if the sorting is completed or not
	onlyOnce = true;
	index = 0;
	finish = finishSpeed;
	finishInc = 1;

	setPosInBox();

	sort.onlyDraw(ctx, ctx2);

	animating = false;
	sort.isFrameByFrame = isFrameByFrame;
	changingValue = document.getElementById("changeNumber").checked;
}

/* Function to set the array element positions in the array bar (In the second canvas) */ 
function setPosInBox()
{
	//Settirg the values for the positions of array element in the box (container)
	var startX = (sort.lineOffset / 2) + sort.horizMargin;
	for (var i = 0; i < bars.length; i++)
	{
		bars[i].numberYPos = sort.boxStartY + (sort.boxWidth / 2);
		bars[i].numberXPos = startX;
		bars[i].boxWidth = sort.boxWidth;
		bars[i].boxStartY = sort.boxStartY;
		bars[i].lineOffset = sort.lineOffset;
		startX += sort.lineOffset;

		if (whichAlgo == 4)
		{
			bars[i].numberYPos += sort.boxAdjustment;
		}
	}
}

/* Function setting the values for the array element selectors .*/

function fillIndexSelection()
{

	for(var i=0; i < numOfBars; i++){

	    	var select = document.getElementById("index");
		    var option = document.createElement("OPTION");
		    select.options.add(option);
		    option.text = i;
		    option.value = i;
	}
}

function emptySelections()
{
	$('#index').empty();
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

	emptySelections();
	fillIndexSelection();
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

/*The function toggles between the animation and the frame by frame state*/

function changeFrameByFrame(changedValue)
{

	for (var i = 0; i < bars.length; i++)
		console.log(i + " :-" + bars[i].len);

	//console.log(changedValue);
	isFrameByFrame = changedValue;

	sort.isFrameByFrame = isFrameByFrame;
	animating = false;
}


/* Function to change the array element */ 

function changeArrayElement()
{
	if (changingValue)
	{
		var index = document.getElementById("index");
		var selection = document.getElementById("numbers");

		bars[index.selectedIndex].len = eval(selection.value);

		sort.onlyDraw(ctx, ctx2);
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