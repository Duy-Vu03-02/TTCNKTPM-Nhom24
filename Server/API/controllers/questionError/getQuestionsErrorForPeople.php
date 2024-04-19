<?php
    include "../../db/connect.php";
    include "../../model/Question.php";

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Content-Type: application/json");

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        $select = "SELECT  * FROM question 
            inner join questionserror on question.id = questionserror.questionid
            ORDER BY questionserror.totaltimes DESC
            LIMIT 25";
        $result = $conn->query($select);
        $data = array();
        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                $data[] = new Question($row);
            }

            http_response_code(200);
            echo json_encode( $data);
        }
        else{
            http_response_code(204);
            echo json_encode(array("mess" => "Khong co du lieu"));
        }
    }
    else{
        http_response_code(404);
        echo json_encode(array("mess" => "Something went wrong"));
    }
?>