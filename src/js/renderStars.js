"use strict";

import StarRating from "@romua1d/star-rating-js";
import { calculateAverage } from "./utils/helpersFunctions";

export const renderStars = (container, productOrReview) => {
  const starRating = container.querySelector(".star-rating-container");

  let avgOrReview;

  if (Array.isArray(productOrReview?.reviews)) {
    const ratingsArr = productOrReview.reviews.map((review) => review.rating);
    avgOrReview = calculateAverage(ratingsArr);
  } else if (typeof productOrReview?.rating === "number") {
    avgOrReview = productOrReview.rating;
  } else {
    console.error("Invalid product or review format.");
    return;
  }

  const options = {
    currentRating: Math.round(avgOrReview),
    disabled: true,
    message: avgOrReview.toFixed(2),
  };

  const StarRatingInstance = new StarRating(starRating, options);
};
