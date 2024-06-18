<?php
    include "../../db/connect.php";
    include "../../model/TitleNoticeBoard.php";

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Content-Type: application/json");

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        $data = array() ;
        $select = "SELECT * FROM tbl_titlenoticeboard";
        $result = $conn->query($select);

        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                $temp = new TitleNoticeBoard($row);
                $data[] = $temp;
            }
            echo json_encode($data);
        }
        else{
            echo json_encode(array("mess" => "Không có dữ liệu"));
        }
    }
    else{
        echo json_encode(array("mess" => "Something went wrong"));
    }
?>