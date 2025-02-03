"use strict";

export const renderInput = (
  field,
  type,
  customLabel,
  className,
  value = "",  
  minValue = 1
) => {
  const input = `
    <div class="field">
      <input type="${type}" id="${field}" name="${field}" class="${className}" required 
        placeholder value="${value}" ${minValue !== undefined ? `min="${minValue}"` : ""} />
      <label for="${field}" class="label">${customLabel || field}</label>
    </div>
  `;

  return input;
};
