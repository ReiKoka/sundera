export const renderSingleCartItem = (cartItem) => {
  const html = `
    <div class='cart-item'>
      <div class="cart-item-img-container">
        <img src="${cartItem.product.image}" alt="${cartItem.product.title}" class="img" />
      </div>

      <div class="cart-item-info">
        <h4 class="cart-item-title">${cartItem.product.title}</h4>
        <p class="cart-item-company">${cartItem.product.company}</p>
      </div>
    </div>
  `;

  console.log(html);
  return html;
};
