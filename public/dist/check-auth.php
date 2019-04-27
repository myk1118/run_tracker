<?php
session_start();

$output = [
    'success' => false
];

if(!empty($_SESSION['user'])){
    $output['success'] = true;
    $output['email'] = $_SESSION['user'];
}

print(json_encode($output));

?>