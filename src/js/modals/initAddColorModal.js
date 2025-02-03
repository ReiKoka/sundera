"use strict";

import { renderColorPicker } from "../renderColorPicker";
import { renderInput } from "../renderInput";
import { renderModal } from "./renderModal";
import { addProductColorFormHandler } from "./../formHandlers.js/addProductColorFormHandler";
import { closeModalHandler } from "./closeModalHandler";

export const initAddColorModal = (product) => {
  const addColorTriggerButton = document.querySelector(".btn.add-new-colors");
  const modal = document.querySelector("#modal");

  addColorTriggerButton?.addEventListener("click", () => {
    modal.innerHTML = renderModal(
      "Add New Color",
      `
        <button type="button" class="close-modal-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
        <form method="patch" class="form add-color-form">
            <div class="color-quantity-parent">
             ${renderColorPicker(
               "color",
               "color",
               "Select Color",
               "color-picker-input",
               "color-picker-label"
             )}
           </div>
           ${renderInput("inStock", "number", "Quantity", "input", 1)}
           <div class="modal-buttons">
            <button type="reset" class="btn btn-clear">Clear</button>
            <button type="submit" class="btn btn-submit">Add new color</button>
          </div>
        </form>
      `
    );
    modal.style.display = "block";
    addProductColorFormHandler(product, modal);
    closeModalHandler(modal);
  });
};
