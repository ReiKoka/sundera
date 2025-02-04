"use strict";

import { renderColorPicker } from "../renderColorPicker";
import { renderInput } from "../renderInput";
import { renderModal } from "./renderModal";
import { addProductFormHandler } from "../formHandlers.js/addProductFormHandler";
import { closeModalHandler } from "./closeModalHandler";

export const initAddProductModal = () => {
  const addProductTriggerButton = document.querySelector(".add-new-product");
  const modal = document.querySelector("#modal");

  addProductTriggerButton?.addEventListener("click", () => {
    modal.innerHTML = renderModal(
      "Add new product",
      `

        <form method="post" class="form add-product-form">
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
              "color-picker-input",
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
    modal.style.display = "block";
    addProductFormHandler(modal);
    closeModalHandler(modal);
  });
};
