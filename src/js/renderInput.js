"use strict";

export const renderInput = (field, type, customLabel, className, minValue) => {
  const input = `
    <div class="field">
      <input type="${type}" id="${field}" name="${field}" class="${className}" required placeholder min=${minValue} />
      <label for="${field}" class="label">${
    customLabel ? customLabel : field
  }</label>
    </div>
  `;

  return input;
};
