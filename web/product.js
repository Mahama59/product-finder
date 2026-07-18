// ================= PRODUCT SYSTEM =================


// SEARCH PRODUCTS

function searchProducts(){

let input =
document.getElementById("searchInput").value.toLowerCase();


let products =
document.querySelectorAll(".product");


products.forEach(function(product){

let text =
product.innerText.toLowerCase();


if(text.includes(input)){

product.style.display="block";

}else{

product.style.display="none";

}

});

}



// OPEN PRODUCT DETAILS

function openProduct(product){


localStorage.setItem(
"selectedProduct",
JSON.stringify(product)
);


let recent =
JSON.parse(localStorage.getItem("recentProducts")) || [];


recent =
recent.filter(
item=>item.name !== product.name
);


recent.unshift(product);


if(recent.length > 5){

recent.pop();

}


localStorage.setItem(
"recentProducts",
JSON.stringify(recent)
);


window.location.href =
"product-details.html";


}




// LOAD PRODUCT DETAILS

function loadProductDetails(){


let product =
JSON.parse(localStorage.getItem("selectedProduct"));


if(!product) return;



let name =
document.getElementById("detailName");


if(name){

name.innerText =
product.name;

}


let price =
document.getElementById("detailPrice");


if(price){

price.innerText =
"💰 Price: $" + product.price;

}


let image =
document.getElementById("detailImage");


if(image){

image.src =
product.image ||
"https://via.placeholder.com/300";

}


let description =
document.getElementById("detailDescription");


if(description){

description.innerText =
product.description;

}


}
