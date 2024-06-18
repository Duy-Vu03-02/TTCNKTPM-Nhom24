<div class="modal fade" id="addQuestion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-dark">
                <h5 class="text-center text-white">Thêm câu hỏi mới</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="categoryForm" method="POST" action="pages/Question/QuestionLogic.php?chapterId=<?php echo $chapterId ?>" enctype="multipart/form-data">
                    <table border="1" width="100%" padding="10px" style="border-collapse: collapse;">
                        <tr>
                            <td class="row">
                                <div class="mb-2 col">
                                    <label for="transferFee" class="form-label">Câu hỏi</label>
                                    <textarea required name="title" type="text" class="form-control" id="transferFee"></textarea>
                                </div>

                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div class="mb-2 col">
                                    <label for="transferFee" class="form-label">Link hình ảnh</label>
                                    <input name="image" type="text" class="form-control" id="transferFee">
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td class="row">
                                <div class="mb-2 col-6">
                                    <label for="transferFee" class="form-label">Đáp án 1</label>
                                    <input required name="option_1" type="text" class="form-control" id="transferFee">
                                </div>
                                <div class="mb-2 col-6">
                                    <label for="transferFee" class="form-label">Đáp án 2</label>
                                    <input required name="option_2" type="text" class="form-control" id="transferFee">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="row">
                                <div class="mb-2 col-6">
                                    <label for="transferFee" class="form-label">Đáp án 3</label>
                                    <input name="option_3" type="text" class="form-control" id="transferFee">
                                </div>
                                <div class="mb-2 col-6">
                                    <label for="transferFee" class="form-label">Đáp án 4</label>
                                    <input name="option_4" type="text" class="form-control" id="transferFee">
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td class="row flex justify-between">
                                <div class="mb-2 col-4">
                                    <label for="transferFee" class="form-label">Đáp án đúng</label>
                                    <select name="trueAnswer" class="form-select" aria-label="Default select example">
                                        <option selected value="1">Đáp án 1</option>
                                        <option value="2">Đáp án 2</option>
                                        <option value="3">Đáp án 3</option>
                                        <option value="4">Đáp án 4</option>
                                    </select>
                                </div>

                                <div class="mb-2 col-3 ">
                                    <label for="description" class="form-label">Câu hỏi điểm liệt</label>
                                    <select name="isDanger" class="form-select" aria-label="Default select example">
                                        <option selected value="0">Không</option>
                                        <option value="1">Có</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                    </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary pt-2 pb-2" data-bs-dismiss="modal">Đóng</button>
                <button type="submit" class="btn btn-primary" name="addQuestion">Thêm câu hỏi</button>
            </div>
            </form>
        </div>
    </div>
</div>