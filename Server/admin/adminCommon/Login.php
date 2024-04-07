<?php
session_start();
include('../../common/config/Connect.php');

if (isset($_SESSION['userId'])) {
    unset($_SESSION['userId']);
}

if (isset($_POST['login']) && isset($_POST['username'])) {
    $username = $_POST['username'];
    $password = ($_POST['password']);

    if ($username == "admin" && $password == "admin") {
        $_SESSION['userId'] = $username;
        header("Location: ../AdminIndex.php");
    } else {
        $message = "Tài khoản mật khẩu không đúng";
        echo "<script type='text/javascript'>alert('$message');</script>";
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="icon" href="../../user/userCommon/images/logo.svg">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles/LoginStyles.css">
    <title>ĐĂNG NHẬP</title>
</head>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="../../common//css/CommonStyle.css">

<body>
    <div class="top_link flex-center">
        <a href="../../index.php" class="p-2 bg-white">
            <i class="fa-solid fa-circle-chevron-left"></i>
            Về trang chủ
        </a>
    </div>

    <form class="login" action="" method="POST">
        <h2 class="text-center m-4">Welcome administrator</h2>
        <label for="username">Username: </label>
        <input required type="text" placeholder="Username" name="username" id="username">
        <label for="password">Password: </label>
        <input required type="password" placeholder="Password" name="password" id="password">
        <div class="flex-center justify-right">
            <button type="submit" name="login">Login</button>
        </div>
    </form>

</body>

</html>