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


let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


box.innerHTML = "";


let myProducts = products.filter(function(product){

return product.merchantEmail === merchant.email;

});



if(myProducts.length === 0){

box.innerHTML =
"<p>No products added yet.</p>";

return;

}



myProducts.forEach(function(product,index){


box.innerHTML += `

<div class="product">

<h3>${product.name}</h3>

<p>💰 Price: $${product.price}</p>

<p>📂 Category: ${product.category}</p>

<p>📦 Stock: ${product.stock}</p>

<p>${product.description}</p>


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

productBox.innerHTML="";


products.forEach(function(product){


productBox.innerHTML += `

<div class="product">

<h3>${product.name}</h3>

<p>💰 Price: $${product.price}</p>

<p>📂 Category: ${product.category}</p>

<button onclick="addToCart('${product.name}',${product.price},${product.stock})">

🛒 Add To Cart

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




function loadStoreReviews(){


let box =
document.getElementById("storeReviews");


if(!box) return;



let reviews =
JSON.parse(localStorage.getItem("storeReviews")) || [];



box.innerHTML="";



if(reviews.length===0){

box.innerHTML=
"<p>No reviews yet.</p>";

return;

}



reviews.forEach(function(review){


box.innerHTML += `

<div class="product">

<h3>
👤 ${review.name}
</h3>


<p>
⭐ ${review.rating}/5
</p>


<p>
${review.date}
</p>


</div>

`;

});


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



    // only this merchant products

    let myProducts =
    products.filter(function(product){

        return product.merchantEmail === merchant.email;

    });



    // orders belonging to this merchant

    let myOrders =
    orders.filter(function(order){

        return order.items.some(function(item){

            return item.merchantEmail === merchant.email;

        });

    });



    let revenue = 0;


    myOrders.forEach(function(order){

        revenue += Number(order.total || 0);

    });



    let productCount =
    document.getElementById("merchantProductCount");


    if(productCount){

        productCount.innerText =
        myProducts.length;

    }



    let orderCount =
    document.getElementById("merchantOrderCount");


    if(orderCount){

        orderCount.innerText =
        myOrders.length;

    }



    let revenueBox =
    document.getElementById("merchantRevenue");


    if(revenueBox){

        revenueBox.innerText =
        "$" + revenue;

    }



    // analytics boxes

    let totalProducts =
    document.getElementById("merchantTotalProducts");


    if(totalProducts){

        totalProducts.innerText =
        myProducts.length;

    }


    let totalOrders =
    document.getElementById("merchantTotalOrders");


    if(totalOrders){

        totalOrders.innerText =
        myOrders.length;

    }


    let totalRevenue =
    document.getElementById("merchantTotalRevenue");


    if(totalRevenue){

        totalRevenue.innerText =
        revenue;

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

function loadMerchantOrders(){

let box =
document.getElementById("merchantOrders");

if(!box) return;

let orders =
JSON.parse(localStorage.getItem("orders")) || [];

box.innerHTML = "";

if(orders.length === 0){

box.innerHTML =
"<p>No customer orders yet.</p>";

return;

}

orders.forEach(function(order,index){

box.innerHTML += `

<div class="product">

<h3>Order #${order.id}</h3>

<p>Customer: ${order.customer}</p>

<p>Total: $${order.total}</p>

<p>Status: ${order.status}</p>

<p>Date: ${order.date}</p>

<button onclick="acceptOrder(${index})">
✅ Accept
</button>

<button onclick="shipOrder(${index})">
🚚 Ship
</button>

<button onclick="completeOrder(${index})">
✔ Complete
</button>

</div>

`;

});

}

// ================= MERCHANT ORDERS =================


function loadMerchantOrders(){

    let box =
    document.getElementById("merchantOrders");


    if(!box) return;


    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    box.innerHTML = "";


    if(orders.length === 0){

        box.innerHTML =
        "<p>No orders available.</p>";

        return;

    }



    orders.forEach(function(order,index){


        box.innerHTML += `

        <div class="product">

        <h3>
        🛒 Order #${order.id}
        </h3>


        <p>
        👤 Customer: ${order.customer}
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


        <button onclick="acceptOrder(${index})">
        ✅ Accept
        </button>


        <button onclick="shipOrder(${index})">
        🚚 Ship
        </button>


        <button onclick="completeOrderStatus(${index})">
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


    orders[index].status = "Shipped";


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    loadMerchantOrders();

}




function completeOrderStatus(index){

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    orders[index].status = "Completed";


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    loadMerchantOrders();

}
