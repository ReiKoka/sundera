"use strict";

import { renderCart } from "./renderCart";
import { updateCartItemsCount } from "./utils/helpers";
import { switchTheme } from "./switchTheme";

switchTheme();

const init = () => {
  updateCartItemsCount();
  renderCart();
};

init();
