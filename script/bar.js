class Bar
{
	constructor(xPos, yPos, width, len, color)
	{
		this.len = len;
		this.width = width;
		this.xPos = xPos;
		this.yPos = yPos;
		this.color = color;

		this.moveSpeed = 30;
		this.targetX = xPos;
	}

	draw(ctx)
	{
		ctx.fillStyle = this.color;
		ctx.fillRect(this.xPos, this.yPos - this.len, this.width, this.len);	
	}

}