<?php
    include "../../db/connect.php";
    include "../../model/CreateQuestionsError.php";

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Content-Type: application/json");

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        $listErr = isset($_GET["listerr"]) ? $_GET["listerr"] : null;
        $listCorrect = isset($_GET["listcorrect"]) ? $_GET["listcorrect"] : null;
        if($listErr != null || $listCorrect != null){
            $listErr = explode(",",$listErr);
            $listCorrect = explode(",", $listCorrect);
            for($i = 0; $i< count($listErr); $i++){
                $selectId = "SELECT id FROM tbl_question WHERE id = '$listErr[$i]'";
                $resultId = $conn->query($selectId);
                if($resultId->num_rows > 0){
                    $updateById = "UPDATE tbl_question 
                                        SET totalerr  = totalerr + 1
                                        WHERE id = '$listErr[$i]'";
                    $resultUpdateById = $conn->multi_query($updateById);
                }
                else{
                    echo json_encode(array("mess" => "Khong ton tai id cau hoi nay"));
                }    
            }

            for($i = 0; $i< count($listCorrect); $i++){
                $selectId = "SELECT id FROM tbl_question WHERE id = '$listCorrect[$i]'";
                $resultId = $conn->query($selectId);
                if($resultId->num_rows > 0){
                    $updateById = "UPDATE tbl_question 
                                        SET totalcorrect = totalcorrect +1
                                        WHERE id = '$listCorrect[$i]'";
                    $resultUpdateById = $conn->multi_query($updateById);
                }
                else{
                    echo json_encode(array("mess" => "Khong ton tai id cau hoi nay"));
                }    
            }
            echo json_encode($liseSelect);
        }
        else{
            http_response_code(404);
            echo json_encode(array("mess" => "Du lieu rong"));
        }
    } 
    else{
        http_response_code(405);
        echo json_encode(array("mess" => "Something went wrong"));
    }
?>