"use strict";

import Glide from "@glidejs/glide";

import { switchTheme } from "./js/switchTheme.js";
import { initProducts } from "./js/utils/helperProducts.js";
import { updateCartItemsCount } from "./js/utils/helperCart.js";

const config = {
  type: "slider",
  perView: 1,
  autoplay: 10000,
  hoverpause: true,
};

new Glide(".glide", config).mount();
switchTheme();

const init = () => {
  initProducts(true);
  updateCartItemsCount();
};

init();
