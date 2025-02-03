"use strict";

export const renderCheckbox = (field, customLabel, defaultChecked) => {
  const input = `
    <div class="checkbox-wrapper-13">
      <input type="checkbox" id="${field}" name="${field}" checked=${defaultChecked} required />
      <label for="${field}" class="label-checkbox">${
    customLabel ? customLabel : field
  }</label>
    </div>
  `;

  return input;
};
