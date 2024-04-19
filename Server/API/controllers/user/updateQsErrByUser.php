<?php
    include "../../db/connect.php";
    
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Content-type: application/json");

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        $provider = isset($_GET["provider"]) ? $_GET["provider"] : null;
        $email = isset($_GET['email']) ? $_GET["email"] : null;
        $userID = isset($_GET['userID']) ? $_GET["userID"] : null;
        $listID = isset($_GET["listID"]) ? $_GET["listID"]:null;

        if($listID !== null){
            $agile = '1=0';
            if($provider === 'facebook' && $userID !== null){
                $agile= "userID = '$userID'";
            }
            else if($provider === "email"  && $email !== null){
                $agile = "email = '$email'";
            }
            $select = "SELECT id, questionerr FROM tbl_user WHERE ".$agile;
            $result = $conn->query($select);
            if($result->num_rows >0){
                $data = $result->fetch_assoc();
                /// true la nhan ve kieu mang
                $oldList = json_decode($data["questionerr"], true);
                $listID = explode(",",$listID);
                $id = $data["id"];

                // decode troc khi su dung
                $mergeList = empty($oldList) || $oldList == null ? $listID : ($listID + $oldList);
                // encode truoc khi update
                $mergeList = json_encode($mergeList);

                $update = "UPDATE tbl_user
                        SET questionerr = '$mergeList'
                        WHERE id = '$id'";
                if($conn->query($update)){
                    http_response_code(204);
                }
                else{
                    http_response_code(403);
                }
            }
            else{
                http_response_code(404);
            }
        }
    }
    else{
        http_response_code(404);
        echo json_encode(array("mess" => "Something went wrong"));
    }
?>