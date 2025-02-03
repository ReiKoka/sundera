"use strict";

export const renderColorPicker = (
  field,
  type,
  customLabel,
  inputClassName,
  labelClassName,
  value
) => {
  const input = `
    <div class="field color-field">
      <input type="${type}" id="${field}" name="${field}" class="${inputClassName}" value=${value} />
      <label for="${field}" class="${labelClassName}">${
    customLabel ? customLabel : field
  }</label>
    </div>
  `;

  return input;
};
