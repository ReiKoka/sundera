"use strict";

import { capitalizeFirstLetter } from "./utils/helpersFunctions";

export const renderSelect = (
  title,
  id,
  className,
  arr = [],
  disabledValue = "",
  disabledText = ""
) => {
  const select = `
    <select
      name=${title}
      title="${title}"
      id="${id}"
      class="${className}"
    >
      ${
        disabledValue && disabledText
          ? `<option value="${disabledValue}">${disabledText}</option>`
          : ""
      } 
      ${arr?.map(
        (item, index) =>
          `<option value="${item}" ${
            index === 0 ? "selected" : ""
          }>${capitalizeFirstLetter(item)}</option>`
      )}
    </select>
  `;

  return select;
};
