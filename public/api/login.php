<?php
require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$output = [
    'success' => false
];

$json_input = file_get_contents("php://input");

$input = json_decode($json_input, true);

if(empty($input['email'])){
    throw new Exception('email is a required value');
}

if(empty($input['password'])){
    throw new Exception('password is a required value');
}

$email = $input['email'];
$password = $input['password'];

$email = addslashes($email);
$hashedPassword = sha1($password);

$query = "SELECT `id`, `first_name`, `last_name` FROM `users` 
    WHERE `email` = '$email' AND `password` = '$hashedPassword'
";

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception(mysqli_error($conn) );
};

if(mysqli_num_rows($result) !== 1){
    throw new Exception('invalid username or password');
};

$data = mysqli_fetch_assoc($result);

$token = $email.$data['id'].microtime(); //microtime gives time in micro seconds, puts it after the pw so that it hashes
$token = sha1($token);