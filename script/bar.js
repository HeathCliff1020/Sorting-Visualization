/* Bar class contains the information of each bar.
	The bar represents the array elements.
*/

class Bar
{
	constructor(xPos, yPos, width, len, color, cmpColor, color3)
	{
		this.len = len;				// length of the bar
		this.width = width;			// width of the bar
		this.xPos = xPos;			// starting x pos of the bar
		this.yPos = yPos;			// starting y pos of the bar
		this.color = color;			// primary color of the bar
		this.cmpColor = cmpColor;	// color of the bar when compired
		this.color3 = color3;		// color some other purpose (like
									// for the key bar in inserting sort)


		this.isCompaired = false;	// flag for compairing color
		this.useThird = false;		// flag for third color


		// for calculating speed for some special bars (value 
		// 	does not change)
		this.baseMoveSpeed = 30;

		// speed of the animating of the moving speed of the bar
		// value can change
		this.moveSpeed = 30;
		
		// the target positing set for animating
		// the bar moves towards its target position		
		this.targetX = xPos;	
	}

	/* draws a particular bar onto the screen*/
	draw(ctx)
	{
		if (this.useThird)
		{
			ctx.fillStyle = this.color3;
		}
		else if (!this.isCompaired)
			ctx.fillStyle = this.color;
		else 
			ctx.fillStyle = this.cmpColor;
		ctx.fillRect(this.xPos, this.yPos - this.len, this.width, this.len);

		//console.log(ctx.measureText('555').width + " " + this.len);

		ctx.font = "8pt Calibari";

		if( ctx.measureText('999').width < this.width )
		{ 
			ctx.fillStyle = "#000";
			var textHeight = parseInt(ctx.font.match(/\d+/), 10);
			var textWidth = ctx.measureText(this.len.toString()).width;
			var textY = this.yPos - (this.len - textHeight) / 2;
			var textX = this.xPos + (this.width - textWidth) / 2;
			ctx.fillText(this.len.toString(), textX, textY);
		}

	}

}