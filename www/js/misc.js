$(document).ready(function() {
	var datetmp = new Date();
	var nextday = datetmp.getDate();
	var currentmonth = datetmp.getMonth();
	$('#counter1,#counter2,#counter3').countdown({until: new Date(2013, currentmonth, parseInt(nextday) + 1, 22, 0, 4), format: 'HMS'});
	
	
});
