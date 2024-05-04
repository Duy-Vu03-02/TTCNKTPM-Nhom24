<?php
include "../../../common/config/Connect.php";
$tennguoidung = $_POST['tennguoidung'];
$taikhoan = $_POST['taikhoan'];
$email = $_POST['email'];
$diachi = $_POST['diachi'];
$code = $_POST['code'];
$phonenumber = $_POST['phonenumber'];
//xử lý hình anh
$file = $_FILES['hinhanh'];
$hinhanh = $file['name'] || "";
$hinhanh_tmp = $_FILES['hinhanh']['tmp_name'];

function generateUuid()
{
    $data = random_bytes(16);

    $data[6] = chr(ord($data[6]) & 0x0F | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3F | 0x80);

    $uuid = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));

    return $uuid;
}

if (isset($_POST['addUser'])) {
    if (isset($_FILES['hinhanh']) && ($file['type'] == 'image/jpeg' || $file['type'] == 'image/jpg' || $file['type'] == 'image/png')) {
        move_uploaded_file($hinhanh_tmp, 'UserImages/' . $hinhanh);
    }
    $userId =  generateUuid();
    $addNewUser = "INSERT INTO tbl_user(id, code, user_image, fullname, username, email, phonenumber,address) 
         VALUES ('" . $userId . "','" . $code . "','" . $hinhanh . "','" . $tennguoidung . "','" . $taikhoan . "','" . $email . "','" . $phonenumber . "','" . $diachi . "')";
    mysqli_query($connect, $addNewUser);
} else if (isset($_POST['editUser'])) {
    if ($file != '') {
        move_uploaded_file($hinhanh_tmp, 'UserImages/' . $hinhanh);
        $sql_editUser = "UPDATE tbl_user SET code='" . $code . "', fullname='" . $tennguoidung . "', user_image='" . $hinhanh . "', username='" . $taikhoan . "', email='" . $email . "',phonenumber='" . $phonenumber . "',address = '" . $diachi . "' WHERE id='$_GET[userId]'";
        $sql = "SELECT * FROM tbl_user WHERE id='$_GET[userId]'";
        $query = mysqli_query($connect, $sql);
        while ($row = mysqli_fetch_array($query)) {
            unlink('UserImages/' . $row['hinhanh']);
        }
    } else {
        $sql_editUser = "UPDATE tbl_user SET code='" . $code . "', fullname='" . $tennguoidung . "', user_image='" . $file . "', username='" . $taikhoan . "', email='" . $email . "',phonenumber='" . $phonenumber . "',
        chucvu='" . $chucvu . "',address = '" . $diachi . "' WHERE id='$_GET[userId]'";
    }
    mysqli_query($connect, $sql_editUser);
} else if (isset($_POST['deleteUser'])) {
    $id = $_GET['userId'];
    echo $id;
    $sql = "SELECT *FROM tbl_user WHERE id = '$id'";
    $query = mysqli_query($connect, $sql);
    while ($row = mysqli_fetch_array($query)) {
        unlink('UserImages/' . $row['hinhanh']);
    }
    $sql_deleteUser = "DELETE FROM tbl_user WHERE id ='" . $id . "';";
    mysqli_query($connect, $sql_deleteUser);
}

header('Location:../../AdminIndex.php?workingPage=user');
