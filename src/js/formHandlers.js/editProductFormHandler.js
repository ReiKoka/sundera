"use strict";

import { Notyf } from "notyf";
import { createOrEditProduct } from "../../services/createOrEditProduct";
import { initSingleProduct } from "../utils/helperProducts";

export const editProductFormHandler = (product, modal) => {
  const form = document.querySelector(".form.edit-product-form");
  const notyf = new Notyf({
    position: { x: "center", y: "top" },
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const productData = Object.fromEntries(formData.entries());

    const soldAllTime = product.soldAllTime;
    const featured = productData.featured === "on";
    const price = Number(productData.price);
    const inStock = Number(productData.inStock);

    const updatedColors = product.colors.map((c) =>
      c.color.toLocaleLowerCase() === productData.color.toLocaleLowerCase()
        ? { ...c, inStock }
        : c
    );

    product.colors.map((c) =>
      c.color === productData.color ? { ...c, inStock } : c
    );

    delete productData.color;
    delete productData.inStock;

    const updatedProduct = {
      ...productData,
      featured,
      soldAllTime,
      price,
      colors: updatedColors,
    };

    try {
      await createOrEditProduct(updatedProduct, product.id);
      notyf.success("Product updated");
      modal.style.display = "none";
      await initSingleProduct();
    } catch (error) {
      console.error("Error editing product:", error);
      notyf.error("Failed to edit product");
    }
  });
};
