<?php
require_once('../../Classes/ClassParent.php');
class Report extends ClassParent{

    public function fetch(){
        $sql = <<<EOT
                select 
                    *
                from calllogs 
                where table_name='calllogs'
                    and column_name not in ('pk','datecreated','createdby')
                order by ordinal_position asc
                ;
EOT;

        return ClassParent::getFields($sql);
    }

}
?>