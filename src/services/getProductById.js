"use strict";

import { URL } from "../js/utils/constants.js";

export const getProductById = async (paramId) => {
  const id = paramId || window.location.href.split("?id=")[1];
  try {
    const response = await fetch(`${URL}/products/${id}?_embed=reviews`);
    if (!response.ok) throw new Error(`Failed to get product with `);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
