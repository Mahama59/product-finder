// ================= REVIEW SYSTEM =================


// SUBMIT REVIEW

function submitReview(){

let product =
JSON.parse(localStorage.getItem("selectedProduct"));


let text =
document.getElementById("reviewText")?.value;


let rating =
Number(document.getElementById("reviewRating")?.value);



if(!product){

alert("No product selected");

return;

}



if(!text){

alert("Write a review first");

return;

}



let reviews =
JSON.parse(localStorage.getItem("reviews")) || {};



if(!reviews[product.name]){

reviews[product.name] = [];

}



reviews[product.name].push({

text:text,

rating:rating,

user:
JSON.parse(localStorage.getItem("user"))?.name || "Guest",

date:
new Date().toLocaleDateString()

});



localStorage.setItem(
"reviews",
JSON.stringify(reviews)
);



alert("Review submitted ⭐");



document.getElementById("reviewText").value="";


loadReviews(product.name);


}




// LOAD REVIEWS

function loadReviews(productName){


let box =
document.getElementById("productReviews");


let ratingBox =
document.getElementById("averageRating");



if(!box) return;



let reviews =
JSON.parse(localStorage.getItem("reviews")) || {};



let list =
reviews[productName] || [];



if(list.length===0){


box.innerHTML =
"<p>No reviews yet.</p>";


if(ratingBox){

ratingBox.innerText =
"⭐ No rating";

}


return;


}



let total = 0;



list.forEach(function(review){

total += Number(review.rating);

});



let average =
(total / list.length).toFixed(1);



if(ratingBox){

ratingBox.innerText =
"⭐ Average Rating: " + average + "/5";

}



box.innerHTML="";



list.forEach(function(review){


box.innerHTML += `

<div class="product">

<h4>
👤 ${review.user}
</h4>


<p>
${"⭐".repeat(review.rating)}
</p>


<p>
${review.text}
</p>


<small>
${review.date}
</small>


</div>

`;

});


}
