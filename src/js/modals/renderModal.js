"use strict";

export const renderModal = (title, html) => {
  const modal = `
   <div class="modal-box">
     <div class="modal-content">
       <h1 class="modal-title">${title}</h1>
       ${html}
     </div
  </div>
  
  `;
  return modal;
};
