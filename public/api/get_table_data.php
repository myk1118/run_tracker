<?php
require_once('functions.php');
require_once('config.php');
require_once('mysqlconnect.php');
set_exception_handler('handleError');

$output = [
  'success'=> false
];

$user_id = 1;

$query = "SELECT `id`, `date`, `distance`, `time`, `pace` FROM `run_stats`
  WHERE `user_id` = $user_id
  ORDER BY `date` DESC
  ";

$result = mysqli_query($conn, $query);


$output['success'] = true;
$output['tableItems'] = [];

while($row = mysqli_fetch_assoc($result)) {
  $date= new DateTime($row['date']);

  $output['tableItems'][] = [
  'date' => $date->format('m-d-Y'),
  'distance' => round((int)$row['distance'],2),
  'time' => gmdate('H:i:s', $row['time']),
  'pace' => (int)$row['pace'],
  'id' => (int)$row['id']
  ];
};

print(json_encode($output));


?>
