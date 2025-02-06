"use strict";
import { Notyf } from "notyf";

import { createOrEditProduct } from "./../../services/createOrEditProduct";
import { initSingleProduct } from "../utils/helperProducts";

export const addProductColorFormHandler = (product, modal) => {
  const form = document.querySelector(".form.add-color-form");
  const notyf = new Notyf({
    position: { x: "center", y: "top" },
  });

  form.addEventListener("submit", async (e) => {
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

    delete newProduct.reviews;

    try {
      await createOrEditProduct(newProduct, product.id);
      notyf.success("New color added successfully");
      modal.style.display = "none";
      await initSingleProduct();
    } catch (error) {
      console.error("Error adding new color:", error);
      notyf.error("Failed to add color");
    }
  });
};
