function drawLine(ctx, x1, y1, x2, y2)
{
	ctx.beginPath(); 
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function drawRect(ctx, x1, y1, width, height)
{
	ctx.beginPath();
	ctx.rect(x1, y1, width, height);
	ctx.stroke();
}