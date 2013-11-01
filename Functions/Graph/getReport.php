<?php
require_once('../connect.php');
require_once('../../Classes/Calllogs.php');

$class = new Calllogs();

$data = $class->fetchGraph($_POST['datefrom'],$_POST['dateto'],$_POST['field']);

$chartdata = array();
$xaxis = array();

foreach($data['data'] as $chart){
	array_push($chartdata, (int)$chart['count']);
	array_push($xaxis, $chart['field']);
}

$return = array(
		'chartdata' => $chartdata,
		'xaxis' => $xaxis
	);

header("HTTP/1.0 404 User Not Found");
if($data['status']==true){
	header("HTTP/1.0 200 OK");
}

header('Content-Type: application/json');
print(json_encode($return));
?>