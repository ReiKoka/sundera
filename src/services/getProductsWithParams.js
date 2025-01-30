"use strict";

import { URL } from "../js/utils/constants.js";

//prettier-ignore
export const getProductsWithParams = async (category = "", sort = "" ) => {
  let productsUrl;

  if ((!category || category === 'all') && (!sort || sort === 'id')) {
    productsUrl = `${URL}/products?_embed=reviews`;
  } else if (!category || category === 'all') {
    productsUrl = `${URL}/products?_embed=reviews&${sort ? `_sort=${sort}` : ''}`;
  } else if (!sort || sort === 'id') {
    productsUrl = `${URL}/products?_embed=reviews&category=${category}`;
  } else {
    productsUrl = `${URL}/products?_embed=reviews&category=${category}&_sort=${sort}`;
  }

  try {
    const response = await fetch(`${productsUrl}`);
    if (!response.ok) throw new Error(`Failed to get featured products!`);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
