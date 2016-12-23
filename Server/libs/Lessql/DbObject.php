<?php

namespace LessQL;

/**
 * Description of DbObject
 *
 * @author dviolet
 */
class DbObject implements \JsonSerializable
{

    /**
     *
     * @var \LessQL\Database
     */
    private $db;

    /**
     *
     * @var array
     */
    private $data;
    /**
     *
     * @var Row
     */
    private $_row;

    /**
     *
     * @var stating
     */
    protected $primaryKey = 'id';
    /**
     *
     * @var stating
     */
    protected $dbTable;
    /**
     *
     * @var array
     */
    protected $relations;

    public function __construct($data = null)
    {
        //db
        $this->db = Database::getInstance();

        //table
        if(empty($this->dbTable)){
            $this->dbTable = get_class($this);
        }

        //datas
        if($data){
            if($data instanceof Row){
                $this->_row = $data;
                $this->data = $this->_row->getData();
            } else {
                $this->data = $data;
            }
        }

        //primary Key
        $this->db->setPrimary($this->dbTable, $this->primaryKey);

        //relations
        if(is_array($this->relations) && count($this->relations) > 0){
            foreach ($this->relations as $relationName => $relation) {
                if(count($relation) >= 3){
                    $relationType = $relation[0];
                    $modelName = $relation[1];
                    switch (strtolower($relationType)){
                        case "hasmany":
                            $obj = new $modelName;
                            $this->db->setAlias($relationName, $obj->dbTable);
                            $this->db->setBackReference($obj->dbTable, $relationName,  $relation[2]);
                            break;
                        case "hasone":
                            $this->db->setReference($this->dbTable, $relationName,  $relation[2]);
                            break;
                    }

                }
            }
        }
    }


    public function getDB(){
        return $this->db;
    }

    public function __set($name, $value)
    {
        if(is_array($value)){
            $this->data[$name.'List'] = $value;
        } else {
            $this->data[$name] = $value;
        }

    }

    public function __get($name)
    {
        if(isset($this->data[$name])){
            return $this->data[$name];
        }

        if(isset($this->data[$name.'List'])){
            return $this->data[$name.'List'];
        }

        if(isset($this->relations[$name])){
            $relationType = strtolower($this->relations[$name][0]);
            $modelname = $this->relations[$name][1];
            $foreignKey = null;
            if(count($this->relations[$name]) >= 3) $foreignKey = $this->relations[$name][2];
            switch ($relationType){
                case 'hasone':
                    if($this->exist()){
                        $obj = new $modelname;
                        if(!$obj instanceof DbObject) throw new Exception("$modelname is not derived from DbObject");
                        $item = $this->_row->{$obj->dbTable}();
                        if($foreignKey) $item = $item->via($foreignKey);
                        $this->data[$name] = new $modelname($item);
                        return $this->data[$name];
                    }
                    break;
                case 'hasmany':
                    if($this->exist()){
                        $this->data[$name] = array();
                        $obj = new $modelname;
                        if(!$obj instanceof DbObject) throw new Exception("$modelname is not derived from DbObject");
                        $items = $this->_row->{$obj->dbTable . 'List'}();
                        if($foreignKey) $items = $items->via($foreignKey);
                        foreach ($items as $item) {
                            array_push($this->data[$name], new $modelname($item));
                        }
                        return $this->data[$name];
                    }
                    break;
            }
        }

    }

    public function __isset ($name) {
        if (isset ($this->data[$name]))
            return isset ($this->data[$name]);

        if (property_exists ($this->db, $name))
            return isset ($this->db->$name);
    }

    public function __unset ($name) {
        unset ($this->data[$name]);
    }



    public static function getById($id){
        $obj = new static;
        $table = $obj->dbTable;
        $obj->_row = $obj->db->{$table}($id);
        $obj->data = $obj->_row->getData();
        return $obj;
    }

    public static function get($orderBy=null, $where=null, $limit=null, $fields=null, $assoc=null){
        $obj = new static;
        $table = $obj->dbTable;
        $array = array();
        $rows = $obj->db->{$table}();
        if($orderBy) $rows = $rows->orderBy($orderBy);
        if($where) $rows = $rows->orderBy($where);
        foreach ($rows as $row) {
            $aa = new static($row);
            //$aa->ingredients;
            //$aa->ingredients->ingredient;
            array_push($array, $aa);
        }
        return $array;
    }

    public function exist(){
        return $this->_row !== NULL;
    }

    public function getDatas(){
        $datas = array();
        foreach ($this->data as $key => $value) {
            if(is_array($value)){
                $temp = array();
                foreach ($value as $valueInt) {
                    if($valueInt instanceof DbObject){
                        array_push($temp, $valueInt->getDatas());
                    }
                }
                if(count($temp) > 0){
                    $datas[$key] = $temp;

                }
            } else if($value instanceof DbObject){
                $datas[$key] = $value->getDatas();
            } else {
                $datas[$key] = $value;
            }
        }
        return $datas;
    }

    public function insert($data = null){
        $_data = $this->getDatas();
        if($data){
            $_data = $data;
        }
        $this->_row = $this->db->createRow($this->dbTable, $_data);
        $this->db->begin();
        $this->_row->save();
        $this->db->commit();
        $this->data[$this->primaryKey] = $this->_row->getId();
        return $this;
    }

    public function update($data = null){
        $_data = $this->getDatas();
        if($data){
            $_data = $data;
        }
        $this->db->begin();
        $this->_row->update($_data);
        $this->db->commit();
        return $this;
    }

    public function delete(){
        if(!$this->exist()) return;
        $this->db->begin();
        $this->_row->delete();
        $this->db->commit();
    }

    public function save($data = null){
        if(!$this->exist()){
            return $this->insert($data);
        }
        return $this->update($data);
    }


    function jsonSerialize() {

		$array = array();


		foreach ( $this->data as $key => $value ) {

			if ( $value instanceof \JsonSerializable ) {

				$array[ $key ] = $value->jsonSerialize();

            } else if ( $value instanceof \DateTime ) {

				$array[ $key ] = $value->format( 'Y-m-d H:i:s' );

			} else if ( is_array( $value ) ) { // list of Rows

				foreach ( $value as $i => $row ) {

					$value[ $i ] = $row->jsonSerialize();

				}

				$array[ $key ] = $value;

			} else {

				$array[ $key ] = $value;

			}

		}

		return $array;

	}
}
