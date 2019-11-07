$(document).ready(function()
{

	for(var i=1; i<=100; i++){
    	var select = document.getElementById("numbers");
	    var option = document.createElement("OPTION");
	    select.options.add(option);
	    option.text = i;
	    option.value = i;
	}

	$('.menu_open').click(function()
	{
		$('.vert_nav').toggleClass('vert_nav_open');
		$('.hamburger').toggleClass('hamburger_cross');
	})
})