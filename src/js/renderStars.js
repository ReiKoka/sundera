"use strict";

import StarRating from "@romua1d/star-rating-js";
import { calculateAverage } from "./utils/helpers";

export const renderStars = (container, product) => {
  const starRating = container.querySelector(".star-rating-container");

  const ratingsArr = product?.reviews?.map((review) => review.rating);
  const avg = calculateAverage(ratingsArr);

  const options = {
    currentRating: Math.round(avg),
    starsColor: "#000000",
    disabled: true,
    message: avg.toFixed(2),
  };

  const StarRatingInstance = new StarRating(starRating, options);
};
