
/*This class is for animating the bubble_sort animation.
  
  Main functions to call for animation:
  	
  	update()	: returns false when the sorting is done and 
  				  nothing is left to animate, otherwise true.
	draw(ctx)	: draws the bar on ot the cnavas using its
				  graphics context passed as ctx. 
*/
class BubbleSort
{
	constructor(bars, canvasWidth, canvasHeight)
	{
		this.bars = bars;				// The bars array
		this.len = this.bars.length;	//
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;

		this.isAnimating = false;
		this.bar1 = null;
		this.bar2 = null;

		this.outterVar = 0;
		this.innerVar = 0;

		this.done = false;
		this.lastTime = 0;
	}

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

	swap(j)
	{
		var temp = this.bars[j];
		this.bars[j] = this.bars[j + 1];
		this.bars[j + 1] = temp;

		this.bars[j].targetX = this.bars[j + 1].xPos;
		this.bars[j + 1].targetX = this.bars[j].xPos;

		/* Redundant
		this.bar1 = this.bars[j];
		this.bar2 = this.bars[j + 1];*/
	}

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
					this.swap(this.innerVar);
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