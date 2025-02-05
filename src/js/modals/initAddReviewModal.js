"use strict";

import { addReviewFormHandler } from "../formHandlers.js/addReviewFormHandler";
import { renderInput } from "../renderInput";
import { closeModalHandler } from "./closeModalHandler";
import { renderModal } from "./renderModal";

export const initAddReviewModal = () => {
  const reviewTriggerButtons = document.querySelectorAll(
    ".btn.btn-leave-review"
  );
  const modal = document.querySelector("#modal");

  reviewTriggerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.currentTarget.getAttribute("data-product-id");

      modal.innerHTML = renderModal(
        "Leave Review",
        `
         <button type="button" class="close-modal-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
          <form class="form leave-review-form">
            ${renderInput(
              "rating",
              "number",
              "Rating (1-5)",
              "input",
              true,
              "",
              1,
              false
            )}
            ${renderInput(
              "comment",
              "text",
              "Comment",
              "input",
              true,
              undefined,
              undefined,
              false
            )}

            ${renderInput(
              "productId",
              "text",
              "Product ID",
              "input",
              true,
              productId,
              undefined,
              true
            )}
          <div class="modal-buttons">
            <button type="reset" class="btn btn-clear">Clear</button>
            <button type="submit" class="btn btn-submit">Add new review</button>
          </div>
          </form>
        `
      );
      modal.style.display = "block";
      addReviewFormHandler(modal);
      closeModalHandler(modal);
    });
  });
};
