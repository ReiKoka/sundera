"use strict";
import { URL } from "../js/utils/constants";

export const createOrEditProduct = async (product, productId) => {
  let response;
  try {
    response = await fetch(
      `${URL}/products${productId ? `/${productId}` : ""}`,
      {
        method: `${productId ? "PUT" : "POST"}`,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );

    if (!response.ok) throw new Error("Failed to add new product");

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
