<?
if (isset($_POST['Message'])) {
	
	$Message = $_POST['Message'];
	
	$Message = mysql_escape_string($Message);
	
	function escape_inj ($text) { 

		$text = strtolower($text); // Приравниваем текст параметра к нижнему регистру 

		if ( 
		!strpos($text, "select") && //  
		!strpos($text, "union") && // 
		!strpos($text, "select") && // 
		!strpos($text, "order") && // Ищем вхождение слов в параметре
		!strpos($text, "where") && //  
		!strpos($text, "char") && // 
		!strpos($text, "from") // 
		) { 
		return true; // Вхождений нету - возвращаем true 
		} else { 
		return false; // Вхождения есть - возвращаем false 
		} 
		  
	}
	
	if (escape_inj ($Message)==false) {
		echo 'Вы попытались взломать нашу базу данных, увы дальше мы вас не пустим.';
	}
	else {
		
		$config['smtp_username'] = 'partoor@yandex.ru';  //Смените на адрес своего почтового ящика.
		$config['smtp_port'] = '465'; // Порт работы.
		$config['smtp_host'] =  'ssl://smtp.yandex.ru';  //сервер для отправки почты
		$config['smtp_password'] = 'akoz1989';  //Измените пароль
		$config['smtp_debug'] = true;  //Если Вы хотите видеть сообщения ошибок, укажите true вместо false
		$config['smtp_charset'] = 'utf-8';	//кодировка сообщений. (windows-1251 или utf-8, итд)
		$config['smtp_from'] = 'IT Порт Артур'; //Ваше имя - или имя Вашего сайта. Будет показывать при прочтении в поле "От кого"
			
		function smtpmail($to='', $mail_to, $subject, $message, $headers='') {
			global $config;
			$SEND =	"Date: ".date("D, d M Y H:i:s") . " UT\r\n";
			$SEND .= 'Subject: =?'.$config['smtp_charset'].'?B?'.base64_encode($subject)."=?=\r\n";
			if ($headers) $SEND .= $headers."\r\n\r\n";
			else
			{
					$SEND .= "Reply-To: ".$config['smtp_username']."\r\n";
					$SEND .= "To: \"=?".$config['smtp_charset']."?B?".base64_encode($to)."=?=\" <$mail_to>\r\n";
					$SEND .= "MIME-Version: 1.0\r\n";
					$SEND .= "Content-Type: text/html; charset=\"".$config['smtp_charset']."\"\r\n";
					$SEND .= "Content-Transfer-Encoding: 8bit\r\n";
					$SEND .= "From: \"=?".$config['smtp_charset']."?B?".base64_encode($config['smtp_from'])."=?=\" <".$config['smtp_username'].">\r\n";
					$SEND .= "X-Priority: 3\r\n\r\n";
			}
			$SEND .=  $message."\r\n";
			 if( !$socket = fsockopen($config['smtp_host'], $config['smtp_port'], $errno, $errstr, 30) ) {
				if ($config['smtp_debug']) echo $errno."<br>".$errstr;
				return false;
			 }
		 
			if (!server_parse($socket, "220", __LINE__)) return false;
		 
			fputs($socket, "HELO " . $config['smtp_host'] . "\r\n");
			if (!server_parse($socket, "250", __LINE__)) {
				if ($config['smtp_debug']) echo 'Не могу отправить HELO!';
				fclose($socket);
				return false;
			}
			fputs($socket, "AUTH LOGIN\r\n");
			if (!server_parse($socket, "334", __LINE__)) {
				if ($config['smtp_debug']) echo 'Не могу найти ответ на запрос авторизаци.';
				fclose($socket);
				return false;
			}
			fputs($socket, base64_encode($config['smtp_username']) . "\r\n");
			if (!server_parse($socket, "334", __LINE__)) {
				if ($config['smtp_debug']) echo 'Логин авторизации не был принят сервером!';
				fclose($socket);
				return false;
			}
			fputs($socket, base64_encode($config['smtp_password']) . "\r\n");
			if (!server_parse($socket, "235", __LINE__)) {
				if ($config['smtp_debug']) echo 'Пароль не был принят сервером как верный! Ошибка авторизации!';
				fclose($socket);
				return false;
			}
			fputs($socket, "MAIL FROM: <".$config['smtp_username'].">\r\n");
			if (!server_parse($socket, "250", __LINE__)) {
				if ($config['smtp_debug']) echo 'Не могу отправить комманду MAIL FROM: ';
				fclose($socket);
				return false;
			}
			fputs($socket, "RCPT TO: <" . $mail_to . ">\r\n");
		 
			if (!server_parse($socket, "250", __LINE__)) {
				if ($config['smtp_debug']) echo 'Не могу отправить комманду RCPT TO: ';
				fclose($socket);
				return false;
			}
			fputs($socket, "DATA\r\n");
		 
			if (!server_parse($socket, "354", __LINE__)) {
				if ($config['smtp_debug']) echo 'Не могу отправить комманду DATA';
				fclose($socket);
				return false;
			}
			fputs($socket, $SEND."\r\n.\r\n");
		 
			if (!server_parse($socket, "250", __LINE__)) {
				if ($config['smtp_debug']) echo 'Не смог отправить тело письма. Письмо не было отправленно!';
				fclose($socket);
				return false;
			}
			fputs($socket, "QUIT\r\n");
			fclose($socket);
			echo 'Спасибо за сообщение! Я все читаю!';
			return TRUE;
		}
		 
		function server_parse($socket, $response, $line = __LINE__) {
			global $config;
			while (@substr($server_response, 3, 1) != ' ') {
				if (!($server_response = fgets($socket, 256))) {
					if ($config['smtp_debug']) echo "<p>Проблемы с отправкой почты!</p>$response<br>$line<br>";
					return false;
				}
			}
			if (!(substr($server_response, 0, 3) == $response)) {
				if ($config['smtp_debug']) echo "<p>Проблемы с отправкой почты!</p>$response<br>$line<br>";
				return false;
			}
			return true;
		}
		
		$message = "Мне прислали следующее сообщение: <br><br><b>".$Message."</b>";
		
		smtpmail('IT Порт Артур', 'portartoor@gmail.com', 'Быстрое сообщение', $message);
		
		/*function complete_mail() {

				$mess = "Поступило обращение с запросом связи от:<br>Имя: ".$Name."<br>Телефон: ".$Phone;
		// подключаем файл класса для отправки почты
		// если Вы забыли его скачать - http://www.php-mail.ru/class.phpmailer.zip
				require '/class.phpmailer.php';

				$mail = new PHPMailer();
				$mail->From = 'welcome@безгеморроя.рф';      // от кого email
				$mail->FromName = 'Сайт ХОРОШИЙ МАМОЛОГ';   // от кого имя
				$mail->AddAddress('portartoor@gmail.com', 'Артур Порт'); // кому - адрес, Имя
				$mail->IsHTML(true);        // выставляем формат письма HTML
				$mail->Subject = 'Запрос связи с сайта ХОРОШИЙ МАМОЛОГ';  // тема письма
				$mail->Body = $mess;

				  // отправляем наше письмо
				  if (!$mail->Send()) die ('Mailer Error: '.$mail->ErrorInfo);
				  echo '<div class="zayavka_success">Ваша заявка принята</div>';
		}
		complete_mail();*/
		
		/*$to = "testwestpower@mail.ru";
		$subject = "Запрос связи с сайта ХОРОШИЙ МАМОЛОГ";
		$message = "Поступило обращение с запросом связи от:<br>Имя: ".$Name."<br>Телефон: ".$Phone;
		$headers = 'From: welcome@безгеморроя.рф<welcome@безгеморроя.рф>' . "\r\n" .
			'MIME-Version: 1.0' . "\r\n" .
			'Content-type:text/html; charset = utf-8' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();
		if(mail($to, $subject, $message, $headers)) {
			echo '<div class="zayavka_success">Ваша заявка принята</div>';
		}*/
		
	}
	
}
else {
	
	echo 'Ошибка получения данных, попробуйте еще раз!';
	
}

?>