"use strict";

export const closeModalHandler = (modal) => {
  const modalBox = document.querySelector(".modal-box");
  const closeModalBtn = modalBox.querySelector(".close-modal-btn");
  console.log(closeModalBtn);

  
  closeModalBtn.addEventListener("click", (e) => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalBox) {
      modal.style.display = "none";
    }
  });
};
