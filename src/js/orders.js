"use strict";
import { switchTheme } from "./switchTheme";
import { initOrders } from "./utils/helperOrders";

switchTheme();

const init = () => {
  initOrders();
};

init();
