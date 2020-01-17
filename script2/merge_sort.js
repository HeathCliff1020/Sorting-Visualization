function Info(start, mid, end, split)
{
	this.start = start;
	this.mid = mid;
	this.end = end;
	this.split = split;
}

class MergeSort extends Sorting
{
	constructor(bars, canvasWidth, canvasHeight, whichAlgo)
	{

		// Calling the super classes' constuctor
		super(bars, canvasWidth, canvasHeight, whichAlgo);

		this.outterVar = 0;			// The i variable in bubble_sort
		this.innerVar = 0;			// The j variable in bubble_sort

		this.callStack = [];       // stack to store the starting, mid and end of the array at different splits.

		this.callStack.push( new Info(0, parseInt((this.bars.length - 1) / 2), this.bars.length - 1, 0) );

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

		this.displayComparision = false;
		this.previ = -1;
		this.prevj = -1;

		this.showArrows = false;
		this.showIndex1 = -1;
		this.showIndex2 = -1;

		this.showArrows2 = false;
		this.show2Index1 = -1;
		this.show2Index2 = -1;
		this.show2Index3 = -1;

		this.showArrows3 = false;
		this.show3Index1 = -1;
		this.show3Index2 = -1;
		this.show3Index3 = -1;
		this.shos3Index4 = -1;
		this.show3Num = -1;

		this.popIt = false;
	}

	drawArrayBox()
	{

		if (this.showArrows)
		{

			for (var i = this.showIndex1; i <= this.showIndex2; i++)
			{
				this.bars[i].useFourth = true;
			}

			this.showArrows = false;

			for (i = this.showIndex1; i <= this.showIndex2; i++)
				this.temp[i] = null;
		}
		else
		{
			if (this.showIndex1 != -1)
			{
				for (var i = this.showIndex1; i <= this.showIndex2; i++)
				{
					this.bars[i].useFourth = false;
				}
			}			
		}

		if (this.showArrows2)
		{	
			this.bars[this.show2Index1].useThird = true;
			this.bars[this.show2Index3].useThird = true;
			this.showArrows2 = false;
		}
		else
		{
			if (this.show2Index1 != -1)
			{
				this.bars[this.show2Index1].useThird = false;
				this.bars[this.show2Index3].useThird = false;
			}
		}

		if (this.showArrows3)
		{
			var I = this.show3Index2;
			var K = this.show3Index1;
			for (var k = 0; k < this.show3Num; k++)
			{
				I++;
				K++;
			}

			for (var i = this.show3Index3; i <= this.show3Index4; i++)
			{
				this.bars[i].finishColor = true;
			}
			this.showArrows3 = false;
		}
		else if (this.show3Index1 != -1)
		{
			for (var i = this.show3Index3; i <= this.show3Index4; i++)
			{
				this.bars[i].finishColor = false;
			}
		}
	}


	merge()
	{

		if (!this.merging)
		{
			this.i = this.top.start;
			this.j = this.top.mid + 1;
			this.k = this.top.start;

			if (this.i == this.top.end)
				this.bars[this.i].useThird = true;

			//starting pos for the bor
			this.startX2 = this.bars[this.top.start].xPos;
			this.startX3 = this.bars[this.top.start].numberXPos;

			this.merging = true;
			this.displayComparision = true;
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

				this.showArrows = true;
				this.showIndex1 = this.top.start;
				this.showIndex2 = this.top.end;
			}

			this.popIt = true;
			return; 
		}


		if (this.i <= this.top.mid && this.j <= this.top.end )
		{
			if (this.displayComparision)
			{
				this.bars[this.i].isCompaired = true;
				this.bars[this.j].isCompaired = true;
				this.displayComparision = false;
				this.previ = this.i;
				this.prevj = this.j;
			}
			else
			{

				if (this.previ != -1)
				{
					this.bars[this.previ].isCompaired = false;
				}
				if (this.prevj != -1)
				{
					this.bars[this.prevj].isCompaired = false;
				}

				if (++this.numOfComparisions && this.bars[this.i].len <= this.bars[this.j].len)
				{
					this.temp[this.k++] = this.bars[this.i++];
					this.showArrows2 = true;
					this.show2Index1 = this.i - 1;
					this.show2Index2 = this.k - 1;
					this.show2Index3 = this.j;
				}
				else
				{
					this.temp[this.k++] = this.bars[this.j++];
					this.showArrows2 = true;
					this.show2Index1 = this.j - 1;
					this.show2Index2 = this.k - 1;
					this.show2Index3 = this.i;				
				}
		
				this.displayComparision = true;
			}

		}
		else
		{
			this.showArrows3 = true;
			this.show3Index1 = this.k;
			this.show3Index3 = this.top.start;
			this.show3Index4 = this.top.end;

			if (this.i <= this.top.mid)
				this.show3Index2 = this.i;
			else
				this.show3Index2 = this.j;

			this.show3Num = 0;

			while (this.i <= this.top.mid)
			{
				this.temp[this.k++] = this.bars[this.i++];
				this.show3Num++;
			}
			while (this.j <= this.top.end)
			{
				this.temp[this.k++] = this.bars[this.j++];
				this.show3Num++;
			}
		}
	}

	update(timeStamp)
	{

		if (this.popIt)
		{
			this.callStack.pop();
			this.popIt = false;
		}

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
