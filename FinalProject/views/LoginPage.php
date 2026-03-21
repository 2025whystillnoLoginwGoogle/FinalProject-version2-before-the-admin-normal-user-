<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>McBank - Login</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        body { font-family: Arial, sans-serif; background-color: #DA291C; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .card { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); width: 350px; text-align: center; }
        .card h2 { color: #DA291C; margin-bottom: 20px; }
        .input-group { margin-bottom: 15px; text-align: left; }
        .input-group label { display: block; font-size: 14px; margin-bottom: 5px; color: #333; }
        .input-group input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 8px; box-sizing: border-box; }
        .btn { background-color: #FFC72C; color: #000; font-weight: bold; border: none; padding: 12px; width: 100%; border-radius: 8px; cursor: pointer; font-size: 16px; margin-top: 10px;}
        .btn:hover { background-color: #e5b227; }
        .link { display: block; margin-top: 15px; font-size: 14px; color: #555; text-decoration: none; }
    </style>
</head>
<body>
    <div class="card">
        <h2>McBank Login</h2>
        <div class="input-group"><label>Email</label><input type="email" id="email" required></div>
        <div class="input-group"><label>Password</label><input type="password" id="password" required></div>
        <button class="btn" onclick="loginAppUser()">Log In</button>
        <a href="RegistrationPage.php" class="link">New here? Create an account</a>
    </div>
    <script src="../scripts/Service.js"></script>
</body>
</html>