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

        name:name,
        price:Number(price),
        category:category,
        description:description,
        stock:stock,
        status:"Pending",
        merchantName:merchant.name,
        merchantEmail:merchant.email

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


function loadMarketplaceProducts(){

    let box =
    document.getElementById("merchantMarketplace");


    if(!box) return;



    let products =
    JSON.parse(localStorage.getItem("merchantProducts")) || [];



    box.innerHTML="";



   products .filter(function(product){     return product.status === "Approved"; }) .forEach(function(product){


        box.innerHTML += `

        <div class="product">

        <h3>${product.name}</h3>

        <p>💰 Price: $${product.price}</p>

        <p>📂 Category: ${product.category}</p>

        <p>🏪 Seller: ${product.merchantName}</p>

        <button onclick="addToCart('${product.name}',${product.price},${product.stock},'${product.merchantEmail}','${product.merchantName}')">
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
