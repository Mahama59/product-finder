alert("main.js connected");

document.addEventListener("DOMContentLoaded", function(){

    if(typeof updateCartCount === "function"){
        updateCartCount();
    }

    if(typeof updateWishlistCount === "function"){
        updateWishlistCount();
    }

});

function loadMyOrders(){

let box =
document.getElementById("myOrders");

if(!box) return;

let user =
JSON.parse(localStorage.getItem("user"));

let orders =
JSON.parse(localStorage.getItem("orders")) || [];

box.innerHTML = "";

let myOrders = orders.filter(function(order){

return order.customer === user.name;

});

if(myOrders.length === 0){

box.innerHTML =
"<p>You have no orders yet.</p>";

return;

}

myOrders.forEach(function(order){

box.innerHTML += `

<div class="product">

<h3>Order #${order.id}</h3>

<p>Total: $${order.total}</p>

<p>Status: ${order.status}</p>

<p>Date: ${order.date}</p>

</div>

`;

});

}
