$(document).ready(function(){
    var $form_ad_action_phone = $('.form_ad_action_phone');
    var $change_format = $('.change_format');

    $form_ad_action_phone.mask("+7(999) 999-9999");
    $form_ad_action_phone.on('focus', function(){
        $change_format.animate({'opacity': 0.5}, 200);
    });

    $form_ad_action_phone.on('blur', function(){
        $change_format.animate({'opacity': 0}, 200);
    });

    $change_format.on('click', function(){
        $form_ad_action_phone.unmask();
        $(this).closest('div').find('.form_ad_action_phone').trigger('focus');
    });


    /*  Process for proposal order  */
    var $func_scroll_to_proposal_order = function($state){
        var $order_text = '-/-',
            $form_proposal_order = $('.form_proposal_order');
        $('html, body').animate({scrollTop: $form_proposal_order.offset().top}, 200);
        if($state == 1){
            $order_text = 'Сайт визитка';
        }
        if($state == 2){
            $order_text = 'Корпоративный сайт';
        }
        if($state == 3){
            $order_text = 'Интернет-магазин';
        }

        /*$('.ad_order_desc_callback').text('Заказ : ' + $order_text);*/

        $form_proposal_order.find('.ad_order_desc_callback')
            .after('<span class="sector_title_span c_mar0 c_pad0 c_martop10 c_marbot30"><span class="c_font25">Заказ : ' + $order_text + '</span></span>')
            .css('display', 'none');

        $form_proposal_order.data('order_proposal', $order_text);

    }

    $('.form_proposal_1').on('click', function(){
        $func_scroll_to_proposal_order(1);
    });
    $('.form_proposal_2').on('click', function(){
        $func_scroll_to_proposal_order(2);
    });
    $('.form_proposal_3').on('click', function(){
        $func_scroll_to_proposal_order(3);
    });
    $('#look_at_map').on('click', function(){
        $('html, body').animate({scrollTop: $('#map').offset().top}, 600);
    });


	/* Successful dummy */
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
                order: $('.form_proposal_order').data('order_proposal') || 'wasn\'t selected',
				phone: phone
			};
            console.log(data);
			$.ajax({
				type: "POST",
				url: '/ajaxmonster.php',
				data: data,
				success: function() {
					/*$('#form' + id).html(gratz);*/
                    $('.tmpl_ad_order').css('display', 'none');
                    $('.tmpl_ad_order_complete').css('display', 'inline-block');
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
