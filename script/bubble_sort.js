
/*This class is for animating the bubble_sort animation.
  
  Main functions to call for animation:
  	
  	update()	: returns false when the sorting is done and 
  				  nothing is left to animate, otherwise true.
	draw(ctx)	: draws the bar on ot the cnavas using its
				  graphics context passed as ctx. 
*/
class BubbleSort extends Sorting
{
	constructor(bars, canvasWidth, canvasHeight)
	{

		// Calling the super classes' constuctor
		super(bars, canvasWidth, canvasHeight)

		this.outterVar = 0;			// The i variable in bubble_sort
		this.innerVar = 0;			// The j variable in bubble_sort
	}


	/*
	Overridden function 

		: Draws the bars onto the screen
	*/
	draw(ctx)
	{
		//document.write("Came Here");
		ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		for (var i = 0; i < this.len; i++)
			this.bars[i].draw(ctx);

		if (!this.isAnimating)
		{
			this.bar1.isCompaired = false;
			this.bar2.isCompaired = false;
		}
	}


	/* 
	Overridden function

		: updates the position of the bars when animating.
	*/
	update(timeStamp)
	{
		var deltaTime = timeStamp - this.lastTime;
		this.lastTime = timeStamp;
		
		if (this.done) 
		{
			alert("Sorted");
			return this.done;
		}

		if (!this.isAnimating)
		{
			if ( this.innerVar < this.len - 1 - this.outterVar )
			{
				this.bar1 = this.bars[this.innerVar];
				this.bar2 = this.bars[this.innerVar + 1];
				this.bars[this.innerVar].isCompaired = true;
				this.bars[this.innerVar + 1].isCompaired = true;
				if (this.bars[this.innerVar].len > this.bars[this.innerVar + 1].len)
				{
					this.swap(this.innerVar, this.innerVar + 1);
					this.isAnimating = true;
				}
				this.innerVar++;
			}
			else
			{
				this.outterVar++;
				this.innerVar = 0;
				if ( !(this.outterVar < this.len - 1) )
					this.done = true;
			}
		}
		else if (this.bar1 != null && this.bar2 != null)
		{
			//document.write("The animate function is calles");
			//Update the positions of the bars
			this.animate(deltaTime);
		}
		else
		{
			isAnimating = false;
		}

		return false;
	}

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