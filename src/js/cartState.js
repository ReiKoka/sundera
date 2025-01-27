"use strict";

export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const setCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

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
