<?php
require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$output['success'] = false;

if (!empty($_SESSION['user_data'])) {
    $token = $_SESSION['user_data']['token'];
} else {
    $json_input = file_get_contents("php://input");
    $input = json_decode($json_input, true);
    if (empty($input['token'])) {
        throw new Exception('token is required');
    }
    $token = addslashes($input['token']);
}

$login_check_query = "SELECT * FROM `user_connections` WHERE `token`= '$token'";

$login_result = mysqli_query($conn, $login_check_query);

if (!$login_result) {
    throw new Exception(mysqli_error($conn));
}

if (mysqli_num_rows($login_result) !== 1) {
    throw new Exception('user not logged in');
}

$data = mysqli_fetch_assoc($login_result);


$output['success'] = true;

if (!empty($_SESSION['user_data'])) {
    $_SESSION['user_data'] = [
        'id' => $data['users_id'],
        'token' => $token
    ];
}


$json_output = json_encode($output);
