<?php
    require_once('functions.php');
    require_once('config.php');
    require_once('mysqlconnect.php');
    require_once('checkuserloggedin.php');
    set_exception_handler('handleError');

    $json_input = file_get_contents("php://input");
    $input = json_decode($json_input, true);


    $output = [
        "success"=> false,
    ];

?>
