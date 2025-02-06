"use strict";

import { getCart } from "../cart/cartState";

// Update CartItems Count - DOM
export const updateCartItemsCount = () => {
  const cartItemsNumber = document.querySelector(".cart-items-number");
  if (cartItemsNumber) {
    cartItemsNumber.textContent = getCartItemsNumber();
  }
};

// Get Cart Items Number
export const getCartItemsNumber = () => {
  return getCart()
    .map((item) => item.quantity)
    .reduce((acc, curr) => acc + curr, 0);
};

