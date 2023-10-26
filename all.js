// Get the element by its class name
const element = document.querySelector('.head-name');

// Add the "blink" class to make the text blink
element.classList.add('blink');


window.addEventListener('scroll', function () {
  let scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (window.pageYOffset > 180) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

document.getElementById('scrollToTopBtn').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});



let stars = document.querySelectorAll(".ratings span");
let products = document.querySelectorAll(".ratings");
let ratings = [];

for (let star of stars) {
  star.addEventListener("click", function () {

    let children = star.parentElement.children;
    for (let child of children) {
      if (child.getAttribute("data-clicked")) {
        return false;
      }
    }

    this.setAttribute("data-clicked", "true");
    let rating = this.dataset.rating;
    let productId = this.parentElement.dataset.productid;
    let data = {
      "rating": rating,
      "product-id": productId,
    }
    ratings.push(data);
    localStorage.setItem("rating", JSON.stringify(ratings));
  });
}

if (localStorage.getItem("rating")) {
  ratings = JSON.parse(localStorage.getItem("rating"));
  for (let rating of ratings) {
    for (let product of products) {
      if (product.dataset.productid == rating["product-id"]) {
        let reverse = Array.from(product.children).reverse();
        let index = parseInt(rating["rating"]) - 1;
        reverse[index].setAttribute("data-clicked", "true");
      }
    }
  }
}

// Calculate and display the average rating
function calculateAverageRating() {
  let totalRatings = ratings.length;
  let sum = 0;

  for (let rating of ratings) {
    sum += parseInt(rating.rating);
  }

  let averageRating = sum / totalRatings;
  // Round the average rating to one decimal place
  averageRating = averageRating.toFixed(1);

  // Display the average rating on your website
  let averageRatingElement = document.getElementById("average-rating");
  averageRatingElement.innerText = `میانگین نظرات: ${averageRating}`;
  averageRatingElement.style.fontFamily = "Vazirmatn";
}

// Event listener for when a star is clicked
for (let star of stars) {
  star.addEventListener("click", function () {
    // Your existing code here...

    // Calculate and display the average rating after a rating is added
    calculateAverageRating();
  });
}

// Load ratings from local storage and display them
if (localStorage.getItem("rating")) {
  ratings = JSON.parse(localStorage.getItem("rating"));

  // Your existing code here...

  // Calculate and display the average rating on page load
  calculateAverageRating();
}