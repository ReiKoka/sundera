"use strict";

import StarRating from "@romua1d/star-rating-js";
import { formatCurrency } from "../utils/helpers";

export const renderProducts = (products) => {
  const productsContainer = document.querySelector(
    ".featured-products-container"
  );

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <div class="img-container">
        <img src="${product?.image}" alt="${product?.title}" />
      </div>
      <div class="product-info">
        <h3 class="product-title">${product?.title}</h3>
        <div class="star-rating-container"></div>
        <p class="price">${formatCurrency(product?.price)}</p>
      </div>
  `;
    productsContainer.appendChild(productCard);
    const starRating = productCard.querySelector(".star-rating-container");

    const ratingsArr = product?.reviews?.map((review) => review.rating);
    const avg =
      ratingsArr && ratingsArr.length > 0
        ? ratingsArr.reduce((acc, curr) => acc + curr, 0) / ratingsArr.length
        : 0;
    console.log(avg)
    const options = {
      currentRating: Math.round(avg),
      starsColor: "#0084ff",
      disabled: true,
    };

    const StarRatingInstance = new StarRating(starRating, options);
  });
};
