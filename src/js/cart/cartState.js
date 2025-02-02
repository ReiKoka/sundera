"use strict";

export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const setCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product, quantity = 1, color) => {
  let cart = getCart();

  const existingProductIndex = cart.findIndex(
    (item) => item.product.id === product.id && item.color === color
  );

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    cart.push({ product: product, quantity: quantity, color });
  }

  setCart(cart);

  console.log(cart);
};


export const clearCart = () => {
  setCart([]);
};
