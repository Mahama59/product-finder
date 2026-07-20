// ================= USER AUTH SYSTEM =================


function registerUser(){

    let name =
    document.getElementById("registerName").value;


    let email =
    document.getElementById("registerEmail").value;


    let password =
    document.getElementById("registerPassword").value;



    if(!name || !email || !password){

        alert("Please fill all fields");
        return;

    }



    let user = {

        name:name,
        email:email,
        password:password

    };



    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );



    alert("Registration successful");


    window.location.href="login.html";

}




function loginUser(){

    let email =
    document.getElementById("loginEmail").value;


    let password =
    document.getElementById("loginPassword").value;



    let user =
    JSON.parse(localStorage.getItem("user"));



    if(!user){

        alert("Please register first");
        return;

    }



    if(email === user.email && password === user.password){


        localStorage.setItem(
            "loggedIn",
            "true"
        );


        alert("Login successful");


        window.location.href="index.html";


    }else{


        alert("Incorrect login details");


    }

}




function logoutUser(){

    localStorage.removeItem("loggedIn");


    alert("Logged out");


    window.location.href="login.html";

}
