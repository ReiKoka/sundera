"use strict";

export const renderImage = (product) => {
  return `
    <div class="img-container">
      <img src="${product.image}" alt="" class="img" />
    </div>`;
};
