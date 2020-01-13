/*void merge(int arr[], int l, int m, int r) 
{ 
    int i, j, k; 
    int n1 = m - l + 1; 
    int n2 =  r - m; 
  
    // create temp arrays 
    int L[n1], R[n2]; 
  
    // Copy data to temp arrays L[] and R[] 
    for (i = 0; i < n1; i++) 
        L[i] = arr[l + i]; 
    for (j = 0; j < n2; j++) 
        R[j] = arr[m + 1+ j]; 
  
    // Merge the temp arrays back into arr[l..r]
    
    i = 0; // Initial index of first subarray 
    j = 0; // Initial index of second subarray 
    k = l; // Initial index of merged subarray 
    while (i < n1 && j < n2) 
    { 
        if (L[i] <= R[j]) 
        { 
            arr[k] = L[i]; 
            i++; 
        } 
        else
        { 
            arr[k] = R[j]; 
            j++; 
        } 
        k++; 
    } 
  
    // Copy the remaining elements of L[], if there 
       are any 
    while (i < n1) 
    { 
        arr[k] = L[i]; 
        i++; 
        k++; 
    } 
  
    // Copy the remaining elements of R[], if there 
       are any 
    while (j < n2) 
    { 
        arr[k] = R[j]; 
        j++; 
        k++; 
    } 
} 
  
// l is for left index and r is right index of the 
//   sub-array of arr to be sorted 
void mergeSort(int arr[], int l, int r) 
{ 
    if (l < r) 
    { 
        // Same as (l+r)/2, but avoids overflow for 
        // large l and h 
        int m = l+(r-l)/2; 
  
        // Sort first and second halves 
        mergeSort(arr, l, m); 
        mergeSort(arr, m+1, r); 
  
        merge(arr, l, m, r); 
    } 
} 
*/

//  a class containing the information about the starting, mid and end of a particular split
function Info(start, mid, end, split)
{
	this.start = start;
	this.mid = mid;
	this.end = end;
	this.split = split;
}



class MergeSort extends Sorting
{
	constructor(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2, whichAlgo)
	{

		// Calling the super classes' constuctor
		super(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2, whichAlgo);

		this.outterVar = 0;			// The i variable in bubble_sort
		this.innerVar = 0;			// The j variable in bubble_sort

		this.callStack = [];       // stack to store the starting, mid and end of the array at different splits.

		this.callStack.push( new Info(0, parseInt((this.bars.length - 1) / 2), this.bars.length - 1, 0) );

		this.tempBoxPadding = 120;
		this.centerUp = 30;
		this.boxAdjustment = (this.tempBoxPadding / 2) + (this.boxWidth / 2) - this.centerUp;

		this.splitting = false;
		this.merging = false;

		this.top = null;		
		this.temp = new Array(this.bars.length);

		for (var i = 0; i < this.bars.length; i++)
		{
			this.temp[i] = null;
		}

		this.i = 0;
		this.j = 0;
		this.k = 0;
		this.startX2 = 0;
		this.startX3 = 0;

		this.tempBoxStartY = this.boxStartY - this.tempBoxPadding + this.boxAdjustment;
	}

	printNumber(ctx, num, size, xPos, yPos, color)
	{
		ctx.fillStyle = color;
		var font = "bold " + size + "pt Calibari"
		ctx.font = font;
		var x = xPos - ctx.measureText(num.toString()).width / 2;
		var y = yPos + parseInt(ctx.font.match(/\d+/), 10) / 2;
		ctx.fillText(num.toString(), x, y);
	}

	drawBoxWithIndex(boxStartY, ctx)
	{
		ctx.fillStyle = "#99ff99";
		ctx.fillRect(this.horizMargin, boxStartY, this.boxLength, this.boxWidth);
		ctx.lineWidth = 3;
		ctx.fillStyle = "#000";
		drawRect(ctx, this.horizMargin, boxStartY, this.boxLength, this.boxWidth);
		
		// drawing the divider lines

		var startX = this.lineOffset + this.horizMargin;	// start drawing lines for the offset 

		for (var i = 1; i <= this.bars.length - 1; i++)
		{
			drawLine(ctx, startX, boxStartY, startX, boxStartY + this.boxWidth);
			startX += this.lineOffset;
		}

		startX = this.horizMargin + (this.lineOffset / 2);
		for (var i = 0; i < this.len; i++)
		{
			ctx.fillStyle = "#000";
			ctx.font = "bold 10pt Calibari";
			ctx.fillText(i.toString(), startX - ctx.measureText(i.toString()).width / 2, boxStartY - 5);
			startX += this.lineOffset;
		}	
	}

	drawArrayBox(ctx)
	{
		//console.log("Draws the box for the array elements.");

		//drawing the box

		this.drawBoxWithIndex(this.boxStartY + this.boxAdjustment, ctx);
		this.drawBoxWithIndex(this.tempBoxStartY, ctx);

		ctx.font = "bold 20pt Calibari";
		ctx.fillStyle = "#00f";
		ctx.fillText("Temporary Array", this.horizMargin, this.tempBoxStartY - 30);

		var size = 10;
		var x = this.horizMargin + this.lineOffset / 2;
		var y = this.tempBoxStartY + this.bars[0].boxWidth / 2;

		for (var i = 0; i < this.temp.length; i++)
		{
			if (this.temp[i] != null)
				this.printNumber(ctx, this.temp[i].len, size, x, y, "#00f");
			x += this.lineOffset;
		}


		var max = -1;

		for ( var i = this.callStack.length - 1; i >= 0 ; i-- )
		{
			if (this.callStack[i].start > max)
			{
				max = this.callStack[i].end;
				this.drawSplitLine(this.callStack[i].start, this.callStack[i].end, ctx);
			}
		}

		if (this.done)
		{
			this.printMessage(ctx, "Array Sorted", this.boxStartY + this.boxWidth + 60);
		}
		else if (this.isAnimating && !this.comparing)
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

	}

	drawSplitLine(start, end, ctx)
	{
		var x1 = this.bars[start].numberXPos;
		var x2 = this.bars[end].numberXPos;
		var y1 = this.bars[start].numberYPos;
		var y2 = this.bars[end].numberYPos;
		var w = this.bars[start].boxWidth;
		drawLine(ctx, x1, y1 + w / 2, x1, y1 + w / 2 + 30);
		drawLine(ctx, x2, y2 + w / 2, x2, y2 + w / 2 + 30);
		drawLine(ctx, x1, y1 + w / 2 + 30, x2, y2 + w / 2 + 30);
	}

	merge()
	{

		if (!this.merging)
		{

			console.log("came here");

			this.i = this.top.start;
			this.j = this.top.mid + 1;
			this.k = this.top.start;

			//starting pos for the bor
			this.startX2 = this.bars[this.top.start].xPos;
			this.startX3 = this.bars[this.top.start].numberXPos;

			this.merging = true;
		}


		if (this.i > this.top.mid && this.j > this.top.end )
		{
			this.merging = false;
			for (var a = this.top.start; a <= this.top.end; a++)
			{	
				this.bars[a] = this.temp[a];
				this.bars[a].xPos = this.startX2;
				this.bars[a].numberXPos = this.startX3;

				this.startX2 += (this.bars[a].width * 2 );
				this.startX3 += this.lineOffset;

				this.temp[a] = null;
			}

			this.callStack.pop();
			return; 
		}

		if (this.i <= this.top.mid && this.j <= this.top.end )
		{

			if (this.bars[this.i].len <= this.bars[this.j].len)
				this.temp[this.k++] = this.bars[this.i++];
			else
				this.temp[this.k++] = this.bars[this.j++];
		}
		else
		{
			if (this.i <= this.top.mid)
			{
				this.temp[this.k++] = this.bars[this.i++];
			}
			if (this.j <= this.top.end)
			{
				this.temp[this.k++] = this.bars[this.j++];
			}
		}
	}

	update(timeStamp)
	{

		if (this.callStack.length <= 0 )
			this.done = true;

		else
		{

			if (this.isFrameByFrame && this.waiting)
				return;

			if (!this.merging)
			{
				this.top = this.callStack[this.callStack.length - 1];

				if (this.top.split == 0)
				{
					if (this.top.mid + 1 < this.top.end)
					{
						this.callStack.push( new Info(this.top.mid + 1, parseInt( (this.top.mid + 1 + this.top.end) / 2), this.top.end, 0 ) );
					}
					if (this.top.start < this.top.mid)
					{
						this.callStack.push( new Info(this.top.start, parseInt( (this.top.start + this.top.mid) / 2), this.top.mid, 0 ) );		
					}

					this.top.split = 1;
				}
				else
				{
					this.merge();
				}
			}

			else
			{
				this.merge();
			}
		}
		
		
		return this.done;
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
