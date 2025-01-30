"use strict";

import {
  addProductHandler,
  setupColorButtons,
  updateQuantityHandler,
} from "./utils/helpers.js";
import { renderStars } from "./renderStars.js";
import { renderDetails } from "./singleProduct/renderDetails";
import { renderCheckout } from "./singleProduct/renderCheckout.js";
import { renderReviews } from "./singleProduct/renderReviews.js";
import { renderImage } from "./singleProduct/renderImage.js";

export const renderSingleProduct = (product) => {
  const productContainer = document.querySelector(".product-container");
  let selectedColor = product.colors[0].color;

  let selectedQuantity = 1;

  function updateSelectedQuantity(change) {
    selectedQuantity = Math.max(1, selectedQuantity + change);
    return selectedQuantity;
  }

  productContainer.innerHTML = `
    <button type="button" class="navigate-back">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      <span>Back to products</span>
    </button>
    ${renderImage(product)}
    ${renderDetails(product)}
    ${renderCheckout(product, selectedQuantity, product.price)}
    ${renderReviews(product)}
  `;

  const colorButtons = document.querySelectorAll(".colors-buttons .btn");

  const handleColorSelect = (color) => {
    selectedColor = color;
    return selectedColor;
  };

  setupColorButtons(colorButtons, product, handleColorSelect);

  const reviewsContainer = document.querySelector(".reviews-container");
  const commentsContainer = document.querySelector(".comments-container");
  const backButton = document.querySelector(".navigate-back");

  renderStars(productContainer, product);
  renderStars(reviewsContainer, product);

  product.reviews.forEach((review, index) => {
    const reviewElement = commentsContainer.querySelectorAll(".review")[index];
    const ratingsContainer = reviewElement.querySelector(".ratings-comments");
    renderStars(ratingsContainer, review);
  });

  updateQuantityHandler(updateSelectedQuantity, product.price);
  addProductHandler(
    [product],
    () => selectedQuantity,
    () => selectedColor
  );

  backButton.addEventListener("click", () => {
    window.history.back();
  });
};
