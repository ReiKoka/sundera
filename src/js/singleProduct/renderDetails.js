"use strict";

import { calculateAverage, formatCurrency } from "../utils/helpers";

export const renderDetails = (product) => {
  const formattedPrice = formatCurrency(product?.price);
  const [mainPrice, fractionalPrice] = formattedPrice.split(".");
  const ratingsArr = product?.reviews?.map((review) => review.rating);

  const colorButtonsHTML = product.colors
    .map(
      (color, index) =>
        `<button class="btn ${
          index === 0 ? "focused" : ""
        }" style="background-color: ${color};"></button>`
    )
    .join("");

  const html = `
    <div class="details-container">
          <div class="title-company">
            <h2 class="title">${product.title}</h2>
            <h3 class="company">${product.company}</h3>
          </div>
          <div class="rating">
            <div class="star-rating-container"></div>
            <div class="star-rating-average">${calculateAverage(
              ratingsArr
            ).toFixed(2)}</div>
            <div class="rating-total">${product.reviews.length} reviews | ${
    product.soldAllTime
  } sold</div>
          </div>
    
          <p class="price"><span>${mainPrice}</span>.<span>${fractionalPrice}</span></p>
    
          <div class="description">
            <p class="description-title">Description</p>
            <p class="description-text">${product.description}</p>
          </div>
    
          <div class="colors-container">
            <div class="colors">
              <p class="colors-title">Colors</p>
              <div class="colors-buttons">
                ${colorButtonsHTML}
              </div>
            </div>

            <button type="button" class="btn add-new-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
              </svg>
              <span>Add new colors</span>
            </button>
          </div>
        </div>
  `;

  return html;
};
