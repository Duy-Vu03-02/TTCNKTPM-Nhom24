<?php
include "../../../common/config/Connect.php";
$tennguoidung = $_POST['tennguoidung'];
$email = $_POST['email'];

function generateUuid()
{
    $data = random_bytes(16);

    $data[6] = chr(ord($data[6]) & 0x0F | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3F | 0x80);

    $uuid = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));

    return $uuid;
}

if (isset($_POST['editUser'])) {
    $sql_editUser = "UPDATE tbl_user SET username='" . $tennguoidung . "', email='" . $email . "' WHERE id='$_GET[userId]'";
    mysqli_query($connect, $sql_editUser);
} else if (isset($_POST['deleteUser'])) {
    $id = $_GET['userId'];
    $sql_deleteUser = "DELETE FROM tbl_user WHERE id ='" . $id . "';";
    mysqli_query($connect, $sql_deleteUser);
}

header('Location:../../AdminIndex.php?workingPage=user');
