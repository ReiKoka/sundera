"use strict";

import { switchTheme } from "./switchTheme.js";
import { initProducts } from "./utils/helpers.js";

switchTheme();

const init = () => {
  initProducts();
};

init();
