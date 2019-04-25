<?php
require_once('functions.php');
require_once('config.php');
require_once('mysqlconnect.php');
set_exception_handler('handleError');

// $user_id = 1;
$run_id = $_GET['id'];
$id = $_SESSION['user_data']['id'];

$output = [
  'success'=> false
];
$output['sessionData'] = [];

$query = "SELECT `mileage` AS `miles`, `time`, `id`
  FROM `miles` AS `m`
  WHERE `run_id` = $run_id
  ORDER BY `id` ASC
  ";

  // $query = "SELECT m.`mileage` AS `miles`, m.`time`, m.`id`
  //   FROM `miles` AS `m`
  //   JOIN `run_stats` AS `r` ON m.`run_id` = r.`id`
  //   WHERE `run_id` = $run_id
  //   AND r.`user_id` = $id
  //   ORDER BY `id` ASC
  //   ";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception('invalid query: ' . mysqli_error($conn));
}

$output['success'] = true;

while($row = mysqli_fetch_assoc($result)) {
  $minutes = round((int)$row['time']/60 , 2);

  $output['sessionData'][] = [
    'time' => $minutes,
    'currentMile' => (int)$row['miles'],
    'id' => $row['id']

  ];
};
print(json_encode($output));

?>
