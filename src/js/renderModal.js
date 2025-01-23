"use strict";

export const renderModal = (title) => {
  const modal = `
      <div class="modal-box">
        <div class="modal-content">
          <h1 class="modal-title">${title}</h1>
        </div>
      </div>
  
  `;
  return modal;
};
