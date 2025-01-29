"use strict";

import { URL } from "../js/utils/constants.js";

//prettier-ignore
export const getProductsWithParams = async (category = "", sort = "" ) => {
  let productsUrl;

  if (!category || category === 'all') {
    productsUrl = `${URL}/products?_embed=reviews&${sort ? `_sort=${sort}` : ''}`;
  } else {
    productsUrl = `${URL}/products?_embed=reviews&category=${category}&${sort ? `_sort=${sort}` : ''}`;
  }



  console.log(productsUrl)

  try {
    const response = await fetch(`${productsUrl}`);
    if (!response.ok) throw new Error(`Failed to get featured products!`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
