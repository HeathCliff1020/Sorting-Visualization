/* Bar class contains the information of each bar.
	The bar represents the array elements.
*/

class Bar
{
	constructor(xPos, yPos, width, len, color, cmpColor, color3, color4, color5, color6)
	{
		this.len = len;				// length of the bar
		this.width = width;			// width of the bar
		this.xPos = xPos;			// starting x pos of the bar
		this.yPos = yPos;			// starting y pos of the bar
		this.color = color;			// primary color of the bar
		this.cmpColor = cmpColor;	// color of the bar when compired
		this.color3 = color3;		// color some other purposes (like
									// for the key-bar(element that is to be inserted in the sorted array) in insertion sort)
		this.color4 = color4;				
		this.color5 = color5;
		this.color6 = color6;			

		this.isCompaired = false;	// flag for compairing color
		this.useThird = false;		// flag for third color
		this.useFourth = false; 	// to use the fourthColor
		this.finishColor = false;
		this.finishColor2 = false;

		// for calculating speed for some special bars (value 
		// 	does not change)
		this.baseMoveSpeed = 30;

		// speed of the animating of the moving speed of the bar
		// value can change
		this.moveSpeed = 30;
		
		// the target positing set for animating
		// the bar moves towards its target position		
		this.targetX = xPos;


		//positions for the array element element in the box
		this.numberXPos = 0;		
		this.numberYPos = 0;
		this.index = 0;	

		this.boxStartY = 0;
		this.boxWidth = 0;
		this.lineOffset = 0;
		this.compairednumberXPos = 0;
		
	}

	/* draws a particular bar onto the screen*/
	draw(ctx)
	{
		if (this.useThird)
		{
			ctx.fillStyle = this.color3;
		}
		else if (this.useFourth)
			ctx.fillStyle = this.color4;
		else if (this.finishColor)
			ctx.fillStyle = this.color5;
		else if (this.finishColor2)
			ctx.fillStyle = this.color6;
		else if (!this.isCompaired)
			ctx.fillStyle = this.color;
		else 
			ctx.fillStyle = this.cmpColor;
		ctx.fillRect(this.xPos, this.yPos - (this.len * 2.5), this.width, (this.len * 2.5));

	}

	resetFlags()
	{
		this.useThird = false;
		this.isCompaired = false;
		this.useFourth = false;
	}

}