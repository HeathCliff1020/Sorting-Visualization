/*
void insertionSort(int arr[], int n)  
{  
    int i, key, j;  
    for (i = 1; i < n; i++) 
    {  
        key = arr[i];  
        j = i - 1;  
  
        // Move elements of arr[0..i-1], that are  
        //greater than key, to one position ahead  
        //of their current position
        while (j >= 0 && arr[j] > key) 
        {  
            arr[j + 1] = arr[j];  
            j = j - 1;  
        }  
        arr[j + 1] = key;  
    }  
}  
*/


class InsertionSort extends Sorting
{
	constructor(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2)
	{

		// Calling the super classes' constuctor
		super(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2);

		// for variable i in the insertion sort algo.
		this.outterVar = 1;		

		// for the variable key in the insertion sort algo.
		this.key = this.bars[this.outterVar]; 		

		// for the variable j in the insertion sort algo.					
		this.innerVar = this.outterVar - 1;		
		
		this.animatingBars = [];	
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
			// changing back the colors of the animating bars to normal
			for (var i = 0; i < this.animatingBars.length; i++)
			{

				// resetting the key bar movespeed to normal	
				this.key.moveSpeed = this.key.baseMoveSpeed;

				this.animatingBars[i].useThird = false;
				this.animatingBars[i].isCompaired = false;
			}

			//Empting the animatngBars array
			this.animatingBars = [];

			if (this.outterVar < this.len)
			{
				this.key = this.bars[this.outterVar];
				// changing the color of the key element
				this.bars[this.outterVar].useThird = true;  
		        this.innerVar = this.outterVar - 1;  
		  
		        while (this.innerVar >= 0 && this.bars[this.innerVar].len > this.key.len) 
		        {  
		        	// changing color of the compaired bar
		        	this.bars[this.innerVar].isCompaired = true;
		        	// moving the bar to the next index
		            this.bars[this.innerVar].targetX = this.bars[this.innerVar + 1].xPos;
		            // puhing the bar to the animating list of bar
		            this.animatingBars.push(this.bars[this.innerVar]);
		            //actually moving the bar one index ahead in the array
		            this.bars[this.innerVar + 1] = this.bars[this.innerVar];  
		            this.innerVar = this.innerVar - 1;  
		        }
		        // updating the target position of the key element(bar)
		        this.key.targetX = this.bars[this.innerVar + 1].xPos;
		        // placing the key element(bar) in its correct position  
		        this.bars[this.innerVar + 1] = this.key;		        
		        //adding the key element to the animating list
		        this.animatingBars.push(this.key);	

		        this.outterVar++;
		        this.isAnimating = true;

		        this.key.moveSpeed = this.key.baseMoveSpeed * (this.animatingBars.length);
			}
			else
			{
				this.done = true;
			}
		}
		else if (this.animatingBars.length > 0)
		{
			let flag = true;
			for (var i = 0; i < this.animatingBars.length; i++)
			{
				if (this.animatingBars[i].xPos != this.animatingBars[i].targetX)
				{
					flag = false;
					this.update2(this.animatingBars[i], deltaTime);
				}
			}

			if (flag)
				this.isAnimating = false;
		}
		else
		{
			this.isAnimating = false;
		}

		return false;

	}

}