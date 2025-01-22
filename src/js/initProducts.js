"use strict";

import { getProducts } from "../services/getProducts.js";
import { renderProducts } from "./renderProducts.js";

export const initProducts = async (featured) => {
  const featuredProducts = await getProducts(featured);
  renderProducts(featuredProducts);
};


