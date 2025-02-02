"use strict";

import { switchTheme } from "../switchTheme";
import { initSingleProduct, updateCartItemsCount } from "../utils/helpers";

switchTheme();

const init = () => {
  initSingleProduct();
  updateCartItemsCount();
};

init();
