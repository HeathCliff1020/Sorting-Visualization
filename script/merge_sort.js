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
	constructor(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2)
	{

		// Calling the super classes' constuctor
		super(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2);

		this.outterVar = 0;			// The i variable in bubble_sort
		this.innerVar = 0;			// The j variable in bubble_sort

		this.callStack = [];       // stack to store the starting, mid and end of the array at different splits.

		this.callStack.push( new Info(0, parseInt(this.bars.length / 2), this.bars.length - 1, 0) );
	}

	merge(start, mid, end)
	{

		var temp = array(this.bars.length);
		var i = start;
		var j = mid + 1, k = start;


		while (i < mid && j < end)
		{
			if (this.bars[i].len <= this.bars[j].len)
				temp[k++] = bars[i++];
			else
				temp[k++] = bars[j++];
		}

		while (i < mid)
		{
			temp[k++] = bars[i++];
		}
		while (j < end)
		{
			temp[k++] = bars[j++];
		}

		for (var a = start; a <= end; a++)
			bars[a] = temp[a];

	}

	update(timeStamp)
	{
		while( this.callStack.length > 0 )
		{
			var top = this.callStack[this.callStack.length - 1];

			if (top.split == 0)
			{
				if (top.mid + 1 < top.end)
				{
					this.callStack.push( new Info(top.mid + 1, parseInt( (top.mid + 1 + top.end) / 2), top.end, 0 ) );
				}
				if (top.start < top.mid)
				{
					this.callStack.push( new Info(top.start, parseInt( (top.start + top.mid) / 2), top.mid, 0 ) );
				}
			}
			else
			{
				this.merge(top.start, top.mid, top.end);
				this.callStack.pop();
			}
		}

		this.done = true;
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
