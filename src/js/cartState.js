"use strict";

import { getCart, setCart } from "./cart";

export const addToCart = (product, quantity = 1) => {
  let cart = getCart();

  const existingProductIndex = cart.findIndex(
    (item) => item.product.id === product.id
  );

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    cart.push({ product: product, quantity: quantity });
  }

  setCart(cart);

  console.log(cart);
};
