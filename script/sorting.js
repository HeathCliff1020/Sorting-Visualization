/* This is the base class for all the sorting class.

  	Functions to call for animation:
  	
  	update()	: returns false when the sorting is done and 
  				  nothing is left to animate, otherwise true.
	draw(ctx)	: draws the bar on ot the cnavas using its
				  graphics context passed as ctx. 
	
*/

class Sorting
{
	constructor(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2)
	{
		this.bars = bars;				  // The array containing the bars
		this.len = this.bars.length;	  // The number of bars
		this.canvasWidth = canvasWidth;   // Width of the canvas
		this.canvasHeight = canvasHeight;  // Height of the canvas
		this.canvasHeight2 = canvasHeight2;	//Height of the second canvas
		this.canvasWidth2 = canvasWidth2;	//Width of the second canvas

		this.isAnimating = true;		// Tells if the bars are moving
		this.bar1 = null;				// Moving bar 1	
		this.bar2 = null;				// Moving bar 2

		this.done = false;

		// This stores the last time the update function is called
		this.lastTime = 0;

		//for drawing out the index numbers
		this.startX = bars[0].xPos + bars[0].width / 2;
		this.increment = 2 * bars[0].width;

		this.waiting = false;	//variable to check if the animation is waiting for the user to continue (for frame by frame animation)

		this.isFrameByFrame = true;			// for the animation mode (frame by frame or continuous)​

		//console.log(this.startX + ' ' + this.increment);

		this.horizMargin = 5;		// horizontal margins (from right and left of the canvas) for the array box
		this.boxWidth = 50;			// Width of the box containing the array elements
		this.lineOffset = (this.canvasWidth2 - (2 * this.horizMargin)) / this.bars.length;		// lineOffset is the lenght of the containers for each array element
		this.boxStartY = (this.canvasHeight2 / 2) - (this.boxWidth / 2);		// the starting position of the box (at the center of the canvas)
		this.boxLength = this.canvasWidth2 - (2 * this.horizMargin);	//length of the array box
	}

	//Draw the rectangular box inside which the array elements can reside
	drawArrayBox(ctx)
	{
		//console.log("Draws the box for the array elements.");

		//drawing the box

		ctx.fillStyle = "#99ff99";
		ctx.fillRect(this.horizMargin, this.boxStartY, this.boxLength, this.boxWidth);
		ctx.lineWidth = 3;
		ctx.fillStyle = "#000";
		drawRect(ctx, this.horizMargin, this.boxStartY, this.boxLength, this.boxWidth);
		
		// drawing the divider lines

		var startX = this.lineOffset + this.horizMargin;	// start drawing lines for the offset 

		for (var i = 1; i <= this.bars.length - 1; i++)
		{
			drawLine(ctx, startX, this.boxStartY, startX, this.boxStartY + this.boxWidth);
			startX += this.lineOffset;
		}

		startX = this.horizMargin + (this.lineOffset / 2);
		for (var i = 0; i < this.len; i++)
		{
			ctx.fillStyle = "#000";
			ctx.font = "bold 10pt Calibari";
			ctx.fillText(i.toString(), startX - ctx.measureText(i.toString()).width / 2, this.boxStartY - 5);
			startX += this.lineOffset;
		}	
	}

	nextFrame()
	{
		this.waiting = false;
	}

	/* To update the positions of the bars if animating */
	update(timeStamp)
	{
		console.log('This function is supposed to be overrided.');
		console.log(`Last update call was on time : ${timeStamp}`);
	}

	/* To draw the bars onto the screen*/
	draw(ctx, ctx2)
	{

		console.log('This function is supposed to be overriden.');

		if (!this.waiting || !this.isFrameByFrame)
		{

			//For the second canvas

			ctx2.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
			drawArrayBox(ctx2);

			//For the second canvas	


			ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

			this.drawIndex(ctx, ctx2);

			for (var i = 0; i < this.len; i++)
				this.bars[i].draw(ctx);

			if (!this.isAnimating)
				this.waiting = true;
		}
	}

	drawIndex(ctx)
	{
		var startX = this.startX;
		for (var i = 0; i < this.len; i++)
		{
			ctx.fillStyle = "#000";
			ctx.fillText(i.toString(), startX - ctx.measureText(i.toString()).width / 2, canvasHeight - 5);
			startX += this.increment;
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
			this.isAnimating = false;
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
} 
