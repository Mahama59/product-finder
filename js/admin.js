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


// ORDER STATISTICS

let orders =
JSON.parse(localStorage.getItem("orders")) || [];


let orderBox =
document.getElementById("adminTotalOrders");


if(orderBox){

orderBox.innerText = orders.length;

}



let revenue = 0;

let productsSold = 0;


orders.forEach(function(order){

revenue += Number(order.total || 0);


if(order.items){

order.items.forEach(function(item){

productsSold += Number(item.quantity || 0);

});

}

});



let revenueBox =
document.getElementById("adminTotalRevenue");


if(revenueBox){

revenueBox.innerText = revenue;

}



let soldBox =
document.getElementById("adminProductsSold");


if(soldBox){

soldBox.innerText = productsSold;

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

let merchants =
JSON.parse(localStorage.getItem("merchants")) || [];

box.innerHTML = "";

if(merchants.length === 0){

box.innerHTML =
"<p>No merchants found.</p>";

return;

}

merchants.forEach(function(merchant,index){

box.innerHTML += `

<div class="product">

<h3>
🏪 ${merchant.storeName}
</h3>

<p>
👤 ${merchant.name}
</p>

<p>
📧 ${merchant.email}
</p>

<p>
📱 ${merchant.phone}
</p>

<p>
⭐ Rating: ${merchant.rating}
</p>

<p>
📅 Joined: ${merchant.joined}
</p>

<button onclick="deleteMerchant(${index})">
🗑 Delete Merchant
</button>

</div>

`;

});

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

}
// ================= APPROVE PRODUCT =================

function approveProduct(index){

    let products =
    JSON.parse(localStorage.getItem("merchantProducts")) || [];


    products[index].status = "Approved";


    localStorage.setItem(
        "merchantProducts",
        JSON.stringify(products)
    );


    alert("Product approved successfully");


    loadAdminProducts();

}




// ================= REJECT PRODUCT =================

function rejectProduct(index){

    let products =
    JSON.parse(localStorage.getItem("merchantProducts")) || [];


    products[index].status = "Rejected";


    localStorage.setItem(
        "merchantProducts",
        JSON.stringify(products)
    );


    alert("Product rejected");


    loadAdminProducts();

}

function checkOrders(){

let orders =
JSON.parse(localStorage.getItem("orders")) || [];


let box =
document.getElementById("adminOrders");


box.innerHTML="";


orders.forEach(function(order){

box.innerHTML += `

<div class="product">

<h3>Order #${order.id}</h3>

<p>Customer: ${order.customer || "Guest"}</p>

<p>Total: $${order.total}</p>

<p>Status: ${order.status}</p>

</div>

`;

});

}
function loadAdminOrders(){

let box =
document.getElementById("adminOrders");


if(!box) return;


let orders =
JSON.parse(localStorage.getItem("orders")) || [];


box.innerHTML = "";


if(orders.length === 0){

box.innerHTML =
"<p>No orders found.</p>";

return;

}


orders.forEach(function(order){


box.innerHTML += `

<div class="product">

<h3>
🛒 Order #${order.id}
</h3>

<p>
👤 Customer: ${order.customer || "Guest"}
</p>

<p>
💰 Total: $${order.total}
</p>

<p>
📦 Status: ${order.status}
</p>

<p>
📅 ${order.date}
</p>


</div>

`;


});


}

function deleteMerchant(index){

let merchants =
JSON.parse(localStorage.getItem("merchants")) || [];

if(!confirm("Delete this merchant?")){

return;

}

merchants.splice(index,1);

localStorage.setItem(
"merchants",
JSON.stringify(merchants)
);

loadAdminMerchants();

alert("Merchant deleted.");

}
