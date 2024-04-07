<div class="modal fade" id="editPopup_<?php echo $row['id']; ?>" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <form method="POST" action="pages/Exam/ExamLogic.php?id=<?php echo $row['id']; ?>" enctype="multipart/form-data">
            <div class="modal-content">
                <div class="modal-header bg-dark">
                    <h5 class="text-center text-white">Sửa câu hỏi</h5>

                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <table border="1" width="100%" padding="10px" style="border-collapse: collapse;">
                        <tr>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="transferFee" class="form-label">Tên đề thi</label>
                                    <textarea required name="name" type="text" class="form-control" id="transferFee">
                                        <?php echo $row['name'] ?>
                                    </textarea>
                                </div>

                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div class="mb-2 col">
                                    <label for="transferFee" class="form-label">Mô tả</label>
                                    <input value="<?php echo $row['description'] ?>" name="description" type="text" class="form-control" id="transferFee">
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary pt-2 pb-2" data-bs-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-primary" name="editExam">Sửa</button>
                </div>
            </div>
        </form>
    </div>
</div>