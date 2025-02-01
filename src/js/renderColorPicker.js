"use strict";

export const renderColorPicker = (
  field,
  type,
  customLabel,
  inputClassName,
  labelClassName
) => {
  const input = `
    <div class="field color-field">
      <input type="${type}" id="${field}" name="${field}" class="${inputClassName}" />
      <label for="${field}" class="${labelClassName}">${
    customLabel ? customLabel : field
  }</label>
    </div>
  `;

  return input;
};
