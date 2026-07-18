// ================= ORDERS SYSTEM =================


// COMPLETE ORDER

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



let total =
cart.reduce(function(sum,item){

return sum + 
(Number(item.price) * Number(item.quantity || 1));

},0);



let orders =
JSON.parse(localStorage.getItem("orders")) || [];



let order = {

id:Date.now(),

customerName:customerName,

customerEmail:customerEmail,

customerAddress:customerAddress,

paymentMethod:paymentMethod,

items:cart,

total:total,

status:"Pending",

shippingStatus:"Preparing",

date:new Date().toLocaleString()

};



orders.push(order);



localStorage.setItem(
"orders",
JSON.stringify(orders)
);



localStorage.removeItem("cart");


alert("Order placed successfully");


window.location.href="success.html";


}




// CUSTOMER ORDERS

function loadCustomerOrders(){


let box =
document.getElementById("myOrders");


if(!box) return;



let orders =
JSON.parse(localStorage.getItem("orders")) || [];



if(orders.length===0){

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
Total: $${order.total}
</p>


<p>
Status:
${order.status}
</p>


<p>
Date:
${order.date}
</p>


<button onclick="viewOrderDetails(${index})">

View Details

</button>


</div>

`;

});


}




// VIEW ORDER DETAILS

function viewOrderDetails(index){


let orders =
JSON.parse(localStorage.getItem("orders")) || [];


let order =
orders[index];


if(!order) return;



alert(
"Order Total: $" + order.total +
"\nStatus: " + order.status
);


}
