alert("main.js connected");

document.addEventListener("DOMContentLoaded", function(){

    if(typeof updateCartCount === "function"){
        updateCartCount();
    }

    if(typeof updateWishlistCount === "function"){
        updateWishlistCount();
    }

});
