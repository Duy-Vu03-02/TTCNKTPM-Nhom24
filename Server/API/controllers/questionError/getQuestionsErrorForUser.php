<?php
    include "../../db/connect.php";
    include "../../model/Question.php";

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Content-Type: application/json");

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        $action = isset($_GET["action"]) ? $_GET["action"] : "";
        $listID = explode(",", $action);
        if(count($listID) > 0){
            $data = array();

            for($i = 0; $i < count($listID); $i++){
                $select = "SELECT * FROM tbl_question where id = '$listID[$i]'";
                $result = $conn->query($select);
                if($result->num_rows > 0){
                    while($row = $result->fetch_assoc()){
                        $data[] = new Question($row);
                    }
                }
            }
            http_response_code(200);
            echo json_encode($data);
        }
    }
    else{
        http_response_code(405);
        echo json_encode(array("mess" => "Something went wrong"));
    }
?>