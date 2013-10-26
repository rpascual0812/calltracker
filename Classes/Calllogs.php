<?php
require_once('../../Classes/ClassParent.php');
class Calllogs extends ClassParent{

    public function fields($archived){
// old query getting the fields directly from the calllogs table
//         $sql = <<<EOT
//                 select 
//                     column_name as name,
//                     data_type as type
//                 from information_schema.columns 
//                 where table_name='calllogs'
//                     and column_name not in ('pk','datecreated','createdby')
//                 order by ordinal_position asc
//                 ;
// EOT;
            $sql = <<<EOT
                    select
                        field as name,
                        type
                    from fields
                    where archived = '$archived'
                    order by datecreated
                    ;
EOT;

        return ClassParent::getFields($sql);
    }

    public function allfields(){
//         $sql = <<<EOT
//                 select 
//                     column_name as name,
//                     data_type as type
//                 from information_schema.columns 
//                 where table_name='calllogs'
//                 order by ordinal_position asc
//                 ;
// EOT;
            $sql = <<<EOT
                    select
                        field as name,
                        type,
                        archived
                    from fields
                    order by datecreated
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
        $sql = <<<EOT
                    select
                        field as name,
                        type,
                        archived
                    from fields
                    where field not in ('pk','datecreated')
                        and archived = false
                    order by datecreated
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

        $empid = $_COOKIE['empid'];

        $sql = <<<EOT
                insert into calllogs
                (createdby, $fields)
                values
                ('$empid', $values)
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
                begin;
                    alter table calllogs add column $field $type;
                    insert into fields (field,type) values('$field','$type');
                commit;
EOT;

        return ClassParent::insert($sql);
    }

    public function archive($data){
        $field = pg_escape_string(trim(strip_tags($data['field'])));
        $archived = pg_escape_string(trim(strip_tags($data['archived'])));

//         $sql = <<<EOT
//                 begin;
//                     alter table calllogs drop column $field;
//                     delete from fields where field = '$field';
//                 commit;

// EOT;
            $sql = <<<EOT
                    update fields set archived = '$archived' 
                    where field = '$field'; 
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
                begin;
                    alter table calllogs rename column $field to $name;
                    update fields set field = '$name' where field = '$field';
                commit;
EOT;

        return ClassParent::insert($sql);
    }

    public function fetchAll($datefrom,$dateto,$author){
        $empid = "";
        if($author != 'All'){
            $empid = " and createdby = '".pg_escape_string(trim(strip_tags($author)))."'";
        }


        $flds = <<<EOT
                select
                    field
                from fields
                where archived = false
                order by datecreated
                ;
EOT;
        $fields_arr = ClassParent::get_array($flds);

        $new_fields_arr=array();
        foreach($fields_arr['data'] as $fld){
            $pattern = "/\s/";
            $replacement = "_";

            array_push($new_fields_arr, ucwords(preg_replace($pattern, $replacement, $fld[0])));
        }
        
        $fields = implode(',', $new_fields_arr);
        
        $sql = <<<EOT
                select
                    pk,
                    to_char(datecreated,'YYYY-MM-DD HH24:MI') as datecreated,
                    $fields,
                    users.firstname||' '||users.lastname as author
                from calllogs
                left join users on (users.empid = calllogs.createdby)
                where datecreated between '$datefrom' and '$dateto'
                    $empid
                ;
EOT;
        $ret = ClassParent::get_array($sql);
        $ret['fields'] = $new_fields_arr;
        array_unshift($ret['fields'], 'ID','Date Created');
        array_push($ret['fields'], 'Author');
        
        return $ret;
    }

    public function fetchGraph($datefrom,$dateto,$field){
        $datefrom   = pg_escape_string(trim(strip_tags($datefrom)));
        $dateto     = pg_escape_string(trim(strip_tags($dateto)));
        $field      = strtolower(pg_escape_string(trim(strip_tags($field))));

        $field      = $field == 'employee_id'?'createdby':$field;
    
        $sql = <<<EOT
                select
                    count(*) as count,
                    coalesce($field::text,'EMPTY') as field
                    -- $field as field
                from calllogs
                where datecreated between '$datefrom' and '$dateto'
                group by $field
                ;
EOT;
        return ClassParent::get($sql);
    }

    public function delete($pk){
            $sql = <<<EOT
                    delete from calllogs 
                    where pk = $pk
                    ;
EOT;

        return ClassParent::update($sql);
    }
}
?>