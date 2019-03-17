<?php
Class DbConnection{
    function getdbconnect(){
        $conn = mysqli_connect("localhost","root","password","adra_db") or die("Couldn't connect");

        return $conn;
    }
}
?>