<?php
    include "../../db/connect.php";
    include "../../model/Question.php";

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Content-Type: application/json");

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        $select = "SELECT  * FROM tbl_question 
            ORDER BY totalerr DESC
            LIMIT 50";
        $result = $conn->query($select);
        $data = array();
        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                $answer = array(
                    $row["option_1"],
                    $row["option_2"]
                );
                if($row["option_3"] != null){
                    $answer[] = $row["option_3"];
                }
                if($row["option_4"] != null){
                    $answer[] = $row["option_4"];
                }
                $data[] = array(
                    "id" => $row["id"], 
                    "question" => $row["title"], 
                    "img" => $row["questionImage"], 
                    "answer" => $answer,
                    "trueAnswer" => (int)$row["trueAnswer"], 
                    "mustCorrect" => boolval($row["isDanger"]),
                    "totalqserr" => $row["totalerr"],
                    "totalqscorrect" => $row["totalcorrect"],
                );
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