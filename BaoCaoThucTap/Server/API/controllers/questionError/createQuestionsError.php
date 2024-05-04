<?php
    include "../../db/connect.php";
    include "../../model/CreateQuestionsError.php";

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Content-Type: application/json");

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        $action = isset($_GET["action"]) ? $_GET["action"] : "";
        if($action != ""){
            $listId = explode(",",$action);

            for($i = 0; $i< count($listId); $i++){
                $selectId = "SELECT questionId FROM tbl_user_wrong_question WHERE questionId = '$listId[$i]'";
                $resultId = $conn->query($selectId);
                if($resultId->num_rows > 0){
                    $updateById = "UPDATE tbl_user_wrong_question 
                                        SET totaltimes = totaltimes +1
                                        WHERE questionId = '$listId[$i]'";
                    $resultUpdateById = $conn->multi_query($updateById);
                    if($resultUpdateById){
                        http_response_code(200);
                        echo json_encode(array("mess" => "update thanh cong"));
                    }
                    else{
                        http_response_code(404);
                        echo json_encode(array("mess" => "update that bai"));
                    }
                }
                else{
                    $select = "SELECT id FROM tbl_question where id = '$listId[$i]'";
                    $result = $conn->query($select);
                    if($result->num_rows > 0){
                        $insert = "INSERT INTO tbl_user_wrong_question (questionId, totaltimes) VALUES('$listId[$i]', 1)";
                        $resultInsert = $conn->multi_query($insert);
                        if($resultInsert){
                            http_response_code(200);
                            echo json_encode(array("mess" => "insert thanh cong"));
                        }
                        else{
                            http_response_code(404);
                            echo json_encode(array("mess" => "insert that bai"));
                        }
                    }
                    else{
                        http_response_code(404);
                        echo json_encode(array("mess" => "Khong ton tai id cau hoi nay"));
                    }
                }
            }
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