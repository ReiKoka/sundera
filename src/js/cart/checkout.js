"use strict";

import { switchTheme } from "../switchTheme";
import { renderCartCheckout } from "./renderCartCheckout";

switchTheme();

export const init = () => {
  const loader = document.querySelector(".loader-container");

  loader.remove();

  renderCartCheckout();
};

init();
