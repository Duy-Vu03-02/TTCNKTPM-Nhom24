<div class="modal fade" id="editPopup_<?php echo $row['id']; ?>" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <form method="POST" action="pages/Detail/DetailLogic.php?id=<?php echo $row['id']; ?>&noticeId=<?php echo $row['detail_titlenoticeboard'] ?>" enctype="multipart/form-data">
            <div class="modal-content">
                <div class="modal-header bg-dark">
                    <h5 class="text-center text-white">Sửa biển báo</h5>

                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table border="1" width="100%" padding="10px" style="border-collapse: collapse;">
                        <tr>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="transferFee" class="form-label">Tiêu đề</label>
                                    <input value="<?php echo trim($row['title'], " ") ?>" required name="title" type="text" class="form-control" id="transferFee">
                                        
                                    </input>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="transferFee" class="form-label">Mô tả</label>
                                    <textarea required name="content" type="text" class="form-control" id="transferFee"><?php echo $row['content'] ?></textarea>
                                </div>

                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div class="mb-2 col">
                                    <label for="transferFee" class="form-label">Link hình ảnh</label>
                                    <input name="img" type="text" class="form-control" id="transferFee">
                                </div>
                            </td>
                        </tr>


                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary pt-2 pb-2" data-bs-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-primary" name="editDetail">Sửa</button>
                </div>
            </div>
        </form>
    </div>
</div>