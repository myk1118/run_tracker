<?php
require_once('functions.php');
require_once('config.php');
require_once('mysqlconnect.php');
set_exception_handler('handleError');

$output = [
  'success'=> false
];

$user_id = 1;

$query = "SELECT `user_id` AS `id`, `date`, `distance`, `time`, `pace` FROM `run_stats`
  WHERE `user_id` = $user_id
  ";

$result = mysqli_query($conn, $query);


$output['success'] = true;
$output['tableItems'] = [];

while($row = mysqli_fetch_assoc($result)) {
  $output['tableItems'][] = [
  'date' => $row['date'],
  'distance' => (int)$row['distance'],
  'time' => $row['time'],
  'pace' => (int)$row['pace'],
  'id' => (int)$row['id']
  ];
};

print(json_encode($output));


?>
