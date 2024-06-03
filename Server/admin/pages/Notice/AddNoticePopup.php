<div class="modal fade" id="addNotice" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-dark">  
                <h5 class="text-center text-white">Thêm loại biển báo mới</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="categoryForm" method="POST" action="pages/Notice/NoticeLogic.php" enctype="multipart/form-data">
                    <table border="1" width="100%" padding="10px" style="border-collapse: collapse;">
                        <tr>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="transferFee" class="form-label">Tên loại biển báo</label>
                                    <input required name="name" type="text" class="form-control" id="transferFee">
                                </div>
                            </td>

                        </tr>

                        <tr>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="description" class="form-label">Số lượng câu hỏi</label>
                                    <input type="number" name="count" class="form-control" id="description" rows="3"></input>
                                </div>
                            </td>
                        </tr>
                    </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary pt-2 pb-2" data-bs-dismiss="modal">Đóng</button>

                <button type="submit" class="btn btn-primary" name="addNotice">Thêm loại biển báo</button>
            </div>
            </form>
        </div>
    </div>
</div>