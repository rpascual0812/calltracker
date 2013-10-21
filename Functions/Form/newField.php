<?php
require_once('../connect.php');
require_once('../../Classes/Calllogs.php');

$class = new Calllogs();

$data = $class->add($_POST);

header("HTTP/1.0 404 User Not Found");
if($data['status']==true){
	header("HTTP/1.0 200 OK");
}

header('Content-Type: application/json');
print(json_encode($data));
?>