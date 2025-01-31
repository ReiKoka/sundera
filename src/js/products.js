"use strict";

import { initAddModal } from "./initAddModal.js";
import { switchTheme } from "./switchTheme.js";
import { initProducts, updateCartItemsCount } from "./utils/helpers.js";

switchTheme();

const init = () => {
  initProducts();
  updateCartItemsCount();
  initAddModal();
};

init();
