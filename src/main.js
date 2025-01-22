"use strict";

import Glide from "@glidejs/glide";

import { switchTheme } from "./js/switchTheme.js";
import { getProducts } from "./services/getProducts.js";
import { renderProducts } from "./js/renderProducts.js";

const config = {
  type: "slider",
  perView: 1,
  autoplay: 10000,
  hoverpause: true,
};

new Glide(".glide", config).mount();
switchTheme();

const init = async () => {
  const featuredProducts = await getProducts(true);
  renderProducts(featuredProducts);
};

init();
