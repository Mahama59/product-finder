let cart = [];


function searchProducts() {

    let input = document.querySelector("input").value.toLowerCase();

    let products = document.querySelectorAll(".product");

    products.forEach(function(product) {

        let text = product.innerText.toLowerCase();

        if (text.includes(input)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

}
function filterCategory(category) {

    let products = document.querySelectorAll(".product");

    products.forEach(function(product) {

        let productCategory = product.getAttribute("data-category");

        if (category === "all" || productCategory === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

}


function addToCart(productName) {

    cart.push(productName);

    document.getElementById("cartCount").innerText = cart.length;

    alert(productName + " added to cart!");

}



function viewCart() {

    let cartList = document.getElementById("cartList");

    if (cart.length === 0) {

        cartList.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        cartList.innerHTML = "<h3>Your Cart</h3>";

        cart.forEach(function(item) {

            cartList.innerHTML += "<p>🛒 " + item + "</p>";

        });

    }

}
