"use strict";

import { calculateAverage, formatCurrency } from "../utils/helpers";

export const renderDetails = (product) => {
  const formattedPrice = formatCurrency(product?.price);
  const [mainPrice, fractionalPrice] = formattedPrice.split(".");
  const ratingsArr = product?.reviews?.map((review) => review.rating);

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
    
          <div class="colors">
            <p class="colors-title">Colors</p>
            <div class="colors-buttons">
              <button class="btn focused"></button>
              <button class="btn"></button>
            </div>
          </div>
        </div>
  `;

  return html;
};
