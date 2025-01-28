import { getCart, setCart } from "./cartState";
import { renderSingleCartItem } from "./renderSingleCartItem";
import {
  formatAndSplitPrice,
  formatCurrency,
  updateCartItemsCount,
} from "./utils/helpers";

export const renderCartItems = () => {
  const allCartItems = getCart();
  console.log(allCartItems);

  // Subtotal
  const calculateSubtotal = (arr) => {
    return arr
      ?.map((item) => item.product.price * item.quantity)
      ?.reduce((acc, curr) => acc + curr, 0);
  };
  let formattedSubtotalPrice = formatAndSplitPrice(
    calculateSubtotal(allCartItems)
  );
  let { main: subtotalMainPrice, fraction: subtotalFractionalPrice } =
    formattedSubtotalPrice;

  // Shipping
  const calculateShipping = (arr) => {
    if (calculateSubtotal(arr) < 30) return calculateSubtotal(arr) * 0.2;

    // prettier-ignore
    if (calculateSubtotal(arr) >= 30 && calculateSubtotal(arr) < 70) return calculateSubtotal(arr) * 0.1;

    // prettier-ignore
    if (calculateSubtotal(arr) >= 70 && calculateSubtotal(arr) < 120) return calculateSubtotal(arr) * 0.05;

    if (calculateSubtotal(arr) >= 120) return 0.0;
  };
  let formattedShipping = formatAndSplitPrice(calculateShipping(allCartItems));
  let { main: shippingMainPrice, fraction: shippingFractionalPrice } =
    formattedShipping;

  // Total
  const calculateTotal = (arr) => {
    return calculateSubtotal(arr) + calculateShipping(arr);
  };
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

      //prettier-ignore
      const formattedItemPrice = formatAndSplitPrice(cartItem.quantity * cartItem.product.price);
      const { main: mainPrice, fraction: fractionalPrice } = formattedItemPrice;
      const productPriceContainer = cartItemEl.querySelector(
        ".price-container .price"
      );
      productPriceContainer.innerHTML = "";
      productPriceContainer.innerHTML = `<span>${mainPrice}</span>.<span>${fractionalPrice}</span>`;

      // Subtotal
      formattedSubtotalPrice = formatAndSplitPrice(
        calculateSubtotal(getCart())
      );
      subtotalMainPrice = formattedSubtotalPrice.main;
      subtotalFractionalPrice = formattedSubtotalPrice.fraction;

      const subtotalPriceContainer = document.querySelector(".subtotal-value");
      subtotalPriceContainer.innerHTML = `<span>${subtotalMainPrice}</span>.<span>${subtotalFractionalPrice}</span>`;

      // Shipping
      formattedShipping = formatAndSplitPrice(calculateShipping(getCart()));
      shippingMainPrice = formattedShipping.main;
      shippingFractionalPrice = formattedShipping.fraction;

      const shippingPriceContainer = document.querySelector(".shipping-value");
      shippingPriceContainer.innerHTML = `<span>${shippingMainPrice}</span>.<span>${shippingFractionalPrice}</span>`;

      // Total
      formattedTotal = formatAndSplitPrice(calculateTotal(getCart()));
      totalMainPrice = formattedTotal.main;
      totalFractionalPrice = formattedTotal.fraction;

      const totalPriceContainer = document.querySelector(".total-value");
      totalPriceContainer.innerHTML = `<span>${totalMainPrice}</span>.<span>${totalFractionalPrice}</span>`;
    });
  }
};
