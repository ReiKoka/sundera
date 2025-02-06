"use strict";

import { switchTheme } from "../switchTheme";
import { updateCartItemsCount } from "../utils/helperCart";
import { initSingleProduct } from "../utils/helperProducts";


switchTheme();

const init = () => {
  initSingleProduct();
  updateCartItemsCount();
};

init();
