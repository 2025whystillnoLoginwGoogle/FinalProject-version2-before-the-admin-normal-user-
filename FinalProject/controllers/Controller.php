<?php
session_start();
require_once "../bl/UserManager.php";

$usermanager = new UserManager();

if (isset($_POST["action"])) {
    if ($_POST["action"] == "register") {
        $usermanager->registerFunc($_POST["firstName"], $_POST["lastName"], $_POST["email"], $_POST["password"], $_POST["confirmPassword"]);
        exit;
    } 
    else if ($_POST["action"] == "login") {
        $usermanager->loginFunc($_POST["email"], $_POST["password"]);
        exit;
    }
    else if ($_POST["action"] == "getAllUsers") {
        $usermanager->getAllUsersFunc();
        exit;
    }
    else if ($_POST["action"] == "deleteUser") {
        $usermanager->deleteUserFunc($_POST["id"]);
        exit;
    }
    else if ($_POST["action"] == "updateUser") {
        $usermanager->updateUserFunc($_POST["id"], $_POST["firstName"], $_POST["lastName"], $_POST["email"]);
        exit;
    }
}
?>