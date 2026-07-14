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


function addToCart(productName) {

    cart.push(productName);

    localStorage.setItem("cart", JSON.stringify(cart));

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
