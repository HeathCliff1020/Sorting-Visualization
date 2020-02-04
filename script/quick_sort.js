function Info2(start, end)
{
	this.start = start;
	this.end = end;
}

class QuickSort extends Sorting
{
	constructor(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2, whichAlgo)
	{

		// Calling the super classes' constuctor
		super(bars, canvasWidth, canvasHeight, canvasWidth2, canvasHeight2, whichAlgo);

		this.stack = [];
		this.stack.push( new Info2(0, this.bars.length - 1));

		this.top = null;
		this.partitioning = false;
		this.starting = true;
		this.pos = -1;
		this.i = -1;
		this.j = -1;
		this.pivot = -1;

		this.start = -1;
		this.end = -1;
	
		this.donePartioning = false;	

		this.x1 = -1;
		this.x2 = -1;
	}

	partition(deltaTime)
	{
		if (!this.isAnimating)
		{
			if (this.swapped)
			{
				this.bar1.useThird = false;
				this.bar2.useThird = false;
				this.swapped = false;

				if (this.i >=0 && this.i <= this.bars.length - 1)
					this.bars[this.i].finishColor2 = true;
			}
			else
			{
				if (!this.donePartioning)
				{
					if (this.j - 1 >= 0)
						this.bars[this.j - 1].isCompaired = false;

					if (this.j <= this.top.end)
					{

						this.bars[this.j].isCompaired  = true;

						if (this.bars[this.j].len < this.bars[this.pivot].len)
						{
							this.i++;

							if (this.i < this.j)
							{
								this.bar1 = this.bars[this.i];
								this.bar2 = this.bars[this.j];
								this.bars[this.i].isCompaired = true;
								this.bar1.compairednumberXPos = this.bar2.index;
								this.bar2.compairednumberXPos = this.bar1.index;

								this.swap(this.i, this.j);
								this.isAnimating = true;
							}
							else
								this.bars[this.i].finishColor2 = true;
						}
						this.j++;
					}
					else
					{
						if (this.i + 1 < this.pivot)
						{

							this.bar1 = this.bars[this.i + 1];
							this.bar2 = this.bars[this.pivot];
							this.bars[this.i + 1].isCompaired = true;
							this.bars[this.pivot].isCompaired = true;
							this.bar1.compairednumberXPos = this.bar2.index;
							this.bar2.compairednumberXPos = this.bar1.index;

							this.isAnimating = true;
							this.swap(this.i + 1, this.pivot);
						}
						this.donePartioning = true;
					}
				}
				else
				{
					this.donePartioning = false;
					this.partitioning = false;
					this.pos = this.i + 1;
					this.start = this.top.start;
					this.end = this.top.end;
					this.bars[this.pos].useFourth = true; 
					this.bars[this.pos].finishColor = false;
				}
			}
		}
		else
		{
			this.animate(deltaTime);
		}
	}

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

		if (this.x1 != -1)
		{
			var y = this.boxStartY;

			drawLine(ctx, this.x1, y - 20, this.x1, y - 40);
			drawLine(ctx, this.x1, y - 40, this.x2, y - 40);
			drawLine(ctx, this.x2, y - 40, this.x2, y - 20);
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

	update(timeStamp)
	{
		var deltaTime = timeStamp - this.lastTime;
		this.lastTime = timeStamp;

		if (this.stack.length <= 0)
		{
			this.resetFlags();
			this.x1 = -1;
			this.done = true;
		}

		else
		{
			if (!this.waiting || !this.isFrameByFrame)
			{
				if (this.partitioning)
				{
					this.partition(deltaTime);
				}

				else if (this.starting)
				{
					this.starting = false;
					this.top = this.stack[this.stack.length - 1];

					this.x1 = this.bars[this.top.start].numberXPos;
					this.x2 = this.bars[this.top.end].numberXPos;
					this.i = this.top.start - 1;
					this.j = this.top.start;
					this.pivot = this.top.end;

					this.bars[this.pivot].finishColor2 = true;

					this.partitioning = true;
				}
				else
				{
					this.starting = true;
					this.partitioning = false;

					for (let i = this.top.start; i <= this.top.end; i++)
						this.bars[i].finishColor = false;

					this.stack.pop();

					if (this.pos + 1 < this.end)
						this.stack.push(new Info2(this.pos + 1, this.end));
					else if (this.pos + 1 <= this.bars.length - 1)
						this.bars[this.pos + 1].useFourth = true;
					if (this.start < this.pos - 1)
						this.stack.push(new Info2(this.start, this.pos - 1));
					else if (this.start >= 0)
						this.bars[this.start].useFourth = true;
				}
			}
		}

		return this.done;	
	}	

}
