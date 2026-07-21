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


let myOrders =
orders.filter(function(order){

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

<h3>
🛒 Order #${order.id}
</h3>


<p>
💰 Total: $${order.total}
</p>


<p>
📦 Status:
${order.status}
</p>


<p>
🚚 Shipping:
${order.shippingStatus || "Preparing"}
</p>


<p>
🔎 Tracking:
${order.trackingNumber || "Not assigned"}
</p>


<h4>
Products:
</h4>


${order.items.map(function(item){

return `

<p>
${item.name} x ${item.quantity}
</p>

`;

}).join("")}


</div>

`;

});


}
// ================= PAYSTACK PAYMENT =================

function payWithPaystack(){

let email =
document.getElementById("customerEmail").value;


let total =
Number(document.getElementById("checkoutTotal").innerText);



if(!email){

alert("Please enter your email");

return;

}


if(total <= 0){

alert("Your cart is empty");

return;

}



let handler = PaystackPop.setup({

key: "pk_test_f4ae21eeec7c8ae8c3d3764b03b9f67967fc2a0d",

email: email,

amount: total * 100,

currency: "GHS",


callback: function(response){


alert("Payment successful. Reference: " + response.reference);


completeOrder();


},


onClose: function(){

alert("Payment cancelled");

}


});


handler.openIframe();

}

function checkOrders(){

let orders =
JSON.parse(localStorage.getItem("orders")) || [];

alert(JSON.stringify(orders));

}
