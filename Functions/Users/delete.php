<?php
require_once('../connect.php');
require_once('../../Classes/Users.php');

$class = new Users(
					$_POST['empid'],
                    null,
                    null,
                    null,
                    null,
                    null
                );

$data = $class->delete();

header("HTTP/1.0 500 Deletion Failed");
if($data['status']==true){
	header("HTTP/1.0 200 OK");
}

header('Content-Type: application/json');
print(json_encode($data));
?>