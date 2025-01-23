"use strict";

import {
  calculateShipping,
  formatCurrency,
  location,
  updateQuantity,
} from "./utils/helpers.js";
import { renderModal } from "./renderModal.js";

export const renderSingleProduct = (product) => {
  const productContainer = document.querySelector(".product-container");
  const formattedPrice = formatCurrency(product?.price);
  const [mainPrice, fractionalPrice] = formattedPrice.split(".");
  const formattedShipping = product.freeShipping
    ? "0.00"
    : formatCurrency(calculateShipping(product.price));
  const [mainShipping, fractionalShipping] = formattedShipping.split(".");
  let quantityNumber = 1;

  productContainer.innerHTML = `
    <div class="img-container">
      <img src="${product.image}" alt="" class="img" />
    </div>

    <div class="details-container">
      <div class="title-company">
        <h2 class="title">${product.title}</h2>
        <h3 class="company">${product.company}</h3>
      </div>

      <p class="price"><span>${mainPrice}</span>.<span>${fractionalPrice}</span></p>

      <div class="description">
        <p class="description-title">Description</p>
        <p class="description-text">${product.description}</p>
      </div>

      <div class="colors">
        <p class="colors-title">Colors</p>
        <div class="colors-buttons">
          <button class="btn"></button>
          <button class="btn"></button>
        </div>
      </div>
    </div>

    <div class="checkout-container">
      <h2 class="title">Checkout</h2>
      <p class="checkout-p">Sold By<span>${product.company}</span></p>
      <div class="checkout-p ship-to">Deliver to 
        <p id="modalBtn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <span>${location?.country}</span>
        </p>
      </div>

      <div class="checkout-p">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
          <p>Shipping</p>
        </div>
          
        <div>
          <span>${mainShipping}</span>.<span>${fractionalShipping}</span>
        </div>
      </div>

      <div class="checkout-p">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
          <p>Quantity</p>
        </div>
        <div class="quantity-controls">
          <button class="quantity-button quantity-remove">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
          <p class="quantity-display">${quantityNumber}</p>
          <button class="quantity-button quantity-add">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>

        </div>
      </div>

    <div class="modal" id="modal">
      ${renderModal("Deliver To")}
    </div>

  `;

  // Select Colour Buttons
  const buttons = productContainer.querySelectorAll(".colors-buttons .btn");
  buttons?.forEach(
    (button, i) => (button.style.backgroundColor = `${product.colors[i]}`)
  );

  // Open Modal to select shipping country
  const deliverToButton = document.querySelector("#modalBtn");
  const modal = document.querySelector("#modal");
  const modalBox = document.querySelector(".modal-box");

  deliverToButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalBox) {
      modal.style.display = "none";
    }
  });

  updateQuantity();
};
