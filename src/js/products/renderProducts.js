"use strict";

import { formatCurrency } from "../utils/helpersFunctions";
import { renderStars } from "../renderStars";
import { initAddProductModal } from "../modals/initAddProductModal";
import {
  addProductHandler,
  getProductIdAndPassToUrl,
} from "../utils/helperProducts";

export const renderProducts = (products) => {
  const productsContainer = document.querySelector(
    ".featured-products-container"
  );

  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    const formattedPrice = formatCurrency(product?.price);
    const [mainPrice, fractionalPrice] = formattedPrice.split(".");

    productCard.innerHTML = `
      <div class="img-container" data-id="${product.id}">
        <img src="${product?.image}" alt="${product?.title}" />
      </div>
      <div class="product-info">
        <h3 class="product-title">${product?.title}</h3>
        <div class="star-rating-container"></div>
        <div class="checkout">
        <p class="price"><span>${mainPrice}</span>.<span>${fractionalPrice}</span></p>
        <button type="button" class="add-to-cart" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          <span>Add to cart</span>
        </button>
        </div>
      </div>
  `;
    productsContainer.appendChild(productCard);
    renderStars(productCard, product);
  });

  if (window.location.href.toString().includes("/products"))
    initAddProductModal();
  getProductIdAndPassToUrl();
  addProductHandler(products, () => 1);
};
