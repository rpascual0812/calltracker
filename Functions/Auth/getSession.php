<?php
header("HTTP/1.0 404 Please log in");
if(!empty($_COOKIE["empid"])){
	header("HTTP/1.0 200 OK");
}

header('Content-Type: application/json');
print(json_encode(array('empid'=>$_COOKIE["empid"])));
?>