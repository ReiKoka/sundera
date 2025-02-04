"use strict";

import { renderSingleOrder } from "./renderSingleOrder";

export const renderOrders = (orders) => {
  const ordersContainer = document.querySelector(".orders-container");
  const ordersEl = document.createElement("div");
  ordersEl.classList.add("orders");

  console.log(orders);

  ordersEl.innerHTML = `
    <div class="all-orders">
      ${orders.map((order) => renderSingleOrder(order))}
    </div>
  `;

  ordersContainer.appendChild(ordersEl);
};
