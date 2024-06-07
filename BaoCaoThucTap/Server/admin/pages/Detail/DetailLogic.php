<?php
include "../../../common/config/Connect.php";
$noticeId = $_GET['noticeId'];

if (isset($_POST['addDetail'])) {  

    $sql = "SELECT MAX(id) AS last_id FROM tbl_detailnoticeboard";
    $result = $connect->query($sql);
    $row = $result->fetch_assoc();
    $last_id = $row['last_id'];
    $last_id_int = intval($last_id);
    $last_id_int++;
    $title = $_POST['title'];
    $img = $_POST['img'];
    
    $id = intval($noticeId);
    $content = $_POST['content'];
    $add = "INSERT INTO tbl_detailnoticeboard VALUES ($last_id_int,'$img','$title','$content',$id)";
    mysqli_query($connect, $add);
} else if (isset($_POST['editDetail'])) {
    $title = $_POST['title'];
    $img = $_POST['img'];
    $id = intval($_GET['id']);
    $content = $_POST['content'];

    $edit = "UPDATE tbl_detailnoticeboard SET img = '$img', title = '$title', content = '$content'
    WHERE id = $id";

    $query = mysqli_query($connect, $edit);
} else if (isset($_POST['deleteDetail'])) {
    $id = $_GET['id'];
    $deletechapterSQL = "DELETE FROM tbl_detailnoticeboard WHERE id =$id";
    mysqli_query($connect, $deletechapterSQL);
}

header('Location:../../AdminIndex.php?workingPage=detail&noticeId='. $noticeId);
