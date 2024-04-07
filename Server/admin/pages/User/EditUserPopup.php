<div class="modal fade" id="editPopup_<?php echo $row['id']; ?>" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <form method="POST" action="pages/User/UserLogic.php?userId=<?php echo $row['id']; ?>" enctype="multipart/form-data">
            <div class="modal-content">
                <div class="modal-header bg-dark">
                    <h5 class="text-center text-white">Sửa người dùng</h5>

                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table border="1" width="100%" style="border-collapse: collapse;">

                        <tr>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="exampleFormControlInput1" class="form-label">
                                        Tên người dùng
                                    </label>
                                    <input type="text" value="<?php echo $row['fullname'] ?>" name="tennguoidung" class="form-control" id="exampleFormControlInput1">

                                </div>
                            </td>
                            <tr>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="exampleFormControlInput1" class="form-label">
                                        Code
                                    </label>
                                    <input type="text" value="<?php echo $row['code'] ?>" name="code" class="form-control" id="exampleFormControlInput1">

                                </div>
                            </td>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="exampleFormControlInput1" class="form-label">
                                        Email
                                    </label>
                                    <input type="text" name="email" value="<?php echo $row['email'] ?>" class="form-control" id="exampleFormControlInput1">
                                </div>
                            </td>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="exampleFormControlInput1" class="form-label">
                                        Tài khoản
                                    </label>
                                    <input type="text" name="taikhoan" value="<?php echo $row['username'] ?>" class="form-control" id="exampleFormControlInput1">
                                </div>
                            </td>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="exampleFormControlInput1" class="form-label">
                                        Số điện thoại
                                    </label>
                                    <input type="text" name="phonenumber" value="<?php echo $row['phonenumber'] ?>" class="form-control" id="exampleFormControlInput1">
                                </div>
                            </td>
                           
                        </tr>
                        <tr>
                        <tr>
                            <td class="row">
                                <div class="col-6 flex-column">
                                    <label for="exampleFormControlInput1" class="form-label">
                                        Hình ảnh
                                    </label>
                                    <input type="file" name="hinhanh" class="form-control" id="exampleFormControlInput1">
                                </div>
                                <div class="col-6">
                                    <img class="imageInPopup" src="pages/User/UserImages/<?php echo $row['user_image'] ?>" alt="">
                                </div>
                            </td>
                        </tr>
                            
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="exampleFormControlInput1" class="form-label">
                                        Địa chỉ
                                    </label>
                                    <input type="text" name="diachi" value="<?php echo $row['address'] ?>" class="form-control" id="exampleFormControlInput1">
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary pt-2 pb-2" data-bs-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-primary" name="editUser">Sửa</button>
                </div>
            </div>
        </form>
    </div>
</div>