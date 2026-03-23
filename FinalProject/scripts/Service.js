function registerAppUser() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var role = document.getElementById("role").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        Swal.fire("Error", "All fields are required!", "error");
        return;
    }

    $.ajax({
        url: "../controllers/Controller.php",
        type: "POST",
        data: {
            action: "register",
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role,
            password: password,
            confirmPassword: confirmPassword
        },
        success: function(response) {
            if (response.trim() === "Success!") {
                Swal.fire({
                    title: "Welcome!",
                    text: "Registration successful. You can now log in.",
                    icon: "success"
                }).then(() => {
                    window.location.href = "../views/LoginPage.php";
                });
            } else {
                Swal.fire("Error", response, "error");
            }
        }
    });
}

function loginAppUser() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (!email || !password) {
        Swal.fire("Error", "Please enter both email and password.", "error");
        return;
    }

    $.ajax({
        url: "../controllers/Controller.php",
        type: "POST",
        data: {
            action: "login",
            email: email,
            password: password
        },
        success: function(response) {
            if (response.trim() === "Success!") {
                window.location.href = "../views/DashboardPage.php";
            } else {
                Swal.fire("Login Failed", response, "error");
            }
        }
    });
}
//bago added check
// automatically load users when the dashboard page opens
$(document).ready(function() {
    if(window.location.pathname.includes("DashboardPage.php")) {
        loadUsers();
    }
});

function loadUsers() {
    $.ajax({
        url: "../controllers/Controller.php",
        type: "POST",
        data: { action: "getAllUsers" },
        success: function(response) {
            let users = JSON.parse(response);
            let rows = "";
            users.forEach(function(user) {
                rows += `<tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${user.id}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${user.firstName} ${user.lastName}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${user.email}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">
                        <button onclick="editUser(${user.id}, '${user.firstName}', '${user.lastName}', '${user.email}')" style="background: #FFC72C; color: black; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px; font-weight: bold;">Edit</button>
                        <button onclick="deleteUser(${user.id})" style="background: #DA291C; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px; font-weight: bold;">Delete</button>
                    </td>
                </tr>`;
            });
            $("#userTableBody").html(rows);
        }
    });
}

function deleteUser(id) {
    Swal.fire({
        title: "Delete User?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DA291C",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "../controllers/Controller.php",
                type: "POST",
                data: { action: "deleteUser", id: id },
                success: function(response) {
                    if (response.trim() === "User has been deleted.") {
                        Swal.fire("Deleted!", "User has been removed.", "success");
                        loadUsers(); 
                    }
                }
            });
        }
    });
}

function editUser(id, firstName, lastName, email) {
    Swal.fire({
        title: 'Edit User',
        html:
            `<input id="swal-edit-fname" class="swal2-input" placeholder="First Name" value="${firstName}">` +
            `<input id="swal-edit-lname" class="swal2-input" placeholder="Last Name" value="${lastName}">` +
            `<input id="swal-edit-email" class="swal2-input" placeholder="Email" value="${email}">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Save Changes',
        confirmButtonColor: '#FFC72C',
        preConfirm: () => {
            return {
                firstName: document.getElementById('swal-edit-fname').value,
                lastName: document.getElementById('swal-edit-lname').value,
                email: document.getElementById('swal-edit-email').value
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "../controllers/Controller.php",
                type: "POST",
                data: {
                    action: "updateUser",
                    id: id,
                    firstName: result.value.firstName,
                    lastName: result.value.lastName,
                    email: result.value.email
                },
                success: function(response) {
                    if (response.trim() === "Success!") {
                        Swal.fire("Updated!", "User details saved.", "success");
                        loadUsers();
                    }
                }
            });
        }
    });
}

function addDashboardUser() {
     Swal.fire({
        title: 'Add New User',
        html:
            `<input id="swal-add-fname" class="swal2-input" placeholder="First Name" autocomplete="off">` +
            `<input id="swal-add-lname" class="swal2-input" placeholder="Last Name" autocomplete="off">` +
            `<input id="swal-add-email" type="email" class="swal2-input" placeholder="Email" autocomplete="off">` +
            `<select id="swal-add-role" class="swal2-input" style="width: 260px;"><option value="customer">Normal User</option><option value="admin">Admin</option></select>` + // <-- DROPDOWN ADDED
            `<input id="swal-add-pass" type="password" class="swal2-input" placeholder="Password" autocomplete="new-password">` +
            `<input id="swal-add-cpass" type="password" class="swal2-input" placeholder="Confirm Password" autocomplete="new-password">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Add User',
        confirmButtonColor: '#DA291C',
        preConfirm: () => {
            return {
                firstName: document.getElementById('swal-add-fname').value,
                lastName: document.getElementById('swal-add-lname').value,
                email: document.getElementById('swal-add-email').value,
                role: document.getElementById('swal-add-role').value, 
                password: document.getElementById('swal-add-pass').value,
                confirmPassword: document.getElementById('swal-add-cpass').value
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let data = result.value;
            $.ajax({
                url: "../controllers/Controller.php",
                type: "POST",
                data: {
                    action: "register", 
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    role: data.role,
                    password: data.password,
                    confirmPassword: data.confirmPassword
                },
  
                success: function(response) {
                    if (response.trim() === "Success!") {
                        Swal.fire("Added!", "New user has been created.", "success");
                        loadUsers();
                    } else {
                        Swal.fire("Error", response, "error");
                    }
                }
            });
        }
    });
}