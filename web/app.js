// ================= PRODUCT FINDER APP =================

console.log("Product Finder App Started");


document.addEventListener(
"DOMContentLoaded",
function(){

console.log("Page Loaded Successfully");

loadMarketplaceProducts();

});



// ================= LOAD MERCHANT PRODUCTS =================

function loadMarketplaceProducts(){

let box = document.getElementById("merchantMarketplace");

if(!box){
alert("merchantMarketplace not found");
return;
}

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];

alert("Products found: " + products.length);

box.innerHTML = "";

products.forEach(function(product){

alert(product.name + " | " + product.status);

// Rest of your code...
