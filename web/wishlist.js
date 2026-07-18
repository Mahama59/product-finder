// ================= WISHLIST SYSTEM =================


let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];



// ADD TO WISHLIST

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



// UPDATE COUNT

function updateWishlistCount(){


let count =
document.getElementById("wishlistCount");


if(count){

count.innerText =
wishlist.length;

}


}



// VIEW WISHLIST

function viewWishlist(){


let box =
document.getElementById("wishlistList");


if(!box) return;



box.innerHTML="";



wishlist.forEach(function(item,index){


box.innerHTML += `

<div class="product">

<h3>
❤️ ${item}
</h3>


<button onclick="removeFromWishlist(${index})">

Remove

</button>


</div>

`;



});


}



// REMOVE ITEM

function removeFromWishlist(index){


wishlist.splice(index,1);



localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);



updateWishlistCount();


viewWishlist();


}



// LOAD WISHLIST PAGE

function loadWishlist(){


let box =
document.getElementById("wishlistItems");


if(!box) return;



if(wishlist.length===0){


box.innerHTML =
"<p>No wishlist items yet.</p>";


return;


}



box.innerHTML="";



wishlist.forEach(function(item,index){


box.innerHTML += `

<div class="product">

<h3>
❤️ ${item}
</h3>


<button onclick="removeFromWishlist(${index})">

❌ Remove

</button>


</div>

`;

});


}
