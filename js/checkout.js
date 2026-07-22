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

// ================= COMPLETE ORDER =================

function completeOrder(){

let user =
JSON.parse(localStorage.getItem("user"));

let name =
document.getElementById("customerName").value.trim();

let email =
document.getElementById("customerEmail").value.trim();

let address =
document.getElementById("customerAddress").value.trim();


if(!name || !email || !address){

alert("Please complete customer information");

return;

}


if(cart.length === 0){

alert("Your cart is empty");

return;

}



let total = 0;


cart.forEach(function(item){

total += Number(item.price) * Number(item.quantity);

});



let order = {

id: Date.now(),

customer:
user ? user.name : name,

customerEmail:
user ? user.email : email,

address:address,

items:cart,

total:total,

status:"New",

shippingStatus:"Preparing",

trackingNumber:"Not assigned",

date:new Date().toLocaleString()

};



let orders =
JSON.parse(localStorage.getItem("orders")) || [];


orders.push(order);


localStorage.setItem(
"orders",
JSON.stringify(orders)
);


// Clear cart

cart = [];

localStorage.setItem(
"cart",
JSON.stringify(cart)
);



alert("Order completed successfully");


window.location.href =
"my-orders.html";


}// ================= COMPLETE ORDER =================

function completeOrder(){

let user =
JSON.parse(localStorage.getItem("user"));

let name =
document.getElementById("customerName").value.trim();

let email =
document.getElementById("customerEmail").value.trim();

let address =
document.getElementById("customerAddress").value.trim();


if(!name || !email || !address){

alert("Please complete customer information");

return;

}


if(cart.length === 0){

alert("Your cart is empty");

return;

}



let total = 0;


cart.forEach(function(item){

total += Number(item.price) * Number(item.quantity);

});



let order = {

id: Date.now(),

customer:
user ? user.name : name,

customerEmail:
user ? user.email : email,

address:address,

items:cart,

total:total,

status:"New",

shippingStatus:"Preparing",

trackingNumber:"Not assigned",

date:new Date().toLocaleString()

};



let orders =
JSON.parse(localStorage.getItem("orders")) || [];


orders.push(order);


localStorage.setItem(
"orders",
JSON.stringify(orders)
);


// Clear cart

cart = [];

localStorage.setItem(
"cart",
JSON.stringify(cart)
);



alert("Order completed successfully");


window.location.href =
"my-orders.html";


}
