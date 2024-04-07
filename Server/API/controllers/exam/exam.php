<?php
    include "../../db/connect.php";
    include "../../model/Question.php";

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Content-Type: application/json");

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        $selectTotalExam = "SELECT DISTINCT examId FROM tbl_exam_question";
        $result = $conn->query($selectTotalExam);
        $data = array();
        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                $data[] = $row['examId'];
            }
            getExam($data);
        }
        else{
            echo json_encode(array("mess" => "Không có dữ liệu"));
        }
    }
    else{
        echo json_encode(array("mess" => "Something went wrong"));
    }

    function getExam($listData){
        global $conn;
        $data = array();
        foreach($listData as $examId){
            $select = "SELECT * FROM tbl_question 
                INNER JOIN tbl_exam_question 
                ON tbl_question.id = tbl_exam_question.questionId
                WHERE tbl_exam_question.examId = '$examId'";
            $result = $conn->query($select);
            $temp = array();
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $temp[] = new Question($row);
                }
            }
            $data[] = $temp;
        }
        echo json_encode($data);
    }
?>
