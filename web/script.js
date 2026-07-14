function searchProducts() {

    let input = document.getElementById("searchInput").value.toLowerCase();

    let products = document.getElementsByClassName("product");

    for (let i = 0; i < products.length; i++) {

        let productText = products[i].innerText.toLowerCase();

        if (productText.includes(input)) {
            products[i].style.display = "block";
        } else {
            products[i].style.display = "none";
        }

    }

}
