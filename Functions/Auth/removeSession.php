<?php
setcookie ("empid", "", time() - 3600);

$data['status'] = 'false';

header("HTTP/1.0 500");
if(empty($_COOKIE["empid"])){
	$data['status'] = 'true';
	header("HTTP/1.0 200 OK");
}

header('Content-Type: application/json');
print(json_encode($data));
?>