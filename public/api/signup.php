<?php
require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$output = [
    'success' => false,
];

$json_input = file_get_contents("php://input");

$input = json_decode($json_input, true);

if(empty($input['first_name'])){
    throw new Exception('First name is required');
}

if(empty($input['last_name'])){
    throw new Exception('Last name is required');
}

if(empty($input['email'])){
    throw new Exception('Email is a required value');
}

if(empty($input['password'])){
    throw new Exception('Password is a required value');
}

$firstname = $input['first_name'];
$lastname = $input['last_name'];
$email = $input['email'];
$password = $input['password'];

$email = addslashes($email);
$hashedPassword = sha1($password);

unset($input['password']);

$query = "INSERT INTO `users` SET
`email` = '$email',
`password` = '$hashedPassword',
`first_name` = '$firstname',
`last_name` = '$lastname',
`date` = NOW(),
`id` = DEFAULT
";

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception(mysqli_error($conn) );
};

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('Could not sign up! You are not registered!');
};

$connect_query = "INSERT INTO `user_connections` SET
    `token` = '$token',
    `users_id` = {$data['id']},
    `created` = NOW(),
    `ip_address` = '{$_SERVER['REMOTE_ADDR']}'
";

$connect_result = mysqli_query($conn, $connect_query);

if(!$connect_result){
    throw new Exception(mysqli_error($conn) );
};

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('could not log you in: connection not saved');
};

$json_output = json_encode($output);

print($json_output);

?>
