"use strict";

import { renderSingleReview } from "./renderSingleReview";
import { calculateAverage } from "../utils/helpersFunctions";

export const renderReviews = (product) => {
  const ratingsArr = product?.reviews?.map((review) => review.rating);
  const html = `
    <div class="reviews-container">
    <div class="title-and-rating">
      <h2 class="title">Reviews</h2>
      <div class="rating">
        <div class="star-rating-container"></div>
        <div class="star-rating-average">
          ${calculateAverage(ratingsArr).toFixed(2)}
        </div>
      </div>
      <div class="reviews-total">
        ${product.reviews.length} reviews
      </div>
    </div>

    <div class="comments-container">
      ${product.reviews.length ? product.reviews.map((review) => renderSingleReview(review)).join("") : `<p class="missing-reviews">This product does not have any reviews!</p>`}
    </div>
  </div
  `;

  return html;
};
