// ================= PRODUCT SYSTEM =================


let allMerchantProducts =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



// ================= SAVE PRODUCT =================


function saveProduct(){

    let name =
    document.getElementById("productName").value;


    let price =
    document.getElementById("productPrice").value;


    let category =
    document.getElementById("productCategory").value;


    let description =
    document.getElementById("productDescription").value;


    let stock =
    Number(document.getElementById("productStock").value);
let image =
document.getElementById("imagePreview").src;


    if(!name || !price || !category || !stock){

        alert("Please complete all product information");
        return;

    }



    let merchant =
    JSON.parse(localStorage.getItem("merchant"));



    if(!merchant){

        alert("Please register as a merchant first");
        return;

    }

let product = {

    name: name,
    price: Number(price),
    category: category,
    description: description,
    stock: stock,
    image: image,
    status: "Pending",
    merchantName: merchant.name,
    merchantEmail: merchant.email

};


    



    allMerchantProducts.push(product);



    localStorage.setItem(
        "merchantProducts",
        JSON.stringify(allMerchantProducts)
    );



    alert("Product saved successfully");


    window.location.href="merchant-products.html";

}



// ================= LOAD MARKETPLACE PRODUCTS =================

// ================= LOAD MARKETPLACE PRODUCTS =================

function loadMarketplaceProducts(){

    let box =
    document.getElementById("merchantMarketplace");


    if(!box) return;


    let products =
    JSON.parse(localStorage.getItem("merchantProducts")) || [];


    box.innerHTML = "";


    let approvedProducts =
    products.filter(function(product){

        return product.status === "Approved";

    });



    if(approvedProducts.length === 0){

        box.innerHTML =
        "<p>No approved products available.</p>";

        return;

    }



    approvedProducts.forEach(function(product){


        box.innerHTML += `

        <div class="product">

        <h3>
        ${product.name}
        </h3>


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
        📦 Stock: ${product.stock}
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


        </div>

        `;


    });


}

function checkout(){

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

    let order = {
        id: Date.now(),
        customer: JSON.parse(localStorage.getItem("user"))?.name || "Guest",
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: "New",
        date: new Date().toLocaleString()
    };

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

    // Update cart display
    updateCartCount();

    alert("Order placed successfully!");

    window.location.href = "success.html";

}

// ================= COMPLETE ORDER =================

function completeOrder(){

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    let user =
    JSON.parse(localStorage.getItem("user")) || {name:"Guest"};


    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


    if(cart.length === 0){

        alert("Your cart is empty");
        return;

    }


  let order = {

    id: Date.now(),

    customer:
    JSON.parse(localStorage.getItem("user"))?.name || "Guest",

    items: cart,

    total:
    cart.reduce(
        (sum,item)=>sum + (item.price * item.quantity),
        0
    ),

    status:"New",

    date:new Date().toLocaleString()

};

    orders.push(order);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    // clear cart

    localStorage.removeItem("cart");


    alert("Order completed successfully");


    window.location.href="success.html";

}

// ================= PRODUCT VIEW =================

function viewProduct(name){

localStorage.setItem(
"selectedProduct",
name
);

window.location.href="product.html";

}

// ================= MARKETPLACE HOME =================

function loadHomepageProducts(){

let box =
document.getElementById("marketplaceProducts");

if(!box) return;

let products =
JSON.parse(localStorage.getItem("merchantProducts")) || [];

box.innerHTML = "";

let approvedProducts =
products.filter(function(product){

return product.status === "Approved";

});


if(approvedProducts.length === 0){

box.innerHTML =
"<p>No products available.</p>";

return;

}


approvedProducts.forEach(function(product){

box.innerHTML += `

<div class="product">

<h3>${product.name}</h3>

<p>💰 $${product.price}</p>

<p>📂 ${product.category}</p>

<p>🏪 ${product.merchantName}</p>

<button onclick="viewProduct('${product.name}')">
👀 View Details
</button>

<button onclick="addToCart(
'${product.name}',
${product.price},
${product.stock},
'${product.merchantEmail}',
'${product.merchantName}'
)">
🛒 Add To Cart
</button>

</div>

`;

});

}

function previewImage(event){

    let file = event.target.files[0];

    if(!file) return;

    let reader = new FileReader();

    reader.onload = function(e){

        document.getElementById("imagePreview").src =
        e.target.result;

    };

    reader.readAsDataURL(file);

}
