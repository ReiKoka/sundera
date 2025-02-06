import { formatAndSplitPrice } from "./helpersFunctions";

// Update Prices in DOM
export const updatePricesInDOM = (selector, calculatePrice, arr) => {
  const formattedPrice = formatAndSplitPrice(calculatePrice(arr));
  const mainPrice = formattedPrice.main;
  const fractionalPrice = formattedPrice.fraction;

  const priceContainer = document.querySelector(selector);

  if (priceContainer) {
    priceContainer.innerHTML = `<span>${mainPrice}</span>.<span>${fractionalPrice}</span>`;
  }
};

// Update DOM when cart gets cleared
export const updateDomOnCartClearance = (renderCart) => {
  const cartParentContainer = document.querySelector(".cart");
  while (cartParentContainer.firstChild) {
    cartParentContainer.removeChild(cartParentContainer.firstChild);
  }
  renderCart();
};

// Setup Color Buttons
export const setupColorButtons = (buttons, product, onColorSelect) => {
  const stockDisplayElement = document.querySelector(".stock-display");
  const quantityControlsArea = document.querySelector(
    ".quantity .quantity-controls"
  );
  const primaryAddButton = document.querySelector(
    ".checkout-container .primary-button"
  );

  buttons.forEach((button, i) => {
    button.style.backgroundColor = product.colors[i].color;

    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("focused"));
      button.classList.add("focused");

      const selectedColor = product.colors[i];
      onColorSelect(selectedColor.color);

      stockDisplayElement.textContent = `${
        selectedColor.inStock
          ? `${selectedColor.inStock} available`
          : "Out of stock"
      }`;

      if (selectedColor.inStock === 0) {
        stockDisplayElement.classList.add("out-of-stock");
        quantityControlsArea.style.display = "none";
        primaryAddButton.disabled = true;
      } else {
        stockDisplayElement.classList.remove("out-of-stock");
        quantityControlsArea.style.display = "flex";
        primaryAddButton.disabled = false;
      }
    });
  });
};