import { formatAndSplitPrice } from "./utils/helpers";

export const renderSingleCartItem = (cartItem) => {
  const formattedTotalPerProductPrice = formatAndSplitPrice(cartItem.quantity * cartItem.product.price);
  const formattedPerItemPrice = formatAndSplitPrice(cartItem.product.price);

  const { main: mainPrice, fraction: fractionalPrice } = formattedTotalPerProductPrice;
  const { main: secondaryPrice, fraction: secondaryFractionalPrice } = formattedPerItemPrice;

  /* Might Add Later*/

  // <div class="cart-item-select">
  //   <input type="checkbox" class="cart-item-checkbox" data-product-id="${cartItem.product.id}" />
  // </div>

  

  const html = `
    <div class='cart-item' data-product-id="${cartItem.product.id}">

      <div class="cart-item-img-container">
        <img src="${cartItem.product.image}" alt="${cartItem.product.title}" class="img" />
      </div>

      <div class="cart-item-info">
        <h4 class="cart-item-title">${cartItem.product.title}</h4>
        <p class="cart-item-company">${cartItem.product.company}</p>
        <p>Color: <span class="cart-item-color" style="background-color:${cartItem.color}"></span></p>
      </div>

      <div class="quantity">
        <div class="quantity-controls">
          <button class="quantity-button quantity-remove">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
          <p class="quantity-display">${cartItem.quantity}</p>
          <button class="quantity-button quantity-add">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>
      </div>

      <div class="price-container">
          <p class="price"><span>${mainPrice}</span>.<span>${fractionalPrice}</span></p>
          <p class="price-per-item">
            (<span>${secondaryPrice}</span>.<span>${secondaryFractionalPrice}</span> per item)
          </p>
      </div>
    </div>
  `;

  return html;
};
