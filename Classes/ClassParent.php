<?php
class ClassParent {
    protected function get($sql){
        date_default_timezone_set('Asia/Manila');

        $query = pg_query($sql);
        $return="";
        if(pg_numrows($query)){
            $return['status'] = true;
            $return['sql'] = $sql;
            $return['msg'] = "Success";
            $return['data']="";
            while($row = pg_fetch_assoc($query)){
                $row['datecreated'] = date('Y-m-d H:i:s', strtotime($row['datecreated']));
                $return['data'][] = $row;
            }
        }
        else{
            $return['status'] = false;
            $return['sql'] = $sql;
            $return['msg'] = pg_last_error();
            $return['data'] = NULL;
        }
        
        return $return;
    }

    protected function get_array($sql){
        date_default_timezone_set('Asia/Manila');
        
        $query = pg_query($sql);
        $return="";
        if(pg_numrows($query)){
            $return['status'] = true;
            $return['sql'] = $sql;
            $return['msg'] = "Success";
            $return['data']="";
            while($row = pg_fetch_row($query)){
                $row['2'] = date('Y-m-d H:i:s', strtotime($row['2']));
                $return['data'][] = $row;
            }
        }
        else{
            $return['status'] = false;
            $return['sql'] = $sql;
            $return['msg'] = pg_last_error();
            $return['data'] = NULL;
        }
        
        return $return;
    }

    protected function getFields($sql){
        $query = pg_query($sql);
        $return="";
        if(pg_numrows($query)){
            $return['status'] = true;
            $return['sql'] = $sql;
            $return['msg'] = "Success";
            $return['data']="";
            while($row = pg_fetch_assoc($query)){
                $pattern = '/_/';
                $replacement = ' ';
                
                if($row['name'] == 'datecreated'){
                    $row['name'] = 'date created';
                }
                else if($row['name'] == 'createdby'){
                    $row['name'] = 'employee_ID';
                }
                else if($row['name'] == 'pk'){
                    $row['name'] = 'ID';
                }

                $row['field'] = $row['name'];
                $row['answer'] = null;
                $row['name'] = ucwords(preg_replace($pattern, $replacement, $row['name']));

                $return['data'][] = $row;
            }
        }
        else{
            $return['status'] = false;
            $return['sql'] = $sql;
            $return['msg'] = pg_last_error();
            $return['data'] = NULL;
        }
        
        return $return;
    }

    protected function update($sql){
        $query = pg_query($sql);
        $return="";

        if($query){
            $return['status'] = true;
            $return['sql'] = $sql;
            $return['msg'] = "Success";
        }
        else{
            $return['status'] = false;
            $return['sql'] = $sql;
            $return['msg'] = pg_last_error();
        }
        return $return;

        pg_free_result($query);
    }

    protected function insert($sql){
        $query = pg_query($sql);
        $return="";

        if($query){
            $return['status'] = true;
            $return['sql'] = $sql;
            $return['msg'] = "Success";
            $return['returning'] = $query;
        }
        else{
            $return['status'] = false;
            $return['sql'] = $sql;
            $return['msg'] = pg_last_error();
        }
        return $return;

        pg_free_result($query);
    }
}

?>