"use strict";

import { deleteProductHandler } from "../formHandlers.js/deleteProductHandler";
import { renderModal } from "./renderModal";

export const initDeleteProduct = (product) => {
  const triggerButton = document.querySelector(".btn.delete-product");
  const modal = document.querySelector("#modal");

  modal.innerHTML = renderModal(
    `Delete Product`,
    `
      <button type="button" class="close-modal-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button>

      <div class="delete-product">
        <div class="modal-img">
          <img src="/delete-modal-img.svg" alt="delete-modal-image" />
        </div>
        <h3 class="delete-product-text">Are you sure you want to delete this product? </h3>
        <p class="delete-product-subtext">This action cannot be undone!</p>
        <div class="modal-buttons">
          <button type="button" class="btn btn-cancel">Cancel</button>
          <button type="submit" class="btn btn-confirm">Confirm</button>
        </div>
      </form>
    `
  );

  deleteProductHandler(product.id, modal);

  triggerButton.addEventListener("click", () => {
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
