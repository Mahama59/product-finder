// ================= PRODUCT FINDER PART 1 =================


// ================= CART =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function searchProducts(){

    let input =
    document.getElementById("searchInput").value.toLowerCase();


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



function addToCart(name,price,stock){


    if(Number(stock)<=0){

        alert("Product out of stock");

        return;

    }



    let existing =
    cart.find(item=>item.name===name);



    if(existing){

        if(existing.quantity < stock){

            existing.quantity++;

        }else{

            alert("Maximum stock reached");

            return;

        }

    }else{


        cart.push({

            name:name,

            price:Number(price),

            quantity:1,

            stock:Number(stock)

        });

    }



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(name+" added to cart");


}




function updateCartCount(){

    let count =
    document.getElementById("cartCount");


    if(count){

        count.innerText = cart.length;

    }

}



function viewCart(){

    let box =
    document.getElementById("cartList");


    if(!box) return;



    if(cart.length===0){

        box.innerHTML =
        "<p>Your cart is empty</p>";

        return;

    }



    box.innerHTML="";



    cart.forEach(function(item,index){


        let total =
        item.price * item.quantity;



        box.innerHTML += `

        <div class="product">

        <h3>${item.name}</h3>

        <p>
        Price: $${item.price}
        </p>

        <p>
        Quantity: ${item.quantity}
        </p>

        <p>
        Subtotal: $${total}
        </p>


        <button onclick="removeFromCart(${index})">
        Remove
        </button>

        </div>

        `;


    });

}



function removeFromCart(index){

    cart.splice(index,1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();

    viewCart();

}



// ================= USER SYSTEM =================


function registerUser(){


let name =
document.getElementById("registerName").value;


let email =
document.getElementById("registerEmail").value;


let password =
document.getElementById("registerPassword").value;



if(!name || !email || !password){

alert("Fill all fields");

return;

}



let user={

name:name,

email:email,

password:password

};



localStorage.setItem(
"user",
JSON.stringify(user)
);



alert("Registration successful");


window.location.href="login.html";


}





function loginUser(){


let email =
document.getElementById("loginEmail").value;


let password =
document.getElementById("loginPassword").value;



let user =
JSON.parse(localStorage.getItem("user"));



if(!user){

alert("Register first");

return;

}



if(email===user.email && password===user.password){


localStorage.setItem(
"loggedIn",
"true"
);


alert("Login successful");


window.location.href="index.html";


}else{


alert("Wrong login details");


}



}



function logoutUser(){

localStorage.removeItem("loggedIn");

window.location.href="login.html";

}



// ================= WISHLIST =================


let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];



function addToWishlist(name){


if(wishlist.includes(name)){

alert("Already in wishlist");

return;

}


wishlist.push(name);


localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);


updateWishlistCount();


alert(name+" added ❤️");


}




function updateWishlistCount(){


let count =
document.getElementById("wishlistCount");


if(count){

count.innerText =
wishlist.length;

}


}




function viewWishlist(){

let box =
document.getElementById("wishlistList");


if(!box) return;



box.innerHTML="";



wishlist.forEach(function(item,index){


box.innerHTML += `

<p>
❤️ ${item}

<button onclick="removeFromWishlist(${index})">
Remove
</button>

</p>

`;

});


}



function removeFromWishlist(index){

wishlist.splice(index,1);


localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);


viewWishlist();

updateWishlistCount();

}



// ================= COMPARE =================


let compareList =
JSON.parse(localStorage.getItem("compare")) || [];



function addToCompare(name,price
// ================= MERCHANT SYSTEM PART 2 =================


let merchantProducts =
JSON.parse(localStorage.getItem("merchantProducts")) || [];



// ================= MERCHANT REGISTER =================


function registerMerchant(){


let name =
document.getElementById("merchantName").value;


let email =
document.getElementById("merchantEmail").value;


let phone =
document.getElementById("merchantPhone").value;



if(!name || !email || !phone){

alert("Please fill all fields");

return;

}



let merchant = {

name:name,

email:email,

phone:phone

};



localStorage.setItem(
"merchant",
JSON.stringify(merchant)
);



alert("Merchant registered successfully");


window.location.href="merchant-dashboard.html";


}



// ================= MERCHANT LOGIN =================


function merchantLogin(){


let email =
document.getElementById("merchantEmail").value;


let phone =
document.getElementById("merchantPhone").value;



let merchant =
JSON.parse(localStorage.getItem("merchant"));



if(!merchant){

alert("Please register first");

return;

}



if(email===merchant.email && phone===merchant.phone){


localStorage.setItem(
"merchantLoggedIn",
"true"
);



alert("Login successful");


window.location.href="merchant-dashboard.html";


}else{


alert("Incorrect details");


}


}



// ================= ADD PRODUCT =================


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



let imageInput =
document.getElementById("productImage");



if(!name || !price || !category || !stock){

alert("Complete product information");

return;

}



let product = {


name:name,

price:Number(price),

category:category,

description:description,

stock:stock,

image:"",

status:"Pending"


};



if(imageInput.files[0]){


let reader = new FileReader();


reader.onload=function(e){


product.image=e.target.result;


merchantProducts.push(product);


localStorage.setItem(
"merchantProducts",
JSON.stringify(merchantProducts)
);



alert("Product added");


window.location.href="merchant-products.html";


};



reader.readAsDataURL(
imageInput.files[0]
);



}else{


merchantProducts.push(product);


localStorage.setItem(
"merchantProducts",
JSON.stringify(merchantProducts)
);



alert("Product added");


window.location.href="merchant-products.html";


}



}



// ================= SHOW MERCHANT PRODUCTS =================


function loadMerchantProducts(){


let box =
document.getElementById("merchantProductsList");


if(!box) return;



box.innerHTML="";



merchantProducts.forEach(function(product,index){



let status="";


if(product.stock<=0){

status="🔴 Out of stock";

}
else if(product.stock<=5){

status="🟡 Low stock";

}
else{

status="🟢 Available";

}



box.innerHTML += `


<div class="product">


<h3>${product.name}</h3>


<p>
💰 $${product.price}
</p>


<p>
📂
