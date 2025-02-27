"use strict";

import { editProductFormHandler } from "../formHandlers.js/editProductFormHandler";
import { renderCheckbox } from "../renderCheckbox";
import { renderColorPicker } from "../renderColorPicker";
import { renderInput } from "../renderInput";
import { convertRgbToHex } from "../utils/helpersFunctions";
import { closeModalHandler } from "./closeModalHandler";
import { renderModal } from "./renderModal";

export const initEditProductModal = (product) => {
  const editTriggerButton = document.querySelector(".btn.edit-product");
  const modal = document.querySelector("#modal");

  editTriggerButton?.addEventListener("click", () => {
    const selectedButton = document.querySelector(
      ".colors-buttons .btn.focused"
    );

    const selectedColor = convertRgbToHex(selectedButton.style.backgroundColor);
    const selectedColorObj = product.colors.find((c) => {
      return c.color.toLocaleLowerCase() === selectedColor.toLocaleLowerCase();
    }) || { color: "", inStock: 0 };

    modal.innerHTML = renderModal(
      "Edit Product",
      `
        <button type="button" class="close-modal-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
        <form method="post" class="form edit-product-form">
          ${renderInput(
            "title",
            "text",
            "Title",
            "input",
            true,
            product?.title
          )}
          ${renderInput(
            "company",
            "text",
            "Company",
            "input",
            true,
            product?.company
          )}
          ${renderInput(
            "description",
            "text",
            "Description",
            "input",
            true,
            product?.description
          )}
          ${renderInput(
            "price",
            "number",
            "Price",
            "input",
            true,
            product?.price,
            1
          )}
          ${renderInput(
            "category",
            "text",
            "Category",
            "input",
            true,
            product?.category
          )}
          ${renderInput(
            "image",
            "text",
            "Image URL",
            "input",
            true,
            product?.image
          )}
          ${renderCheckbox("featured", "Featured", product?.featured)}
          <div class="color-quantity-parent">
            ${renderInput(
              "inStock",
              "number",
              "Quantity",
              "input",
              true,
              selectedColorObj.inStock
            )}
            ${renderColorPicker(
              "color",
              "color",
              "Select Color",
              "color-picker-input",
              "color-picker-label",
              selectedColorObj.color
            )}
          </div>
          <div class="modal-buttons">
            <button type="reset" class="btn btn-clear">Clear</button>
            <button type="submit" class="btn btn-submit">Edit product</button>
          </div>
        </form>
      `
    );
    modal.style.display = "block";
    editProductFormHandler(product, modal);
    closeModalHandler(modal);
  });
};
