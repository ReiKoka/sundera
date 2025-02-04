"use strict";

export const renderInput = (
  field,
  type,
  customLabel,
  className,
  required = true,
  value = "",
  minValue = 1
) => {
  const input = `
    <div class="field">
      <input type="${type}" id="${field}" name="${field}" class="${className}" required=${required} 
        placeholder value="${value}" ${
    minValue !== undefined ? `min="${minValue}"` : ""
  } />
      <label for="${field}" class="label">${customLabel || field}</label>
    </div>
  `;

  return input;
};
