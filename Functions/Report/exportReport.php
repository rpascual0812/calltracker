<?php
require_once('../connect.php');
require_once('../../Classes/Calllogs.php');

$class = new Calllogs();

$data = $class->fetchAll($_GET['datefrom'],$_GET['dateto'],$_GET['empid']);

$date = date('Ymd');

$header=[];
$data['fields'][0] = 'ID';
for($i=0;$i<count($data['fields']);$i++){
	array_push($header,'"'.$data['fields'][$i].'"');
}

$header = implode(',', $header)."\n";

$body='';
for($i=0;$i<count($data['data']);$i++){
	$row=[];
	for($j=0;$j<count($data['data'][$i]);$j++){
		array_push($row,'"'.$data['data'][$i][$j].'"');
	}
	$body .= implode(',', $row)."\n";
}

header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=calltracker_".$date.".csv");
echo $header.'';
echo $body;
?>