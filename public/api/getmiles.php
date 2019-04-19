<?php
require_once('functions.php');
require_once('config.php');
require_once('mysqlconnect.php');
set_exception_handler('handleError');

// if(empty($_SESSION['user_id'])){
//     throw new Exception ('Missing user id');
// }

$run_stats_id = 3;

$query = "SELECT m.`time`, m.`mileage` FROM `miles` AS `m`
JOIN `run_stats` AS `rs` ON rs.`id` = m.`run_id`
WHERE rs.`id` = $run_stats_id";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception('invalid query: ' . mysqli_error($conn));
}

if (mysqli_num_rows($result) === 0) {
    throw new Exception("no user");
};

$data = mysqli_fetch_assoc($result);

print_r(json_encode($data));
