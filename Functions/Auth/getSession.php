<?php
$user = array(
		'empid' => $_COOKIE["empid"]
		);

header("HTTP/1.0 404 Please log in");
if(!empty($user['empid'])){
	header("HTTP/1.0 200 OK");
}

header('Content-Type: application/json');
print(json_encode($user));
?>