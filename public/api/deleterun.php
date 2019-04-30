<?php
    require_once('functions.php');
    require_once('config.php');
    require_once('mysqlconnect.php');
    require_once('checkuserloggedin.php');
    set_exception_handler('handleError');

    $json_input = file_get_contents("php://input");
    $input = json_decode($json_input, true);

    $run_id = $input['id'];

    $output = [
        "success"=> false,
    ];

    $query = "DELETE FROM `run_stats` WHERE `id` = $run_id;

    ";

    $result = mysqli_query($conn, $query);

    if (!$result) {
        throw new Exception('no matching id found: ' . mysqli_error($conn));
    }

    $output = [
        "success"=> true
    ];

?>
