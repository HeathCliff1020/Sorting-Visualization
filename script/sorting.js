/* This is the base class for all the sorting class.

  	Functions to call for animation:
  	
  	update()	: returns false when the sorting is done and 
  				  nothing is left to animate, otherwise true.
	draw(ctx)	: draws the bar on ot the cnavas using its
				  graphics context passed as ctx. 
	
*/

class Sorting
{
	constructor(bars, canvasWidth, canvasHeight)
	{
		this.bars = bars;				  // The array containing the bars
		this.canvasWidth = canvasWidth;   // Width of the canvas
		this.canvasHight = canvasHeight;  // Height of the canvas

		this.isAnimating = false;		// Tells if the bars are moving
		this.bar1 = null;				// Moving bar 1	
		this.bar2 = null;				// Moving bar 2

		this.done = false;

		// This stores the last time the update function is called
		this.lastTime = 0;
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
		console.log('This function is supposed to be overrided.');
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
} 
