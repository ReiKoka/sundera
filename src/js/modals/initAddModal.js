"use strict";

import { addFormHandler } from "../addFormHandler";
import { renderColorPicker } from "../renderColorPicker";
import { renderInput } from "../renderInput";
import { renderModal } from "./renderModal";

export const initAddModal = () => {
  const triggerButton = document.querySelector(".add-new-product");
  const modal = document.querySelector("#modal");

  modal.innerHTML = renderModal(
    "Add new product",
    `
      <button type="button" class="close-modal-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button>
      <form method="post" class="add-product-form">
        ${renderInput("title", "text", "Title", "input")}
        ${renderInput("company", "text", "Company", "input")}
        ${renderInput("description", "text", "Description", "input")}
        ${renderInput("price", "number", "Price", "input")}
        ${renderInput("category", "text", "Category", "input")}
        ${renderInput("image", "text", "Image URL", "input")}
        <div class="color-quantity-parent">
          ${renderInput("inStock", "number", "Quantity", "input")}
          ${renderColorPicker(
            "color",
            "color",
            "Select Color",
            "color-picker",
            "color-picker-label"
          )}
        </div>
        <div class="modal-buttons">
          <button type="reset" class="btn btn-clear">Clear</button>
          <button type="submit" class="btn btn-submit">Add new product</button>
        </div>
      </form>
    `
  );

  addFormHandler(modal);

  triggerButton?.addEventListener("click", () => {
    modal.style.display = "block";
  });

  const modalBox = document.querySelector(".modal-box");
  const closeModalBtn = modalBox.querySelector(".close-modal-btn");

  closeModalBtn.addEventListener("click", (e) => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalBox) {
      modal.style.display = "none";
    }
  });
};
