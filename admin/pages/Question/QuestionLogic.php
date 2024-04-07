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
$chapterId = $_GET["chapterId"];


if (isset($_POST['addQuestion'])) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    $questionCode = '';

    for ($i = 0; $i < 8; $i++) {
        $questionCode .= $characters[rand(0, strlen($characters) - 1)];
    }   

    $title = $_POST['title'];
    $image = $_POST['image'];
    $option_1 = $_POST['option_1'];
    $option_2 = $_POST['option_2'];
    $option_3 = $_POST['option_3'];
    $option_4 = $_POST['option_4'];
    $trueAnswer = intval($_POST['trueAnswer']);
    $isDanger = isset($_POST['isDanger']) ? 0 : 1;
    $questionId = generateUuid();

    $add = "INSERT INTO tbl_question(id,code,questionImage,title,chapterId,option_1,option_2,option_3,option_4,trueAnswer,isDanger) 
    VALUES ('$questionId','$questionCode','$image','$title','$chapterId','$option_1','$option_2','$option_3','$option_4',$trueAnswer,$isDanger)";

    $ok = mysqli_query($connect, $add);
    echo $ok;
} else if (isset($_POST['editQuesiton'])) {

    $title = $_POST['title'];
    $image = $_POST['image'];
    $option_1 = $_POST['option_1'];
    $option_2 = $_POST['option_2'];
    $option_3 = $_POST['option_3'];
    $option_4 = $_POST['option_4'];
    $trueAnswer = intval($_POST['trueAnswer']);
    $isDanger = isset($_POST['isDanger']) ? 0 : 1;

    echo $title . "<br>";
    echo $image . "<br>";
    echo $option_1 . "<br>";
    echo $option_2 . "<br>";
    echo $option_3 . "<br>";
    echo $option_4 . "<br>";
   echo $trueAnswer . "<br>";
   echo $isDanger . "<br>";

    $sql_editchapter = "UPDATE tbl_question
    SET
    questionImage = '$image',
    title = '$title',
    chapterId = '$chapterId',
    option_1 = '$option_1',
    option_2 = '$option_2',
    option_3 ='$option_3',
    option_4 = '$option_4',
    trueAnswer = $trueAnswer,
    isDanger = $isDanger
    WHERE id = '$_GET[id]';";


    $query = mysqli_query($connect, $sql_editchapter);
} else if (isset($_POST['deleteQuestion'])) {
    $questionId = $_GET['id'];
    echo $questionId;

    $deletechapterSQL = "DELETE FROM tbl_question WHERE id ='" . $questionId . "';";
    mysqli_query($connect, $deletechapterSQL);
}

header('Location:../../AdminIndex.php?workingPage=question&chapterId='. $chapterId);
