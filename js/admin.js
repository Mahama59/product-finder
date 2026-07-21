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
// ================= ADMIN USERS =================

function loadAdminUsers(){

let box =
document.getElementById("adminUsers");


if(!box) return;


let user =
JSON.parse(localStorage.getItem("user"));



box.innerHTML="";


if(!user){

box.innerHTML =
"<p>No users found</p>";

return;

}


box.innerHTML = `

<div class="product">

<h3>
👤 ${user.name}
</h3>

<p>
📧 ${user.email}
</p>

</div>

`;

}



// ================= ADMIN MERCHANTS =================

function loadAdminMerchants(){

let box =
document.getElementById("adminMerchants");


if(!box) return;


let merchant =
JSON.parse(localStorage.getItem("merchant"));



box.innerHTML="";


if(!merchant){

box.innerHTML =
"<p>No merchants found</p>";

return;

}



box.innerHTML = `

<div class="product">

<h3>
🏪 ${merchant.storeName}
</h3>

<p>
📧 ${merchant.email}
</p>

<p>
⭐ Rating: ${merchant.rating}
</p>


</div>

`;

}




// ================= ADMIN PRODUCTS =================

function loadAdminProducts(){

let box =
document.getElementById("adminProducts");


if(!box) return;



let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



box.innerHTML="";



if(products.length===0){

box.innerHTML =
"<p>No products submitted</p>";

return;

}



products.forEach(function(product,index){


box.innerHTML += `

<div class="product">

<h3>${product.name}</h3>

<p>
💰 $${product.price}
</p>

<p>
Status: ${product.status}
</p>


<button onclick="approveProduct(${index})">
✅ Approve
</button>


<button onclick="rejectProduct(${index})">
❌ Reject
</button>


</div>

`;

});
function approveProduct(index){

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];

products[index].status = "Approved";

localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);

alert("Product Approved ✅");

loadAdminProducts();

}

}
function rejectProduct(index){

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];

products[index].status = "Rejected";

localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);

alert("Product Rejected ❌");

loadAdminProducts();

}
