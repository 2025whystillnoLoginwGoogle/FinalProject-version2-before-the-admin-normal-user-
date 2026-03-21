<?php
session_start();
if (!isset($_SESSION["user_email"])) {
    header("Location: LoginPage.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>McBank - Admin Dashboard</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; }
        .header { background-color: #DA291C; color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
        .header h1 { margin: 0; font-size: 24px; color: #FFC72C; }
        .logout { color: white; text-decoration: none; font-weight: bold; }
        .container { padding: 20px; max-width: 800px; margin: auto; }
        .balance-card { background: white; padding: 30px; border-radius: 15px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-bottom: 20px; border-top: 5px solid #FFC72C; }
        .balance-card h3 { margin: 0; color: #777; font-weight: normal; }
        .balance-card h2 { margin: 10px 0 0; font-size: 36px; color: #DA291C; }
        .transactions { background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="header">
        <h1>McBank Admin</h1>
        <a href="Logout.php" class="logout">Log Out</a>
    </div>

    <div class="container">
        <h2>Welcome back, <?= htmlspecialchars($_SESSION['user_firstName']) ?> <?= htmlspecialchars($_SESSION['user_lastName']) ?>!</h2>        
        <div class="balance-card">
            <h3>Total Bank Asset Balance</h3>
            <h2>₱ 15,250.00</h2>
        </div>

        <div class="transactions">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 10px;">
                <h3 style="margin: 0;">User Management Data Table</h3>
                <button onclick="addDashboardUser()" style="background: #DA291C; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-weight: bold;">+ Add User</button>
            </div>
            
            <table style="width:100%; border-collapse: collapse; margin-top: 10px; text-align: left;">
                <thead>
                    <tr style="background-color: #f8f9fa;">
                        <th style="padding: 10px; border-bottom: 2px solid #ddd;">ID</th>
                        <th style="padding: 10px; border-bottom: 2px solid #ddd;">Name</th>
                        <th style="padding: 10px; border-bottom: 2px solid #ddd;">Email</th>
                        <th style="padding: 10px; border-bottom: 2px solid #ddd;">Actions</th>
                    </tr>
                </thead>
                <tbody id="userTableBody">
                    </tbody>
            </table>
            </div>
    </div>
    
    <script src="../scripts/Service.js"></script>
</body>
</html>