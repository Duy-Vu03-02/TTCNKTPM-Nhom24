<?php
    class User{
        public $email;
        public $name;
        public $picture;
        public $userID;
        public $questionerr;

        public function __construct($temp)
        {
            $this->email = $temp["email"] ? $temp["email"] : null;
            $this->name = $temp["username"];
            $this->picture = $temp["picture"];
            $this->userID = $temp["facebook"] ? $temp["facebook"] : null;
            $this->questionerr = $temp["questionerr"] ? $temp["questionerr"] : null;
        }
    }
?>