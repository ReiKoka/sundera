"use strict";

import { getProductsWithParams } from "../../services/getProductsWithParams";
import { renderProducts } from "../products/renderProducts";

// Format currency to $x.yy
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

// Returns an obj with main and fractional. Purely for styling purposes. Made this into a function to be reused everywhere
export const formatAndSplitPrice = (price) => {
  const formattedPrice = formatCurrency(price);
  const [main, fraction] = formattedPrice.split(".");
  return { main, fraction };
};

// Calculate review average for given arr
export const calculateAverage = (ratingsArr) => {
  return ratingsArr && ratingsArr.length > 0
    ? ratingsArr.reduce((acc, curr) => acc + curr, 0) / ratingsArr.length
    : 0;
};


export const updateQuantityHandler = (updateQuantity, price) => {
  const addOrRemoveButtons = document.querySelectorAll(".quantity-button");
  const quantityDisplay = document.querySelector(".quantity-display");
  const totalValue = document.querySelector(".total-value");

  addOrRemoveButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let currentQuantity = Number(quantityDisplay.textContent);
      const inStockEl = document.querySelector(".stock-display");
      const inStock = Number(inStockEl.textContent.split(" ")[0]);

      if (e.currentTarget.classList.contains("quantity-add")) {
        if (currentQuantity >= inStock) return;
        const newQuantity = updateQuantity(1, inStock);
        quantityDisplay.textContent = newQuantity;
      }

      if (e.currentTarget.classList.contains("quantity-remove")) {
        if (currentQuantity <= 1) return;
        const newQuantity = updateQuantity(-1, inStock);
        quantityDisplay.textContent = newQuantity;
      }

      // Update total price
      const formattedTotalPrice = formatAndSplitPrice(
        Number(quantityDisplay.textContent) * price
      );
      const { main: totalMainPrice, fraction: totalFractionalPrice } =
        formattedTotalPrice;
      totalValue.innerHTML = `<span>${totalMainPrice}</span>.<span>${totalFractionalPrice}</span>`;
    });
  });
};

// Calculate Subtotal for given arr
export const calculateSubtotal = (arr) => {
  return arr
    ?.map((item) => item.product.price * item.quantity)
    ?.reduce((acc, curr) => acc + curr, 0);
};

// Calculate Shipping for given arr
export const calculateShipping = (arr) => {
  if (calculateSubtotal(arr) < 30) return calculateSubtotal(arr) * 0.2;

  if (calculateSubtotal(arr) >= 30 && calculateSubtotal(arr) < 70)
    return calculateSubtotal(arr) * 0.1;

  if (calculateSubtotal(arr) >= 70 && calculateSubtotal(arr) < 120)
    return calculateSubtotal(arr) * 0.05;

  if (calculateSubtotal(arr) >= 120) return 0.0;
};

// Calculate Total for given arr
export const calculateTotal = (arr) => {
  return calculateSubtotal(arr) + calculateShipping(arr);
};

// Capitalize First Letter for a given string
export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const updateURLAndFetch = (newParams) => {
  console.log(newParams);
  const url = new URL(window.location.href);
  Object.keys(newParams).forEach((key) => {
    if (newParams[key]) {
      url.searchParams.set(key, newParams[key]);
    }
  });

  window.history.pushState({}, "", url);
  const params = Object.fromEntries(url.searchParams.entries());

  if (params.category === "all" && params.sort === "id") return;
  getProductsWithParams(params.category, params.sort)
    .then((data) => {
      renderProducts(data);
    })
    .catch((err) => console.error(err));
};

export const convertRgbToHex = (rgbString) => {
  const rgbValues = rgbString.match(/\d+/g).map(Number);
  return `#${rgbValues
    .map((val) => val.toString(16).padStart(2, "0"))
    .join("")}`;
};
