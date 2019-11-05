
/*This class is for animating the bubble_sort animation.
  
  Main functions to call for animation:
  	
  	update()	: returns false when the sorting is done and 
  				  nothing is left to animate, otherwise true.
	draw(ctx)	: draws the bar on ot the cnavas using its
				  graphics context passed as ctx. 
*/
class BubbleSort extends Sorting
{
	constructor(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2)
	{

		// Calling the super classes' constuctor
		super(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2);

		this.outterVar = 0;			// The i variable in bubble_sort
		this.innerVar = 0;			// The j variable in bubble_sort
	}


	/*
	Overridden function 

		: Draws the bars onto the screen
	*/
	draw(ctx, ctx2)
	{

		//document.write("Came Here");
		if (!this.waiting || !this.isFrameByFrame)
		{

			//For the second canvas

			ctx2.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
			this.drawArrayBox(ctx2);

			//For the second canvas	


			ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

			this.drawIndex(ctx);

			for (var i = 0; i < this.len; i++)
				this.bars[i].draw(ctx, ctx2);

			if (!this.isAnimating && this.bar1 != null && this.bar2 != null)
			{
				this.bar1.isCompaired = false;
				this.bar2.isCompaired = false;
			}

			if (!this.isAnimating)
				this.waiting = true;
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
			//alert("Sorted");
			return this.done;
		}

		if (!this.waiting || !this.isFrameByFrame)
		{

			if (!this.isAnimating)
			{
				if ( this.innerVar < this.len - 1 - this.outterVar )
				{
					this.bar1 = this.bars[this.innerVar];
					this.bar2 = this.bars[this.innerVar + 1];
					this.bars[this.innerVar].isCompaired = true;
					this.bars[this.innerVar + 1].isCompaired = true;
					if (this.bars[this.innerVar].len > this.bars[this.innerVar + 1].len)		// swap if the elements are not in order
					{
						this.swap(this.innerVar, this.innerVar + 1);

						//setting animation to true for swapping the bars
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
				this.isAnimating = false;
			}
		}

		return false;
	}

}
