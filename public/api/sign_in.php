<?php

session_start();

$postData = json_decode(file_get_contents('php://input'), true);

$_SESSION['user'] = $postData['email'];

$output = [
    'success' => true,
    'email' => $postData['email'],
    'message' => 'Logged In'
];

print(json_encode($output));
