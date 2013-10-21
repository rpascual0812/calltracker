<?php
require_once('../connect.php');
require_once('../../Classes/Calllogs.php');

$class = new Calllogs();

$fields = $class->allfields();
$data = $class->fetchAll($_GET['datefrom'],$_GET['dateto']);

$date = date('Ymd');

// echo "<pre>";
// print_r($data['data']);
// echo "</pre>";

$header=[];

for($i=0;$i<count($fields['data']);$i++){
	if($fields['data'][$i]['name'] == 'Option'){
		$fields['data'][$i]['name'] = 'ID';
	}
	array_push($header,'"'.$fields['data'][$i]['name'].'"');
}

$header = implode(',', $header).',"Employee Name"'."\n";

$body='';
for($i=0;$i<count($data['data']);$i++){
	$row=[];
	for($j=0;$j<count($data['data'][$i]);$j++){
		array_push($row,'"'.$data['data'][$i][$j].'"');
	}
	$body .= implode(',', $row)."\n";
	//array_push($header,$fields['data'][$i]['name']);
}

header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=calltracker_".$date.".csv");
echo $header.'';
echo $body;
?>