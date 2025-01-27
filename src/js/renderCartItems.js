import { getCart, setCart } from "./cartState";
import { renderSingleCartItem } from "./renderSingleCartItem";
import { updateCartItemsCount } from "./utils/helpers";

export const renderCartItems = () => {
  const allCartItems = getCart();
  console.log(allCartItems);

  const cartItemsContainer = document.createElement("div");
  const cartParentContainer = document.querySelector(".cart");
  !allCartItems
    ? cartItemsContainer.classList.add("empty-cart")
    : cartItemsContainer.classList.add("filled-cart");

  cartItemsContainer.innerHTML = !allCartItems
    ? `
      <div class="img-container"><img src="public/empty-cart.svg" alt="empty-cart-illustration" class="img"/></div>
      <h3 class="cart-empty-info">Your Sendora cart is empty! </h3>
      <a href="../../products.html" class="cta-button">Go to products</a>
    `
    : `
      <div class='cart-items'>
        ${allCartItems
          .map((cartItem) => renderSingleCartItem(cartItem))
          .join("")}
      </div>
      <div class="checkout-summary"></div>
    `;

  cartParentContainer.appendChild(cartItemsContainer);

  if (allCartItems?.length) {
    const cartItems = document.querySelector(".cart-items");

    cartItems.addEventListener("click", (e) => {
      const button = e.target.closest(".quantity-button");
      if (!button) return;

      const cartItemEl = button.closest(".cart-item");
      const productId = cartItemEl.dataset.productId;
      const isAddButton = button.classList.contains("quantity-add");
      const isRemoveButton = button.classList.contains("quantity-remove");

      const cart = getCart();
      const cartItem = cart.find((item) => item.product.id === productId);

      if (cartItem) {
        if (isAddButton) cartItem.quantity++;
        if (isRemoveButton)
          cartItem.quantity = Math.max(1, cartItem.quantity - 1);
      }

      setCart(cart);

      const quantityDisplay = cartItemEl.querySelector(".quantity-display");
      quantityDisplay.textContent = cartItem.quantity;
      updateCartItemsCount();
    });
  }
};
