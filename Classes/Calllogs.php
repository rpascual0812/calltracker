<?php
require_once('../../Classes/ClassParent.php');
class Calllogs extends ClassParent{

    public function fields(){
        $sql = <<<EOT
                select 
                    column_name as name,
                    data_type as type
                from information_schema.columns 
                where table_name='calllogs'
                    and column_name not in ('pk','datecreated','createdby')
                order by ordinal_position asc
                ;
EOT;

        return ClassParent::getFields($sql);
    }

    public function allfields(){
        $sql = <<<EOT
                select 
                    column_name as name,
                    data_type as type
                from information_schema.columns 
                where table_name='calllogs'
                order by ordinal_position asc
                ;
EOT;

        return ClassParent::getFields($sql);
    }

    public function graphfields(){
        $sql = <<<EOT
                select 
                    column_name as name,
                    data_type as type
                from information_schema.columns 
                where table_name='calllogs'
                    and column_name not in ('pk','datecreated')
                order by ordinal_position asc
                ;
EOT;

        return ClassParent::getFields($sql);
    }

    public function insert($data){
        $data = json_decode($data);
        
        $fields=[];
        $values=[];

        foreach($data as $info){
            array_push($fields, pg_escape_string(trim(strip_tags($info->field))));
            if($info->type == "integer"){
                array_push($values, pg_escape_string(trim(strip_tags($info->answer))));    
            }
            else{
                array_push($values, "'".pg_escape_string(trim(strip_tags($info->answer)))."'");
            }
            
        }

        $fields = implode(',', $fields);
        $values = implode(',', $values);

        $sql = <<<EOT
                insert into calllogs
                (createdby, $fields)
                values
                ('1', $values)
                ;
EOT;

        return ClassParent::insert($sql);
    }

    public function add($data){
        $field = pg_escape_string(trim(strip_tags($data['field'])));

        $pattern = '/\s/';
        $replacement = '_';
        $field = strtolower(preg_replace($pattern, $replacement, $field));

        $type = pg_escape_string(trim(strip_tags($data['type'])));

        $sql = <<<EOT
                alter table calllogs add column $field $type;
EOT;

        return ClassParent::insert($sql);
    }

    public function drop($data){
        $field = pg_escape_string(trim(strip_tags($data['field'])));

        $sql = <<<EOT
                alter table calllogs drop column $field;
EOT;

        return ClassParent::insert($sql);
    }

    public function rename($data){
        $field = pg_escape_string(trim(strip_tags($data['field'])));

        $pattern = '/\s/';
        $replacement = '_';
        $name = strtolower(preg_replace($pattern, $replacement, $data['name']));

        $name = pg_escape_string(trim(strip_tags($name)));

        $sql = <<<EOT
                alter table calllogs rename column $field to $name;
EOT;

        return ClassParent::insert($sql);
    }

    public function fetchAll($datefrom,$dateto){
        $sql = <<<EOT
                select
                    calllogs.*,
                    users.firstname||' '||users.lastname as name
                from calllogs
                left join users on (users.empid = calllogs.createdby)
                where datecreated between '$datefrom' and '$dateto'
                ;
EOT;
        return ClassParent::get_array($sql);
    }
}
?>