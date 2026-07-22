// ================= MERCHANT SYSTEM =================

let merchantProducts =
JSON.parse(localStorage.getItem("merchantProducts")) || [];

// ================= MERCHANT REGISTER =================

function registerMerchant(){

let name =
document.getElementById("merchantName").value.trim();

let email =
document.getElementById("merchantEmail").value.trim();

let phone =
document.getElementById("merchantPhone").value.trim();


if(!name || !email || !phone){

alert("Please complete all fields");
return;

}


// Get existing merchants

let merchants =
JSON.parse(localStorage.getItem("merchants")) || [];


// Check duplicate email

let exists =
merchants.find(function(merchant){

return merchant.email === email;

});


if(exists){

alert("Merchant already exists");

return;

}



let merchant = {

id: Date.now(),

name:name,

email:email,

phone:phone,

storeName:name + "'s Store",

joined:new Date().toLocaleDateString(),

rating:5

};



merchants.push(merchant);



localStorage.setItem(
"merchants",
JSON.stringify(merchants)
);



// login this merchant

localStorage.setItem(
"merchant",
JSON.stringify(merchant)
);


localStorage.setItem(
"merchantLoggedIn",
"true"
);



alert("Merchant registration successful");


window.location.href="merchant-dashboard.html";


}

// ================= MERCHANT LOGIN =================

function merchantLogin(){

let email =
document.getElementById("merchantEmail").value.trim();


let phone =
document.getElementById("merchantPhone").value.trim();



let merchants =
JSON.parse(localStorage.getItem("merchants")) || [];



let merchant =
merchants.find(function(merchant){

return merchant.email === email &&
merchant.phone === phone;

});



if(!merchant){

alert("Incorrect merchant details");

return;

}



localStorage.setItem(
"merchant",
JSON.stringify(merchant)
);


localStorage.setItem(
"merchantLoggedIn",
"true"
);



alert("Merchant login successful");


window.location.href="merchant-dashboard.html";


}

// ================= MERCHANT DASHBOARD =================


function loadMerchantDashboard(){

    let merchant =
    JSON.parse(localStorage.getItem("merchant"));

    if(!merchant) return;

    let products =
    JSON.parse(localStorage.getItem("merchantProducts")) || [];

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

    // Merchant Products
    let myProducts = products.filter(function(product){
        return product.merchantEmail === merchant.email;
    });

    // Merchant Orders
    let myOrders = orders.filter(function(order){
        return order.items.some(function(item){
            return item.merchantEmail === merchant.email;
        });
    });

    // New Orders
    let newOrders = myOrders.filter(function(order){
        return order.status === "New";
    });

    // Revenue & Products Sold
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

    // Completed Orders
    let completedOrders =
    myOrders.filter(function(order){
        return order.status === "Completed";
    });

    let totalSales =
    completedOrders.length;

    let averageOrderValue = 0;

    if(completedOrders.length > 0){

        averageOrderValue =
        (revenue / completedOrders.length).toFixed(2);

    }

    // Dashboard Summary

    
// ================= DASHBOARD SUMMARY =================

document.getElementById("merchantProductCount").innerText =
myProducts.length;

document.getElementById("totalOrders").innerText =
myOrders.length;

document.getElementById("newOrders").innerText =
newOrders.length;

document.getElementById("totalRevenue").innerText =
revenue;

document.getElementById("productsSold").innerText =
soldProducts;

// ================= FINANCE SUMMARY =================

document.getElementById("merchantSalesCount").innerText =
totalSales;

document.getElementById("completedOrdersCount").innerText =
completedOrders.length;

document.getElementById("merchantOrderCount").innerText =
myOrders.length;

document.getElementById("merchantRevenue").innerText =
"$" + revenue;

document.getElementById("averageOrderValue").innerText =
averageOrderValue;

// ================= ANALYTICS BOXES =================

document.getElementById("merchantTotalProducts").innerText =
myProducts.length;

document.getElementById("merchantTotalOrders").innerText =
myOrders.length;

document.getElementById("merchantTotalRevenue").innerText =
revenue;

    // Store Stats

   
    let views =
    localStorage.getItem("storeViews") || 0;

    let followersBox =
    document.getElementById("storeFollowersCount");

    if(followersBox){

        followersBox.innerText = followers;

    }

    let viewsBox =
    document.getElementById("storeViews");

    if(viewsBox){

        viewsBox.innerText = views;

    }

// ================= STORE RATING =================

let ratingBox =
document.getElementById("storeRatingDisplay");


let reviews =
JSON.parse(localStorage.getItem("storeReviews")) || [];


if(ratingBox){


if(reviews.length === 0){

ratingBox.innerText =
"No ratings";


}else{


let totalRating = 0;


reviews.forEach(function(review){

totalRating += Number(review.rating);

});


ratingBox.innerText =
"⭐ " + 
(totalRating / reviews.length).toFixed(1)
+ "/5";


}

}



// ================= MERCHANT EXTRA STATS =================


// Wishlist Saves

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];


let wishlistBox =
document.getElementById("totalWishlist");


if(wishlistBox){

wishlistBox.innerText =
wishlist.length;

}



// Compared Products

let compare =
JSON.parse(localStorage.getItem("compareList")) || [];


let compareBox =
document.getElementById("totalCompare");


if(compareBox){

compareBox.innerText =
compare.length;

}



// Store Followers

let followersCount =
Number(localStorage.getItem("followers") || 0);


let followersBox =
document.getElementById("storeFollowersCount");


if(followersBox){

followersBox.innerText =
followersCount;

}



// Store Views

let viewsCount =
Number(localStorage.getItem("storeViews") || 0);


let viewsBox =
document.getElementById("storeViews");


if(viewsBox){

viewsBox.innerText =
viewsCount;

}

}

// ================= MERCHANT ORDERS =================

function loadMerchantOrders() {

    let box = document.getElementById("merchantOrders");

    if (!box) return;


    let merchant =
    JSON.parse(localStorage.getItem("merchant"));


    if (!merchant) {

        box.innerHTML =
        "<p>No merchant account found.</p>";

        return;

    }


    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    box.innerHTML = "";


    let myOrders = orders.filter(function(order) {

        return order.items &&
        order.items.some(function(item){

            return item.merchantEmail === merchant.email;

        });

    });



    if(myOrders.length === 0){

        box.innerHTML =
        "<p>No orders available.</p>";

        return;

    }



    myOrders.forEach(function(order){


        let realIndex =
        orders.findIndex(function(o){

            return o.id === order.id;

        });



        let merchantTotal = 0;


        let merchantItems = order.items.filter(function(item){


            if(item.merchantEmail === merchant.email){

                merchantTotal +=
                Number(item.price) * Number(item.quantity);

                return true;

            }

            return false;

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
        💰 Your Sales:
        $${merchantTotal}
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


        ${merchantItems.map(function(item){

            return `

            <p>
            ${item.name} x ${item.quantity}
            </p>

            `;

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

// ================= SHIP ORDER =================

function shipOrder(index){

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    if(!orders[index]){

        alert("Order not found");

        return;

    }


    let trackingNumber =
    "PF" + Date.now();


    orders[index].status =
    "Shipped";


    orders[index].shippingStatus =
    "On the way";


    orders[index].trackingNumber =
    trackingNumber;


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    alert(
    "Order shipped.\nTracking: " 
    + trackingNumber
    );


    loadMerchantOrders();

    loadMerchantDashboard();

}

// ================= COMPLETE ORDER =================

function completeOrderStatus(index){

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    if(!orders[index]){

        alert("Order not found");

        return;

    }


    orders[index].status =
    "Completed";


    orders[index].shippingStatus =
    "Delivered";


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    alert("Order completed successfully");


    loadMerchantOrders();

    loadMerchantDashboard();

}

// ================= ACCEPT ORDER =================

function acceptOrder(index){

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    if(!orders[index]){

        alert("Order not found");

        return;

    }


    orders[index].status =
    "Accepted";


    orders[index].shippingStatus =
    "Processing";


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    alert("Order accepted");


    loadMerchantOrders();

    loadMerchantDashboard();

}

function loadMerchantProducts(){

let box =
document.getElementById("merchantProductsList");


if(!box) return;


let merchant =
JSON.parse(localStorage.getItem("merchant"));


if(!merchant){

box.innerHTML =
"<p>Please login as merchant</p>";

return;

}


let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];
console.log("Merchant:", merchant);
console.log("All Products:", products);

box.innerHTML = "";


let myProducts =
products.filter(function(product){

return product.merchantEmail === merchant.email;

});



if(myProducts.length === 0){

box.innerHTML =
"<p>No products added yet.</p>";

return;

}



myProducts.forEach(function(product){


box.innerHTML += `

<div class="product">

<h3>${product.name}</h3>

<p>
💰 Price: $${product.price}
</p>

<p>
📦 Stock: ${product.stock}
</p>

<p>
📂 Category: ${product.category}
</p>

<p>
Status: ${product.status}
</p>


</div>

`;

});


}

console.log(
"Merchant:",
JSON.parse(localStorage.getItem("merchant"))
);

console.log(
"Products:",
JSON.parse(localStorage.getItem("merchantProducts"))
);
