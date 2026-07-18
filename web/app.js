// ================= PRODUCT FINDER APP =================

console.log("Product Finder App Started");


document.addEventListener(
"DOMContentLoaded",
function(){

    console.log("Page Loaded Successfully");

});
function loadMarketplaceProducts(){

let box = document.getElementById("merchantMarketplace");

if(!box) return;


let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];


box.innerHTML="";


products.forEach(function(product){


if(product.status !== "Approved"){
return;
}


box.innerHTML += `

<div class="product">

<img src="${product.image}" width="200">


<h3>${product.name}</h3>

<p>
Price: $${product.price}
</p>


<p>
Category: ${product.category}
</p>


<p>
${product.description}
</p>


<p>
Stock: ${product.stock}
</p>


<button onclick="addToCart('${product.name}',${product.price},${product.stock})">

🛒 Add To Cart

</button>


<a href="product.html">

<button>
View Details
</button>

</a>


</div>

`;

});


}
