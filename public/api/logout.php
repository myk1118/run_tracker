<?php

session_start();

unset($_SESSION['user']);

print json_encode(['success' => true]);
