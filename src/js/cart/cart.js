"use strict";

import { renderCart } from "./renderCart";
import { switchTheme } from "../switchTheme";
import { updateCartItemsCount } from "../utils/helperCart";

switchTheme();

const init = () => {
  const loader = document.querySelector(".loader-container");

  updateCartItemsCount();

  loader.remove();
  renderCart();
};

init();
