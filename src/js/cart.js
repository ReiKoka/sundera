"use strict";

import { renderCartItems } from "./renderCartItems";
import { updateCartItemsCount } from "./utils/helpers";
import { switchTheme } from "./switchTheme";

switchTheme();

const init = () => {
  updateCartItemsCount();
  renderCartItems();
};

init();
