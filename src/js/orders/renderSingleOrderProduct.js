"use strict";

import { formatCurrency } from "../utils/helpers";

export const renderSingleOrderProduct = (product) => {
  const { id, title, quantity, color, pricePerOne, totalPrice, image } =
    product;

  const html = `
    <div class="order-single-product">
      <div class="image-container">
        <img src="${image}" alt="${title}" />
      </div>
      <div class="grid-pad title-container">
        <a href="/singleProduct.html?id=${id}">${title}</a>
        <div class="price-quantity">
          <p><span>Quantity</span> <span>${quantity}</span></p>
          <p><span>Price/Item</span> <span>${formatCurrency(
            pricePerOne
          )}</span></p>
        </div>
      </div>
      <div class="grid-pad color">
        <p>
          <span>Color</span>
          <span style="background-color: ${color}"></span>
        </p>
      </div>
      <div class="grid-pad total-price">
        <p>
          <span>Total price</span>
          <span>${formatCurrency(totalPrice)}</span>
        </p>

        <button type="button" class="btn btn-leave-review">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
          <span>Leave a review</span>
        </button>
      </div>
      
    </div>
  `;

  return html;
};
