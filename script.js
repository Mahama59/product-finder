let cart = JSON.parse(localStorage.getItem("cart")) || [];

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


function addToCart(productName, productPrice) {

    cart.push({
        name: productName,
        price: productPrice
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    let count = document.getElementById("cartCount");
    if (count) {
        count.innerText = cart.length;
    }

    alert(productName + " added to cart!");

}
function registerUser(){

    let name = document.getElementById("registerName").value;
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;

    if(name === "" || email === "" || password === ""){

        alert("Please fill all fields");

    } else {

        let user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration successful!");

        window.location.href = "login.html";

    }

}
function loginUser(){

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if(user === null){

        alert("No account found. Please register first.");

    } else if(email === user.email && password === user.password){

        alert("Login successful!");

        localStorage.setItem("loggedIn", "true");

        window.location.href = "index.html";

    } else {

        alert("Incorrect email or password.");

    }

}
document.addEventListener("DOMContentLoaded", function () {

    let welcome = document.getElementById("welcomeUser");

    if (welcome) {

        let user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            welcome.innerText = "👋 Welcome, " + user.name;
        }

    }

});
function logoutUser(){

    localStorage.removeItem("loggedIn");

    alert("You have been logged out.");

    window.location.href = "login.html";

}
function viewCart() {

    let cartList = document.getElementById("cartList");

    if (!cartList) return;

    if (cart.length === 0) {

        cartList.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        cartList.innerHTML = "<h3>Your Cart</h3>";

        cart.forEach(function(item, index) {

            cartList.innerHTML +=
                "<p>🛒 " + item.name + " - $" + item.price +
                " <button onclick='removeFromCart(" + index + ")'>Remove</button></p>";

        });

    }

}
function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    let count = document.getElementById("cartCount");
    if (count) {
        count.innerText = cart.length;
    }

    viewCart();

}
document.addEventListener("DOMContentLoaded", function () {

    let count = document.getElementById("cartCount");

    if (count) {
        count.innerText = cart.length;
    }

});
// Wishlist
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function addToWishlist(productName) {

    if (wishlist.includes(productName)) {
        alert(productName + " is already in your wishlist!");
        return;
    }

    wishlist.push(productName);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    let count = document.getElementById("wishlistCount");
    if (count) {
        count.innerText = wishlist.length;
    }

    alert(productName + " added to your wishlist!");
}

function viewWishlist() {

    let wishlistList = document.getElementById("wishlistList");

    if (!wishlistList) return;

    if (wishlist.length === 0) {

        wishlistList.innerHTML = "<p>Your wishlist is empty.</p>";

    } else {

        wishlistList.innerHTML = "<h3>❤️ Your Wishlist</h3>";

        wishlist.forEach(function(item, index) {

            wishlistList.innerHTML +=
                "<p>❤️ " + item +
                " <button onclick='removeFromWishlist(" + index + ")'>Remove</button></p>";

        });

    }

}

function removeFromWishlist(index) {

    wishlist.splice(index, 1);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    let count = document.getElementById("wishlistCount");
    if (count) {
        count.innerText = wishlist.length;
    }

    viewWishlist();

}

function completeOrder(){

    localStorage.removeItem("cart");

    alert("Order completed successfully!");

    window.location.href = "success.html";

}
let compareList = JSON.parse(localStorage.getItem("compare")) || [];


function addToCompare(name, price, category){

    if(compareList.length >= 3){

        alert("You can compare only 3 products at a time.");

        return;

    }


    let exists = compareList.find(product => product.name === name);


    if(exists){

        alert(name + " is already in comparison.");

        return;

    }


    compareList.push({
        name:name,
        price:price,
        category:category
    });


    localStorage.setItem("compare", JSON.stringify(compareList));


    alert(name + " added to comparison ⚖️");

}
function loadCompare(){

    let compareDiv = document.getElementById("compareList");

    if(!compareDiv) return;


    let compareList = JSON.parse(localStorage.getItem("compare")) || [];


    if(compareList.length === 0){

        compareDiv.innerHTML = "<p>No products selected for comparison.</p>";

        return;

    }


    compareDiv.innerHTML = `
    <h2>⚖️ Product Comparison</h2>

    <table border="1">

    <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Category</th>
    </tr>
    `;


    compareList.forEach(function(product){

        compareDiv.innerHTML += `

        <tr>

        <td>${product.name}</td>

        <td>$${product.price}</td>

        <td>${product.category}</td>

        </tr>

        `;

    });


    compareDiv.innerHTML += "</table>";

        }
