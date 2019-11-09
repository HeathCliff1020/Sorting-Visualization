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
		this.color3 = color3;		// color some other purposes (like
									// for the key-bar(element that is to be inserted in the sorted array) in insertion sort)


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


		//positions for the array element element in the box
		this.numberXPos = 0;		
		this.numberYPos = 0;
		this.index = 0;	

		this.boxStartY = 0;
		this.boxWidth = 0;
		this.compairednumberXPos = 0;	
	}

	/* draws a particular bar onto the screen*/
	draw(ctx, ctx2)
	{
		if (this.useThird)
		{
			ctx.fillStyle = this.color3;
		}
		else if (!this.isCompaired)
			ctx.fillStyle = this.color;
		else 
			ctx.fillStyle = this.cmpColor;
		ctx.fillRect(this.xPos, this.yPos - (this.len * 3), this.width, (this.len * 3));

		//console.log(ctx.measureText('555').width + " " + this.len);

		if (this.isCompaired || this.useThird)
		{
			if (this.useThird)
				ctx2.fillStyle = "#f00";

			var startY = this.boxStartY + this.boxWidth;
			var lineLen = 30;
			var width = ctx2.lineWidth / 2;
			var xWidth = this.numberXPos - this.compairednumberXPos;
			drawLine(ctx2, this.numberXPos, startY, this.numberXPos, startY + lineLen );
			drawLine(ctx2, this.numberXPos, startY + lineLen - width, this.numberXPos - xWidth, startY + lineLen - width );
			ctx2.fillStyle = "#000";
		}
		else
			ctx2.fillStyle = "#0066cc";
		
		ctx2.font = "bold 10pt Calibari";
		ctx2.fillText(this.len.toString(), this.numberXPos - ctx2.measureText(this.len.toString()).width / 2, this.numberYPos + parseInt(ctx2.font.match(/\d+/), 10) / 2);

		ctx.font = "8pt Calibari";

		//if( ctx.measureText('999').width < this.width )
		if (true)
		{ 
			ctx.fillStyle = "#248f24";
			ctx.font = "bold 11pt Calibari"
			var textHeight = parseInt(ctx.font.match(/\d+/), 10);
			var textWidth = ctx.measureText(this.len.toString()).width;

			var textY;

			//if (textHeight >= (this.len * 3) + 5)
			if (true)
				textY = this.yPos - this.len * 3 - textHeight + 5;
			else
				textY = this.yPos - ( (this.len * 3) - textHeight) / 2;
			
			var textX = this.xPos + (this.width - textWidth) / 2;
			ctx.fillText(this.len.toString(), textX, textY);
		}

	}

}