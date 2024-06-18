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


if (isset($_POST['addExam'])) {
    date_default_timezone_set('Asia/Ho_Chi_Minh');
    function escapeString($connect, $string) {
        return mysqli_real_escape_string($connect, $string);
    }

    $characters = '0123456789';
    $examCode = 'De';

    for ($i = 0; $i < 3; $i++) {
        $examCode .= $characters[rand(0, strlen($characters) - 1)];
    }

    $name = escapeString($connect, $_POST['name']);
    $description = escapeString($connect, $_POST['description']);
    $examId = generateUuid(); // Giả sử bạn đã có hàm generateUuid() để sinh UUID

    // Lấy ngày giờ hiện tại và định dạng theo yêu cầu
    $createDate = date('Y-m-d H:i:s');
    $add = "INSERT INTO tbl_exam(id, code, name, description, createDate) 
        VALUES ('$examId', '$examCode', '$name', '$description', '$createDate')";

    mysqli_query($connect, $add);

    // Số lượng câu hỏi muốn thêm vào đề thi
    $numQuestions = 25;

    // Lấy danh sách các câu hỏi từ cơ sở dữ liệu
    $sql = "SELECT id FROM tbl_question";
    $result = mysqli_query($connect, $sql);

    $questionIds = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $questionIds[] = $row['id'];
    }

    // Kiểm tra xem có đủ câu hỏi để chọn ngẫu nhiên không
    if (count($questionIds) < $numQuestions) {
        echo "Không đủ số lượng câu hỏi để thêm vào đề thi.";
        exit;
    }

    // Lấy danh sách câu hỏi điểm liệt
    $dangerQuestionIds = array();
    $sqlDanger = "SELECT id FROM tbl_question WHERE isDanger = 1";
    $resultDanger = mysqli_query($connect, $sqlDanger);
    while ($rowDanger = mysqli_fetch_assoc($resultDanger)) {
        $dangerQuestionIds[] = $rowDanger['id'];
    }

    // Chọn ngẫu nhiên 2 câu hỏi điểm liệt
    $randomDangerQuestionIds = array_rand($dangerQuestionIds, 2);

    $sql1 = "SELECT id FROM tbl_question WHERE isDanger = 0";
    $result1 = mysqli_query($connect, $sql);

    $questionIds1 = array();
    while ($row1 = mysqli_fetch_assoc($result1)) {
        $questionIds1[] = $row1['id'];
    }
    // Lấy ngẫu nhiên các câu hỏi còn lại
    $randomQuestionKeys = array_diff(array_rand($questionIds1, $numQuestions - 2), $randomDangerQuestionIds);


    // Kết hợp danh sách câu hỏi điểm liệt với danh sách câu hỏi ngẫu nhiên
    $selectedQuestionKeys = array_merge($randomDangerQuestionIds, $randomQuestionKeys);

    // Thêm các câu hỏi đã chọn vào đề thi
    foreach ($selectedQuestionKeys as $key) {
        $questionId = $questionIds[$key];
        $uniqueId = generateUuid();
        $sql = "INSERT INTO tbl_exam_question (id, examId, questionId) VALUES ('$uniqueId', '$examId', '$questionId')";
        mysqli_query($connect, $sql);
    }
} else if (isset($_POST['editExam'])) {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $examId = $_GET['id'];
    $sql_editExam = "UPDATE tbl_exam 
    SET 
    name='$name',
    description = '$description'
    WHERE id ='$examId' ";

    $mysqli_query($connect, $sql_editExam);
} else if (isset($_POST['deleteExam'])) {
    $examId = $_GET['id'];
    $deleteExamSQL = "DELETE FROM tbl_exam WHERE id ='$examId';";
    mysqli_query($connect, $deleteExamSQL);
}

header('Location:../../AdminIndex.php?workingPage=exam');
