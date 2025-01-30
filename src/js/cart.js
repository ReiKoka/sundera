"use strict";

import { renderCart } from "./renderCart";
import { updateCartItemsCount } from "./utils/helpers";
import { switchTheme } from "./switchTheme";

switchTheme();

const init = () => {
  const loader = document.querySelector(".loader-container");

  updateCartItemsCount();

  loader.remove();
  renderCart();
};

init();
