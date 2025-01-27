import { getCart } from "./cartState";
import { renderSingleCartItem } from "./renderSingleCartItem";

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
        ${allCartItems.map((cartItem) => renderSingleCartItem(cartItem)).join("")}
      </div>
      <div class="checkout-summary"></div>
    `;

  cartParentContainer.appendChild(cartItemsContainer);
};
