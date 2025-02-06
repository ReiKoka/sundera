"use strict";

import { switchTheme } from "./switchTheme.js";
import { updateCartItemsCount } from "./utils/helperCart.js";
import { initProducts } from "./utils/helperProducts.js";

switchTheme();

const init = () => {
  initProducts();
  updateCartItemsCount();
};

init();
