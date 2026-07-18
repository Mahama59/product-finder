// ================= PRODUCT FINDER CART SYSTEM =================


let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ADD PRODUCT TO CART

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



// UPDATE CART NUMBER

function updateCartCount(){

    let count =
    document.getElementById("cartCount");


    if(count){

        count.innerText = cart.length;

    }

}



// VIEW CART

function viewCart(){

    let box =
    document.getElementById("cartList");


    if(!box) return;



    if(cart.length === 0){

        box.innerHTML =
        "<p>Your cart is empty.</p>";

        return;

    }



    box.innerHTML="";



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



// REMOVE FROM CART

function removeFromCart(index){


    cart.splice(index,1);



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    viewCart();


}



// LOAD CART COUNT

document.addEventListener(
"DOMContentLoaded",
function(){

    updateCartCount();

});
