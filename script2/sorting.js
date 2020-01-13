/* This is the base class for all the sorting class.

  	Functions to call for animation:
  	
  	update()	: returns false when the sorting is done and 
  				  nothing is left to animate, otherwise true.
	draw(ctx)	: draws the bar on ot the cnavas using its
				  graphics context passed as ctx. 
	
*/

class Sorting
{
	constructor(bars, canvasWidth, canvasHeight, whichAlgo)
	{
		this.bars = bars;				  // The array containing the bars
		this.len = this.bars.length;	  // The number of bars
		this.canvasWidth = canvasWidth;   // Width of the canvas
		this.canvasHeight = canvasHeight;  // Height of the canvas

		this.isAnimating = false;		// Tells if the bars are moving
		this.comparing = false;
		this.swapped = false;
		this.bar1 = null;				// Moving bar 1	
		this.bar2 = null;				// Moving bar 2

		this.whichAlgo = whichAlgo;

		this.done = false;

		// This stores the last time the update function is called
		this.lastTime = 0;

		//for drawing out the index numbers
		this.startX = bars[0].xPos + bars[0].width / 2;
		this.increment = 2 * bars[0].width;

		this.waiting = false;	//variable to check if the animation is waiting for the user to continue (for frame by frame animation)

		this.isFrameByFrame = false;			// for the animation mode (frame by frame or continuous)​

		//console.log(this.startX + ' ' + this.increment);

		this.numOfComparisions = 0;
		this.numOfSwaps = 0;

		//this.animationStoped = false;		// for retaiming the colors one frame longer in case of animation
	}

	animationMessage()
	{
		return "Swapping";
	}

	swappingMessage()
	{
		return "Swapped";
	}

	comparingMessage()
	{
		return "Comparing";
	}

	//Draw the rectangular box inside which the array elements can reside

	abs(num)
	{
		if (num > 0)
			return num;
		else
			return -num;
	}

	nextFrame()
	{
		this.waiting = false;
		this.comparing = false;
		//console.log("This functin is called");
	}

	/* To update the positions of the bars if animating */
	update(timeStamp)
	{
		console.log('This function is supposed to be overrided.');
		console.log(`Last update call was on time : ${timeStamp}`);
	}

	/* To draw the bars onto the screen*/
	draw(ctx)
	{

		//console.log('This function is supposed to be overriden.');

		if (!this.waiting || !this.isFrameByFrame)
		{


			ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

			this.drawStats(ctx);

			for (var i = 0; i < this.len; i++)
				this.bars[i].draw(ctx);

			if (!this.isAnimating)
				this.waiting = true;
		}
	}

	/*

		Swaps the bars in the positions first and second.

			- Swaps the bars in the array 
			- Updates the targetX position of the bars for animation
	*/
	swap(first, second)
	{
		var temp = this.bars[first];
		this.bars[first] = this.bars[second];
		this.bars[second] = temp;

		var temp2 = this.bars[first].index;
		this.bars[first].index = this.bars[second].index;
		this.bars[second].index = temp2;

		this.bars[first].targetX = this.bars[second].xPos;
		this.bars[second].targetX = this.bars[first].xPos;

		this.numOfSwaps++;

		/* Redundant
		this.bar1 = this.bars[j];
		this.bar2 = this.bars[j + 1];*/
	}

	// Animates the bars by moving them towards their targerXPos
	animate(deltaTime)
	{
		this.update2(this.bar1, deltaTime);
		this.update2(this.bar2, deltaTime);

		if ( (this.bar1.xPos == this.bar1.targetX)	&&
			  (this.bar2.xPos == this.bar2.targetX) )
		{
			this.bar1.isCompaired = false;
			this.bar2.isCompaired = false;
			this.bar1.useThird = true;
			this.bar2.useThird = true;
			this.isAnimating = false;
			this.swapped = true;

			var temp = this.bar1.numberXPos;
			this.bar1.numberXPos = this.bar2.numberXPos;
			this.bar2.numberXPos = temp;

			temp = this.bar1.compairednumberXPos;
			this.bar1.compairednumberXPos = this.bar2.compairednumberXPos;
			this.bar2.compairednumberXPos = temp;

		}
	}


	/*This is function actually increment or decrement the xPos of
		the bar  */
	update2(bar, deltaTime)
	{
		if (Math.abs(bar.xPos - bar.targetX) <= (bar.moveSpeed / deltaTime) )
			bar.xPos = bar.targetX;
		else if (bar.xPos > bar.targetX)
			bar.xPos -= bar.moveSpeed / deltaTime;
		else if (bar.xPos < bar.targetX)
			bar.xPos += bar.moveSpeed / deltaTime;
	}


	/* Draw function that is to be called by the functions other than update()

		Purpose : Called when things change outside the update and chnges are to be 
					reflected without affecting the animation
				   
	    Function : only draws the bars without affcting any varialbes.
	*/
	onlyDraw(ctx)
	{

		ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		this.drawStats(ctx);

		for (var i = 0; i < this.len; i++)
			this.bars[i].draw(ctx);

		if (!this.isAnimating)
			this.waiting = true;
	}

	drawStats(ctx)
	{

		ctx.fillStyle = "#436268";
		ctx.font = "bold 17pt Calibari";

		var text1, cmpx;

		if (this.whichAlgo == 1)
		{
			text1 = "Bubble Sort ==> O(n^2)";
		}
		else if (this.whichAlgo == 2)
		{
			text1 = "Insertion Sort ==> O(n^2)";
		}
		else if (this.whichAlgo == 3)
		{
			text1 = "Selection Sort ==> O(n^2)";
		}
		else if (this.whichAlgo == 4)
		{
			text1 = "Merge Sort ==> O(n.logn)";
		}
		else
		{
			text1 = "Quick Sort ==> O(n.logn)";
		}

		ctx.fillText(text1, this.canvasWidth / 2 - ctx.measureText(text1).width / 2, 18);

		ctx.fillStyle = "#cc0000";
		ctx.font = "bold 13pt Calibari";

		var text;
		if (this.whichAlgo != 2)
			text = `No. of swaps :- ${this.numOfSwaps}`;
		else
			text=`No. of shifts :- ${this.numOfSwaps}`;
		
		var text2 = `No. of comparisions :- ${this.numOfComparisions}`;

		ctx.fillText(text, 5, 37);
		ctx.fillText(text2, 5, 57);
	}


	//the limit variable tells which bars to ommit for resetting
	resetFlags()
	{

		for (var i = 0; i < this.bars.length; i++)
			this.bars[i].resetFlags();

		this.comparing = false;
		this.isAnimating = false;
		this.isFrameByFrame = false;
		this.Swapped = false;
	}

	printMessage(ctx, msg, textY)
	{

		ctx.font = "bold 16pt Calibari";

		ctx.fillStyle = "green";
		
		var textX = (this.canvasWidth2 -  ctx.measureText(msg).width) / 2;

		ctx.fillText(msg, textX, textY);
	}

} 
