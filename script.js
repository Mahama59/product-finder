
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


function addToCart(productName) {

    cart.push(productName);

    alert(productName + " added to cart!");

    console.log(cart);

}
