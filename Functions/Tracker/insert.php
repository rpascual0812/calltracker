<?php
require_once('../connect.php');
require_once('../../Classes/Calllogs.php');

$class = new Calllogs();
$data = $class->insert($_POST['data']);

header("HTTP/1.0 500 Insert Failed");
if($data['status']==true){
	header("HTTP/1.0 200 OK");
}

header('Content-Type: application/json');
print(json_encode($data));
?>