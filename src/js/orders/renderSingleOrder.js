"use strict";

import { formatCurrency } from "../utils/helpersFunctions";
import { renderSingleOrderProduct } from "./renderSingleOrderProduct";

export const renderSingleOrder = (order) => {
  const {
    id,
    total,
    firstName,
    lastName,
    address,
    apartment,
    city,
    country,
    postcode,
  } = order;

  const html = `
    <div class="single-order-card">
      <div class="info-bar">
        <div class="common">
          <p>#Order ID</p>
          <p>${id}</p>
        </div>
        <div class="common">
          <p>Total</p>
          <p>${formatCurrency(total)}</p>
        </div>
        <div class="common">
          <p>Name</p>
          <p>${firstName} ${lastName}</p>
        </div>
        <div class="common">
          <p>Address</p>
          <p>${address}, ${apartment}</p>
          <p>${city}, ${country} ${postcode}</p>
        </div>
      </div>
      <div class="info-box">
      ${order.products
        .map((product) => renderSingleOrderProduct(product))
        .join("")}
      </div>
    </div>
  `;

  return html;
};
