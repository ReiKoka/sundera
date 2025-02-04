"use strict";

import { getCountries } from "../../services/getCountries";
import { renderSelect } from "../renderSelect";
import { renderInput } from "./../renderInput";

export const renderCartCheckout = async () => {
  const checkoutContainer = document.querySelector(".checkout");
  const checkoutMain = document.createElement("div");
  checkoutMain.classList.add("checkout-main");

  const countries = await getCountries();

  checkoutMain.innerHTML = `
    <div class="delivery-info">
      <h2 class="delivery-info-title">Place your order</h2>
      <form class="form checkout-form">
      
       <div class="group-inputs"> 
        ${renderInput("firstName", "text", "First Name", "input")}
        ${renderInput("lastName", "text", "Last Name", "input")}
      </div>
      <div class="select-container">
        ${renderSelect("form-select", "countries", "form-select", countries)}
      </div>
      ${renderInput("address", "text", "Address", "input")}
      ${renderInput(
        "apartment",
        "text",
        "Apartment, suite, etc (optional)",
        "input",
        false
      )}
      <div class="group-inputs"> 
        ${renderInput("city", "text", "City", "input")}
        ${renderInput(
          "postcode",
          "text",
          "Postcode (optional)",
          "input",
          false
        )}
      </div>
      <div class="group-inputs">
        ${renderInput("email", "email", "Email", "input")}
        ${renderInput("phoneNumber", "number", "Phone Number", "input")}

      </div>

      

      </form>
    </div>
    <div class="checkout-summary"></div>
  `;

  checkoutContainer.appendChild(checkoutMain);
};
