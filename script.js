alert("NEW SCRIPT LOADED");
alert("script.js loaded");
// ================= PRODUCT FINDER PART 1 =================


// ================= CART =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= ADVANCED PRODUCT SEARCH =================

 // ================= SMART SEARCH PART 22 =================


function searchProducts(){


let input =
document.getElementById("searchInput")
.value
.toLowerCase();



let products =
document.querySelectorAll(".product");



products.forEach(function(product){


let text =
product.innerText.toLowerCase();



if(text.includes(input)){


product.style.display="block";


}else{


product.style.display="none";


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

loadRecentProducts();

loadMarketplaceProducts();

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
     let merchant =
JSON.parse(localStorage.getItem("merchant"));

let product = {

name: name,

price: Number(price),

category: category,

description: description,

stock: stock,

image: "",

status: "Pending",

merchantName: merchant.name,

merchantEmail: merchant.email

};
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
addNotification("🎉 Your product has been approved by the admin.");

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

loadAdminAnalytics();

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
addNotification("✅ Your order has been placed successfully.");


let order = {

id: Date.now(),

customerName: customerName,

customerEmail: customerEmail,

customerAddress: customerAddress,

paymentMethod: paymentMethod,

items: cart,

total: total,

status:"Pending",

shippingStatus:"Preparing",

trackingNumber:
"PF-" + Date.now(),

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
📍 Delivery:
<strong>${order.shippingStatus || "Preparing"}</strong>
</p>


<p>
🔎 Tracking:
${order.trackingNumber || "Not available"}
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
loadReviews(product.name);

loadRecommendations();


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

// ================= RECOMMENDATION ENGINE PART 25 =================


function loadRecommendations(){


let box =
document.getElementById("recommendedProducts");


if(!box) return;



let current =
JSON.parse(localStorage.getItem("selectedProduct"));



if(!current) return;



let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



let recommendations =
products.filter(function(product){


return product.category === current.category
&&
product.name !== current.name
&&
product.status === "Approved";


});



if(recommendations.length === 0){

box.innerHTML =
"<p>No similar products available.</p>";

return;

}



box.innerHTML="";



recommendations.slice(0,4)
.forEach(function(product){


box.innerHTML += `

<div class="product">


<img 
src="${product.image || 'https://via.placeholder.com/200'}"
width="150">


<h3>
${product.name}
</h3>


<p>
💰 Price: $${product.price}
</p>


<button onclick='openProduct(${JSON.stringify(product)})'>

👁 View

</button>


</div>

`;


});


}

// ================= SAVE SELECTED PRODUCT =================


 // ================= RECENTLY VIEWED PART 24 =================


function openProduct(product){


localStorage.setItem(
"selectedProduct",
JSON.stringify(product)
);



let recent =
JSON.parse(localStorage.getItem("recentProducts")) || [];



recent =
recent.filter(
item => item.name !== product.name
);



recent.unshift(product);



if(recent.length > 5){

recent.pop();

}



localStorage.setItem(
"recentProducts",
JSON.stringify(recent)
);



window.location.href =
"product-details.html";


}


// ================= REVIEWS =================


let reviews =
JSON.parse(localStorage.getItem("reviews")) || {};




// ================= REVIEW SYSTEM PART 21 =================


function submitReview(){


let product =
JSON.parse(localStorage.getItem("selectedProduct"));



let text =
document.getElementById("reviewText").value;



let rating =
Number(document.getElementById("reviewRating").value);



if(!product){

alert("No product selected");

return;

}



if(!text){

alert("Write a review first");

return;

}



let reviews =
JSON.parse(localStorage.getItem("reviews")) || {};



if(!reviews[product.name]){

reviews[product.name] = [];

}



reviews[product.name].push({

text:text,

rating:rating,

date:new Date().toLocaleDateString(),

user:
JSON.parse(localStorage.getItem("user"))?.name || "Guest"

});



localStorage.setItem(
"reviews",
JSON.stringify(reviews)
);



alert("Review submitted ⭐");


document.getElementById("reviewText").value="";


loadReviews(product.name);


}


function loadReviews(productName){


let box =
document.getElementById("productReviews");



let ratingBox =
document.getElementById("averageRating");



if(!box) return;



let reviews =
JSON.parse(localStorage.getItem("reviews")) || {};



let list =
reviews[productName] || [];



if(list.length === 0){


box.innerHTML =
"<p>No reviews yet.</p>";


if(ratingBox){

ratingBox.innerText =
"⭐ No rating";

}


return;

}



let total = 0;


list.forEach(function(review){

total += Number(review.rating);

});



let average =
(total / list.length).toFixed(1);



if(ratingBox){

ratingBox.innerText =
"⭐ Average Rating: " + average + "/5";

}



box.innerHTML="";



list.forEach(function(review){


box.innerHTML += `

<div class="product">


<h4>
👤 ${review.user}
</h4>


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
// ================= MERCHANT DASHBOARD PART 7 =================


// MERCHANT ANALYTICS

// ================= MERCHANT ANALYTICS PART 26 =================


function loadMerchantAnalytics(){


let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



let orders =
JSON.parse(localStorage.getItem("orders")) || [];



let productBox =
document.getElementById("merchantTotalProducts");


let orderBox =
document.getElementById("merchantTotalOrders");


let revenueBox =
document.getElementById("merchantTotalRevenue");



if(productBox){

productBox.innerText =
products.length;

}



if(orderBox){

orderBox.innerText =
orders.length;

}



let revenue =
orders.reduce(function(total,order){

return total + Number(order.total);

},0);



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
// ================= MARKETPLACE PRODUCTS =================

function loadMarketplaceProducts(){

    let box = document.getElementById("merchantMarketplace");

    if(!box) return;


    let products =
    JSON.parse(localStorage.getItem("merchantProducts")) || [];
console.log(products);
alert(JSON.stringify(products));
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


        <img 
src="${product.image || 'https://via.placeholder.com/200'}"
width="200"
height="200"
style="object-fit:cover;">


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
🏪 Seller: ${product.merchantName}
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
// ================= ADMIN ORDERS =================


function loadAdminOrders(){

    let box =
    document.getElementById("adminOrders");


    if(!box) return;


    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    if(orders.length === 0){

        box.innerHTML =
        "<p>No orders found.</p>";

        return;

    }


    box.innerHTML="";


    orders.forEach(function(order,index){


        box.innerHTML += `


        <div class="product">


        <h3>
        📦 Order #${index+1}
        </h3>


        <p>
        👤 Customer:
        ${order.customerName}
        </p>


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
        ${order.status}
        </p>



        <button onclick="adminUpdateOrder(${index})">

        Change Status

        </button>



        <button onclick="adminDeleteOrder(${index})">

        🗑 Delete Order

        </button>


        </div>


        `;


    });


}



// UPDATE ORDER STATUS

function adminUpdateOrder(index){


    let status =
    prompt(
    "Enter new status:\nPending\nProcessing\nShipped\nDelivered"
    );


    if(!status) return;


    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    orders[index].status=status;


    localStorage.setItem(
    "orders",
    JSON.stringify(orders)
    );


    loadAdminOrders();


    alert("Order updated");


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


    loadAdminOrders();


    alert("Order removed");

}
// ================= CATEGORY FILTER =================


function filterProducts(){

    let category =
    document.getElementById("categoryFilter").value;


    let maxPrice =
    Number(document.getElementById("maxPrice").value) || Infinity;



    let products =
    document.querySelectorAll(".product");



    products.forEach(function(product){


        let productCategory =
        product.getAttribute("data-category");


        let priceText =
product.innerText.match(/\$([0-9]+)/);


let price =
priceText ? Number(priceText[1]) : 0;



        if(
            (category==="all" || productCategory===category)
            &&
            price <= maxPrice
        ){

            product.style.display="block";

        }else{

            product.style.display="none";

        }


    });


}

// ================= PRODUCT SORTING PART 35 =================

function sortProducts(){

    let sort =
    document.getElementById("sortProducts").value;


    let container =
    document.getElementById("merchantMarketplace");


    if(!container) return;


    let products =
    Array.from(container.querySelectorAll(".product"));


    products.sort(function(a,b){


        let priceA =
        Number(a.innerText.match(/\d+/));


        let priceB =
        Number(b.innerText.match(/\d+/));



        if(sort === "low"){

            return priceA - priceB;

        }


        if(sort === "high"){

            return priceB - priceA;

        }


        return 0;


    });



    container.innerHTML="";


    products.forEach(function(product){

        container.appendChild(product);

    });


}
// ================= USER ACCOUNT =================


function loadAccount(){

    let box =
    document.getElementById("accountInfo");


    if(!box) return;



    let user =
    JSON.parse(localStorage.getItem("user"));



    if(!user){

        box.innerHTML =
        "<p>Please login first.</p>";

        return;

    }



    box.innerHTML = `

    <h2>
    👋 Welcome ${user.name}
    </h2>


    <p>
    📧 Email:
    ${user.email}
    </p>


    `;


}
// ================= CUSTOMER DASHBOARD PART 18 =================


function loadCustomerDashboard(){


let user =
JSON.parse(localStorage.getItem("user"));



let profile =
document.getElementById("customerProfile");


if(profile){


if(user){

profile.innerHTML = `

<h3>
👤 ${user.name}
</h3>

<p>
📧 ${user.email}
</p>

`;

}else{

profile.innerHTML =
"<p>Please login first</p>";

}

}




let ordersBox =
document.getElementById("customerOrders");



let orders =
JSON.parse(localStorage.getItem("orders")) || [];



if(ordersBox){


if(orders.length === 0){

ordersBox.innerHTML =
"<p>No orders yet</p>";

}else{


ordersBox.innerHTML="";


orders.forEach(function(order,index){


ordersBox.innerHTML += `

<div class="product">

<h3>
📦 Order #${index+1}
</h3>


<p>
💰 Total: $${order.total}
</p>


<p>
🚚 Status:
${order.status}
</p>


<p>
📅 ${order.date}
</p>
<button onclick="viewOrderDetails(${index})">

👁 View Details

</button>

</div>

`;


});


}


}





let wishlistBox =
document.getElementById("customerWishlist");


let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];



if(wishlistBox){


if(wishlist.length===0){

wishlistBox.innerHTML =
"<p>No wishlist items</p>";

}else{


wishlistBox.innerHTML="";


wishlist.forEach(function(item){


wishlistBox.innerHTML += `

<p>
❤️ ${item}
</p>

`;


});


}


}

// ================= CUSTOMER ORDER DETAILS PART 19 =================


function viewOrderDetails(index){


let orders =
JSON.parse(localStorage.getItem("orders")) || [];


let order = orders[index];


if(!order){

alert("Order not found");

return;

}



let box =
document.getElementById("orderDetails");


if(!box) return;



box.innerHTML = `

<div class="product">

<h2>
📦 Order Details
</h2>


<p>
Order ID: ${order.id}
</p>


<p>
Status:
${order.status}
</p>


<p>
Date:
${order.date}
</p>


<h3>
Products:
</h3>


${order.items.map(function(item){


return `

<p>
🛒 ${item.name}
<br>
Quantity: ${item.quantity}
<br>
Price: $${item.price}

</p>

`;


}).join("")}



<h3>
Total: $${order.total}
</h3>



<button onclick="cancelOrder(${index})">

❌ Cancel Order

</button>
<button onclick="openStore('${order.items[0].merchantEmail}')">

🏪 Visit Store

</button>

</div>
`;



}
function cancelOrder(index){


let orders =
JSON.parse(localStorage.getItem("orders")) || [];



if(orders[index].status !== "Pending"){

alert("This order cannot be cancelled");

return;

}



orders.splice(index,1);



localStorage.setItem(
    "orders",
    JSON.stringify(orders)
);

alert("Order cancelled");

loadCustomerDashboard();

}
// ================= MERCHANT ORDER MANAGEMENT PART 20 =================

function loadMerchantOrders(){

let box = document.getElementById("merchantOrders");

if(!box){
    return;
}


let orders = JSON.parse(localStorage.getItem("orders")) || [];


console.log("Orders:", orders);


if(orders.length === 0){

box.innerHTML = "<p>No orders available.</p>";

return;

}


box.innerHTML = "";


orders.forEach(function(order,index){

box.innerHTML += `

<div class="product">

<h3>
📦 Order #${index + 1}
</h3>

<p>
Customer: ${order.customerName}
</p>

<p>
Email: ${order.customerEmail}
</p>

<p>
Total: $${order.total}
</p>

<p>
Status: ${order.status}
</p>

</div>

`;

});


}


function updateOrderStatus(index,status){


let orders =
JSON.parse(localStorage.getItem("orders")) || [];



orders[index].status = status;
addNotification("📦 Your order status is now: " + status);


localStorage.setItem(
"orders",
JSON.stringify(orders)
);



loadMerchantOrders();


alert("Order updated to " + status);


}


alert("Order cancelled");


loadCustomerDashboard();


}
function loadRecentProducts(){


let box =
document.getElementById("recentProducts");


if(!box) return;



let recent =
JSON.parse(localStorage.getItem("recentProducts")) || [];



if(recent.length===0){

box.innerHTML =
"<p>No recently viewed products.</p>";

return;

}



box.innerHTML="";



recent.forEach(function(product){


box.innerHTML += `

<div class="product">


<img src="${product.image || 'https://via.placeholder.com/200'}"
width="150">


<h3>
${product.name}
</h3>


<p>
💰 $${product.price}
</p>


<button onclick='openProduct(${JSON.stringify(product)})'>

View Again

</button>


</div>

`;


});


}
// ================= ADMIN CONTROL PART 27 =================


function loadAdminAnalytics(){


let users =
JSON.parse(localStorage.getItem("user"));



let merchant =
JSON.parse(localStorage.getItem("merchant"));



let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



let orders =
JSON.parse(localStorage.getItem("orders")) || [];



let userBox =
document.getElementById("adminTotalUsers");


let merchantBox =
document.getElementById("adminTotalMerchants");


let productBox =
document.getElementById("adminTotalProducts");


let orderBox =
document.getElementById("adminTotalOrders");



if(userBox){

userBox.innerText =
users ? 1 : 0;

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
// ================= SHIPPING SYSTEM PART 29 =================


function updateShippingStatus(index,status){


let orders =
JSON.parse(localStorage.getItem("orders")) || [];



orders[index].shippingStatus = status;



localStorage.setItem(
"orders",
JSON.stringify(orders)
);



alert("Delivery updated");


}
// ================= SECURITY SYSTEM PART 30 =================


// CUSTOMER PROTECTION

function protectCustomer(){


let loggedIn =
localStorage.getItem("loggedIn");


if(loggedIn !== "true"){


alert("Please login first");


window.location.href="login.html";


}


}




// MERCHANT PROTECTION

function protectMerchant(){


let merchantLoggedIn =
localStorage.getItem("merchantLoggedIn");


if(merchantLoggedIn !== "true"){


alert("Merchant login required");


window.location.href="merchant-login.html";


}


}




// ADMIN PROTECTION

function protectAdmin(){


let adminLoggedIn =
localStorage.getItem("adminLoggedIn");


if(adminLoggedIn !== "true"){


alert("Admin access required");


window.location.href="admin-login.html";


}


}
// ================= WISHLIST PAGE PART 37 =================

function loadWishlist(){

let box =
document.getElementById("wishlistItems");


if(!box) return;


let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];


if(wishlist.length === 0){

box.innerHTML =
"<p>No wishlist items yet.</p>";

return;

}


box.innerHTML="";


wishlist.forEach(function(item,index){


box.innerHTML += `

<div class="product">

<h3>
❤️ ${item}
</h3>


<button onclick="removeWishlist(${index})">

❌ Remove

</button>


<button onclick="addToCart('${item}',0,1)">

🛒 Add To Cart

</button>


</div>

`;


});


}



function removeWishlist(index){


let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];


wishlist.splice(index,1);


localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);


loadWishlist();


}
// ================= PRODUCT COMPARISON PART 38 =================


function loadComparison(){


let box =
document.getElementById("comparisonList");


if(!box) return;



let products =
JSON.parse(localStorage.getItem("compare")) || [];



if(products.length === 0){


box.innerHTML =
"<p>No products selected for comparison.</p>";


return;


}



box.innerHTML="";



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
📂 Category:
${product.category}
</p>



<button onclick="removeCompare(${index})">

❌ Remove

</button>


</div>


`;


});


}




function removeCompare(index){


let products =
JSON.parse(localStorage.getItem("compare")) || [];



products.splice(index,1);



localStorage.setItem(
"compare",
JSON.stringify(products)
);



loadComparison();


}
function blockUser(index){


let users =
JSON.parse(localStorage.getItem("users")) || [];



users[index].status="Blocked";



localStorage.setItem(
"users",
JSON.stringify(users)
);



loadAdminUsers();
}
// ================= NOTIFICATION SYSTEM =================

function addNotification(message){

let notifications =
JSON.parse(localStorage.getItem("notifications")) || [];

notifications.unshift({

message: message,

date: new Date().toLocaleString(),

read: false

});

localStorage.setItem(
"notifications",
JSON.stringify(notifications)
);

}

function loadNotifications(){

let box =
document.getElementById("notificationList");

if(!box) return;

let notifications =
JSON.parse(localStorage.getItem("notifications")) || [];

if(notifications.length === 0){

box.innerHTML =
"<p>No notifications.</p>";

return;

}

box.innerHTML = "";

notifications.forEach(function(notification){

box.innerHTML += `

<div class="product">

<p>🔔 ${notification.message}</p>

<small>${notification.date}</small>

</div>

`;

});

}

function clearNotifications(){

localStorage.removeItem("notifications");

loadNotifications();

alert("Notifications cleared");

}
function openStore(email){

localStorage.setItem(
"selectedStore",
email
);

window.location.href =
"store.html";

}
function loadStore(){

let email =
localStorage.getItem("selectedStore");

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];

let storeProducts =
products.filter(function(product){

return product.merchantEmail === email;

});

document.getElementById("storeName").innerText =
storeProducts.length > 0
? "🏪 " + storeProducts[0].merchantName
: "Merchant Store";

let box =
document.getElementById("storeProducts");

box.innerHTML = "";

storeProducts.forEach(function(product){

box.innerHTML += `

<div class="product">

<img src="${product.image}" width="180">

<h3>${product.name}</h3>

<p>$${product.price}</p>

<p>${product.description}</p>

<button onclick='openProduct(${JSON.stringify(product)})'>

👁 View Details

</button>

</div>

`;

});

}
