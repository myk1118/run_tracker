<?php
require_once('functions.php');
require_once('config.php');
require_once('mysqlconnect.php');
set_exception_handler('handleError');

$mileStats = [
    "success"=> false,
];

$time = (int)$_GET['distance'];
$mileage = (int)$_GET['mileage'];
$run_id = (int)$_GET['distance']; //$_SESSION['run_id'];

$perMileQuery = "INSERT INTO `miles` SET `time` = $time, `mileage` = $mileage, `run_id` = $run_id";

$perMileResult = mysqli_query($conn, $perMileQuery);

if(!$perMileResult){
    throw new Exception(mysqli_error($conn));
}
if(mysqli_affected_rows($conn)===0)
{
    throw new Exception('Failed to add mile');
}

$mile_id = mysqli_insert_id($conn);

$mileStats['success'] = true;

print(json_encode($mileStats));
