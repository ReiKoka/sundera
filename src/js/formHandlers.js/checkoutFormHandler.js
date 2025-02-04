"use strict";

import { Notyf } from "notyf";
import { getCart } from "../cart/cartState";
import {
  calculateShipping,
  calculateSubtotal,
  calculateTotal,
} from "../utils/helpers";
import { createOrder } from "../../services/createOrder";

export const checkoutFormHandler = () => {
  const form = document.querySelector("form.checkout-form");
  const cart = getCart();
  const subtotal = calculateSubtotal(cart);
  const shipping = calculateShipping(cart);
  const total = calculateTotal(cart);

  console.log(subtotal, shipping, total);

  const notyf = new Notyf({
    position: { x: "center", y: "top" },
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(cart);
    const products = cart.map((item) => {
      return {
        title: item.product.title,
        quantity: item.quantity,
        color: item.color,
        totalPrice: item.product.price * item.quantity,
      };
    });

    const newOrder = { ...data, products, subtotal, shipping, total };
    console.log(newOrder);
    createOrder(newOrder);
    notyf.success(`New order created `);
    modal.style.display = "none";
    window.location.href = "/orders";
  });
};
