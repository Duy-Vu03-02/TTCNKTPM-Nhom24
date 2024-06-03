<?php
    class TitleNoticeBoard{
        public $id;
        public $count;
        public $title;

        public function __construct($temp)
        {
            $this->id = $temp["id"];
            $this->count = $temp["count"];
            $this->title = $temp["title"];
        }
    }
?>