"use strict";

import { createOrEditProduct } from "../services/createOrEditProduct";
import { renderProducts } from './renderProducts';

export const addFormHandler = () => {
  const form = document.querySelector(".add-product-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form) return;

    const formData = new FormData(form);
    const productData = Object.fromEntries(formData.entries());

    const featured = false;
    const soldAllTime = 0;
    const price = Number(productData.price);
    const inStock = Number(productData.inStock);
    const colors = [{ color: productData.color, inStock }];

    delete productData.color;
    delete productData.inStock;

    const newProduct = {
      ...productData,
      featured,
      soldAllTime,
      price,
      colors,
    };

    console.log(newProduct);
    createOrEditProduct(newProduct);

    renderProducts(products)
  });
};
