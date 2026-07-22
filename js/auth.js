// ================= USER AUTH SYSTEM =================


function registerUser(){

    let name =
    document.getElementById("registerName").value.trim();

    let email =
    document.getElementById("registerEmail").value.trim();

    let password =
    document.getElementById("registerPassword").value;

    if(!name || !email || !password){

        alert("Please fill all fields");
        return;

    }

    let users =
    JSON.parse(localStorage.getItem("users")) || [];

    let exists =
    users.find(function(user){

        return user.email === email;

    });

    if(exists){

        alert("Email already registered");
        return;

    }

    let user = {

        id: Date.now(),

        name:name,

        email:email,

        password:password

    };

    users.push(user);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    // Keep the new user logged in
    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    alert("Registration successful");

    window.location.href = "login.html";

}



function loginUser(){

    let email =
    document.getElementById("loginEmail").value.trim();

    let password =
    document.getElementById("loginPassword").value;

    let users =
    JSON.parse(localStorage.getItem("users")) || [];

    let user =
    users.find(function(user){

        return user.email === email &&
               user.password === password;

    });

    if(!user){

        alert("Incorrect email or password");

        return;

    }

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    localStorage.setItem(
        "loggedIn",
        "true"
    );

    alert("Login successful");

    window.location.href = "index.html";

}



function logoutUser(){

    localStorage.removeItem("loggedIn");


    alert("Logged out");


    window.location.href="login.html";

}
