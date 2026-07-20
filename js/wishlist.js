// ================= WISHLIST SYSTEM =================

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


    alert(name + " added ❤️");

}




function updateWishlistCount(){

    let count =
    document.getElementById("wishlistCount");


    if(count){

        count.innerText = wishlist.length;

    }

}




function viewWishlist(){

    let box =
    document.getElementById("wishlistList");


    if(!box) return;


    box.innerHTML="";


    if(wishlist.length === 0){

        box.innerHTML="<p>No wishlist items</p>";
        return;

    }



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



    updateWishlistCount();


    viewWishlist();

}
