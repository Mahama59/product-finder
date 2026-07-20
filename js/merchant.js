// ================= MERCHANT SYSTEM =================


// Merchant products storage

let merchantProducts =
JSON.parse(localStorage.getItem("merchantProducts")) || [];




// ================= MERCHANT REGISTER =================


function registerMerchant(){

    let name =
    document.getElementById("merchantName").value;


    let email =
    document.getElementById("merchantEmail").value;


    let phone =
    document.getElementById("merchantPhone").value;



    if(!name || !email || !phone){

        alert("Please fill all fields");
        return;

    }



    let merchant = {

        name:name,
        email:email,
        phone:phone,
        storeName:name + "'s Store",
        joined:new Date().toLocaleDateString(),
        rating:5

    };



    localStorage.setItem(
        "merchant",
        JSON.stringify(merchant)
    );



    alert("Merchant registration successful");


    window.location.href="merchant-dashboard.html";

}




// ================= MERCHANT LOGIN =================


function merchantLogin(){

    let email =
    document.getElementById("merchantEmail").value;


    let phone =
    document.getElementById("merchantPhone").value;



    let merchant =
    JSON.parse(localStorage.getItem("merchant"));



    if(!merchant){

        alert("No merchant account found");
        return;

    }



    if(email===merchant.email && phone===merchant.phone){


        localStorage.setItem(
            "merchantLoggedIn",
            "true"
        );


        alert("Merchant login successful");


        window.location.href="merchant-dashboard.html";


    }else{


        alert("Incorrect merchant details");


    }

}
