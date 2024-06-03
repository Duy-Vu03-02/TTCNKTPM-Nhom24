<?php
    class CreateQuesitonsError{
        public $questionid;
        public $totaltimes;

        public function __construct($temp)
        {
            $this->questionid = $temp["id"];
            $this->totaltimes = $temp["count"];
        }
    }
?>