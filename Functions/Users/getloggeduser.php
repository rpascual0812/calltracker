<?php
require_once('../connect.php');
require_once('../../Classes/Users.php');

$class = new Users(
					$_COOKIE['empid'],
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                );

$data = $class->fetch();

header("HTTP/1.0 500");
if($data['status']==true){
	header("HTTP/1.0 200 OK");
}

header('Content-Type: application/json');
print(json_encode($data));
?>