import { formatAndSplitPrice } from "../utils/helpers";

export const renderSingleCartItem = (cartItem) => {
  const formattedTotalPerProductPrice = formatAndSplitPrice(
    cartItem.quantity * cartItem.product.price
  );
  const formattedPerItemPrice = formatAndSplitPrice(cartItem.product.price);

  const { main: mainPrice, fraction: fractionalPrice } =
    formattedTotalPerProductPrice;
  const { main: secondaryPrice, fraction: secondaryFractionalPrice } =
    formattedPerItemPrice;

  /* Might Add Later*/

  // <div class="cart-item-select">
  //   <input type="checkbox" class="cart-item-checkbox" data-product-id="${cartItem.product.id}" />
  // </div>

  const html = `
    <div class='cart-item' data-product-id="${cartItem.product.id}" data-product-color="${cartItem.color}">

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

      <button type="button" class="remove-item">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </div>
  `;

  return html;
};
