<?php
    class User{
        public $email;
        public $name;
        public $picture;
        public $userID;
        public $questionerr;
        public $facebook;

        public function __construct($temp)
        {
            $this->email = isset($temp["email"]) ? $temp["email"] : null;
            $this->name = $temp["username"];
            $this->picture = $temp["picture"];
            $this->userID = isset($temp["userID"]) ? $temp["userID"] : null;
            $this->facebook = isset($temp["facebook"]) ? $temp["facebook"] :null;
            $this->questionerr = isset($temp["questionerr"]) ? $temp["questionerr"] : null;
        }
    }
?>