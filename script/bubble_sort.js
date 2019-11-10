
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
			this.resetFlags();
			return this.done;
		}

		if (!this.waiting || !this.isFrameByFrame)
		{

			if (!this.isAnimating)
			{
				if ( this.innerVar < this.len - 1 - this.outterVar )
				{
					this.compareBars();
				}
				else
				{
					this.outterVar++;
					this.innerVar = 0;
					if ( !(this.outterVar < this.len - 1) )
						this.done = true;
					else
					{
						this.compareBars();
				
						this.bars[this.bars.length - this.outterVar].useFourth = true;
					}
				}
			}
			else if (this.bar1 != null && this.bar2 != null)
			{
				//document.write("The animate function is calles");
				
				//Update the positions of the bars
				if (!this.comparing || !this.isFrameByFrame)
				{
					this.comparing = false;
					this.animate(deltaTime);
				}
			}
			else
			{
				this.isAnimating = false;
			}
		}

		return false;
	}

	
	compareBars()
	{
		this.swapped = false;

		if (this.bar1 != null && this.bar2 != null)
		{
			this.bar1.useThird = false;
			this.bar1.isCompaired = false;
			this.bar2.useThird = false;
			this.bar2.isCompaired = false;
		} 

		this.comparing = true;
		this.isAnimating = false;
		this.Swapped = false;

		this.bar1 = this.bars[this.innerVar];
		this.bar2 = this.bars[this.innerVar + 1];
		this.bars[this.innerVar].isCompaired = true;
		this.bars[this.innerVar + 1].isCompaired = true;
		this.bar1.compairednumberXPos = this.bar2.numberXPos;
		this.bar2.compairednumberXPos = this.bar1.numberXPos;
		if (this.bars[this.innerVar].len > this.bars[this.innerVar + 1].len)		// swap if the elements are not in order
		{
			this.swap(this.innerVar, this.innerVar + 1);

			//setting animation to true for swapping the bars
			this.isAnimating = true;					
		}
		this.innerVar++;
		this.numOfComparisions++;
	}

	animationMessage()
	{
		return "Swapping " + this.bar1.len + " and " + this.bar2.len;
	}

	swappingMessage()
	{
		return "Swapped " + this.bar2.len + " and " + this.bar1.len;
	}

	comparingMessage()
	{
		var msg = "Comparing : ";

		if (this.bar1.len > this.bar2.len)
			msg += this.bar1.len + " > " + this.bar2.len + ", so will be swapped.";
		else if (this.bar1.len < this.bar2.len) 
			msg += this.bar1.len + " < " + this.bar2.len + ", so not be swapped.";
		else
			msg += this.bar1.len + " = " + this.bar2.len + ", so not be swapped.";

		return msg;
	}

}
