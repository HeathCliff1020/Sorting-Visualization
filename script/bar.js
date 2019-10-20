class Bar
{
	constructor(xPos, yPos, width, len, color, cmpColor)
	{
		this.len = len;
		this.width = width;
		this.xPos = xPos;
		this.yPos = yPos;
		this.color = color;
		this.cmpColor = cmpColor;

		this.isCompaired = false;

		this.moveSpeed = 30;
		this.targetX = xPos;
	}

	draw(ctx)
	{
		if (!this.isCompaired)
			ctx.fillStyle = this.color;
		else 
			ctx.fillStyle = this.cmpColor;
		ctx.fillRect(this.xPos, this.yPos - this.len, this.width, this.len);	
	}

}