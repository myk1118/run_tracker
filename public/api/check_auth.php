<?php

session_start();

$output = [
    'success' => false
];

if (!empty($_SESSION['user_data'])) {
    $output['success'] = true;
    $output['email'] = $_SESSION['user'];
}

print json_encode($output);
