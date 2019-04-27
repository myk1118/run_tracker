<?php
require_once('functions.php');
require_once('config.php');
require_once('mysqlconnect.php');
require_once('checkuserloggedin.php');
set_exception_handler('handleError');

// $user_id = 1;
$run_id = $_GET['id'];
$id = $_SESSION['user_data']['id'];

$output = [
  'success'=> false
];
$output['sessionData'] = [];

$query = "SELECT r.`id`, r.`distance`, r.`time`, r.`calories`, r.`pace`, m.`mileage` AS `miles`, m.`time` AS `permiletime`
FROM `run_stats` AS r
JOIN `miles` as m
ON r.`id` = m.`run_id`
WHERE `user_id` = $id AND
r.`id` = $run_id
  -- ORDER BY m.`id` ASC
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
    'id' => (int)$row['id'],
    'time' => (int)$minutes,
    'distance' => (int)$row['distance'],
    'calories' => (int)$row['calories'],
    'pace' => (int)$row['pace'],
      'perMile'=> [
          'currentMile' => (int)$row['miles'],
          'perMileTime' => (int)$row['permiletime']
      ]
  ];
};
print(json_encode($output));

?>
