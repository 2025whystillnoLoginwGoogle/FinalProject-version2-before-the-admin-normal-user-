<?php
// 1. Start the session so PHP knows which session to destroy
session_start();

// 2. Clear all session variables
session_unset();

// 3. Destroy the session completely
session_destroy();

// 4. Redirect back to the login page
header("Location: LoginPage.php");
exit;
?>