// ================= ADMIN SYSTEM =================


// ADMIN REGISTER

function registerAdmin(){

    let name =
    document.getElementById("adminName").value;


    let email =
    document.getElementById("adminEmail").value;


    let password =
    document.getElementById("adminPassword").value;



    if(!name || !email || !password){

        alert("Please fill all fields");
        return;

    }



    let admin = {

        name:name,
        email:email,
        password:password

    };



    localStorage.setItem(
        "admin",
        JSON.stringify(admin)
    );



    alert("Admin account created");


    window.location.href="admin-login.html";

}




// ADMIN LOGIN


function adminLogin(){

    let email =
    document.getElementById("adminEmail").value;


    let password =
    document.getElementById("adminPassword").value;



    let admin =
    JSON.parse(localStorage.getItem("admin"));



    if(!admin){

        alert("No admin account found");
        return;

    }



    if(email===admin.email && password===admin.password){


        localStorage.setItem(
            "adminLoggedIn",
            "true"
        );


        alert("Admin login successful");


        window.location.href="admin-dashboard.html";


    }else{


        alert("Incorrect admin details");


    }

}




// LOAD ADMIN DASHBOARD


function loadAdminDashboard(){

    let user =
    JSON.parse(localStorage.getItem("user"));


    let merchant =
    JSON.parse(localStorage.getItem("merchant"));


    let products =
    JSON.parse(localStorage.getItem("merchantProducts")) || [];



    let usersBox =
    document.getElementById("totalUsers");


    let merchantsBox =
    document.getElementById("totalMerchants");


    let productsBox =
    document.getElementById("totalProducts");



    if(usersBox){

        usersBox.innerText = user ? 1 : 0;

    }



    if(merchantsBox){

        merchantsBox.innerText = merchant ? 1 : 0;

    }



    if(productsBox){

        productsBox.innerText = products.length;

    }

}
