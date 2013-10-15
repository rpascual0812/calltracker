<?php
require_once('../../Classes/ClassParent.php');
class Users extends ClassParent{
    var $empid              = NULL;
    var $password           = NULL;
    var $firstname          = NULL;
    var $lastname           = NULL;
    var $archived           = false;

    public function __construct(
                                    $empid,
                                    $password,
                                    $firstname,
                                    $lastname,
                                    $archived
                                ){
        
        $this->empid                = pg_escape_string(trim(strip_tags($empid)));
        $this->password             = pg_escape_string(trim(strip_tags($password)));
        $this->firstname            = pg_escape_string(trim(strip_tags($firstname)));
        $this->lastname             = pg_escape_string(trim(strip_tags($lastname)));
        $this->archived             = pg_escape_string(trim(strip_tags($archived)));
    }

    public function auth(){
        $code = $this->code;
        $sql = <<<EOT
                select
                    empid,
                    firstname,
                    lastname
                from users
                where empid = '$this->empid'
                    and password = md5('$this->password')
                    and archived = false
                ;
EOT;
        return ClassParent::get($sql);
    }

}
?>