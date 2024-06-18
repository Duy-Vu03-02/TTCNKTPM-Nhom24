<?php
    class Question {
        public $id;
        public $question;
        public $img;
        public $answer;
        public $trueAnswer;
        public $hint;
        public $mustCorrect;
        public $question_chapter;

        public function __construct($temp) {
            $this->id = $temp["id"];
            $this->question = $temp["title"];
            if($temp["questionImage"] !== "" && $temp["questionImage"] !== null){
                $this->img = $temp["questionImage"];
            }
            $this->answer = array(
                $temp["option_1"],
                $temp["option_2"] 
            );
            if($temp["option_3"] !== "" && $temp["option_3"] !== null){
                $this->answer[] = $temp["option_3"];
            }
            if($temp["option_4"] !== "" && $temp["option_4"] !== null){
                $this->answer[] = $temp["option_4"];
            }
            $this->question_chapter = $temp["chapterId"];
            $this->trueAnswer = (int)$temp["trueAnswer"] -1;
            $this->mustCorrect = (boolval($temp["isDanger"]));
        }
}

?>