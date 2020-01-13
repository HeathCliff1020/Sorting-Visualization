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
						this.bar1.compairednumberXPos = this.bar2.numberXPos;
						this.bar2.compairednumberXPos = this.bar1.numberXPos;

						//console.log(minimum + " " + this.outterVar);

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

	animationMessage()
	{
		return "Animating";
	}

	swappingMessage()
	{
		return "Swapping";
	}

	comparingMessage()
	{
		return "Comparing";
	}

}