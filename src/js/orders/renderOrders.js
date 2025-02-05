"use strict";

import { renderSingleOrder } from "./renderSingleOrder";
import { initAddReviewModal } from './../modals/initAddReviewModal';

export const renderOrders = (orders) => {
  const ordersContainer = document.querySelector(".orders-container");
  const ordersEl = document.createElement("div");
  ordersEl.classList.add("orders");

  console.log(orders);

  ordersEl.innerHTML = `
    <div class="all-orders">
      ${orders.length ? orders.map((order) => renderSingleOrder(order)).join("") : `
          <div class="no-orders-container">
            <img src="/orders-page-img.svg" alt="orders-page-img" class="orders-img" />
            <h3 class="orders-message">You don't have any previous orders!</h3>
            <a href="/products.html" class="cta-button">Start shopping now</a>
          </div>
        `}
    </div>
  `;

  ordersContainer.appendChild(ordersEl);

  initAddReviewModal()
  
};
