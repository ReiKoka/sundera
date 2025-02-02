"use strict";
import { deleteProduct } from "./../../services/deleteProduct";

export const deleteProductHandler = (id, modal) => {
  const notyf = new Notyf({
    position: { x: "center", y: "top" },
  });
  const cancelBtn = document.querySelector(".btn.btn-cancel");
  const confirmBtn = document.querySelector(".btn.btn-confirm");

  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  confirmBtn.addEventListener("click", async () => {
    const result = deleteProduct(id);
    if (result) {
      notyf.success(`Product deleted successfully`);
      modal.style.display = "none";
      window.location.href = "/products";
    }
  });
};
