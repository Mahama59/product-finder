// ================= PRODUCT DETAILS SYSTEM =================


function loadProductDetails(){


let selectedProduct =
localStorage.getItem("selectedProduct");


let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



let product =
products.find(function(item){

return item.name === selectedProduct;

});



if(!product){

alert("Product not found");

return;

}



// Product information

document.getElementById("detailName").innerText =
product.name;


document.getElementById("detailPrice").innerText =
"💰 Price: $" + product.price;


document.getElementById("detailCategory").innerText =
"📂 Category: " + product.category;


document.getElementById("detailStock").innerText =
"📦 Stock: " + product.stock;


document.getElementById("detailDescription").innerText =
product.description || "No description available";



// Product image

let image =
document.getElementById("detailImage");


if(image && product.image){

image.src = product.image;

}



// Cart button

let cartButton =
document.getElementById("detailCartButton");


if(cartButton){

cartButton.onclick = function(){

addToCart(
product.name,
product.price,
product.stock,
product.merchantEmail,
product.merchantName
);

};

}



// Save seller

localStorage.setItem(
"selectedSeller",
product.merchantEmail
);


// Load reviews

loadReviews();

}



// ================= MESSAGE SELLER =================


function openChatWithSeller(){


let seller =
localStorage.getItem("selectedSeller");


if(!seller){

alert("Seller information unavailable");

return;

}


localStorage.setItem(
"messageSeller",
seller
);


window.location.href =
"customer-chat.html";

}



// ================= REVIEWS =================


function submitReview(){


let text =
document.getElementById("reviewText").value;


let rating =
document.getElementById("reviewRating").value;



let reviews =
JSON.parse(localStorage.getItem("productReviews")) || [];



reviews.push({

product:
localStorage.getItem("selectedProduct"),

text:text,

rating:rating,

date:new Date().toLocaleDateString()

});



localStorage.setItem(
"productReviews",
JSON.stringify(reviews)
);



alert("Review submitted ⭐");


loadReviews();

}




function loadReviews(){


let box =
document.getElementById("productReviews");


if(!box) return;



let reviews =
JSON.parse(localStorage.getItem("productReviews")) || [];



box.innerHTML="";



reviews.forEach(function(review){


if(review.product === localStorage.getItem("selectedProduct")){


box.innerHTML += `

<div class="product">

⭐ ${review.rating}/5

<p>${review.text}</p>

<small>${review.date}</small>

</div>

`;

}


});


}
