<?php
require_once('functions.php');
require_once('config.php');
require_once('mysqlconnect.php');
require_once('checkuserloggedin.php');
set_exception_handler('handleError');

$users_id = $_SESSION['users_id'];

$query = "SELECT `first_name`, `last_name`, `gender`, `age`, `height`, `weight`, `email`, `password` FROM `users` WHERE `users_id` = $users_id";

$result = mysqli_query($conn, $query);

if (!$result) {
    throw new Exception('invalid query: ' . mysqli_error($conn));
}

if (mysqli_num_rows($result) === 0) {
    throw new Exception("no user");
};

$data = mysqli_fetch_assoc($result);

print_r(json_encode($data));
