<?php
    include "../../db/connect.php";
    include "../../model/Question.php";

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Content-Type: application/json");

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        $id = isset($_GET["id"]) ? (String)$_GET["id"] : "";
        if($id !== ""){
            $select = "SELECT * FROM tbl_question where chapterId = '$id'";
            $result = $conn->query($select);
            $data = array();

            if($result->num_rows >0){
                while($row = $result->fetch_assoc()){
                    $data[] = new Question($row);
                }
                
                echo json_encode($data);
            }
            else{
                echo json_encode(array("mess" => "Không có dữ liệu"));
            }
        }
        else{
            echo json_encode(array("mess" => "Không có dữ liệu"));
        }
    }
    else{
        echo json_encode(array("mess" => "Something went wrong"));
    }

?>