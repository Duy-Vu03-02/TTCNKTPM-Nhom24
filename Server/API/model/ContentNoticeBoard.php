<?php
    class ContentNoticeBoard{
        public $id;
        public $img;
        public $title;
        public $content;

        public function __construct($temp)
        {
            $this->id = $temp["id"];
            $this->img = $temp["img"];
            $this->title = $temp["title"];
            $this->content = $temp["content"]; 
        }
    }
?>