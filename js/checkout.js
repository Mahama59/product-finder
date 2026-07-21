// ================= LOAD CHECKOUT =================

function loadCheckout(){

let box =
document.getElementById("checkoutItems");

let totalBox =
document.getElementById("checkoutTotal");


if(!box || !totalBox) return;


let cart =
JSON.parse(localStorage.getItem("cart")) || [];


box.innerHTML="";


if(cart.length === 0){

box.innerHTML =
"<p>Your cart is empty.</p>";

totalBox.innerText = 0;

return;

}


let total = 0;


cart.forEach(function(item){


let subtotal =
Number(item.price) * Number(item.quantity);


total += subtotal;


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
Subtotal: $${subtotal}
</p>

</div>

`;

});


totalBox.innerText = total;


}


// ================= COMPLETE ORDER =================


function completeOrder(){

let cart =
JSON.parse(localStorage.getItem("cart")) || [];


if(cart.length === 0){

alert("Cart is empty");

return;

}


let customerName =
document.getElementById("customerName").value;


let customerEmail =
document.getElementById("customerEmail").value;


if(!customerName || !customerEmail){

alert("Please enter customer information");

return;

}



let orders =
JSON.parse(localStorage.getItem("orders")) || [];



let order = {

id: Date.now(),

customer: customerName,

email: customerEmail,

items: cart,

total: cart.reduce(function(sum,item){

return sum +
(Number(item.price) * Number(item.quantity));

},0),

status:"New",

shippingStatus:"Preparing",

trackingNumber:"Not assigned",

date:new Date().toLocaleString()

};



orders.push(order);



localStorage.setItem(
"orders",
JSON.stringify(orders)
);



localStorage.removeItem("cart");



alert("Order completed successfully");


window.location.href="orders.html";


}
