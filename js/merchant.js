// ================= MERCHANT SYSTEM =================


// Merchant products storage

let merchantProducts =
JSON.parse(localStorage.getItem("merchantProducts")) || [];

console.log(merchantProducts);


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


function loadMerchantProducts(){

let box = document.getElementById("merchantProductsList");

if(!box) return;


let merchant =
JSON.parse(localStorage.getItem("merchant"));

if(!merchant){

box.innerHTML =
"<p>Please login as merchant first.</p>";

return;

}  

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


box.innerHTML = "";


let myProducts = products.filter(function(product){

return product.merchantEmail === merchant.email;

});
console.log("Merchant:", merchant);

console.log("All Products:", products);

console.log("My Products:", myProducts);


if(myProducts.length === 0){

box.innerHTML =
"<p>No products added yet.</p>";

return;

}



myProducts.forEach(function(product,index){


box.innerHTML += `

<div class="product">


<img 
src="${product.image || 'https://via.placeholder.com/200'}"
width="200"
>


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
📦 Stock: ${product.stock}
</p>


<p>
📌 Status:
${product.status}
</p>


<p>
${product.description || ""}
</p>



<button onclick="editMerchantProduct(${index})">

✏️ Edit

</button>



<button onclick="deleteMerchantProduct(${index})">

🗑 Delete

</button>


</div>

`;

});
    
  }



function deleteMerchantProduct(index){

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


products.splice(index,1);


localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);


loadMerchantProducts();

}
// ================= STORE PROFILE =================

function loadStoreProfile(){

let merchant =
JSON.parse(localStorage.getItem("merchant"));

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];
let views =
Number(localStorage.getItem("storeViews") || 0);

views++;

localStorage.setItem(
"storeViews",
views
);

let name =
document.getElementById("storeName");

let description =
document.getElementById("storeDescription");

let rating =
document.getElementById("storeRating");

let followers =
document.getElementById("storeFollowers");

let productBox =
document.getElementById("storeProducts");


if(name && merchant){

name.innerText =
merchant.storeName;

}


if(description && merchant){

description.innerText =
"Trusted seller on Product Finder";

}


if(rating && merchant){

rating.innerText =
"⭐ " + merchant.rating;

}


if(followers){

followers.innerText =
localStorage.getItem("followers") || 0;

}



if(productBox){

products.forEach(function(product){

productBox.innerHTML += `

<div class="product">

<h3>${product.name}</h3>

<p>💰 Price: $${product.price}</p>

<p>📂 Category: ${product.category}</p>

<p>📦 Stock: ${product.stock}</p>

<p>${product.description || ""}</p>


<button onclick="viewProduct('${product.name}')">
👀 View Details
</button>


<button onclick="addToCart('${product.name}',${product.price},${product.stock},'${product.merchantEmail}','${merchant.storeName}')">

🛒 Add To Cart

</button>



<button onclick="addToCompare('${product.name}',${product.price},'${product.category}')">

⚖️ Compare

</button>



<button onclick="addToWishlist('${product.name}')">

❤️ Favorite

</button>


</div>

`;

});


}

}
function followStore(){

let followers =
Number(localStorage.getItem("followers") || 0);


followers++;


localStorage.setItem(
"followers",
followers
);


alert("You followed this store ❤️");


loadStoreProfile();

}
// ================= STORE REVIEWS =================


let storeReviews =
JSON.parse(localStorage.getItem("storeReviews")) || [];



function submitStoreReview(stars){


let review = {

name:
JSON.parse(localStorage.getItem("user"))?.name || "Customer",

rating:stars,

date:new Date().toLocaleDateString()

};



storeReviews.push(review);



localStorage.setItem(
"storeReviews",
JSON.stringify(storeReviews)
);



alert("Thank you for reviewing the store ⭐");


loadStoreReviews();

}


// ================= STORE REVIEWS =================

function loadStoreReviews(){

let box =
document.getElementById("storeReviews");


if(!box) return;


let reviews =
JSON.parse(localStorage.getItem("storeReviews")) || [];


box.innerHTML="";


if(reviews.length===0){

box.innerHTML =
"<p>No reviews yet.</p>";

return;

}



let totalRating = 0;


reviews.forEach(function(review){

totalRating += Number(review.rating);


box.innerHTML += `

<div class="product">

<h3>
👤 ${review.name}
</h3>


<p>
⭐ ${review.rating}/5
</p>


<p>
📅 ${review.date}
</p>

</div>

`;

});



let average =
(totalRating / reviews.length).toFixed(1);



let ratingBox =
document.getElementById("storeRatingDisplay");


if(ratingBox){

ratingBox.innerText =
"⭐ " + average + "/5";

}


}


// ================= MERCHANT DASHBOARD =================
// ================= MERCHANT DASHBOARD =================

function loadMerchantDashboard(){

let merchant =
JSON.parse(localStorage.getItem("merchant"));

if(!merchant) return;


let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


let orders =
JSON.parse(localStorage.getItem("orders")) || [];
// ================= FINANCE ANALYTICS =================


let completedOrders =
orders.filter(function(order){

return order.status === "Completed";

});



let totalSales = 0;

let totalItemsSold = 0;



completedOrders.forEach(function(order){


totalSales += Number(order.total || 0);



order.items.forEach(function(item){

totalItemsSold += Number(item.quantity || 0);

});


});



let averageOrderValue = 0;


if(completedOrders.length > 0){

averageOrderValue =
(totalSales / completedOrders.length).toFixed(2);

}



// Display Finance


let salesBox =
document.getElementById("merchantSalesCount");


if(salesBox){

salesBox.innerText =
completedOrders.length;

}



let completedBox =
document.getElementById("completedOrdersCount");


if(completedBox){

completedBox.innerText =
completedOrders.length;

}



let averageBox =
document.getElementById("averageOrderValue");


if(averageBox){

averageBox.innerText =
averageOrderValue;

}

// Merchant products

let myProducts =
products.filter(function(product){

return product.merchantEmail === merchant.email;

});


// Merchant orders

let myOrders =
orders.filter(function(order){

return order.items.some(function(item){

return item.merchantEmail === merchant.email;

});

});

let newOrders =
myOrders.filter(function(order){

return order.status === "New";

});


let newOrderBox =
document.getElementById("newOrders");


if(newOrderBox){

newOrderBox.innerText =
newOrders.length;

}
    
// Revenue

let revenue = 0;

let soldProducts = 0;


myOrders.forEach(function(order){

revenue += Number(order.total || 0);


order.items.forEach(function(item){

soldProducts += Number(item.quantity || 0);

});

});


// Display

let productBox =
document.getElementById("merchantProductCount");

if(productBox){

productBox.innerText =
myProducts.length;

}



let orderBox =
document.getElementById("totalOrders");

if(orderBox){

orderBox.innerText =
myOrders.length;

}



let revenueBox =
document.getElementById("merchantRevenue");

if(revenueBox){

revenueBox.innerText =
"$" + revenue;

}



let soldBox =
document.getElementById("productsSold");

if(soldBox){

soldBox.innerText =
soldProducts;

}



let totalRevenue =
document.getElementById("totalRevenue");

if(totalRevenue){

totalRevenue.innerText =
revenue;

}



let viewsBox =
document.getElementById("storeViews");

if(viewsBox){

viewsBox.innerText =
localStorage.getItem("storeViews") || 0;

}



let followersBox =
document.getElementById("storeFollowersCount");

if(followersBox){

followersBox.innerText =
localStorage.getItem("followers") || 0;

}


}

function acceptOrder(index){

let orders =
JSON.parse(localStorage.getItem("orders")) || [];

orders[index].status = "Accepted";

localStorage.setItem(
"orders",
JSON.stringify(orders)
);

loadMerchantOrders();

}

function shipOrder(index){

let orders =
JSON.parse(localStorage.getItem("orders")) || [];

orders[index].status = "Shipped";

localStorage.setItem(
"orders",
JSON.stringify(orders)
);

loadMerchantOrders();

}

function completeOrder(index){

let orders =
JSON.parse(localStorage.getItem("orders")) || [];

orders[index].status = "Completed";

localStorage.setItem(
"orders",
JSON.stringify(orders)
);

loadMerchantOrders();

}


// ================= MERCHANT ORDERS =================


function loadMerchantOrders(){

console.log("Merchant Orders Loaded");

let box =
document.getElementById("merchantOrders");

if(!box) return;

let merchant =
JSON.parse(localStorage.getItem("merchant"));


if(!merchant){

box.innerHTML =
"<p>No merchant account found.</p>";

return;

}



let orders =
JSON.parse(localStorage.getItem("orders")) || [];



box.innerHTML = "";



// Only this merchant orders

let myOrders =
orders.filter(function(order){


return order.items.some(function(item){


return item.merchantEmail === merchant.email;


});


});



if(myOrders.length === 0){


box.innerHTML =
"<p>No orders available.</p>";


return;

}



// Merchant Revenue (only this merchant products)

let revenue = 0;

let soldProducts = 0;


myOrders.forEach(function(order){

order.items.forEach(function(item){

if(item.merchantEmail === merchant.email){

revenue += Number(item.price * item.quantity);

soldProducts += Number(item.quantity);

}

});

});


box.innerHTML += `

<div class="product">


<h3>
🛒 Order #${order.id}
</h3>


<p>
👤 Customer:
${order.customer || "Guest"}
</p>


<p>
💰 Merchant Total:
$${order.items
.filter(function(item){
return item.merchantEmail === merchant.email;
})
.reduce(function(sum,item){
return sum + (item.price * item.quantity);
},0)}
</p>

<p>
📦 Status:
${order.status}
</p>


<p>
📅 ${order.date}
</p>


<h4>
Products:
</h4>


${order.items.map(function(item){

if(item.merchantEmail === merchant.email){

return `

<p>
${item.name} x ${item.quantity}
</p>

`;

}

return "";

}).join("")}



<button onclick="acceptOrder(${realIndex})">
✅ Accept
</button>


<button onclick="shipOrder(${realIndex})">
🚚 Ship
</button>


<button onclick="completeOrderStatus(${realIndex})">
✔ Complete
</button>


</div>

`;

});


}



function acceptOrder(index){

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    orders[index].status = "Accepted";


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    loadMerchantOrders();

}




function shipOrder(index){

let orders =
JSON.parse(localStorage.getItem("orders")) || [];


let tracking =
"PF" + Date.now();



orders[index].status = "Shipped";

orders[index].shippingStatus =
"Shipped";

orders[index].trackingNumber =
tracking;



localStorage.setItem(
"orders",
JSON.stringify(orders)
);



alert(
"Order shipped. Tracking Number: " + tracking
);



loadMerchantOrders();

}


function completeOrderStatus(index){

let orders =
JSON.parse(localStorage.getItem("orders")) || [];


orders[index].status =
"Completed";


orders[index].shippingStatus =
"Delivered";



localStorage.setItem(
"orders",
JSON.stringify(orders)
);



alert("Order completed");


loadMerchantOrders();

}
function updateOrderStatus(index,status){


let orders =
JSON.parse(localStorage.getItem("orders")) || [];


orders[index].status = status;


localStorage.setItem(
"orders",
JSON.stringify(orders)
);


alert("Order updated: " + status);


loadMerchantOrders();


}

// ================= EDIT PRODUCT =================

function editMerchantProduct(index){

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


let product = products[index];


let newPrice =
prompt(
"Enter new price",
product.price
);


let newStock =
prompt(
"Enter new stock",
product.stock
);



if(newPrice){

product.price =
Number(newPrice);

}


if(newStock){

product.stock =
Number(newStock);

}



products[index] = product;



localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);



alert("Product updated");


loadMerchantProducts();

}
