<?php
require_once('functions.php');
require_once('config.php');
require_once('mysqlconnect.php');
set_exception_handler('handleError');

$output = [
    'success' => false,
];

$userid = 1;

$query = "SELECT
MAX(s. `distance`), MIN((s.`pace`)/(s.`distance`)), MAX(s.`date`)
FROM `run_stats` AS `s`
JOIN `users` ON users.`id` = s.`user_id`
WHERE users.`id` = $userid";

$result = mysqli_query($conn, $query);

if(!$result){
	throw new Exception( mysqli_error($conn) );
}

if(mysqli_num_rows($result) === 0){
	throw new Exception( "no run data available");
}

$data = mysqli_fetch_assoc($result);
// $date = new DateTime($data['MAX(s.`date`)']);

$output = [];
$output['longestRun'] = $data['MAX(s. `distance`)'];
$output['fastestpace'] = $data['MIN((s.`pace`)/(s.`distance`))'];
$output['lastRunDate'] = $data['MAX(s.`date`)'];
// $output['lastRunDate'] = $date->format('m-d-Y');



print(json_encode($output));
