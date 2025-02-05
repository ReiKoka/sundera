"use strict";

import { Notyf } from "notyf";
import { clearCart, getCart } from "../cart/cartState";
import {
  calculateShipping,
  calculateSubtotal,
  calculateTotal,
  updateCartItemsCount,
  updateDomOnCartClearance,
} from "../utils/helpers";
import { createOrder } from "../../services/createOrder";
import { getProductById } from "../../services/getProductById";
import { createOrEditProduct } from "../../services/createOrEditProduct";
import { renderCart } from "../cart/renderCart";

export const checkoutFormHandler = () => {
  const form = document.querySelector("form.checkout-form");
  const cart = getCart();
  const subtotal = calculateSubtotal(cart);
  const shipping = calculateShipping(cart);
  const total = calculateTotal(cart);

  const notyf = new Notyf({
    position: { x: "center", y: "top" },
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const products = cart.map((item) => {
      return {
        id: item.product.id,
        title: item.product.title,
        quantity: item.quantity,
        color: item.color,
        pricePerOne: item.product.price,
        totalPrice: item.product.price * item.quantity,
        image: item.product.image,
      };
    });

    const newOrder = { ...data, products, subtotal, shipping, total };
    createOrder(newOrder);
    notyf.success(`New order created `);

    const updatedProducts = new Map();

    for (const item of cart) {
      const { product, color, quantity } = item;
      console.log(product.id);
      console.log(
        `Updating stock for Product ID: ${product.id}, Color: ${color}, Quantity: ${quantity}`
      );

      if (!updatedProducts.has(product.id)) {
        const latestProduct = await getProductById(product.id);
        updatedProducts.set(product.id, {
          ...latestProduct,
          colors: [...latestProduct.colors],
        });
      }

      const updatedProduct = updatedProducts.get(product.id);

      updatedProduct.colors = updatedProduct.colors.map((c) =>
        c.color === color
          ? { ...c, inStock: Math.max(0, c.inStock - quantity) }
          : c
      );

      updatedProducts.set(product.id, updatedProduct);
    }

    for (const updatedProduct of updatedProducts.values()) {
      await createOrEditProduct(updatedProduct, updatedProduct.id);
    }

    modal.style.display = "none";
    clearCart();
    updateDomOnCartClearance(renderCart);
    updateCartItemsCount();
  });
};
