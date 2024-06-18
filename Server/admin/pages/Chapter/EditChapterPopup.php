<div class="modal fade" id="editPopup_<?php echo $row['id']; ?>" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <form method="POST" action="pages/Chapter/ChapterLogic.php?chapterId=<?php echo $row['id']; ?>" enctype="multipart/form-data">
            <div class="modal-content">
                <div class="modal-header bg-dark">
                    <h5 class="text-center text-white">Sửa chương mã: <?php echo $row['code']; ?></h5>

                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <table border="1" width="100%" padding="10px" style="border-collapse: collapse;">
                        <tr>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="transferFee" class="form-label">Tên chương</label>
                                    <input value="<?php echo $row['name'] ?>" required name="name" type="text" class="form-control" id="transferFee">
                                </div>
                            </td>

                        </tr>

                        <tr>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="receiveAddress" class="form-label">Mô tả</label>
                                    <textarea required name="des" class="form-control" id="receiveAddress" rows="3"><?php echo $row['description']; ?></textarea>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="description" class="form-label">Số lượng câu hỏi</label>
                                    <input value="<?php echo $row['quantity'] ?>" name="quantity" class="form-control" id="description" rows="3"></input>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary pt-2 pb-2" data-bs-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-primary" name="editChapter">Sửa</button>
                </div>
            </div>
        </form>
    </div>
</div>