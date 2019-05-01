<?php
require_once('functions.php');
require_once('config.php');
require_once('mysqlconnect.php');
require_once('checkuserloggedin.php');
set_exception_handler('handleError');

$user_id = $_SESSION['user_data']['id'];

$query = "SELECT `eventName`, `eventDate` FROM `event`
  WHERE `id` = $user_id
  ";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('invalid query: ' . mysqli_error($conn));
}

$output['success'] = true;
$output[] = [];

$row = mysqli_fetch_assoc($result);
$current = new DateTime();
$eventDate = new DateTime($row['eventDate']);
$days = $eventDate->diff($current)->format('%a');

  $output[] = [
    'eventDay' => $days,
    'eventName'=> $row['eventName']
  ];


print_r(json_encode($output));
