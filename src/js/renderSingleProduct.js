"use strict";

import { updateQuantity } from "./utils/helpers.js";
import { renderStars } from "./renderStars.js";
import { renderDetails } from "./singleProduct/renderDetails";
import { renderCheckout } from "./singleProduct/renderCheckout.js";
import { renderReviews } from "./singleProduct/renderReviews.js";

export const renderSingleProduct = (product) => {
  const productContainer = document.querySelector(".product-container");

  productContainer.innerHTML = `
    <div class="img-container">
      <img src="${product.image}" alt="" class="img" />
    </div>
    ${renderDetails(product)}
    ${renderCheckout(product)}
    ${renderReviews(product)}
  `;

  const buttons = productContainer.querySelectorAll(".colors-buttons .btn");
  const deliverToButton = document.querySelector("#modalBtn");
  const modal = document.querySelector("#modal");
  const modalBox = document.querySelector(".modal-box");
  const reviewsContainer = document.querySelector(".reviews-container");
  const commentsContainer = document.querySelector(".comments-container");


  // Select Colour Buttons
  buttons?.forEach((button, i) => {
    button.style.backgroundColor = `${product.colors[i]}`;

    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("focused"));
      button.classList.add("focused");
    });
  });

  // Modal Controls to select shipping country and close modal
  deliverToButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalBox) {
      modal.style.display = "none";
    }
  });

  
  renderStars(productContainer, product);
  renderStars(reviewsContainer, product);

  
  product.reviews.forEach((review, index) => {
    const reviewElement = commentsContainer.querySelectorAll(".review")[index];
    const ratingsContainer = reviewElement.querySelector(".ratings-comments");
    renderStars(ratingsContainer, review);
  });

  updateQuantity();
};
