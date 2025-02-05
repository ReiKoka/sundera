"use strict";
import { URL } from "../js/utils/constants";

export const createReview = async (review) => {
  try {
    const response = await fetch(`${URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) throw new Error("Failed to add new order");

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
