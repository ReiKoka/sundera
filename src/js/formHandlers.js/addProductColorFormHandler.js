"use strict";
import { initSingleProduct } from "../utils/helpers";
import { createOrEditProduct } from "./../../services/createOrEditProduct";

export const addProductColorFormHandler = (product, modal) => {
  const form = document.querySelector(".form.add-color-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form) return;

    let newProduct;

    const formData = new FormData(form);
    const productData = Object.fromEntries(formData.entries());
    const newColor = { ...productData, inStock: Number(productData.inStock) };

    const existingColor = product.colors.find(
      (c) => c.color === newColor.color
    );
    if (existingColor) {
      existingColor.inStock += newColor.inStock;
      newProduct = { ...product };
    } else {
      newProduct = { ...product, colors: [...product.colors, newColor] };
    }

    createOrEditProduct(newProduct, product.id);
    modal.style.display = "none";
    initSingleProduct();
  });
};
