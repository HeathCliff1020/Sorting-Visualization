$(document).ready(function()
{
	$(".changeNumber").change(function() 
	{  
    	$('.slider').toggleClass('slider12', this.checked);
		$('.slider2').toggleClass('slider22', this.checked);

		$('.index').toggleClass('index2', this.checked);
		$('.btn').toggleClass('btn22', this.checked);
		$('.btn2').toggleClass('btn22', this.checked);

  	}).change();

})