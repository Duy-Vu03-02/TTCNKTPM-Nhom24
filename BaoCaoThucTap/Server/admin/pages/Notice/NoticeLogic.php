<?php
include "../../../common/config/Connect.php";

function generateUuid()
{
    $data = random_bytes(16);

    $data[6] = chr(ord($data[6]) & 0x0F | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3F | 0x80);
    $uuid = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    return $uuid;
}

if (isset($_POST['addNotice'])) {
    $sql = "SELECT MAX(id) AS last_id FROM tbl_titlenoticeboard";
    $result = $connect->query($sql);
    $row = $result->fetch_assoc();
    $last_id = $row['last_id'];
    $last_id_int = intval($last_id);
    $last_id_int++;
    $name = $_POST['name'];
    $quantity = $_POST['count'];
    $add = "INSERT INTO tbl_titlenoticeboard VALUES ($last_id_int, $quantity , '$name' )";

    mysqli_query($connect, $add);
} else if(isset($_POST['deleteNotice'])){
    $id = $_GET['id'];
    $id_int = intval($id);
    $del = "DELETE FROM tbl_titlenoticeboard WHERE id = $id_int";

    mysqli_query($connect, $del);
} else if(isset($_POST['editNotice'])){
    $id = $_GET['id'];
    $id_int = intval($id);
    $title = $_POST['name'];
    $count = $_POST['quantity'];
    $add = "UPDATE tbl_titlenoticeboard SET title = '$title', count = $count WHERE id = $id_int";
    mysqli_query($connect, $add);
}

header('Location:../../AdminIndex.php?workingPage=notice');
