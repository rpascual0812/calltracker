<?php
require_once('../connect.php');
require_once('../../Classes/Users.php');

$class = new Users(
					$_POST['empid'],
                    null,
                    $_POST['lastname'],
                    $_POST['firstname'],
                    null,
                    null,
                    $_POST['usertype']
                );

$data = $class->create();

header("HTTP/1.0 500 Insert Failed");
if($data['status']==true){
	header("HTTP/1.0 200 OK");
}

header('Content-Type: application/json');
print(json_encode($data));
?>