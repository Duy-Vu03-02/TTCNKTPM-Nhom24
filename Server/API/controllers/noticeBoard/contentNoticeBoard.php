<?php
    include "../../db/connect.php";
    include "../../model/ContentNoticeBoard.php";

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Content-Type: application/json");

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        $index = isset($_GET['index']) ? $_GET['index'] : "";
        if($index !== ""){
            $data = array();
            $select = "SELECT * FROM tbl_detailnoticeboard where detail_titlenoticeboard = $index";
            $result = $conn->query($select);
            
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $data[] = new ContentNoticeBoard($row);
                };
                echo json_encode($data);
            }
            else{
                echo json_encode(array("mess" => "Không có dữ liệu"));
            }
            }
        else{
            echo json_encode(array("mess" => "Something went wrong"));
        }
    }
?>