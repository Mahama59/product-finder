function loadMarketplaceProducts(){

alert("Marketplace function started");

let box = document.getElementById("merchantMarketplace");

if(!box){
alert("merchantMarketplace not found");
return;
}

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];

alert("Products: " + products.length);
