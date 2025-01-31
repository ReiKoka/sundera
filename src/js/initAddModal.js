"use strict";

import { addFormHandler } from "./addFormHandler";
import { renderInput } from "./renderInput";
import { renderModal } from "./renderModal";

export const initAddModal = () => {
  const triggerButton = document.querySelector(".add-new-product");
  const modal = document.querySelector("#modal");

  modal.innerHTML = renderModal(
    "Add new product",
    `
      <form action="" method="post" class="add-product-form">
        ${renderInput("title", "text")}
        ${renderInput("company", "text")}
        ${renderInput("description", "text")}
        ${renderInput("price", "number")}
        ${renderInput("category", "text")}
        ${renderInput("image", "text")}
        ${renderInput("color", "color")}
        ${renderInput("inStock", "number")}
        <button type="button" class="btn btn-clear">Clear</button>
        <button type="submit" class="btn btn-submit">Add new product</button>
      </form>
    `
  );

  addFormHandler();

  triggerButton?.addEventListener("click", () => {
    console.log("Opening modal...");
    modal.style.display = "block";
  });

  window.addEventListener("click", (e) => {
    const modalBox = document.querySelector(".modal-box");
    if (e.target === modalBox) {
      modal.style.display = "none";
    }
  });
};
