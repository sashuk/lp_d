<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$type = $_POST['type'];

if (strlen($type) > 0) {
	$body = '<b>Собщение от РАЗРАБОТКА САЙТОВ</b><br>Имя: '.$name.'<br>Телефон:'.$phone.'<br>Тип сайта:'.$type;
} else {
	$body = '<b>Собщение от РАЗРАБОТКА САЙТОВ</b><br>Имя: '.$name.'<br>Телефон:'.$phone;
}
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: admin@webaurora.ru' . "\r\n";
if(mail('shusman1011@gmail.com', 'Собщение от РАЗРАБОТКА САЙТОВ', $body, $headers)) echo 'Turn off debugger, sweetie';
?>