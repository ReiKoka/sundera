import { getCart, setCart } from "./cartState";
import { renderSingleCartItem } from "./renderSingleCartItem";
import { formatCurrency, updateCartItemsCount } from "./utils/helpers";

export const renderCartItems = () => {
  const allCartItems = getCart();
  console.log(allCartItems);

  const cartItemsContainer = document.createElement("div");
  const cartParentContainer = document.querySelector(".cart");
  !allCartItems.length
    ? cartItemsContainer.classList.add("empty-cart")
    : cartItemsContainer.classList.add("filled-cart");

  cartItemsContainer.innerHTML = !allCartItems.length
    ? `
      <div class="img-container"><img src="public/empty-cart.svg" alt="empty-cart-illustration" class="img"/></div>
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
          <p className="price-line subtotal">${1}</p>
      </div>
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

      const formattedPrice = formatCurrency(
        cartItem.quantity * cartItem.product.price
      );
      const [mainPrice, fractionalPrice] = formattedPrice.split(".");

      const priceContainer = cartItemEl.querySelector(
        ".price-container .price"
      );

      priceContainer.innerHTML = "";
      priceContainer.innerHTML = `<span>${mainPrice}</span>.<span>${fractionalPrice}</span>`;
    });
  }
};
