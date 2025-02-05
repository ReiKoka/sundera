"use strict";

import { renderInput } from "../renderInput";
import { renderSelect } from "../renderSelect";
import { closeModalHandler } from "./closeModalHandler";
import { renderModal } from "./renderModal";
import { getCountries } from "./../../services/getCountries";
import { checkoutFormHandler } from "../formHandlers.js/checkoutFormHandler";
import { getCart } from "../cart/cartState";

export const initCheckoutModal = async () => {
  const checkoutTriggerButton = document.querySelector(
    ".checkout-buttons .btn.primary-btn"
  );
  const modal = document.querySelector("#modal");
  const cart = getCart();

  const countries = await getCountries();

  if (cart.length === 0) return;
  checkoutTriggerButton.addEventListener("click", () => {
    modal.innerHTML = renderModal(
      "Place your order",
      `
        <button type="button" class="close-modal-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>

        <form class="form checkout-form">
          <div class="group-inputs"> 
            ${renderInput("firstName", "text", "First Name", "input")}
            ${renderInput("lastName", "text", "Last Name", "input")}
          </div>
          <div class="select-container">
            ${renderSelect("country", "countries", "form-select", countries)}
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

          <div class="modal-buttons">
            <button type="reset" class="btn btn-cancel">Cancel</button>
            <button type="submit" class="btn btn-confirm">Buy Now</button>
          </div>
        </form>
      `
    );
    modal.style.display = "block";

    checkoutFormHandler(modal);
    closeModalHandler(modal);
  });
};
