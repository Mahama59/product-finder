// ================= PRODUCT FINDER PRODUCT SYSTEM =================


// SEARCH PRODUCTS

function searchProducts(){

    let input =
    document.getElementById("searchInput")
    .value
    .toLowerCase();



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



// LOAD MARKETPLACE PRODUCTS

function loadMarketplaceProducts(){


    let box =
    document.getElementById("merchantMarketplace");


    if(!box) return;



    let products =
    JSON.parse(localStorage.getItem("merchantProducts")) || [];



    let approvedProducts =
    products.filter(
    product => product.status === "Approved"
    );



    if(approvedProducts.length === 0){


        box.innerHTML =
        "<p>No approved products available.</p>";

        return;

    }



    box.innerHTML="";



    approvedProducts.forEach(function(product){



        box.innerHTML += `

        <div class="product"
        data-category="${product.category}">


        <img 
        src="${product.image || 
        'https://via.placeholder.com/200'}"
        width="200">


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
        ${product.description}
        </p>


        <p>
        📦 Stock: ${product.stock}
        </p>



        <button onclick='openProduct(${JSON.stringify(product)})'>

        👁 View Details

        </button>



        <button onclick="addToCart('${product.name}',${product.price},${product.stock})">

        🛒 Add To Cart

        </button>


        </div>

        `;


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
    item => item.name !== product.name
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




// LOAD RECENT PRODUCTS

function loadRecentProducts(){


    let box =
    document.getElementById("recentProducts");


    if(!box) return;



    let recent =
    JSON.parse(localStorage.getItem("recentProducts")) || [];



    if(recent.length===0){


        box.innerHTML =
        "<p>No recently viewed products.</p>";

        return;

    }



    box.innerHTML="";



    recent.forEach(function(product){


        box.innerHTML += `

        <div class="product">


        <img src="${product.image || 
        'https://via.placeholder.com/200'}"
        width="150">


        <h3>
        ${product.name}
        </h3>


        <p>
        💰 $${product.price}
        </p>



        <button onclick='openProduct(${JSON.stringify(product)})'>

        View Again

        </button>


        </div>

        `;


    });


}




// LOAD WHEN PAGE OPENS

document.addEventListener(
"DOMContentLoaded",
function(){

    loadMarketplaceProducts();

    loadRecentProducts();

});
