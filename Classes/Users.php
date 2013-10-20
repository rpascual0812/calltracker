<?php
require_once('../../Classes/ClassParent.php');
class Users extends ClassParent{
    var $empid              = NULL;
    var $password           = NULL;
    var $lastname           = NULL;
    var $firstname          = NULL;    
    var $visibility         = false;
    var $archived           = false;

    public function __construct(
                                    $empid,
                                    $password,
                                    $lastname,
                                    $firstname,
                                    $visibility,
                                    $archived
                                ){
        
        $fields = get_defined_vars();
        
        if(empty($fields)){
            return(FALSE);
        }

        //sanitize
        foreach($fields as $k=>$v){
            $this->$k = pg_escape_string(trim(strip_tags($v)));
        }
        return(true);
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

    public function fetchAll(){
        $sql = <<<EOT
                select
                    empid,
                    firstname,
                    lastname,
                    visibility,
                    archived
                from users
                where empid != '1'
                    and visibility = $this->visibility
                    and archived = false
                order by visibility
                ;
EOT;
        return ClassParent::get($sql);
    }

    public function create(){
        $sql = <<<EOT
                insert into users
                (empid, lastname, firstname)
                values
                ('$this->empid','$this->lastname','$this->firstname')
                ;
EOT;
        return ClassParent::insert($sql);
    }

    public function delete(){
        $sql = <<<EOT
                update users
                set archived = false
                where empid = '$this->empid'
                ;
EOT;
        return ClassParent::update($sql);
    }

    public function status(){
        $sql = <<<EOT
                update users
                set visibility = '$this->visibility'
                where empid = '$this->empid'
                ;
EOT;
        return ClassParent::update($sql);
    }

}
?>