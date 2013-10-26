<?php
require_once('../connect.php');
require_once('../../Classes/Users.php');

$class = new Users(
					$_POST['username'],
					$_POST['password'],
					null,
					null,
					null,
					null
				);

$data = $class->auth();

header("HTTP/1.0 404 User Not Found");
if($data['status']==true){
	setcookie("empid", $_POST['username'], time()+3600*24, '/');

	header("HTTP/1.0 200 OK");
}

header('Content-Type: application/json');
print(json_encode($data));
?>