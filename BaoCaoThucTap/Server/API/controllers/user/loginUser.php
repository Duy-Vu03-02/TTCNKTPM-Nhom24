<?php
    include "../../db/connect.php";
    include "../../model/User.php";

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $data = json_decode(file_get_contents('php://input'), true);
        $provider = isset($data['provider']) ? $data['provider']: null;
        $username = isset($data['name']) ? $data['name']: null;
        $email = isset($data['email']) ? $data['email']: null;
        $userID = isset($data["userID"]) ? $data["userID"] : null;
        $pictute = isset($data['picture']) ? $data['picture']: null;
        $agile = '1=0';
        if($provider === "facebook" && $userID !== null){
            $agile = "facebook = '$userID'";
        }
        else if($provider === "email" && $email !== null){
            $agile = "email = '$email'";
        }
        $select = "SELECT * FROM tbl_user WHERE ".$agile;
        // echo json_encode($provider);

        if($email !== null || $userID !== null){
            $data = array();
            $result = $conn->query($select);
            if($result->num_rows >0){
                $data = new User($result->fetch_assoc());
                if($data === null){
                    http_response_code(204);
                }
                else{
                    echo json_encode($data);
                    http_response_code(200);
                }
            }
            else{
                $insert = "INSERT INTO tbl_user(username, picture, email, facebook, userID)
                        VALUES('$username', '$pictute', '$email', '$userID', '$userID')";
                $resInsert = $conn->query($insert);
                if($resInsert){
                    $data = array();
                    $result = $conn->query($select);
                    if($result->num_rows >0){
                        $data = new User($result->fetch_assoc());
                        if($data === null){
                            http_response_code(204);
                        }
                        else{
                            echo json_encode($data);
                            http_response_code(200);
                        }
                    }
                }
            }
        }

    }
?>