<?php
    require_once('functions.php');
    require_once('config.php');
    require_once('mysqlconnect.php');
    set_exception_handler('handleError');
    
    $runOutput = [
        "success"=> false,
    ];

    $distance = 8;
    $time = 34000;
    $pace = 600;
    $calories = 1000;
    $user_id = 2;

    $addRunQuery = "INSERT INTO `run_stats` SET `distance` = $distance, `time` = $time, `pace` = $pace, `date` = NOW(), `heart_rate` = 0, `calories` = $calories, `user_id` = $user_id";
    
    $runResult = mysqli_query($conn, $addRunQuery);

    if(!$runResult){
        throw new Exception(mysqli_error($conn));
    }
    if(mysqli_affected_rows($conn)===0)
        {
            throw new Exception('Run was not added to the table');
        }
    $run_id = mysqli_insert_id($conn);

    $runOutput['success'] = true;

    print_r(json_encode($runOutput));