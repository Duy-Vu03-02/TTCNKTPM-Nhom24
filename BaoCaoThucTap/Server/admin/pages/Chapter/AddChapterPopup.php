<div class="modal fade" id="addChapter" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-dark">  
                <h5 class="text-center text-white">Thêm chương mới</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="categoryForm" method="POST" action="pages/Chapter/ChapterLogic.php" enctype="multipart/form-data">
                    <table border="1" width="100%" padding="10px" style="border-collapse: collapse;">
                        <tr>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="transferFee" class="form-label">Tên chương</label>
                                    <input required name="name" type="text" class="form-control" id="transferFee">
                                </div>
                            </td>

                        </tr>

                        <tr>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="receiveAddress" class="form-label">Mô tả</label>
                                    <textarea required name="des" class="form-control" id="receiveAddress" rows="3"></textarea>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="description" class="form-label">Số lượng câu hỏi</label>
                                    <input name="quantity" class="form-control" id="description" rows="3"></input>
                                </div>
                            </td>
                        </tr>
                    </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary pt-2 pb-2" data-bs-dismiss="modal">Đóng</button>

                <button type="submit" class="btn btn-primary" name="addChapter">Thêm chương</button>
            </div>
            </form>
        </div>
    </div>
</div>