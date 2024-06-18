<?php
    include "../../db/connect.php";
    include "../../model/Question.php";
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Content-Type: application/json");


   if($_SERVER["REQUEST_METHOD"] === "GET" ){
    $selectTotalQuestion = "SELECT COUNT(*)  FROM tbl_question";
    $result = $conn->query($selectTotalQuestion);
    
    if($result->num_rows >0){
        $totalQuestion = $result->fetch_assoc()["COUNT(*)"];
        randQuestion($totalQuestion);
    }
    else{
        echo json_encode(array("mess" => "Không có dữ liệu"));
    }
   }
   else{
        echo json_encode(array("mess" => "Something went wrong"));
   }

    function randQuestion($total){
        global $conn;
        $arrayID = array();
        $question = array();
        $questionCritical = 2;
        $questionNomal = 25 - $questionCritical;

        while(count($arrayID) < $questionNomal){
            $rand = random_int(1,$total);
            if(!in_array($rand, $arrayID)){
                $select = "SELECT * FROM tbl_question where id = $rand and isDanger = 0";
                $result = $conn->query($select);
                
                if($result->num_rows >0){
                $temp = $result->fetch_assoc(); 
                $question[] = new Question($temp);
                $arrayID[] = $rand;
                }
            }
        }

        $arrayID =array();
        while(count($arrayID) < $questionCritical){
            $rand = random_int(1,$total);
            if(!in_array($rand, $arrayID)){
                $select = "SELECT * FROM tbl_question where id = $rand and isDanger = 1";
                $result = $conn->query($select);
                
                if($result->num_rows >0){
                    $temp = $result->fetch_assoc();
                    $randIndex = random_int(1,$questionNomal -1);
                    $swap = $question[$randIndex];
                    $question[$randIndex] = new Question($temp);
                    $question[] = $swap;
                    $arrayID[] = $rand;
                }
            }
        }

        $response = (array(
            "content" =>  array(
                "totalQuestion" => $questionNomal + $questionCritical,
                "questionNomal" => $questionNomal,
                "questionCritical" => $questionCritical,
            ),
            "data" => $question,
        ));
        echo json_encode($response); 
    }
?>