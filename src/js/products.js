"use strict";

import { initProducts } from "./initProducts.js";
import { switchTheme } from "./switchTheme.js";

switchTheme();

const init = () => {
  initProducts();
};

init();
