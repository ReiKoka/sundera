"use strict";

export const renderInput = (field, type) => {
  const input = `
    <div className="field">
      <label htmlFor="${field}" class="label">${field}</label>
      <input type="${type}" id="${field}" name="${field}" class="input" required/>
    </div>
  `;

  return input;
};
