"use strict";

export const renderColorPicker = (
  field,
  type,
  customLabel,
  inputClassName,
  labelClassName
) => {
  const input = `
    <div class="field">
      <input type="${type}" id="${field}" name="${field}" class="${inputClassName}" />
      <label htmlFor="${field}" class="${labelClassName}">${
    customLabel ? customLabel : field
  }</label>
    </div>
  `;

  return input;
};
