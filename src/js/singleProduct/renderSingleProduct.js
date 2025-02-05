"use strict";

import {
  addProductHandler,
  setupColorButtons,
  updateQuantityHandler,
} from "../utils/helpers.js";
import { renderStars } from "../renderStars.js";
import { renderDetails } from "./renderDetails.js";
import { renderCheckout } from "./renderCheckout.js";
import { renderReviews } from "./renderReviews.js";
import { renderImage } from "./renderImage.js";
import { renderButtons } from "./renderButtons.js";
import { initAddColorModal } from "../modals/initAddColorModal.js";
import { initDeleteProduct } from "../modals/initDeleteProduct.js";
import { initEditProductModal } from "../modals/initEditProductModal.js";

export const renderSingleProduct = (product) => {
  const productContainer = document.querySelector(".product-container");
  let selectedColor = product.colors[0].color;

  let selectedQuantity = 1;

  function updateSelectedQuantity(change, inStock) {
    const newQuantity = Math.max(
      1,
      Math.min(inStock, selectedQuantity + change)
    );
    selectedQuantity = newQuantity;
    return newQuantity;
  }

  productContainer.innerHTML = `
    ${renderButtons()}
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

  initAddColorModal(product);
  initDeleteProduct(product);
  initEditProductModal(product);
};
