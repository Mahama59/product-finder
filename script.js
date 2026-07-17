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

            product.style.display = "block";

        }else{

            product.style.display = "none";

        }

    });

}



function addToCart(name, price, stock){

    stock = Number(stock);


    if(stock <= 0){

        alert("Product is out of stock");

        return;

    }


    let existing =
    cart.find(item => item.name === name);



    if(existing){

        if(existing.quantity < stock){

            existing.quantity++;

        }else{

            alert("Maximum quantity reached");

            return;

        }


    }else{


        cart.push({

            name:name,

            price:Number(price),

            stock:stock,

            quantity:1

        });


    }



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(name + " added to cart");

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



    if(cart.length === 0){

        box.innerHTML =
        "<p>Your cart is empty.</p>";

        return;

    }



    box.innerHTML = "";



    cart.forEach(function(item,index){


        let subtotal =
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
        Total: $${subtotal}
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

alert("Please fill all fields");

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
