<?php

    $server = "localhost";
    $user = "root";
    $pass = "";
    $db = "gplx_db";

    $conn = new mysqli($server, $user, $pass, $db);

    if($conn->connect_error){
        die("Ket noi that bai".$conn->connect_error);
    }
    else{
        // echo "Ket noi thanh cong";
    }

?>