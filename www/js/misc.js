$(document).ready(function() {
	/* Successful dummy */
	var gratz = '<div class="gratz"><span class="uno">СПАСИБО!</span><br> Наш менеджер <br>совсем скоро<br> свяжется с Вами.<br><span class="duo">Ваша заявка<br> очень важна<br> для нас!</span></div>';
	function normalize() {
		console.log('here');
		$('#target_customchoice1, #target_customchoice2, #target_customchoice3').hide();
		$('#customchoice1, #customchoice2, #customchoice3').show();
		$('#target_customchoice1, #target_customchoice2, #target_customchoice3').find('input').each(function() {
			$(this).val('');
		});
	}
	
	/* Listeners */
	var datetmp = new Date();
	var nextday = datetmp.getDate();
	var currentmonth = datetmp.getMonth();
	$('#counter1,#counter2,#counter3').countdown({until: new Date(2013, currentmonth, parseInt(nextday) + 1, 22, 0, 4), format: 'HMS'});
	
	$('[id^="getcard"]').click(function() {
		var id = $(this).attr('id').replace('getcard', '');
		var phone = $('#phone' + id).val();
		if (phone.length > 0) {
			var data = {
				name: $('#name' + id).val(),
				phone: phone
			};
			$.ajax({
				type: "POST",
				url: '/ajaxmonster.php',
				data: data,
				success: function() {
					$('#form' + id).html(gratz);
				}
			});
		} else {
			alert('Пожалуйста, введите телефонный номер');
		}
	});
	
	
	
	$('[id^="customchoice"]').click(function() {
		normalize();
		var id = $(this).attr('id').replace('customchoice', '');
		$('#customchoice' + id).hide();
		$('#target_customchoice' + id).show();
	});
	$('[id^="cancel_customchoice"]').click(function() {
		var id = $(this).attr('id').replace('cancel_customchoice', '');
		normalize();
	});
	
	$('[id^="card_customchoice"]').click(function() {
		var id = $(this).attr('id').replace('card_customchoice', '');
		var type = $('#type' + id).val();
		var phone = $('#customphone' + id).val();
		if (phone.length > 0) {
			var data = {
				name: $('#customname' + id).val(),
				phone: phone,
				type: type
			};
			$.ajax({
				type: "POST",
				url: '/ajaxmonster.php',
				data: data,
				success: function() {
					$('#form' + id).html(gratz);
				}
			});
			$('#target_customchoice' + id).html(gratz);
			setTimeout(normalize, 3000);
		} else {
			alert('Пожалуйста, введите телефонный номер');
		}
	});
	
	
});
