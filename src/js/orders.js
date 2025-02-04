"use strict";
import { switchTheme } from "./switchTheme";
import { initOrders } from "./utils/helpers";

switchTheme();

const init = () => {
  initOrders();
};

init();
