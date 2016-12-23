<?php

use Dadou\RestServer\RestException;

class TestController {
    
    public function authorize(){
        if(isset($_SERVER['PHP_AUTH_USER'])){
            if($_SERVER['PHP_AUTH_USER'] == "dadou" && $_SERVER['PHP_AUTH_PW'] == "didou")
                return true;
        }
        return false;
    }
    
    /**
     * Returns a JSON string object to the browser when hitting the root of the domain
     *
     * @url GET /
     */
    public function test(){
        return "Hello World";
    }
    
    /**
     * Logs in a user with the given username and password POSTed. Though true
     * REST doesn't believe in sessions, it is often desirable for an AJAX server.
     *
     * @url POST /login
     */
    public function login(){
        $username = $_POST['username'];
        $password = $_POST['password'];
        return array("success" => "logged in ".$username);
    }
    
    /**
     * Gets the user by id or current user
     *
     * @url GET /users/$id
     * @url GET /users/current
     */
    public function getUser($id = null){
        // if ($id) {
        //     $user = User::load($id); // possible user loading method
        // } else {
        //     $user = $_SESSION['user'];
        // }
        
        
        
        /*
         * public function getUser($id = null)
            {
                if ($id) {
                    $user = User::load($id); // possible user loading method

                    if (!$user) {
                        throw new RestException(404, 'User not found');
                    }

                } else {
                    $user = $_SESSION['user'];
                }

                return $user; // serializes object into JSON
            }
         */
        
        return array("id" => $id, "name" => NULL);
    }
    
    /**
     * Saves a user to the database
     *
     * @url POST /users
     * @url PUT /users/$id
     */
    public function saveUser($id = null, $data)
    {
        // ... validate $data properties such as $data->username, $data->firstName, etc.
        // $data->id = $id;
        // $user = User::saveUser($data); // saving the user to the database
        $user = array("id" => $id, "name" => $data);
        return $user; // returning the updated or newly created user object
    }
    
    /**
     * Get Charts
     * 
     * @url GET /charts
     * @url GET /charts/$id
     * @url GET /charts/$id/$date
     * @url GET /charts/$id/$date/$interval/
     * @url GET /charts/$id/$date/$interval/$interval_months
     */
    public function getCharts($id=null, $date=null, $interval = 30, $interval_months = 12)
    {
        echo "$id, $date, $interval, $interval_months";
    }
    
    /**
     * Throws an error
     * 
     * @url GET /error
     */
    public function throwError() {
        throw new RestException(401, "Empty password not allowed");
    }
    
}
