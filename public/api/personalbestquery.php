<?php
require_once('functions.php');
require_once('config.php');
require_once('mysqlconnect.php');
require_once('checkuserloggedin.php');
set_exception_handler('handleError');

$output = [
    'success' => false,
];

$userid = $_SESSION['user_data']['id'];

$query = "SELECT
MAX(s. `distance`) AS `longestDistance`, MIN((s.`pace`)/(s.`distance`)) AS `maxDistance`, MAX(s.`date`) AS `lastDate`, MAX(s.`calories`) as `maxCalories`, MAX(s.`time`) as `longestTime`,
MIN(s. `time` / s. `distance`) AS `fastestpace`
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
$date = new DateTime($data['lastDate']);

$output = [];

$output['longestRun'] = (int)$data['longestDistance'];
$output['fastestPace'] = (int)$data['maxDistance'];
// $output['lastRunDate'] = $data['MAX(s.`date`)'];
$output['lastRunDate'] = $date->format('m-d-Y');
$output['mostCalories'] = (int)$data['maxCalories'];
$output['longestTime'] = (int)$data['longestTime'];
$output['fastestpace'] = gmdate("i:s", round((int)$data['fastestpace'],0));



print(json_encode($output));
