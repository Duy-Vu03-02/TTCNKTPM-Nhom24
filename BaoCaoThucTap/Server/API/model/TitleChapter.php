<?php
    class TitleChapter{
        public $id;
        public $title;
        public $description;

        public function __construct ($temp){
            $this->id = $temp["id"];
            $this->title = $temp["name"];
            $this->description = $temp["description"];
        }

    }
?>