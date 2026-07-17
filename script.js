alert("script.js loaded");
// ================= PRODUCT FINDER PART 1 =================


// ================= CART =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function searchProducts(){

    let input =
    document.getElementById("searchInput").value.toLowerCase();


    let products =
    document.querySelectorAll(".product");


    products.forEach(function(product){

        let text =
        product.innerText.toLowerCase();


        if(text.includes(input)){

            product.style.display = "block";

        }else{

            product.style.display = "none";

        }

    });

}



function addToCart(name, price, stock){

alert(name + " " + price + " " + stock);
    stock = Number(stock);


    if(stock <= 0){

        alert("Product is out of stock");

        return;

    }


    let existing =
    cart.find(item => item.name === name);



    if(existing){

        if(existing.quantity < stock){

            existing.quantity++;

        }else{

            alert("Maximum quantity reached");

            return;

        }


    }else{


        cart.push({

            name:name,

            price:Number(price),

            stock:stock,

            quantity:1

        });


    }



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(name + " added to cart");

}





function updateCartCount(){

    let count =
    document.getElementById("cartCount");


    if(count){

        count.innerText = cart.length;

    }

}




function viewCart(){

    let box =
    document.getElementById("cartList");


    if(!box) return;



    if(cart.length === 0){

        box.innerHTML =
        "<p>Your cart is empty.</p>";

        return;

    }



    box.innerHTML = "";



    cart.forEach(function(item,index){


        let subtotal =
        item.price * item.quantity;



        box.innerHTML += `

        <div class="product">

        <h3>${item.name}</h3>

        <p>
        Price: $${item.price}
        </p>

        <p>
        Quantity: ${item.quantity}
        </p>

        <p>
        Total: $${subtotal}
        </p>


        <button onclick="removeFromCart(${index})">
        Remove
        </button>

        </div>

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



// ================= USER SYSTEM =================


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



let user={

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


// ================= LOGIN SYSTEM =================

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



// ================= WISHLIST =================


let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];



function addToWishlist(name){


if(wishlist.includes(name)){


alert("Already in wishlist");

return;

}



wishlist.push(name);



localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);



updateWishlistCount();


alert(name+" added ❤️");


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


box.innerHTML="";


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




document.addEventListener(
"DOMContentLoaded",
function(){

updateCartCount();

updateWishlistCount();

});
    // ================= MERCHANT SYSTEM PART 2 =================


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

phone:phone

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



// ================= SAVE PRODUCT =================


function saveProduct() {

    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;
    let category = document.getElementById("productCategory").value;
    let description = document.getElementById("productDescription").value;
    let stock = Number(document.getElementById("productStock").value);

    let imageInput = document.getElementById("productImage");

    if (!name || !price || !category || !stock) {

        alert("Please complete all product information");
        return;

    }

    let product = {

        name: name,
        price: Number(price),
        category: category,
        description: description,
        stock: stock,
        image: "",
        status: "Pending"

    };

    let merchantProducts =
        JSON.parse(localStorage.getItem("merchantProducts")) || [];

    if (imageInput && imageInput.files.length > 0) {

        let reader = new FileReader();

        reader.onload = function (e) {

            product.image = e.target.result;

            merchantProducts.push(product);

            localStorage.setItem(
                "merchantProducts",
                JSON.stringify(merchantProducts)
            );

            alert("Product saved successfully");

            window.location.href = "merchant-products.html";

        };

        reader.readAsDataURL(imageInput.files[0]);

    } else {

        merchantProducts.push(product);

        localStorage.setItem(
            "merchantProducts",
            JSON.stringify(merchantProducts)
        );

        alert("Product saved successfully");

        window.location.href = "merchant-products.html";

    }

}



    // ================= ADMIN SYSTEM PART 3 =================


// ================= ADMIN REGISTER =================

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




// ================= ADMIN LOGIN =================


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





// ================= ADMIN DASHBOARD =================


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

usersBox.innerText =
user ? 1 : 0;

}



if(merchantsBox){

merchantsBox.innerText =
merchant ? 1 : 0;

}



if(productsBox){

productsBox.innerText =
products.length;

}


}




// ================= ADMIN PRODUCT APPROVAL =================


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


<h3>
${product.name}
</h3>


<p>
💰 Price: $${product.price}
</p>


<p>
📦 Stock: ${product.stock}
</p>


<p>
Status:
${product.status}
</p>



<button onclick="approveProduct(${index})">

✅ Approve

</button>



<button onclick="rejectProduct(${index})">

❌ Reject

</button>



<button onclick="adminDeleteProduct(${index})">

🗑 Remove

</button>



</div>


`;



});


}





function approveProduct(index){


let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



products[index].status="Approved";



localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);



loadAdminProducts();


alert("Product approved");


}





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




// ================= ADMIN USERS =================


function loadAdminUsers(){


let box =
document.getElementById("adminUsers");



if(!box) return;



let user =
JSON.parse(localStorage.getItem("user"));



if(!user){

box.innerHTML =
"<p>No users</p>";

return;

}



box.innerHTML = `


<div class="product">


<h3>
👤 ${user.name}
</h3>


<p>
${user.email}
</p>



<button onclick="deleteUser()">

🗑 Delete User

</button>


</div>


`;


}



function deleteUser(){


localStorage.removeItem("user");


loadAdminUsers();


alert("User deleted");


}




// ================= ADMIN MERCHANTS =================


function loadAdminMerchants(){


let box =
document.getElementById("adminMerchants");



if(!box) return;



let merchant =
JSON.parse(localStorage.getItem("merchant"));



if(!merchant){

box.innerHTML =
"<p>No merchants</p>";

return;

}



box.innerHTML = `


<div class="product">


<h3>
🏪 ${merchant.name}
</h3>


<p>
${merchant.email}
</p>


<p>
${merchant.phone}
</p>



<button onclick="deleteMerchant()">

🗑 Remove Merchant

</button>


</div>


`;



}



function deleteMerchant(){


localStorage.removeItem("merchant");


loadAdminMerchants();


alert("Merchant removed");


}




// ================= ADMIN LOAD =================


document.addEventListener(
"DOMContentLoaded",
function(){


loadAdminDashboard();

loadAdminProducts();

loadAdminUsers();

loadAdminMerchants();


});
    // ================= ORDERS & CHECKOUT SYSTEM PART 4 =================


// ================= COMPLETE ORDER =================

function completeOrder(){

let cart =
JSON.parse(localStorage.getItem("cart")) || [];


if(cart.length === 0){

alert("Your cart is empty");

return;

}



let customerName =
document.getElementById("customerName")?.value || "Guest";


let customerEmail =
document.getElementById("customerEmail")?.value || "Not provided";


let customerAddress =
document.getElementById("customerAddress")?.value || "Not provided";


let paymentMethod =
document.getElementById("paymentMethod")?.value || "Cash";



let total = cart.reduce(
(sum,item)=> sum + 
(Number(item.price) * Number(item.quantity || 1)),
0
);



let orders =
JSON.parse(localStorage.getItem("orders")) || [];



let order = {

id: Date.now(),

customerName: customerName,

customerEmail: customerEmail,

customerAddress: customerAddress,

paymentMethod: paymentMethod,

items: cart,

total: total,

status:"Pending",

date:new Date().toLocaleString()

};



orders.push(order);



localStorage.setItem(
"orders",
JSON.stringify(orders)
);



// Reduce stock

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



cart.forEach(function(cartItem){


let product =
products.find(
p=>p.name===cartItem.name
);



if(product){

product.stock =
Number(product.stock) -
Number(cartItem.quantity || 1);

}


});



localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);



localStorage.removeItem("cart");



alert("Order placed successfully!");



window.location.href="success.html";


}




// ================= CUSTOMER ORDERS =================


function loadCustomerOrders(){

    let box = document.getElementById("myOrders");

    if(!box) return;


    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    if(orders.length === 0){

        box.innerHTML =
        "<p>No orders found.</p>";

        return;

    }


    box.innerHTML = "";


    orders.forEach(function(order,index){


        let items = "";


        order.items.forEach(function(item){

            items += `
            <li>
            ${item.name} × ${item.quantity}
            </li>
            `;

        });



        box.innerHTML += `

        <div class="product">


        <h3>
        📦 Order #${index + 1}
        </h3>


        <p>
        🛍 Products:
        </p>


        <ul>
        ${items}
        </ul>


        <p>
        💰 Total:
        $${order.total}
        </p>


        <p>
        💳 Payment:
        ${order.paymentMethod}
        </p>


        <p>
        🚚 Status:
        <strong>${order.status}</strong>
        </p>


        <p>
        📅 Date:
        ${order.date}
        </p>


        </div>

        `;


    });


}
  // ================= PAYMENT SYSTEM PART 5 =================


// PAYSTACK PAYMENT

function payWithPaystack(){


let cart =
JSON.parse(localStorage.getItem("cart")) || [];



if(cart.length === 0){

alert("Your cart is empty");

return;

}



let total = cart.reduce(
(sum,item)=> 
sum + (Number(item.price) * Number(item.quantity || 1)),
0
);



let email =
document.getElementById("customerEmail").value;



let handler = PaystackPop.setup({

key:"pk_test_f4ae21eeec7c8ae8c3d3764b03b9f67967fc2a0d",

email:email,


amount: total * 100,


currency:"GHS",



callback:function(response){


localStorage.setItem(
"paymentReference",
response.reference
);



alert(
"Payment successful\nReference: "
+ response.reference
);



completeOrder();


},



onClose:function(){


alert("Payment cancelled");


}


});



handler.openIframe();


}
    // ================= PRODUCT DETAILS PART 6 =================


// LOAD PRODUCT DETAILS

function loadProductDetails(){


let product =
JSON.parse(localStorage.getItem("selectedProduct"));



if(!product) return;



let name =
document.getElementById("detailName");


let image =
document.getElementById("detailImage");


let price =
document.getElementById("detailPrice");


let category =
document.getElementById("detailCategory");


let description =
document.getElementById("detailDescription");


let stock =
document.getElementById("detailStock");



if(name)
name.innerText = product.name;


if(image)
image.src =
product.image || "https://via.placeholder.com/300";


if(price)
price.innerText =
"💰 Price: $" + product.price;


if(category)
category.innerText =
"📂 Category: " + product.category;


if(description)
description.innerText =
product.description;


if(stock)
stock.innerText =
product.stock;



let button =
document.getElementById("detailCartButton");



if(button){

button.onclick=function(){

addToCart(
product.name,
product.price,
product.stock
);

};

}


loadReviews(product.name);


}



// ================= SAVE SELECTED PRODUCT =================


function openProduct(product){


localStorage.setItem(
"selectedProduct",
JSON.stringify(product)
);


window.location.href=
"product-details.html";


}




// ================= REVIEWS =================


let reviews =
JSON.parse(localStorage.getItem("reviews")) || {};




function submitReview(){


let product =
JSON.parse(localStorage.getItem("selectedProduct"));



let text =
document.getElementById("reviewText").value;



let rating =
document.getElementById("reviewRating").value;



if(!text){

alert("Write a review first");

return;

}



if(!reviews[product.name]){

reviews[product.name]=[];

}



reviews[product.name].push({

text:text,

rating:rating,

date:new Date().toLocaleDateString()

});



localStorage.setItem(
"reviews",
JSON.stringify(reviews)
);



alert("Review submitted ⭐");



loadReviews(product.name);


}




function loadReviews(productName){


let box =
document.getElementById("productReviews");



if(!box) return;



let list =
reviews[productName] || [];



if(list.length===0){

box.innerHTML =
"<p>No reviews yet.</p>";

return;

}



box.innerHTML="";



list.forEach(function(review){


box.innerHTML += `

<div class="product">

<p>
${"⭐".repeat(review.rating)}
</p>

<p>
${review.text}
</p>

<small>
${review.date}
</small>

</div>

`;

});


}




document.addEventListener(
"DOMContentLoaded",
function(){

loadProductDetails();

});
// ================= MERCHANT DASHBOARD PART 7 =================


// MERCHANT ANALYTICS

function loadMerchantAnalytics(){


let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


let orders =
JSON.parse(localStorage.getItem("orders")) || [];



let productCount =
document.getElementById("merchantTotalProducts");


let orderCount =
document.getElementById("merchantTotalOrders");


let revenueBox =
document.getElementById("merchantTotalRevenue");



if(productCount){

productCount.innerText =
products.length;

}



if(orderCount){

orderCount.innerText =
orders.length;

}



let revenue =
orders.reduce(
(sum,order)=>sum + Number(order.total),
0
);



if(revenueBox){

revenueBox.innerText =
revenue;

}


}




// INVENTORY DISPLAY


function loadMerchantInventory(){


let box =
document.getElementById("merchantInventory");


if(!box) return;



let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



box.innerHTML="";



if(products.length===0){

box.innerHTML =
"<p>No products</p>";

return;

}



products.forEach(function(product,index){



let status =
"🟢 Available";


if(product.stock<=0){

status="🔴 Out of Stock";

}
else if(product.stock<=5){

status="🟡 Low Stock";

}



box.innerHTML += `


<div class="product">


<h3>
${product.name}
</h3>


<p>
Stock: ${product.stock}
</p>


<p>
${status}
</p>



<button onclick="changeStock(${index},1)">
➕ Add Stock
</button>



<button onclick="changeStock(${index},-1)">
➖ Reduce Stock
</button>


</div>


`;



});


}




// CHANGE STOCK


function changeStock(index,amount){


let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



products[index].stock =
Number(products[index].stock) + amount;



if(products[index].stock < 0){

products[index].stock = 0;

}



localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);



loadMerchantInventory();


}




document.addEventListener(
"DOMContentLoaded",
function(){

loadMerchantAnalytics();

loadMerchantInventory();

});
// ================= LOAD MERCHANT PRODUCTS =================

function loadMerchantProducts() {

    let box = document.getElementById("merchantProductsList");

    if (!box) return;

    let products =
        JSON.parse(localStorage.getItem("merchantProducts")) || [];

    if (products.length === 0) {

        box.innerHTML = "<p>No products added yet.</p>";
        return;

    }

    box.innerHTML = "";

    products.forEach(function(product, index) {

        let image = product.image
            ? product.image
            : "https://via.placeholder.com/200";

        box.innerHTML += `

        <div class="product">

            <img src="${image}" width="180">

            <h3>${product.name}</h3>

            <p><strong>Price:</strong> $${product.price}</p>

            <p><strong>Category:</strong> ${product.category}</p>

            <p><strong>Description:</strong> ${product.description}</p>

            <p><strong>Stock:</strong> ${product.stock}</p>

            <p><strong>Status:</strong> ${product.status}</p>

        </div>

        `;

    });

}
// ================= MARKETPLACE PRODUCTS =================

function loadMarketplaceProducts(){

    let box = document.getElementById("merchantMarketplace");

    if(!box) return;


    let products =
    JSON.parse(localStorage.getItem("merchantProducts")) || [];


    let approvedProducts =
    products.filter(product => product.status === "Approved");


    if(approvedProducts.length === 0){

        box.innerHTML =
        "<p>No approved products available.</p>";

        return;

    }


    box.innerHTML = "";


    approvedProducts.forEach(function(product){


        box.innerHTML += `

        <div class="product">


        <img src="${product.image || 'https://via.placeholder.com/200'}"
        width="200">


        <h3>
        ${product.name}
        </h3>


        <p>
        💰 Price: $${product.price}
        </p>


        <p>
        📂 Category: ${product.category}
        </p>


        <p>
        ${product.description}
        </p>


        <p>
        📦 Stock: ${product.stock}
        </p>



        <button onclick='openProduct(${JSON.stringify(product)})'>

        👁 View Details

        </button>



        <button onclick="addToCart('${product.name}',${product.price},${product.stock})">

        🛒 Add To Cart

        </button>



        <button onclick="addToWishlist('${product.name}')">

        ❤️ Wishlist

        </button>



        <button onclick="addToCompare('${product.name}',${product.price},'${product.category}')">

        ⚖️ Compare

        </button>


        </div>

        `;


    });


}
// ================= CHECKOUT DISPLAY =================

function loadCheckout(){
alert("Checkout loading");
    let box = document.getElementById("checkoutItems");
    let totalBox = document.getElementById("checkoutTotal");


    if(!box) return;


    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];
alert(JSON.stringify(cart));

    if(cart.length === 0){

        box.innerHTML =
        "<p>Your cart is empty.</p>";

        if(totalBox){
            totalBox.innerText = "0";
        }

        return;

    }


    box.innerHTML = "";


    let total = 0;


    cart.forEach(function(item){


        let subtotal =
        Number(item.price) * Number(item.quantity || 1);


        total += subtotal;


        box.innerHTML += `

        <div class="product">

        <h3>${item.name}</h3>

        <p>
        Price: $${item.price}
        </p>

        <p>
        Quantity: ${item.quantity || 1}
        </p>

        <p>
        Subtotal: $${subtotal}
        </p>

        </div>

        `;


    });


    if(totalBox){

        totalBox.innerText = total;

    }


}
function loadMerchantOrders() {

    let box = document.getElementById("merchantOrders");

    if (!box) return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        box.innerHTML = "<p>No orders yet.</p>";
        return;
    }

    box.innerHTML = "";

    orders.forEach(function(order) {

        let items = "";

        order.items.forEach(function(item) {
            items += `
                <li>
                    ${item.name} × ${item.quantity}
                </li>
            `;
        });

        box.innerHTML += `
            <div class="product">

                <h3>Order #${order.id}</h3>

                <p><strong>Customer:</strong> ${order.customerName}</p>

                <p><strong>Email:</strong> ${order.customerEmail}</p>

                <p><strong>Address:</strong> ${order.customerAddress}</p>

                <p><strong>Payment:</strong> ${order.paymentMethod}</p>

                <ul>${items}</ul>

                <p><strong>Total:</strong> $${order.total}</p>

                <p><strong>Status:</strong> ${order.status}</p>

            </div>
        `;
    });

}
function updateOrderStatus(index, status){

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders[index].status = status;

    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Order status updated.");

    loadMerchantOrders();

}
// ================= EDIT PRODUCT =================

function editProduct(index){

    let products =
    JSON.parse(localStorage.getItem("merchantProducts")) || [];


    let product = products[index];


    let newName =
    prompt("Product name:", product.name);


    let newPrice =
    prompt("Product price:", product.price);


    let newStock =
    prompt("Product stock:", product.stock);



    if(newName){

        product.name = newName;

    }


    if(newPrice){

        product.price = Number(newPrice);

    }


    if(newStock){

        product.stock = Number(newStock);

    }



    products[index] = product;


    localStorage.setItem(
        "merchantProducts",
        JSON.stringify(products)
    );


    alert("Product updated");


    loadMerchantProducts();

}



// ================= DELETE PRODUCT =================

function deleteProduct(index){

    let products =
    JSON.parse(localStorage.getItem("merchantProducts")) || [];


    let confirmDelete =
    confirm("Delete this product?");


    if(confirmDelete){

        products.splice(index,1);


        localStorage.setItem(
            "merchantProducts",
            JSON.stringify(products)
        );


        alert("Product deleted");


        loadMerchantProducts();

    }

}
