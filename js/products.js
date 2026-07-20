// ================= PRODUCT SYSTEM =================


let merchantProducts =
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



    merchantProducts.push(product);



    localStorage.setItem(
        "merchantProducts",
        JSON.stringify(merchantProducts)
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



    products.forEach(function(product){


        box.innerHTML += `

        <div class="product">

        <h3>${product.name}</h3>

        <p>💰 Price: $${product.price}</p>

        <p>📂 Category: ${product.category}</p>

        <p>🏪 Seller: ${product.merchantName}</p>

        <button onclick="addToCart('${product.name}',${product.price},${product.stock})">
        🛒 Add To Cart
        </button>

        </div>

        `;


    });


}
