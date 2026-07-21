// ================= PRODUCT DETAILS SYSTEM =================


function loadProductDetails(){


let productName =
localStorage.getItem("selectedProduct");


let box =
document.getElementById("productDetails");


if(!box) return;



let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



let product =
products.find(function(item){

return item.name === productName;

});



if(!product){

box.innerHTML =
"<p>Product not found.</p>";

return;

}



box.innerHTML = `

<div class="product">


<h1>
${product.name}
</h1>


<p>
💰 Price: $${product.price}
</p>


<p>
📂 Category: ${product.category}
</p>


<p>
🏪 Seller: ${product.merchantName}
</p>


<p>
📦 Stock Available: ${product.stock}
</p>


<p>
${product.description || ""}
</p>



<button onclick="addToCart(
'${product.name}',
${product.price},
${product.stock},
'${product.merchantEmail}',
'${product.merchantName}'
)">

🛒 Add To Cart

</button>



<button onclick="addToCompare(
'${product.name}',
${product.price},
'${product.category}'
)">

⚖️ Compare

</button>



<button onclick="addToWishlist(
'${product.name}'
)">

❤️ Favorite

</button>


<button onclick="messageSeller(
'${product.merchantEmail}'
)">

💬 Message Seller

</button>


</div>

`;

}



// ================= MESSAGE SELLER =================


function messageSeller(email){


localStorage.setItem(
"messageSeller",
email
);


window.location.href =
"customer-chat.html";


}
