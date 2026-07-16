let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ================= SEARCH =================

function searchProducts(){

    let input = document
    .getElementById("searchInput")
    .value
    .toLowerCase();


    let products = document.querySelectorAll(".product");


    products.forEach(function(product){

        let text = product.innerText.toLowerCase();


        if(text.includes(input)){

            product.style.display = "block";

        }else{

            product.style.display = "none";

        }

    });

}



 function addToCart(productName, productPrice, stock){

    if(stock <= 0){

        alert("Sorry, this product is out of stock");

        return;

    }


    let existing =
    cart.find(
        item => item.name === productName
    );


    if(existing){

        if(existing.quantity < stock){

            existing.quantity++;

        }else{

            alert("Maximum stock reached");

            return;

        }

    }else{


        cart.push({

            name: productName,

            price: productPrice,

            quantity: 1,

            stock: stock

        });

    }



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(productName + " added to cart!");

}

function updateCartCount(){

    let count =
    document.getElementById("cartCount");


    if(count){

        count.innerText = cart.length;

    }

}



function viewCart(){

    let cartList =
    document.getElementById("cartList");


    if(!cartList) return;


    if(cart.length === 0){

        cartList.innerHTML =
        "<p>Your cart is empty.</p>";

        return;

    }


    cartList.innerHTML =
    "<h3>Your Cart</h3>";


    cart.forEach(function(item,index){


        cartList.innerHTML += `

        <p>
         🛒 ${item.name} - $${item.price}
<br>
Quantity: ${item.quantity || 1}

        <button onclick="removeFromCart(${index})">
        Remove
        </button>

        </p>

        `;

    });


}



function removeFromCart(index){

    cart.splice(index,1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    viewCart();

}




// ================= USER =================


function registerUser(){


let name =
document.getElementById("registerName").value;


let email =
document.getElementById("registerEmail").value;


let password =
document.getElementById("registerPassword").value;



if(name==="" || email==="" || password===""){

alert("Please fill all fields");

return;

}



let user={

name:name,
email:email,
password:password

};


localStorage.setItem(
"user",
JSON.stringify(user)
);



alert("Registration successful!");


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

alert("Please register first.");

return;

}



if(email===user.email && password===user.password){


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




document.addEventListener(
"DOMContentLoaded",
function(){

updateCartCount();


let welcome =
document.getElementById("welcomeUser");


let user =
JSON.parse(localStorage.getItem("user"));


if(welcome && user){

welcome.innerText =
"👋 Welcome, "+user.name;

}


});
// ================= WISHLIST =================


let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];



function addToWishlist(productName){


if(wishlist.includes(productName)){


alert(productName + " already in wishlist");

return;

}



wishlist.push(productName);



localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);



updateWishlistCount();



alert(productName + " added ❤️");


}




function updateWishlistCount(){


let count =
document.getElementById("wishlistCount");



if(count){

count.innerText =
wishlist.length;

}


}




function viewWishlist(){


let box =
document.getElementById("wishlistList");



if(!box) return;



if(wishlist.length===0){


box.innerHTML =
"<p>Your wishlist is empty.</p>";


return;

}



box.innerHTML =
"<h3>❤️ Your Wishlist</h3>";



wishlist.forEach(function(item,index){



box.innerHTML += `


<p>

❤️ ${item}


<button onclick="removeFromWishlist(${index})">

Remove

</button>


</p>


`;



});


}



function removeFromWishlist(index){


wishlist.splice(index,1);



localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);



updateWishlistCount();


viewWishlist();


}





// ================= COMPARE =================



let compareList =
JSON.parse(localStorage.getItem("compare")) || [];




function addToCompare(name,price,category){



if(compareList.length >=3){


alert("Only 3 products can be compared");


return;

}




let exists =
compareList.find(
product=>product.name===name
);



if(exists){


alert("Already added");


return;

}




compareList.push({

name:name,

price:price,

category:category

});



localStorage.setItem(
"compare",
JSON.stringify(compareList)
);



alert(name+" added to comparison ⚖️");


}




function loadCompare(){


let box =
document.getElementById("compareList");



if(!box) return;



let list =
JSON.parse(localStorage.getItem("compare")) || [];



if(list.length===0){


box.innerHTML =
"<p>No products selected.</p>";


return;

}




box.innerHTML = `

<h2>⚖️ Product Comparison</h2>


<table border="1">


<tr>

<th>Product</th>

<th>Price</th>

<th>Category</th>

</tr>


`;



list.forEach(function(product){


box.innerHTML += `

<tr>

<td>${product.name}</td>

<td>$${product.price}</td>

<td>${product.category}</td>

</tr>

`;


});



box.innerHTML += "</table>";

}




// update counters when page loads

document.addEventListener(
"DOMContentLoaded",
function(){

updateWishlistCount();

});
// ================= MERCHANT SYSTEM =================


let merchantProducts =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



function registerMerchant(){


let name =
document.getElementById("merchantName").value;


let email =
document.getElementById("merchantEmail").value;


let phone =
document.getElementById("merchantPhone").value;



if(name==="" || email==="" || phone===""){


alert("Please fill all fields");

return;

}



let merchant={

name:name,

email:email,

phone:phone

};



localStorage.setItem(
"merchant",
JSON.stringify(merchant)
);



alert("Merchant registration successful!");



window.location.href =
"merchant-dashboard.html";


}




function saveProduct(){



let name =
document.getElementById("productName").value;


let price =
document.getElementById("productPrice").value;


let category =
document.getElementById("productCategory").value;


let description =
document.getElementById("productDescription").value;


let image =
document.getElementById("productImage").value;



if(name==="" || price==="" || category===""){


alert("Please complete product information");

return;

}


let product={

name:name,
price:Number(price),
category:category,
description:description,
image:image,
stock:10,
status:"Pending"

};



merchantProducts.push(product);



localStorage.setItem(

"merchantProducts",

JSON.stringify(merchantProducts)

);



alert("Product added successfully!");



window.location.href =
"merchant-products.html";


}




function loadMarketplaceProducts(){



let container =
document.getElementById("merchantMarketplace");



if(!container) return;



let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



container.innerHTML="";



if(products.length===0){


container.innerHTML =
"<p>No merchant products available.</p>";


return;

}





products.filter(product => product.status === "Approved")
.forEach(function(product){



container.innerHTML += `


<div class="product">


<img src="${product.image || 'https://via.placeholder.com/200'}"
width="200">



<h3>${product.name}</h3>



 <p>
💰 Price: $${product.price}
</p>
<p>
📦 Available Stock: ${product.stock || 0}
</p>

<p>
📂 Category: ${product.category}
</p>


<p>
📦 Stock: ${product.stock || 0}
</p>


<p>
${product.description}
</p>


<button onclick="addToCart('${product.name}',${product.price},${product.stock || 0})">
🛒 Add To Cart
</button>



<button onclick="addToWishlist('${product.name}')">

❤️ Favorite

</button>



<button onclick="addToCompare('${product.name}',${product.price},'${product.category}')">

⚖️ Compare

</button>


</div>


`;



});



}




function loadMerchantProducts(){



let box =
document.getElementById("merchantProductsList");



if(!box) return;



box.innerHTML="";



merchantProducts.forEach(function(product,index){



box.innerHTML += `


<div class="product">


<h3>${product.name}</h3>


<p>$${product.price}</p>


<p>${product.category}</p>



<button onclick="editProduct(${index})">

✏️ Edit

</button>


<button onclick="deleteProduct(${index})">

🗑 Delete

</button>



</div>


`;


});


}





function deleteProduct(index){


merchantProducts.splice(index,1);



localStorage.setItem(

"merchantProducts",

JSON.stringify(merchantProducts)

);



loadMerchantProducts();


}





function loadDashboard(){



let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


let orders =
JSON.parse(localStorage.getItem("orders")) || [];


let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];


let compare =
JSON.parse(localStorage.getItem("compare")) || [];



let a =
document.getElementById("totalProducts");


let b =
document.getElementById("totalOrders");


let c =
document.getElementById("totalWishlist");


let d =
document.getElementById("totalCompare");



if(a) a.innerText=products.length;

if(b) b.innerText=orders.length;

if(c) c.innerText=wishlist.length;

if(d) d.innerText=compare.length;


}
// PRODUCT RATINGS SYSTEM

let ratings = JSON.parse(localStorage.getItem("ratings")) || {};


function submitRating(productName){

    let ratingBox = document.getElementById("ratingValue");

    if(!ratingBox){
        return;
    }

    let rating = Number(ratingBox.value);


    if(!ratings[productName]){

        ratings[productName] = [];

    }


    ratings[productName].push(rating);


    localStorage.setItem(
        "ratings",
        JSON.stringify(ratings)
    );


    alert("Thank you for rating " + productName + " ⭐");


    loadRating(productName);

}



function loadRating(productName){

    let box = document.getElementById("productRating");


    if(!box){
        return;
    }


    let productRatings = ratings[productName] || [];


    if(productRatings.length === 0){

        box.innerHTML = "No ratings yet.";

        return;

    }


    let total = productRatings.reduce(
        (sum, value)=> sum + value,
        0
    );


    let average = total / productRatings.length;


    box.innerHTML =
    "⭐".repeat(Math.round(average)) +
    " (" +
    average.toFixed(1) +
    "/5 from " +
    productRatings.length +
    " customers)";

}



document.addEventListener(
"DOMContentLoaded",
function(){

    loadRating("Smartphone");

});
// ================= PRODUCT FILTER =================

function filterProducts(){

    let category =
    document.getElementById("categoryFilter").value;


    let maxPrice =
    Number(document.getElementById("maxPrice").value);


    let products =
    document.querySelectorAll(".product");


    products.forEach(function(product){


        let productCategory =
        product.getAttribute("data-category");


        let priceText =
        product.innerText.match(/\$([0-9]+)/);


        let price = priceText ? Number(priceText[1]) : 0;



        let categoryMatch =
        (category === "all" || productCategory === category);



        let priceMatch =
        (!maxPrice || price <= maxPrice);



        if(categoryMatch && priceMatch){

            product.style.display="block";

        }else{

            product.style.display="none";

        }


    });


}
// ================= MERCHANT ORDERS =================

function loadMerchantOrders(){

    let box = document.getElementById("merchantOrders");


    if(!box) return;


    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    if(orders.length === 0){

        box.innerHTML =
        "<h2>No customer orders yet.</h2>";

        return;

    }


    box.innerHTML = "";


    orders.forEach(function(order,index){


        let items = "";


        order.items.forEach(function(item){

    items += `

    <p>
    🛒 ${item.name} - $${item.price}
    </p>

    `;

});



        box.innerHTML += `

        <div class="product">


        <h3>
        📦 Order #${index + 1}
        </h3>


        <p>
        👤 Customer:
        ${order.customerName || "Not provided"}
        </p>


        <p>
        📧 Email:
        ${order.customerEmail || "Not provided"}
        </p>


        <p>
        📍 Address:
        ${order.customerAddress || "Not provided"}
        </p>


        <h4>
        Products:
        </h4>

        ${items}


        <p>
        💰 Total:
        $${order.total}
        </p>


        <p>
        💳 Payment:
        ${order.paymentMethod || "Paystack"}
        </p>


        <p>
        📅 Date:
        ${order.date}
        </p>


        <p>
        Status:
        <strong>${order.status}</strong>
        </p>
${order.status === "Pending" ? 
"<h3>🔔 New Order Received</h3>" 
: ""}


        <select onchange="updateOrderStatus(${index},this.value)">

        <option>
        Pending
        </option>

        <option>
        Processing
        </option>

        <option>
        Shipped
        </option>

        <option>
        Delivered
        </option>

        </select>



        </div>

        `;


    });


}
function updateOrderStatus(index,status){


    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    orders[index].status = status;


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    alert("Order status updated!");

}
function loadAdminDashboard(){

    let users = JSON.parse(localStorage.getItem("user")) || null;
    let merchants = JSON.parse(localStorage.getItem("merchant")) || null;
    let products = JSON.parse(localStorage.getItem("merchantProducts")) || [];


    let totalUsers = document.getElementById("totalUsers");
    let totalMerchants = document.getElementById("totalMerchants");
    let totalProducts = document.getElementById("totalProducts");


    if(totalUsers){
        totalUsers.innerText = users ? 1 : 0;
    }


    if(totalMerchants){
        totalMerchants.innerText = merchants ? 1 : 0;
    }


    if(totalProducts){
        totalProducts.innerText = products.length;
    }

}
// ================= ADMIN MARKETPLACE CONTROL =================


function loadAdminProducts(){

    let box =
    document.getElementById("adminProducts");


    if(!box) return;


    let products =
    JSON.parse(localStorage.getItem("merchantProducts")) || [];


    if(products.length === 0){

        box.innerHTML =
        "<p>No products available.</p>";

        return;

    }


    box.innerHTML = "";


    products.forEach(function(product,index){


        box.innerHTML += `

        <div class="product">

        <h3>${product.name}</h3>

        <p>Price: $${product.price}</p>

        <p>${product.category}</p>


        <button onclick="adminDeleteProduct(${index})">

        🗑 Remove Product

        </button>


        </div>

        `;


    });


}



function adminDeleteProduct(index){


let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


products.splice(index,1);


localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);


loadAdminProducts();


alert("Product removed");

}




function loadAdminOrders(){


let box =
document.getElementById("adminOrders");


if(!box) return;



let orders =
JSON.parse(localStorage.getItem("orders")) || [];



if(orders.length===0){

box.innerHTML =
"<p>No orders yet.</p>";

return;

}



box.innerHTML="";



orders.forEach(function(order,index){


box.innerHTML += `

<div class="product">

<h3>Order #${index+1}</h3>

<p>Total: $${order.total}</p>

<p>Status: ${order.status}</p>

</div>

`;


});


}



// load admin sections

document.addEventListener(
"DOMContentLoaded",
function(){

loadAdminProducts();

loadAdminOrders();

loadAdminAnalytics();

});
// ================= COMPLETE ORDER =================


function deleteUser(){

    localStorage.removeItem("user");


    alert("User deleted successfully");


    loadAdminUsers();


}
function completeOrder(){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


    if(cart.length === 0){

        alert("Your cart is empty.");

        return;

    }


    let customerName =
    document.getElementById("customerName").value;

    let customerEmail =
    document.getElementById("customerEmail").value;

    let customerAddress =
    document.getElementById("customerAddress").value;

    let paymentMethod =
    document.getElementById("paymentMethod").value;

    let momoNumber =
    document.getElementById("momoNumber").value;


    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    let total = cart.reduce(
        (sum,item)=>sum + Number(item.price),
        0
    );


    let order = {

        id: Date.now(),

        customerName: customerName,

        customerEmail: customerEmail,

        customerAddress: customerAddress,

        paymentMethod: paymentMethod,

        momoNumber: momoNumber,

        items: cart,

        total: total,

        date: new Date().toLocaleString(),

        status: "Pending"

    };


    orders.push(order);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

// ================= REDUCE PRODUCT STOCK =================

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


cart.forEach(function(cartItem){

    let product =
    products.find(
        p => p.name === cartItem.name
    );


    if(product){

        product.stock =
        Number(product.stock || 0) - 1;

    }

});


localStorage.setItem(
    "merchantProducts",
    JSON.stringify(products)
);
    localStorage.removeItem("cart");

 
    alert("Order completed successfully!");


    window.location.href="success.html";

}



// ================= ADMIN MERCHANT MANAGEMENT =================


function loadAdminMerchants(){

    let box =
    document.getElementById("adminMerchants");


    if(!box) return;



    let merchant =
    JSON.parse(localStorage.getItem("merchant"));



    if(!merchant){


        box.innerHTML =
        "<p>No merchants registered.</p>";

        return;

    }



    box.innerHTML = `

    <div class="product">

    <h3>
    🏪 ${merchant.name}
    </h3>


    <p>
    Email: ${merchant.email}
    </p>


    <p>
    Phone: ${merchant.phone}
    </p>


    <button onclick="deleteMerchant()">

    🗑 Remove Merchant

    </button>


    </div>

    `;


}



function deleteMerchant(){

    localStorage.removeItem("merchant");


    alert("Merchant removed");


    loadAdminMerchants();

}

function approveProduct(index){

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


products[index].status="Approved";


localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);


alert("Product approved");


loadAdminProducts();

}




function rejectProduct(index){

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


products.splice(index,1);


localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);


alert("Product rejected");


loadAdminProducts();

}
function updateOldProducts(){

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


products.forEach(function(product){

    if(!product.status){

        product.status = "Approved";

    }

});


localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);

}


document.addEventListener(
"DOMContentLoaded",
function(){

updateOldProducts();

});
// ================= ADMIN USER MANAGEMENT =================

function loadAdminUsers(){

    let box = document.getElementById("adminUsers");

    if(!box) return;


    let user = JSON.parse(localStorage.getItem("user"));


    if(!user){

        box.innerHTML = "<p>No users registered.</p>";

        return;

    }


    box.innerHTML = `

    <div class="product">

    <h3>👤 ${user.name}</h3>

    <p>Email: ${user.email}</p>


    <button onclick="deleteUser()">
    🗑 Delete User
    </button>


    </div>

    `;

}



function deleteUser(){

    localStorage.removeItem("user");

    alert("User deleted successfully");


    loadAdminUsers();

}




// ================= ADMIN MERCHANT MANAGEMENT =================


function loadAdminMerchants(){

    let box = document.getElementById("adminMerchants");


    if(!box) return;



    let merchant =
    JSON.parse(localStorage.getItem("merchant"));



    if(!merchant){

        box.innerHTML =
        "<p>No merchants registered.</p>";

        return;

    }



    box.innerHTML = `

    <div class="product">


    <h3>
    🏪 ${merchant.name}
    </h3>


    <p>
    Email: ${merchant.email}
    </p>


    <p>
    Phone: ${merchant.phone}
    </p>



    <button onclick="deleteMerchant()">
    🗑 Remove Merchant
    </button>


    </div>

    `;


}

function adminLogin(){

    let email = document.getElementById("adminEmail").value;
    let password = document.getElementById("adminPassword").value;

    let admin = JSON.parse(localStorage.getItem("admin"));

    if(!admin){

        alert("No admin account found. Please register first.");
        return;

    }

    if(email === admin.email && password === admin.password){

        localStorage.setItem("adminLoggedIn","true");

        alert("Admin login successful");

        window.location.href="admin-dashboard.html";

    }else{

        alert("Incorrect admin details");

    }

}  // ✅ CLOSE adminLogin HERE


// ================= ADMIN REGISTER =================

function registerAdmin(){

    let name = document.getElementById("adminName").value;
    let email = document.getElementById("adminEmail").value;
    let password = document.getElementById("adminPassword").value;

    if(name === "" || email === "" || password === ""){

        alert("Please fill all fields.");
        return;

    }

    let admin = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem(
        "admin",
        JSON.stringify(admin)
    );

    alert("Admin account created successfully!");

    window.location.href = "admin-login.html";

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

        alert("No merchant account found. Please register first.");

        return;

    }


    if(email === merchant.email && phone === merchant.phone){


        localStorage.setItem(
            "merchantLoggedIn",
            "true"
        );


        alert("Merchant login successful");


        window.location.href =
        "merchant-dashboard.html";


    }else{


        alert("Incorrect merchant details");


    }

}
// ================= MERCHANT LOGOUT =================

function merchantLogout(){

    localStorage.removeItem("merchantLoggedIn");

    alert("Merchant logged out");

    window.location.href="merchant-login.html";

}
// ================= PAYSTACK PAYMENT =================

function payWithPaystack(){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


    if(cart.length === 0){

        alert("Your cart is empty");

        return;

    }


    let total = cart.reduce(
        (sum,item)=> sum + Number(item.price),
        0
    );


    let handler = PaystackPop.setup({

        key: "pk_test_f4ae21eeec7c8ae8c3d3764b03b9f67967fc2a0d",

        email: "customer@email.com",

        amount: total * 100,

        currency: "GHS",


        callback:function(response){

    localStorage.setItem(
        "paymentReference",
        response.reference
    );


    alert(
    "Payment successful! Reference: "
    + response.reference
    );


    completeOrder();

},


        onClose: function(){

            alert("Payment cancelled");

        }

    });


    handler.openIframe();

}
// ================= CHECKOUT CART DISPLAY =================

function loadCheckout(){

    let checkoutItems =
    document.getElementById("checkoutItems");


    let checkoutTotal =
    document.getElementById("checkoutTotal");


    if(!checkoutItems || !checkoutTotal){
        return;
    }


    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


    if(cart.length === 0){

        checkoutItems.innerHTML =
        "<p>Your cart is empty.</p>";

        checkoutTotal.innerText = "0";

        return;

    }


    checkoutItems.innerHTML = "";


    let total = 0;


    cart.forEach(function(item){


        checkoutItems.innerHTML += `

        <p>
        🛒 ${item.name} - $${item.price}
        </p>

        `;


        total += Number(item.price);


    });


    checkoutTotal.innerText = total;


}
// ================= NEW ORDER COUNT =================

function loadNewOrders(){

let box =
document.getElementById("newOrders");


if(!box) return;


let orders =
JSON.parse(localStorage.getItem("orders")) || [];


let pending =
orders.filter(
order => order.status === "Pending"
);


box.innerText = pending.length;


}
// ================= ADMIN ANALYTICS =================

function loadAdminAnalytics(){

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    let totalOrders =
    document.getElementById("adminTotalOrders");


    let totalRevenue =
    document.getElementById("adminTotalRevenue");


    let productsSold =
    document.getElementById("adminProductsSold");


    let revenue = orders.reduce(
        (sum, order)=> sum + Number(order.total),
        0
    );


    let sold = 0;


    orders.forEach(function(order){

        sold += order.items.length;

    });



    if(totalOrders){

        totalOrders.innerText =
        orders.length;

    }


    if(totalRevenue){

        totalRevenue.innerText =
        revenue;

    }


    if(productsSold){

        productsSold.innerText =
        sold;

    }

}
function editProduct(index){

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


let product = products[index];


let newPrice = prompt(
"Enter new price:",
product.price
);


let newStock = prompt(
"Enter new stock quantity:",
product.stock
);


if(newPrice !== null){

product.price = Number(newPrice);

}


if(newStock !== null){

product.stock = Number(newStock);

}


products[index] = product;


localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);


alert("Product updated successfully!");


loadMerchantProducts();

}
