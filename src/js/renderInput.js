"use strict";

export const renderInput = (field, type, customLabel, className) => {
  const input = `
    <div class="field">
      <input type="${type}" id="${field}" name="${field}" class="${className}" required placeholder />
      <label htmlFor="${field}" class="label">${customLabel ? customLabel : field}</label>
    </div>
  `;

  return input;
};
