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
    ${renderImage(product)}
    ${renderDetails(product)}
    ${renderCheckout(product)}
    ${renderReviews(product)}
  `;

  const colorButtons = document.querySelectorAll(".colors-buttons .btn");

  const handleColorSelect = (color) => {
    selectedColor = color;
    return selectedColor;
  };

  setupColorButtons(colorButtons, product, handleColorSelect);

  const modal = document.querySelector("#modal");
  const modalBox = document.querySelector(".modal-box");
  const reviewsContainer = document.querySelector(".reviews-container");
  const commentsContainer = document.querySelector(".comments-container");

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

  updateQuantityHandler(updateSelectedQuantity);
  addProductHandler(
    [product],
    () => selectedQuantity,
    () => selectedColor
  );
};
