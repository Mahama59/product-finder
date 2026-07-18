// ================= PAYMENT SYSTEM =================


// PAYSTACK PAYMENT

function payWithPaystack(){


let cart =
JSON.parse(localStorage.getItem("cart")) || [];



if(cart.length === 0){

alert("Your cart is empty");

return;

}



let total =
cart.reduce(function(sum,item){

return sum +
(Number(item.price) * Number(item.quantity || 1));

},0);



let email =
document.getElementById("customerEmail")?.value;



if(!email){

alert("Please enter your email");

return;

}



let handler =
PaystackPop.setup({


key:
"pk_test_f4ae21eeec7c8ae8c3d3764b03b9f67967fc2a0d",


email:email,


amount:
total * 100,


currency:
"GHS",



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
