"use strict";

import { Notyf } from "notyf";
import { createOrEditProduct } from "../../services/createOrEditProduct";
import { initProducts } from "../utils/helpers";

export const addProductFormHandler = (modal) => {
  const form = document.querySelector(".form.add-product-form");
  const notyf = new Notyf({
    position: { x: "center", y: "top" },
  });

  form.addEventListener("submit", async (e) => {
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

    try {
      await createOrEditProduct(newProduct);
      notyf.success("New product added successfully");
      modal.style.display = "none";
      await initProducts();
    } catch (error) {
      console.error("Error creating product:", error);
      notyf.error("Failed to add product");
    }
  });
};
