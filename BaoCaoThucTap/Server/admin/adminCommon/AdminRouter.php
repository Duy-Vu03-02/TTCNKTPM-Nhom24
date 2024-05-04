<div class="flex-grow-1">
    <div class="container my-4 appCard <?php if (!isset($_GET['workingPage'])) echo "bg-transparent"; ?>">
        <?php
        if ($workingPage == 'chapter') {
            include("./pages/Chapter/ChapterIndex.php");
            include("./pages/Chapter/AddChapterPopup.php");
        } else if ($workingPage == 'question') {
            include("./pages/Question/QuestionIndex.php");
            include("./pages/Question/AddQuestionPopup.php");
        } else if ($workingPage == 'exam') {
            include("./pages/Exam/ExamIndex.php");
            include("./pages/Exam/AddExamPopup.php");
        } else if ($workingPage == 'user') {
            include("./pages/User/UserIndex.php");
        }
        else {
            include("./pages/Dashboard/DashboardIndex.php");
        }
        ?>
    </div>
</div>