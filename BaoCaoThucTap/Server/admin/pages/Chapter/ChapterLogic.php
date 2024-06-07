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

if (isset($_POST['addChapter'])) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    $chapterCode = '';

    for ($i = 0; $i < 8; $i++) {
        $chapterCode .= $characters[rand(0, strlen($characters) - 1)];
    }

    $code = $_POST['code'];
    $name = $_POST['name'];
    $des = $_POST['des'];
    $quantity = $_POST['quantity'];
    $chapterId =  generateUuid();
    $add = "INSERT INTO tbl_chapter(id,code,name,description, quantity) 
    VALUES ('" . $chapterId . "','" . $chapterCode . "','" . $name . "','" . $des . "','" . $quantity . "')";

    mysqli_query($connect, $add);
} else if (isset($_POST['editChapter'])) {
    $name = $_POST['name'];
    $des = $_POST['des'];
    $quantity = $_POST['quantity'];

    $sql_editchapter = "UPDATE tbl_chapter 
    SET 
    name='" . $name . "',
    description = '" . $des . "',
    quantity = '" . $quantity . "'
    WHERE id ='$_GET[chapterId]' ";

    $query = mysqli_query($connect, $sql_editchapter);
} else if (isset($_POST['deleteChapter'])) {
    $chapterId = $_GET['chapterId'];
    $deletechapterSQL = "DELETE FROM tbl_chapter WHERE id ='" . $chapterId . "';";
    mysqli_query($connect, $deletechapterSQL);
}

header('Location:../../AdminIndex.php?workingPage=chapter');
