/*
void selectionSort(int arr[], int n)  
{  
    int i, j, min_idx;  
  
    // One by one move boundary of unsorted subarray  
    for (i = 0; i < n-1; i++)  
    {  
        // Find the minimum element in unsorted array  
        min_idx = i;  
        for (j = i+1; j < n; j++)  
        if (arr[j] < arr[min_idx])  
            min_idx = j;  
  
        // Swap the found minimum element with the first element  
        swap(&arr[min_idx], &arr[i]);  
    }  
} 
*/ 

class SelectionSort extends Sorting
{
	constructor(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2, whichAlgo)
	{

		// Calling the super classes' constuctor
		super(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2, whichAlgo);

		// for variable i in the selection sort algo.
		this.outterVar = 0;		

		this.min = -1; // assigning min to -1 so the the outter varialble will not be incremented the first time
					   // , the outter variable is incremented early(before animations) if its value is same as min

		this.showingMinimum = false;
		this.tweak = false;	// For handling error when min = outterVar + 1
	}

	update(timeStamp)
	{

		var deltaTime = timeStamp - this.lastTime;
		this.lastTime = timeStamp;
		
		if (this.done) 
		{
			this.resetFlags();	
			return this.done;
		}

		if (!this.waiting || !this.isFrameByFrame)
		{

			if (!this.isAnimating)		// Enters only when not animating
			{

				this.swapped = false;

				if (this.bar1 != null && this.bar2 != null)
				{
					this.bar1.useThird = false;
					this.bar1.isCompaired = false;
					this.bar2.useThird = false;
					this.bar2.isCompaired = false;
				}

				if (this.outterVar < this.bars.length - 1)		// Loop will run from the first element to the second last element
				{
					if (!this.showingMinimum || this.min == this.outterVar)
					{

						if (this.min == this.outterVar && !this.tweak)
							this.outterVar++;

						this.tweak = false;

						this.min = this.outterVar;				// assuming the first element is the minimum

						// Finding the minimim element among the remaining unsorted array
						for (var innerVar = this.min + 1; innerVar < this.bars.length; innerVar++)
						{
							this.numOfComparisions++;
							if (this.bars[innerVar].len < this.bars[this.min].len)
								this.min = innerVar;
						}

						this.showingMinimum = true;

					}
					else 
						this.showingMinimum = false;

					if (!this.showingMinimum)
					{

						this.comparing = true;
						
						this.bars[this.min].useFourth = true;

						this.bar1 = this.bars[this.min];				// The minimum element in the remaining unsorted array
						this.bar2 = this.bars[this.outterVar];	// The element at position one after the sorted array
						this.bars[this.min].isCompaired = true;
						this.bars[this.outterVar].isCompaired = true;
						this.bar1.compairednumberXPos = this.bar2.index;
						this.bar2.compairednumberXPos = this.bar1.index;

						//console.log(minimum + " " + this.outterVar);

						this.bars[this.min].moveSpeed = (this.bars[this.min].baseMoveSpeed) * 3;
						this.bars[this.outterVar].moveSpeed = this.bars[this.min].moveSpeed;

						this.swap(this.min, this.outterVar);
							
						//setting animation to true for swapping the bars
						this.isAnimating = true;					

						if (this.min == this.outterVar + 1)
							this.tweak = true;

						this.outterVar++;
					}
					else
					{
						this.bars[this.min].useFourth = true;
					}
				}	
				else
				{
					this.done = true;
				}
			}
			else
			{
				if (!this.comparing || !this.isFrameByFrame)
				{
					this.comparing = false;
					this.animate(deltaTime);
				}
			}
		}

		return false;

	}

	abs(v)
	{
		if (v < 0)
			return -v;
		else
			return v;
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
			if (this.lineOffset >= 20)
				ctx.font = "bold 10pt Calibari";
			else if (this.lineOffset >= 16)
				ctx.font = "bold 8pt Calibari";
			else
				ctx.font = "bold 7pt Calibari";
			ctx.fillText(i.toString(), startX - ctx.measureText(i.toString()).width / 2, this.boxStartY - 5);
			startX += this.lineOffset;
		}

		if (this.done)
		{
			this.printMessage(ctx, "Array Sorted", this.boxStartY + this.boxWidth + 60);
		}
		else if (this.isAnimating && !this.comparing && !this.swapped)
		{
			this.printMessage(ctx, this.animationMessage(), this.boxStartY + this.boxWidth + 60);
		}
		else if (this.comparing)
		{
			this.printMessage(ctx, this.comparingMessage(), this.boxStartY + this.boxWidth + 60);
		}	
		else if (this.swapped)
		{
			this.printMessage(ctx, this.swappingMessage(), this.boxStartY + this.boxWidth + 60);
		}
		else if (this.showingMinimum)
		{
			this.printMessage(ctx, this.showingMsg(), this.boxStartY + this.boxWidth + 60);
		}

	}

	animationMessage()
	{
		return "Swapping Elements";
	}

	swappingMessage()
	{
		return "Items Swapped";
	}

	comparingMessage()
	{
		return this.bars[this.outterVar - 1].len + " Will Go to Index " + (this.outterVar - 1);
	}

	showingMsg()
	{
		if (this.min == this.outterVar)
			return this.bars[this.min].len + " is in Correct Index";
		else
			return this.bars[this.min].len + " is Minimum";
	}

}