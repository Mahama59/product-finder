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


window.location.href =
"admin-login.html";

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


window.location.href =
"admin-dashboard.html";


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


let orders =
JSON.parse(localStorage.getItem("orders")) || [];



let usersBox =
document.getElementById("adminTotalUsers");


let merchantBox =
document.getElementById("adminTotalMerchants");


let productBox =
document.getElementById("adminTotalProducts");


let orderBox =
document.getElementById("adminTotalOrders");



if(usersBox){

usersBox.innerText =
user ? 1 : 0;

}


if(merchantBox){

merchantBox.innerText =
merchant ? 1 : 0;

}


if(productBox){

productBox.innerText =
products.length;

}


if(orderBox){

orderBox.innerText =
orders.length;

}


}



// LOAD ADMIN PRODUCTS

function loadAdminProducts(){

let box =
document.getElementById("adminProducts");


if(!box) return;



let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



box.innerHTML="";



products.forEach(function(product,index){


box.innerHTML += `

<div class="product">

<h3>${product.name}</h3>

<p>
Price: $${product.price}
</p>

<p>
Status: ${product.status}
</p>


<button onclick="approveProduct(${index})">

Approve

</button>


<button onclick="rejectProduct(${index})">

Reject

</button>


</div>

`;

});


}



// APPROVE PRODUCT

function approveProduct(index){


let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


products[index].status =
"Approved";


localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);


loadAdminProducts();


alert("Product approved");


}



// REJECT PRODUCT

function rejectProduct(index){


let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


products.splice(index,1);


localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);


loadAdminProducts();


alert("Product rejected");


}



// DELETE ORDER

function adminDeleteOrder(index){


let orders =
JSON.parse(localStorage.getItem("orders")) || [];


orders.splice(index,1);



localStorage.setItem(
"orders",
JSON.stringify(orders)
);


alert("Order removed");


}
