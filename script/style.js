$(document).ready(function()
{
	$(".changeNumber").change(function() 
	{  
    	$('.slider').toggleClass('slider12', this.checked);
		$('.slider2').toggleClass('slider22', this.checked);

		$('.changer1').toggleClass('changer12', this.checked);
		$('.changer2').toggleClass('changer22', this.checked);

		$('.o2').toggleClass('o22', this.checked);

		$('.index').toggleClass('index2', this.checked);
		$('.ind').toggleClass('ind2', this.checked);
		$('.btn').toggleClass('btn22', this.checked);
		$('.btn2').toggleClass('btn22', this.checked);

  	}).change();

})