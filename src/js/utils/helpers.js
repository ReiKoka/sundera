"use strict";

import { getProducts } from "./../../services/getProducts";
import { renderProducts } from "./../renderProducts";
import { getProductById } from "./../../services/getProductById";
import { renderSingleProduct } from "../renderSingleProduct";
import { getLocation } from "../../services/getLocation";

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const initProducts = async (featured) => {
  const featuredProducts = await getProducts(featured);
  renderProducts(featuredProducts);
};

export const getProductIdAndPassToUrl = () => {
  const products = document.querySelectorAll(".img-container");
  products.forEach((product) => {
    product.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      if (id) {
        window.location.href = `/../../../singleProduct.html?id=${id}`;
      }
    });
  });
};

export const initSingleProduct = async () => {
  const product = await getProductById();
  document.title = product.title;
  renderSingleProduct(product);
};

export const getLocationData = async () => {
  try {
    const locationData = await getLocation();
    return locationData;
  } catch (error) {
    console.error("Error getting location:", error);
  }
};

export const location = await getLocationData();

export const calculateShipping = (value) => {
  return value * 0.1;
};

// Update Quantity
export const updateQuantity = () => {
  let quantitySelected = 1;
  const addOrRemoveButtons = document.querySelectorAll(".quantity-button");
  const quantityDisplay = document.querySelector(".quantity-display");

  const updateDisplay = () => {
    quantityDisplay.textContent = quantitySelected;
  };

  addOrRemoveButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      if (e.currentTarget.classList.contains("quantity-add")) {
        quantitySelected++;
      }

      if (e.currentTarget.classList.contains("quantity-remove")) {
        quantitySelected > 1 ? quantitySelected-- : (quantitySelected = 1);
      }

      updateDisplay();
    })
  );
  updateDisplay();
};
