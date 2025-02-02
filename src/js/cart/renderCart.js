import { Notyf } from "notyf";
import { clearCart, getCart, setCart } from "./cartState";

import {
  calculateShipping,
  calculateSubtotal,
  calculateTotal,
  formatAndSplitPrice,
  updateCartItemsCount,
  updateDomOnCartClearance,
  updatePricesInDOM,
} from "../utils/helpers";
import { renderSingleCartItem } from "./renderSingleCartItem";

export const renderCart = () => {
  const allCartItems = getCart();
  console.log(allCartItems);
  const notyf = new Notyf({
    position: { x: "center", y: "top" },
  });

  // Subtotal
  let formattedSubtotalPrice = formatAndSplitPrice(
    calculateSubtotal(allCartItems)
  );
  let { main: subtotalMainPrice, fraction: subtotalFractionalPrice } =
    formattedSubtotalPrice;

  // Shipping
  let formattedShipping = formatAndSplitPrice(calculateShipping(allCartItems));
  let { main: shippingMainPrice, fraction: shippingFractionalPrice } =
    formattedShipping;

  // Total
  let formattedTotal = formatAndSplitPrice(calculateTotal(allCartItems));
  let { main: totalMainPrice, fraction: totalFractionalPrice } = formattedTotal;

  // Populating the html
  const cartItemsContainer = document.createElement("div");
  const cartParentContainer = document.querySelector(".cart");
  !allCartItems.length
    ? cartItemsContainer.classList.add("empty-cart")
    : cartItemsContainer.classList.add("filled-cart");

  cartItemsContainer.innerHTML = !allCartItems.length
    ? `
      <div class="img-container"><img src="/empty-cart.svg" alt="empty-cart-illustration" class="img"/></div>
      <h3 class="cart-empty-info">Your Sundera cart is empty! </h3>
      <a href="../../products.html" class="cta-button">Go to products</a>
    `
    : `
      <div class='cart-items'>
        ${allCartItems
          .map((cartItem) => renderSingleCartItem(cartItem))
          .join("")}
      </div>
      <div class="checkout-summary">
        <h1 class="checkout-title">Summary</h1>
        <div class="price-line subtotal">
          <p>Subtotal: </p>
          <p class="subtotal-value">
            <span>${subtotalMainPrice}</span>.<span>${subtotalFractionalPrice}</span>
          </p>
        </div>

        <div class="price-line shipping">
          <p>Shipping: </p>
          <p class="shipping-value">
            <span>${shippingMainPrice}</span>.<span>${shippingFractionalPrice}</span>
          </p>
        </div>


        <div class="price-line total">
          <p>Total: </p>
          <p class="total-value">
            <span>${totalMainPrice}</span>.<span>${totalFractionalPrice}</span>
          </p>
        </div>

        <div class="checkout-buttons">
          <button type="button" class="btn secondary-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            <span>Clear Cart</span></button>
          <button type="button" class="btn primary-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
            <span>Checkout</span></button>
        </div>
      </div>
    `;

  cartParentContainer.appendChild(cartItemsContainer);

  if (allCartItems?.length) {
    const cartItems = document.querySelector(".cart-items");

    cartItems.addEventListener("click", (e) => {
      const button = e.target.closest(".quantity-button");
      const cart = getCart();

      // Handle quantity buttons
      if (button) {
        const cartItemEl = button.closest(".cart-item");
        const productId = cartItemEl.dataset.productId;
        const productColor = cartItemEl.dataset.productColor;
        const isAddButton = button.classList.contains("quantity-add");
        const isRemoveButton = button.classList.contains("quantity-remove");

        const cartItem = cart.find(
          (item) => item.product.id === productId && item.color === productColor
        );

        if (cartItem) {
          if (isAddButton) cartItem.quantity++;
          if (isRemoveButton)
            cartItem.quantity = Math.max(1, cartItem.quantity - 1);
        }

        setCart(cart);

        const quantityDisplay = cartItemEl.querySelector(".quantity-display");
        quantityDisplay.textContent = cartItem.quantity;
        updateCartItemsCount();

        // Item Price
        const formattedItemPrice = formatAndSplitPrice(
          cartItem.quantity * cartItem.product.price
        );
        const { main: mainPrice, fraction: fractionalPrice } =
          formattedItemPrice;
        const productPriceContainer = cartItemEl.querySelector(
          ".price-container .price"
        );

        productPriceContainer.innerHTML = `<span>${mainPrice}</span>.<span>${fractionalPrice}</span>`;
      }

      const removeButton = e.target.closest(".remove-item");

      // Handle Remove Button
      if (removeButton) {
        const cartItemEl = removeButton.closest(".cart-item");
        const productId = cartItemEl.dataset.productId;
        const productColor = cartItemEl.dataset.productColor;

        const updatedCart = cart.filter(
          (item) =>
            !(item.product.id === productId && item.color === productColor)
        );
        setCart(updatedCart);
        cartItemEl.remove();
        updateCartItemsCount();
        notyf.success(`Item #${productId} removed from cart!`);

        if (updatedCart.length === 0) {
          updateDomOnCartClearance(renderCart);
          return;
        }
      }

      // Subtotal Price
      updatePricesInDOM(".subtotal-value", calculateSubtotal, getCart());
      // Shipping Price
      updatePricesInDOM(".shipping-value", calculateShipping, getCart());
      // Total Price
      updatePricesInDOM(" .total-value", calculateTotal, getCart());
    });
  }

  const clearCartBtn = document.querySelector(".secondary-btn");

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      clearCart();
      notyf.success("Cart cleared");
      updateDomOnCartClearance(renderCart);
      updateCartItemsCount();
    });
  }
};
