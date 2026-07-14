let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.addEventListener("DOMContentLoaded", function() {

    let count = document.getElementById("cartCount");

    if (count) {
        count.innerText = cart.length;
    }

});

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


function addToCart(productName, productPrice) {

    cart.push({
        name: productName,
        price: productPrice
    });

    localStorage.setItem("cart", JSON.stringify(cart));

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

            cartList.innerHTML += "<p>🛒 " + item.name + " - $" + item.price + "</p>";

        });

    }

}


function showPaymentDetails() {

    let payment = document.getElementById("paymentMethod").value;

    let momo = document.getElementById("momoDetails");

    if (payment === "momo") {

        momo.style.display = "block";

    } else {

        momo.style.display = "none";

    }

}



function loadCheckoutCart() {

    let checkoutItems = document.getElementById("checkoutItems");

    let savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    if (savedCart.length === 0) {

        checkoutItems.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        checkoutItems.innerHTML = "<h3>Products:</h3>";

        savedCart.forEach(function(item) {

            checkoutItems.innerHTML += "<p>🛒 " + item.name + " - $" + item.price + "</p>";

            total += item.price;

        });

        checkoutItems.innerHTML += 
        "<h3>Total: $" + total + "</h3>";

    }

}
