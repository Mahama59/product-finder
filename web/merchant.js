// ================= MERCHANT SYSTEM =================


// REGISTER MERCHANT

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
phone:phone

};


localStorage.setItem(
"merchant",
JSON.stringify(merchant)
);


alert("Merchant registration successful");


window.location.href =
"merchant-dashboard.html";

}



// MERCHANT LOGIN

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


window.location.href =
"merchant-dashboard.html";


}else{


alert("Incorrect merchant details");


}


}



// SAVE PRODUCT

function saveProduct(){


let name =
document.getElementById("productName").value;


let price =
Number(document.getElementById("productPrice").value);


let category =
document.getElementById("productCategory").value;


let description =
document.getElementById("productDescription").value;


let stock =
Number(document.getElementById("productStock").value);



if(!name || !price || !category || !stock){

alert("Complete product information");

return;

}



let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



let product = {

name:name,

price:price,

category:category,

description:description,

stock:stock,

status:"Pending",

image:""

};



products.push(product);



localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);



alert("Product saved");


window.location.href =
"merchant-products.html";


}



// LOAD MERCHANT PRODUCTS

function loadMerchantProducts(){


let box =
document.getElementById("merchantProductsList");


if(!box) return;



let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



box.innerHTML="";



products.forEach(function(product,index){


box.innerHTML += `

<div class="product">

<h3>${product.name}</h3>

<p>Price: $${product.price}</p>

<p>Stock: ${product.stock}</p>

<p>Status: ${product.status}</p>


<button onclick="deleteProduct(${index})">

Delete

</button>


</div>

`;

});


}



// DELETE PRODUCT

function deleteProduct(index){


let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


products.splice(index,1);



localStorage.setItem(
"merchantProducts",
JSON.stringify(products)
);



loadMerchantProducts();


alert("Product deleted");


}
