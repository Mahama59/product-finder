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

alert("Please complete all fields.");
return;

}

let merchant={

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

localStorage.setItem(
"merchantLoggedIn",
"true"
);

alert("Merchant account created successfully.");

window.location.href="merchant-dashboard.html";

}

// ================= MERCHANT LOGIN =================

function merchantLogin(){

let email =
document.getElementById("merchantEmail").value.trim();

let phone =
document.getElementById("merchantPhone").value.trim();

let merchant =
JSON.parse(localStorage.getItem("merchant"));

if(!merchant){

alert("Merchant account not found.");

return;

}

if(

merchant.email===email &&
merchant.phone===phone

){

localStorage.setItem(
"merchantLoggedIn",
"true"
);

alert("Login successful.");

window.location.href="merchant-dashboard.html";

}else{

alert("Incorrect merchant details.");

}

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

    
    document.getElementById("newOrders").innerText =
    newOrders.length;

    
    document.getElementById("productsSold").innerText =
    soldProducts;

    // Finance Summary

    document.getElementById("merchantSalesCount").innerText =
    totalSales;

    document.getElementById("completedOrdersCount").innerText =
    completedOrders.length;

    document.getElementById("averageOrderValue").innerText =
    "$" + averageOrderValue;

document.getElementById("merchantTotalProducts").innerText =
myProducts.length;


document.getElementById("merchantTotalOrders").innerText =
myOrders.length;


document.getElementById("merchantTotalRevenue").innerText =
revenue;

    // Store Stats

    let followers =
    localStorage.getItem("followers") || 0;

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

    let ratingBox =
    document.getElementById("storeRating");

    if(ratingBox){

        let reviews =
        JSON.parse(localStorage.getItem("storeReviews")) || [];

        if(reviews.length > 0){

            let total = 0;

            reviews.forEach(function(review){

                total += Number(review.rating);

            });

            ratingBox.innerText =
            (total / reviews.length).toFixed(1) + "/5";

        }else{

            ratingBox.innerText = "No ratings";

        }

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
