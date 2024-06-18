<?php
    include "../../db/connect.php";
    include "../../model/Question.php";

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Content-Type: application/json");

    if($_SERVER["REQUEST_METHOD"] === "GET"){
       $id = isset($_GET["id"]) ? $_GET["id"] : null;
       if($id) getExam($id);
        else{
            echo json_encode(array("mess" => "Không có dữ liệu"));
        }
    }
    else{
        echo json_encode(array("mess" => "Something went wrong"));
    }

    function getExam($examId){
        global $conn;
        
            $select = "
                SELECT 
                tbl_question.id, tbl_question.title, tbl_question.questionImage,
                tbl_question.option_1, tbl_question.option_2, tbl_question.option_3,
                tbl_question.option_4, tbl_question.chapterId, tbl_question.trueAnswer,
                tbl_question.isDanger 
                FROM tbl_question 
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
        echo json_encode($temp);
    }
?>
