myCanvas = document.getElementById("myCanvas");
ctx = myCanvas.getContext('2d');

var canvasHeight = myCanvas.height;
var canvasWidth = myCanvas.width;


var horizMargin = 25;
var bottomMargin = 30;

var numOfBars = 10;
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
	var length = Math.random() * (barMaxLenght - barMinLength) + barMinLength;
	bars[i] = new Bar(x, y, barWidth, length, "#456533", '#f00');

	x += barWidth + barGap;
}

var bubble_sort = new BubbleSort(bars, canvasWidth, canvasHeight);

var done = false;

requestAnimationFrame(animationLoop);

function animationLoop(timeStamp)
{
	if (!done)
	{
		done = bubble_sort.update(timeStamp);
		bubble_sort.draw(ctx);
	}

	requestAnimationFrame(animationLoop);

}