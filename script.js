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

function completeOrder() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let order = {
        id: Date.now(),
        items: cart,
        total: cart.reduce((sum, item) => sum + Number(item.price), 0),
        date: new Date().toLocaleString(),
        status: "Pending"
    };

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

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
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];


function addReview(){

    let input = document.getElementById("reviewInput");

    if(!input) return;


    let review = input.value;


    if(review === ""){

        alert("Please write a review.");

        return;

    }


    reviews.push(review);


    localStorage.setItem("reviews", JSON.stringify(reviews));


    input.value = "";


    displayReviews();


    alert("Review added successfully ⭐");

}



function displayReviews(){

    let reviewList = document.getElementById("reviewList");


    if(!reviewList) return;


    reviewList.innerHTML = "<h3>Customer Reviews</h3>";


    reviews.forEach(function(review){

        reviewList.innerHTML +=

        "<p>💬 " + review + "</p>";

    });

}



document.addEventListener("DOMContentLoaded", function(){

    displayReviews();

});
function registerMerchant() {

    let name = document.getElementById("merchantName").value;
    let email = document.getElementById("merchantEmail").value;
    let phone = document.getElementById("merchantPhone").value;

    if (name === "" || email === "" || phone === "") {

        alert("Please fill all fields.");
        return;

    }

    let merchant = {
        name: name,
        email: email,
        phone: phone
    };

    localStorage.setItem("merchant", JSON.stringify(merchant));

    alert("Merchant registration successful!");

    window.location.href = "merchant-dashboard.html";

}
let merchantProducts = JSON.parse(localStorage.getItem("merchantProducts")) || [];

function saveProduct() {

    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;
    let category = document.getElementById("productCategory").value;
    let description = document.getElementById("productDescription").value;
    let image = document.getElementById("productImage").value;
    if (name === "" || price === "" || category === "" || description === "") {

        alert("Please fill all fields.");
        return;

    }

    let product = {
    name: name,
    price: price,
    category: category,
    description: description,
    image: image,
    rating: 5
};
    merchantProducts.push(product);

    localStorage.setItem("merchantProducts", JSON.stringify(merchantProducts));

    alert("Product added successfully!");

    window.location.href = "merchant-products.html";

}
function loadMarketplaceProducts() {

    let container = document.getElementById("merchantMarketplace");

    if (!container) return;

    let products = JSON.parse(localStorage.getItem("merchantProducts")) || [];

    container.innerHTML = "";

    if (products.length === 0) {

        container.innerHTML = "<p>No merchant products available yet.</p>";
        return;

    }

    products.forEach(function(product) {

        container.innerHTML += `
            <div class="product">
<img src="${product.image}" alt="${product.name}" width="200">
                <h3>${product.name}</h3>
<p>⭐⭐⭐⭐⭐ (${product.rating}/5)</p>
                <p><strong>Price:</strong> $${product.price}</p>

                <p><strong>Category:</strong> ${product.category}</p>

                <p>${product.description}</p>

                <button onclick="addToCart('${product.name}', ${product.price})">
                    🛒 Add to Cart
                </button>

                <button onclick="addToWishlist('${product.name}')">
                    ❤️ Favorite
                </button>

                <button onclick="addToCompare('${product.name}', ${product.price}, '${product.category}')">
                    ⚖️ Compare
                </button>

            </div>
        `;

    });

}
function deleteProduct(index) {

    merchantProducts.splice(index, 1);

    localStorage.setItem("merchantProducts", JSON.stringify(merchantProducts));

    loadMerchantProducts();

}
function loadMerchantProducts() {

    let container = document.getElementById("merchantProductsList");

    if (!container) return;

    container.innerHTML = "";

    merchantProducts.forEach(function(product, index) {

        container.innerHTML += `
        <div class="product">

            <h3>${product.name}</h3>

            <p>$${product.price}</p>

            <p>${product.category}</p>

            <button onclick="deleteProduct(${index})">
                🗑 Delete
            </button>

        </div>
        `;

    });

}
function loadDashboard() {

    let products = JSON.parse(localStorage.getItem("merchantProducts")) || [];
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let compare = JSON.parse(localStorage.getItem("compare")) || [];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let totalProducts = document.getElementById("totalProducts");
    let totalOrders = document.getElementById("totalOrders");
    let totalWishlist = document.getElementById("totalWishlist");
    let totalCompare = document.getElementById("totalCompare");

    if (totalProducts) totalProducts.innerText = products.length;
    if (totalOrders) totalOrders.innerText = orders.length;
    if (totalWishlist) totalWishlist.innerText = wishlist.length;
    if (totalCompare) totalCompare.innerText = compare.length;

}
function loadCheckoutCart() {

    let checkoutItems = document.getElementById("checkoutItems");

    if (!checkoutItems) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;

    checkoutItems.innerHTML = "<h3>Your Order</h3>";

    cart.forEach(function(item) {

        checkoutItems.innerHTML +=
            "<p>🛒 " + item.name + " - $" + item.price + "</p>";

        total += Number(item.price);

    });

    checkoutItems.innerHTML +=
        "<hr><h3>Total: $" + total + "</h3>";

}
function showPaymentDetails(){

    let payment = document.getElementById("paymentMethod").value;

    let momo = document.getElementById("momoDetails");

    if(payment === "momo"){

        momo.style.display = "block";

    } else {

        momo.style.display = "none";

    }

}
function loadMyOrders() {

    let container = document.getElementById("myOrders");

    if (!container) return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        container.innerHTML = "<h2>No orders yet.</h2>";
        return;
    }

    container.innerHTML = "";

    orders.forEach(function(order, index) {

        let progress = 25;

        if (order.status === "Processing") progress = 50;
        if (order.status === "Shipped") progress = 75;
        if (order.status === "Delivered") progress = 100;

        container.innerHTML += `
        <div class="product">

            <h3>Order #${index + 1}</h3>

            <p><strong>Total:</strong> $${order.total}</p>

            <p><strong>Status:</strong> ${order.status}</p>

            <progress value="${progress}" max="100"></progress>

        </div>
        `;

    });

}
function submitRating() {

    let rating = document.getElementById("ratingValue").value;

    alert("Thank you! You rated this product " + rating + " stars.");

}
function submitRating(productName) {

    let rating = Number(document.getElementById("ratingValue").value);

    let ratings = JSON.parse(localStorage.getItem("ratings")) || {};

    if (!ratings[productName]) {
        ratings[productName] = [];
    }

    ratings[productName].push(rating);

    localStorage.setItem("ratings", JSON.stringify(ratings));

    alert("Thank you! You rated " + productName + " " + rating + " stars.");
function getAverageRating(productName) {

    let ratings = JSON.parse(localStorage.getItem("ratings")) || {};

    if (!ratings[productName] || ratings[productName].length === 0) {
        return "No ratings yet";
    }

    let total = ratings[productName].reduce((sum, value) => sum + value, 0);

    let average = total / ratings[productName].length;

    return average.toFixed(1) + "/5 ⭐ (" + ratings[productName].length + " reviews)";
}
}
let ratings = JSON.parse(localStorage.getItem("ratings")) || {};


function submitRating(productName){

    let rating = document.getElementById("ratingValue").value;


    if(!ratings[productName]){

        ratings[productName] = [];

    }


    ratings[productName].push(Number(rating));


    localStorage.setItem(
        "ratings",
        JSON.stringify(ratings)
    );


    alert("Thank you for rating ⭐");


    loadRating(productName);

}



function loadRating(productName){

    let box = document.getElementById("productRating");


    if(!box) return;


    let productRatings = ratings[productName] || [];


    if(productRatings.length === 0){

        box.innerHTML = "No ratings yet.";

        return;

    }


    let total = productRatings.reduce(
        (a,b)=>a+b,0
    );


    let average = total / productRatings.length;


    box.innerHTML =
    "⭐".repeat(Math.round(average)) +
    " (" + average.toFixed(1) + "/5 from " +
    productRatings.length +
    " customers)";

}



document.addEventListener(
"DOMContentLoaded",
function(){

    loadRating("Smartphone");

});
